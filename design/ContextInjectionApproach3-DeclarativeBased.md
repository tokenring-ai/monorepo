# Context Injection Approach 3: Declarative Context Configuration

## Overview

Use a declarative configuration system where context requirements are specified upfront, and the system automatically gathers and assembles the required context. Similar to GraphQL queries but for context.

## Core Concepts

### Context Query Language

```typescript
interface ContextQuery {
  sources: ContextSource[];
  constraints?: ContextConstraints;
  transformations?: ContextTransformation[];
}

interface ContextSource {
  type: string;
  selector?: string;
  params?: Record<string, any>;
  position?: "system" | "prior" | "current";
}

interface ContextConstraints {
  maxTokens?: number;
  maxItems?: number;
  minRelevance?: number;
  deduplicate?: boolean;
}
```

### Example Query

```typescript
const contextQuery: ContextQuery = {
  sources: [
    { type: "system-prompt" },
    { type: "conversation-history", params: { last: 10 } },
    { 
      type: "rag", 
      selector: "semantic-search",
      params: { limit: 5, threshold: 0.7 }
    },
    { 
      type: "codebase", 
      selector: "files",
      params: { pattern: "*.ts" }
    }
  ],
  constraints: {
    maxTokens: 100000,
    deduplicate: true,
    minRelevance: 0.5
  },
  transformations: [
    { type: "sort-by-relevance" },
    { type: "format-markdown" }
  ]
};
```

## Implementation Details

### 1. Context Resolver

```typescript
class ContextResolver {
  private resolvers = new Map<string, SourceResolver>();
  
  registerResolver(type: string, resolver: SourceResolver): void;
  
  async resolve(query: ContextQuery, agent: Agent): Promise<ResolvedContext> {
    const items: ContextItem[] = [];
    
    for (const source of query.sources) {
      const resolver = this.resolvers.get(source.type);
      if (!resolver) continue;
      
      const resolved = await resolver.resolve(source, agent);
      items.push(...resolved);
    }
    
    return this.applyConstraints(items, query.constraints);
  }
}

interface SourceResolver {
  resolve(source: ContextSource, agent: Agent): Promise<ContextItem[]>;
}
```

### 2. Built-in Resolvers

```typescript
class RAGSourceResolver implements SourceResolver {
  constructor(private vectorDB: VectorDatabase) {}
  
  async resolve(source: ContextSource, agent: Agent): Promise<ContextItem[]> {
    const { limit = 5, threshold = 0.7 } = source.params ?? {};
    const query = this.extractQuery(agent);
    
    const results = await this.vectorDB.search(query, { limit, threshold });
    
    return results.map(r => ({
      content: r.content,
      position: source.position ?? "prior",
      metadata: {
        type: "rag",
        source: r.source,
        relevance: r.score
      }
    }));
  }
}

class CodebaseSourceResolver implements SourceResolver {
  async resolve(source: ContextSource, agent: Agent): Promise<ContextItem[]> {
    const { pattern = "*" } = source.params ?? {};
    const files = await this.findFiles(pattern, agent);
    
    return files.map(f => ({
      content: `File: ${f.path}\n${f.content}`,
      position: source.position ?? "prior",
      metadata: {
        type: "codebase",
        path: f.path
      }
    }));
  }
}
```

### 3. Agent Configuration

```typescript
// In agent config or per-request
export default {
  agents: {
    coder: {
      contextQuery: {
        sources: [
          { type: "system-prompt" },
          { type: "conversation-history" },
          { type: "rag", params: { limit: 5 } },
          { type: "codebase", params: { pattern: "**/*.ts" } }
        ],
        constraints: {
          maxTokens: 100000,
          deduplicate: true
        }
      }
    },
    writer: {
      contextQuery: {
        sources: [
          { type: "system-prompt" },
          { type: "conversation-history" },
          { type: "rag", selector: "articles", params: { limit: 3 } },
          { type: "research", params: { topics: ["current-topic"] } }
        ]
      }
    }
  }
};
```

### 4. Runtime Query Override

```typescript
// Override context query for specific request
await runChat({
  input: "Explain this code",
  contextQuery: {
    sources: [
      { type: "system-prompt" },
      { type: "codebase", selector: "current-file" },
      { type: "rag", params: { limit: 3, query: "code explanation" } }
    ],
    constraints: { maxTokens: 50000 }
  }
}, agent);
```

## RAG Integration

### RAG Query Syntax

```typescript
{
  type: "rag",
  selector: "semantic-search",
  params: {
    query?: string,           // Override query (default: current message)
    limit: 5,                 // Max results
    threshold: 0.7,           // Min similarity score
    collections: ["docs"],    // Specific collections
    filters: {                // Metadata filters
      language: "typescript",
      category: "tutorial"
    },
    rerank: true,            // Apply reranking
    includeMetadata: true    // Include source metadata
  }
}
```

### Multiple RAG Sources

```typescript
{
  sources: [
    { 
      type: "rag", 
      selector: "code-examples",
      params: { limit: 3, collections: ["code"] }
    },
    { 
      type: "rag", 
      selector: "documentation",
      params: { limit: 2, collections: ["docs"] }
    }
  ]
}
```

## Commands

```bash
/context query show              # Show current query
/context query add rag limit=5   # Add source to query
/context query remove rag        # Remove source
/context query set maxTokens=50000  # Set constraint
/context preview                 # Preview resolved context
```

## Advantages

- **Declarative**: Clear intent without implementation details
- **Composable**: Mix and match sources easily
- **Configurable**: Per-agent or per-request configuration
- **Predictable**: Same query = same context structure
- **Portable**: Queries can be saved and shared

## Disadvantages

- **Learning Curve**: New query language to learn
- **Limited Flexibility**: May not cover all edge cases
- **Abstraction Overhead**: Extra layer between intent and execution

## Migration Path

1. Create ContextResolver infrastructure
2. Implement resolvers for existing context sources
3. Add default queries for backward compatibility
4. Migrate agents to declarative queries
5. Deprecate imperative context gathering

## File Changes

- `pkg/chat/context/ContextResolver.ts` (new)
- `pkg/chat/context/resolvers/` (new directory)
- `pkg/chat/context/ContextQuery.ts` (new)
- `pkg/chat/commands/context.ts` (new)
- `pkg/chat/chatRequestBuilder/createChatRequest.ts` (modify)
- `pkg/chat/ChatService.ts` (modify)
