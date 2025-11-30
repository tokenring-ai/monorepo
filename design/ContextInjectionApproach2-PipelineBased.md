# Context Injection Approach 2: Pipeline-Based Context Assembly

## Overview

Implement a pipeline architecture where context flows through stages of processors, filters, and transformers. Each stage can modify, enrich, or filter context before it reaches the AI model.

## Core Concepts

### Context Pipeline

```typescript
interface ContextPipeline {
  stages: ContextStage[];
  execute(input: ContextInput, agent: Agent): Promise<ContextOutput>;
}

interface ContextStage {
  name: string;
  process(context: ContextData, agent: Agent): Promise<ContextData>;
}

interface ContextData {
  messages: ChatInputMessage[];
  metadata: Map<string, any>;
  tokenCount: number;
}
```

### Stage Types

1. **Collectors**: Gather raw context from sources
2. **Enrichers**: Add metadata and relevance scores
3. **Filters**: Remove irrelevant or duplicate content
4. **Transformers**: Format and optimize context
5. **Validators**: Ensure context meets requirements

## Implementation Details

### 1. Pipeline Definition

```typescript
class ContextPipelineBuilder {
  private stages: ContextStage[] = [];
  
  collect(collector: ContextCollector): this;
  enrich(enricher: ContextEnricher): this;
  filter(filter: ContextFilter): this;
  transform(transformer: ContextTransformer): this;
  validate(validator: ContextValidator): this;
  build(): ContextPipeline;
}
```

### 2. Example Pipeline

```typescript
const pipeline = new ContextPipelineBuilder()
  .collect(new SystemPromptCollector())
  .collect(new PriorMessagesCollector())
  .collect(new RAGCollector(vectorDB))
  .enrich(new RelevanceScorer())
  .filter(new DuplicateFilter())
  .filter(new TokenBudgetFilter(maxTokens: 100000))
  .transform(new MessageFormatter())
  .validate(new TokenLimitValidator())
  .build();
```

### 3. Stage Implementations

```typescript
class RAGCollector implements ContextStage {
  name = "rag-collector";
  
  constructor(private vectorDB: VectorDatabase) {}
  
  async process(context: ContextData, agent: Agent): Promise<ContextData> {
    const query = this.extractQuery(context);
    const results = await this.vectorDB.search(query);
    
    for (const result of results) {
      context.messages.push({
        role: "user",
        content: result.content
      });
      context.metadata.set(`rag:${result.id}`, {
        score: result.score,
        source: result.source
      });
    }
    
    return context;
  }
}

class TokenBudgetFilter implements ContextStage {
  name = "token-budget-filter";
  
  constructor(private maxTokens: number) {}
  
  async process(context: ContextData, agent: Agent): Promise<ContextData> {
    // Sort by relevance and trim to budget
    const scored = context.messages.map((msg, idx) => ({
      msg,
      score: context.metadata.get(`relevance:${idx}`) ?? 0
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    let tokenCount = 0;
    const filtered: ChatInputMessage[] = [];
    
    for (const {msg} of scored) {
      const msgTokens = this.estimateTokens(msg);
      if (tokenCount + msgTokens <= this.maxTokens) {
        filtered.push(msg);
        tokenCount += msgTokens;
      }
    }
    
    context.messages = filtered;
    context.tokenCount = tokenCount;
    return context;
  }
}
```

## Configuration

```typescript
// In agent config
export default {
  chat: {
    contextPipeline: {
      stages: [
        { type: "collect", name: "system-prompt" },
        { type: "collect", name: "prior-messages" },
        { type: "collect", name: "rag", config: { limit: 5 } },
        { type: "enrich", name: "relevance-scorer" },
        { type: "filter", name: "duplicate-filter" },
        { type: "filter", name: "token-budget", config: { maxTokens: 100000 } },
        { type: "transform", name: "message-formatter" },
        { type: "validate", name: "token-limit" }
      ]
    }
  }
};
```

## RAG Integration

```typescript
class SemanticRAGStage implements ContextStage {
  name = "semantic-rag";
  
  constructor(
    private vectorDB: VectorDatabase,
    private config: { limit: number; threshold: number }
  ) {}
  
  async process(context: ContextData, agent: Agent): Promise<ContextData> {
    // Extract query from current message
    const currentMsg = context.messages[context.messages.length - 1];
    const query = typeof currentMsg.content === "string" 
      ? currentMsg.content 
      : "";
    
    // Search vector DB
    const results = await this.vectorDB.search(query, {
      limit: this.config.limit,
      threshold: this.config.threshold
    });
    
    // Insert RAG results before current message
    const ragMessages = results.map(r => ({
      role: "user" as const,
      content: `[Context from ${r.source}]\n${r.content}`
    }));
    
    context.messages.splice(-1, 0, ...ragMessages);
    
    return context;
  }
}
```

## Commands

```bash
/context pipeline show           # Display current pipeline
/context pipeline add rag        # Add stage to pipeline
/context pipeline remove rag     # Remove stage
/context pipeline reorder 3 1    # Move stage 3 to position 1
/context pipeline config rag limit=10  # Configure stage
```

## Advantages

- **Composable**: Mix and match stages for different scenarios
- **Testable**: Each stage can be tested independently
- **Flexible**: Easy to add new processing logic
- **Observable**: Track context transformation through pipeline
- **Reusable**: Stages can be shared across agents

## Disadvantages

- **Complexity**: More moving parts to understand
- **Performance**: Multiple passes over data
- **Debugging**: Harder to trace issues through pipeline

## Migration Path

1. Create pipeline infrastructure
2. Implement backward-compatible collector stage
3. Add new stages incrementally
4. Migrate agents to pipeline configuration
5. Remove legacy context gathering

## File Changes

- `pkg/chat/pipeline/ContextPipeline.ts` (new)
- `pkg/chat/pipeline/stages/` (new directory)
- `pkg/chat/pipeline/ContextPipelineBuilder.ts` (new)
- `pkg/chat/commands/context.ts` (new)
- `pkg/chat/chatRequestBuilder/createChatRequest.ts` (modify)
