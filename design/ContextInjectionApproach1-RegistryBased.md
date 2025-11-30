# Context Injection Approach 1: Registry-Based Context Providers

## Overview

Implement a centralized registry system where context providers are explicitly registered, managed, and prioritized. This approach replaces the implicit service iteration with an explicit provider registration pattern.

## Core Concepts

### Context Provider Interface

```typescript
interface ContextProvider {
  name: string;
  priority: number; // Lower = higher priority
  position: "system" | "prior" | "current";
  enabled: boolean;
  
  getContext(agent: Agent): Promise<ContextItem[]>;
  estimateTokens?(agent: Agent): Promise<number>;
}

interface ContextItem {
  content: string;
  metadata?: {
    source: string;
    timestamp?: number;
    relevance?: number;
  };
}
```

### Context Registry Service

```typescript
class ContextRegistry implements TokenRingService {
  private providers = new Map<string, ContextProvider>();
  
  register(provider: ContextProvider): void;
  unregister(name: string): void;
  enable(name: string, agent: Agent): void;
  disable(name: string, agent: Agent): void;
  getProviders(agent: Agent): ContextProvider[];
  getContext(agent: Agent): Promise<ContextItem[]>;
}
```

## Implementation Details

### 1. Provider Registration

Services register context providers during initialization:

```typescript
// In a service's attach() method
const contextRegistry = agent.requireServiceByType(ContextRegistry);
contextRegistry.register({
  name: "codebase/files",
  priority: 10,
  position: "prior",
  enabled: true,
  getContext: async (agent) => {
    // Return context items
  }
});
```

### 2. Agent State Management

```typescript
class ContextRegistryState implements AgentStateSlice {
  enabledProviders: Set<string>;
  providerSettings: Map<string, any>;
}
```

### 3. Context Building

```typescript
async function buildContext(agent: Agent): Promise<{
  system: ContextItem[];
  prior: ContextItem[];
  current: ContextItem[];
}> {
  const registry = agent.requireServiceByType(ContextRegistry);
  const providers = registry.getProviders(agent)
    .filter(p => p.enabled)
    .sort((a, b) => a.priority - b.priority);
  
  const context = { system: [], prior: [], current: [] };
  
  for (const provider of providers) {
    const items = await provider.getContext(agent);
    context[provider.position].push(...items);
  }
  
  return context;
}
```

## RAG Integration

### RAG Context Provider

```typescript
class RAGContextProvider implements ContextProvider {
  name = "rag/semantic-search";
  priority = 5;
  position = "prior";
  enabled = true;
  
  constructor(
    private vectorDB: VectorDatabase,
    private embeddings: EmbeddingService
  ) {}
  
  async getContext(agent: Agent): Promise<ContextItem[]> {
    const query = this.extractQuery(agent);
    const results = await this.vectorDB.search(query, { limit: 5 });
    
    return results.map(r => ({
      content: r.content,
      metadata: {
        source: "rag",
        relevance: r.score
      }
    }));
  }
}
```

## Commands

```bash
/context list                    # Show all providers
/context enable rag/semantic     # Enable specific provider
/context disable codebase/files  # Disable provider
/context priority rag/semantic 5 # Set priority
/context show                    # Preview current context
```

## Advantages

- **Explicit Management**: Clear visibility of all context sources
- **Prioritization**: Control order of context injection
- **Selective Enabling**: Enable/disable providers per agent
- **Token Estimation**: Providers can estimate token usage
- **Metadata Tracking**: Track source and relevance of context

## Disadvantages

- **Migration Effort**: Requires updating all services with getContextItems
- **Boilerplate**: More code to register providers
- **Complexity**: Additional abstraction layer

## Migration Path

1. Create ContextRegistry service
2. Add backward compatibility for getContextItems
3. Migrate services one by one
4. Deprecate getContextItems pattern
5. Remove legacy code

## File Changes

- `pkg/chat/ContextRegistry.ts` (new)
- `pkg/chat/state/ContextRegistryState.ts` (new)
- `pkg/chat/commands/context.ts` (new)
- `pkg/chat/chatRequestBuilder/createChatRequest.ts` (modify)
- `pkg/chat/ChatService.ts` (modify)
