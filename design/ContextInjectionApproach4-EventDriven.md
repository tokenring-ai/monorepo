# Context Injection Approach 4: Event-Driven Context Assembly

## Overview

Implement an event-driven architecture where context assembly is triggered by events, and providers subscribe to context request events. This approach enables dynamic, reactive context gathering based on the current state and request type.

## Core Concepts

### Context Events

```typescript
interface ContextRequestEvent {
  agent: Agent;
  requestType: "chat" | "completion" | "embedding";
  input: string | ChatInputMessage[];
  metadata: Map<string, any>;
  context: ContextAccumulator;
}

interface ContextAccumulator {
  system: ContextItem[];
  prior: ContextItem[];
  current: ContextItem[];
  
  add(item: ContextItem, position: "system" | "prior" | "current"): void;
  remove(predicate: (item: ContextItem) => boolean): void;
  getAll(): ContextItem[];
  estimateTokens(): number;
}
```

### Event Lifecycle

```
1. beforeContextGathering  → Initialize context accumulator
2. gatherSystemContext     → Collect system-level context
3. gatherPriorContext      → Collect conversation history
4. gatherCurrentContext    → Collect request-specific context
5. enrichContext           → Add metadata and scores
6. filterContext           → Remove irrelevant items
7. optimizeContext         → Apply token budgets
8. afterContextGathering   → Finalize context
```

## Implementation Details

### 1. Context Event Emitter

```typescript
class ContextEventEmitter extends EventEmitter {
  async gatherContext(
    input: string | ChatInputMessage[],
    agent: Agent
  ): Promise<ContextAccumulator> {
    const accumulator = new ContextAccumulator();
    const event: ContextRequestEvent = {
      agent,
      requestType: "chat",
      input,
      metadata: new Map(),
      context: accumulator
    };
    
    await this.emit("beforeContextGathering", event);
    await this.emit("gatherSystemContext", event);
    await this.emit("gatherPriorContext", event);
    await this.emit("gatherCurrentContext", event);
    await this.emit("enrichContext", event);
    await this.emit("filterContext", event);
    await this.emit("optimizeContext", event);
    await this.emit("afterContextGathering", event);
    
    return accumulator;
  }
}
```

### 2. Context Providers as Event Listeners

```typescript
class RAGContextProvider {
  constructor(
    private vectorDB: VectorDatabase,
    private contextEmitter: ContextEventEmitter
  ) {
    this.contextEmitter.on("gatherPriorContext", this.handleGatherContext);
  }
  
  private handleGatherContext = async (event: ContextRequestEvent) => {
    const query = this.extractQuery(event.input);
    const results = await this.vectorDB.search(query, { limit: 5 });
    
    for (const result of results) {
      event.context.add({
        content: result.content,
        metadata: {
          source: "rag",
          relevance: result.score,
          id: result.id
        }
      }, "prior");
    }
  };
}

class CodebaseContextProvider {
  constructor(
    private filesystem: FileSystem,
    private contextEmitter: ContextEventEmitter
  ) {
    this.contextEmitter.on("gatherCurrentContext", this.handleGatherContext);
  }
  
  private handleGatherContext = async (event: ContextRequestEvent) => {
    // Only add codebase context if relevant
    if (this.isCodeRelatedQuery(event.input)) {
      const files = await this.getRelevantFiles(event.agent);
      
      for (const file of files) {
        event.context.add({
          content: `File: ${file.path}\n${file.content}`,
          metadata: {
            source: "codebase",
            path: file.path
          }
        }, "current");
      }
    }
  };
}
```

### 3. Priority and Ordering

```typescript
class PrioritizedContextProvider {
  constructor(
    private priority: number,
    private contextEmitter: ContextEventEmitter
  ) {
    // Register with priority
    this.contextEmitter.on(
      "gatherPriorContext",
      this.handleGatherContext,
      { priority: this.priority }
    );
  }
}
```

### 4. Conditional Context Injection

```typescript
class ConditionalRAGProvider {
  constructor(private contextEmitter: ContextEventEmitter) {
    this.contextEmitter.on("gatherPriorContext", this.handleGatherContext);
  }
  
  private handleGatherContext = async (event: ContextRequestEvent) => {
    // Check if RAG is needed based on query type
    const needsRAG = await this.shouldUseRAG(event);
    
    if (!needsRAG) {
      event.agent.infoLine("Skipping RAG - not needed for this query");
      return;
    }
    
    // Gather RAG context
    const results = await this.searchVectorDB(event);
    
    for (const result of results) {
      event.context.add({
        content: result.content,
        metadata: { source: "rag", score: result.score }
      }, "prior");
    }
  };
  
  private async shouldUseRAG(event: ContextRequestEvent): Promise<boolean> {
    // Use lightweight classifier to determine if RAG is needed
    const query = this.extractQuery(event.input);
    return this.classifier.needsExternalKnowledge(query);
  }
}
```

### 5. Context Optimization Listener

```typescript
class TokenBudgetOptimizer {
  constructor(
    private maxTokens: number,
    private contextEmitter: ContextEventEmitter
  ) {
    this.contextEmitter.on("optimizeContext", this.handleOptimize);
  }
  
  private handleOptimize = async (event: ContextRequestEvent) => {
    const items = event.context.getAll();
    const tokenCount = event.context.estimateTokens();
    
    if (tokenCount <= this.maxTokens) return;
    
    // Sort by relevance and trim
    const sorted = items
      .map(item => ({
        item,
        score: item.metadata?.relevance ?? 0
      }))
      .sort((a, b) => b.score - a.score);
    
    let currentTokens = 0;
    const keep = new Set<ContextItem>();
    
    for (const {item} of sorted) {
      const itemTokens = this.estimateTokens(item.content);
      if (currentTokens + itemTokens <= this.maxTokens) {
        keep.add(item);
        currentTokens += itemTokens;
      }
    }
    
    // Remove items not in keep set
    event.context.remove(item => !keep.has(item));
  };
}
```

## RAG Integration

### Smart RAG Provider

```typescript
class SmartRAGProvider {
  constructor(
    private vectorDB: VectorDatabase,
    private contextEmitter: ContextEventEmitter
  ) {
    this.contextEmitter.on("gatherPriorContext", this.handleGatherContext);
    this.contextEmitter.on("enrichContext", this.handleEnrichContext);
  }
  
  private handleGatherContext = async (event: ContextRequestEvent) => {
    const query = this.extractQuery(event.input);
    
    // Parallel search across multiple collections
    const [codeResults, docsResults] = await Promise.all([
      this.vectorDB.search(query, { collection: "code", limit: 3 }),
      this.vectorDB.search(query, { collection: "docs", limit: 2 })
    ]);
    
    for (const result of [...codeResults, ...docsResults]) {
      event.context.add({
        content: result.content,
        metadata: {
          source: "rag",
          collection: result.collection,
          relevance: result.score,
          id: result.id
        }
      }, "prior");
    }
  };
  
  private handleEnrichContext = async (event: ContextRequestEvent) => {
    // Rerank RAG results based on full context
    const ragItems = event.context.getAll()
      .filter(item => item.metadata?.source === "rag");
    
    if (ragItems.length === 0) return;
    
    const reranked = await this.rerank(ragItems, event.input);
    
    // Update relevance scores
    for (let i = 0; i < ragItems.length; i++) {
      ragItems[i].metadata.relevance = reranked[i].score;
    }
  };
}
```

## Configuration

```typescript
// In agent config
export default {
  chat: {
    contextEvents: {
      enabled: true,
      providers: [
        { 
          type: "rag", 
          events: ["gatherPriorContext", "enrichContext"],
          priority: 10,
          config: { limit: 5 }
        },
        { 
          type: "codebase", 
          events: ["gatherCurrentContext"],
          priority: 20,
          conditional: true
        }
      ],
      optimizers: [
        { type: "token-budget", maxTokens: 100000 },
        { type: "deduplicator" }
      ]
    }
  }
};
```

## Commands

```bash
/context events list             # Show all event listeners
/context events enable rag       # Enable provider
/context events disable codebase # Disable provider
/context events priority rag 5   # Set priority
/context trace                   # Show event trace for last request
```

## Advantages

- **Reactive**: Context adapts to request type and state
- **Decoupled**: Providers don't need to know about each other
- **Extensible**: Easy to add new providers
- **Observable**: Event trace shows what happened
- **Conditional**: Providers can decide whether to contribute

## Disadvantages

- **Debugging**: Event flow can be hard to trace
- **Order Dependency**: Event order matters
- **Performance**: Multiple event emissions
- **Complexity**: Understanding event lifecycle

## Migration Path

1. Create ContextEventEmitter infrastructure
2. Wrap existing getContextItems in event listeners
3. Add new event-based providers
4. Migrate agents to event-driven context
5. Remove legacy context gathering

## File Changes

- `pkg/chat/events/ContextEventEmitter.ts` (new)
- `pkg/chat/events/ContextAccumulator.ts` (new)
- `pkg/chat/providers/` (new directory)
- `pkg/chat/commands/context.ts` (new)
- `pkg/chat/chatRequestBuilder/createChatRequest.ts` (modify)
