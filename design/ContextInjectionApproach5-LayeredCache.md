# Context Injection Approach 5: Layered Cache-Based Context Management

## Overview

Implement a multi-layered caching system where context is organized into layers (static, semi-static, dynamic) with different refresh rates and priorities. This approach optimizes for performance and token efficiency by caching and reusing context intelligently.

## Core Concepts

### Context Layers

```typescript
enum ContextLayer {
  STATIC = "static",           // System prompts, rarely changes
  SEMI_STATIC = "semi-static", // Codebase, docs, changes occasionally
  DYNAMIC = "dynamic",         // RAG results, changes per request
  EPHEMERAL = "ephemeral"      // Current request, never cached
}

interface LayeredContext {
  layers: Map<ContextLayer, CachedContextLayer>;
  
  getLayer(layer: ContextLayer): CachedContextLayer;
  invalidate(layer: ContextLayer): void;
  refresh(layer: ContextLayer): Promise<void>;
  assemble(): Promise<ContextItem[]>;
}
```

### Cached Context Layer

```typescript
interface CachedContextLayer {
  layer: ContextLayer;
  items: ContextItem[];
  metadata: {
    createdAt: number;
    lastAccessed: number;
    accessCount: number;
    tokenCount: number;
    ttl: number; // Time to live in ms
  };
  
  isValid(): boolean;
  refresh(agent: Agent): Promise<void>;
  getItems(): ContextItem[];
}
```

## Implementation Details

### 1. Context Cache Manager

```typescript
class ContextCacheManager implements TokenRingService {
  private caches = new Map<string, LayeredContext>();
  
  getOrCreate(agentId: string): LayeredContext {
    if (!this.caches.has(agentId)) {
      this.caches.set(agentId, new LayeredContext());
    }
    return this.caches.get(agentId)!;
  }
  
  async assembleContext(agent: Agent): Promise<ContextItem[]> {
    const cache = this.getOrCreate(agent.id);
    
    // Check and refresh stale layers
    for (const layer of Object.values(ContextLayer)) {
      const cachedLayer = cache.getLayer(layer);
      if (!cachedLayer.isValid()) {
        await cachedLayer.refresh(agent);
      }
    }
    
    return cache.assemble();
  }
  
  invalidateLayer(agentId: string, layer: ContextLayer): void {
    const cache = this.caches.get(agentId);
    if (cache) {
      cache.invalidate(layer);
    }
  }
}
```

### 2. Layer Implementations

```typescript
class StaticContextLayer implements CachedContextLayer {
  layer = ContextLayer.STATIC;
  items: ContextItem[] = [];
  metadata = {
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    accessCount: 0,
    tokenCount: 0,
    ttl: Infinity // Never expires
  };
  
  isValid(): boolean {
    return this.items.length > 0;
  }
  
  async refresh(agent: Agent): Promise<void> {
    // Load system prompt
    const chatService = agent.requireServiceByType(ChatService);
    const config = chatService.getChatConfig(agent);
    
    this.items = [{
      content: typeof config.systemPrompt === "function" 
        ? config.systemPrompt() 
        : config.systemPrompt,
      metadata: { layer: "static", type: "system-prompt" }
    }];
    
    this.metadata.createdAt = Date.now();
    this.metadata.tokenCount = this.estimateTokens();
  }
  
  getItems(): ContextItem[] {
    this.metadata.lastAccessed = Date.now();
    this.metadata.accessCount++;
    return this.items;
  }
}

class SemiStaticContextLayer implements CachedContextLayer {
  layer = ContextLayer.SEMI_STATIC;
  items: ContextItem[] = [];
  metadata = {
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    accessCount: 0,
    tokenCount: 0,
    ttl: 5 * 60 * 1000 // 5 minutes
  };
  
  isValid(): boolean {
    const age = Date.now() - this.metadata.createdAt;
    return this.items.length > 0 && age < this.metadata.ttl;
  }
  
  async refresh(agent: Agent): Promise<void> {
    // Load codebase context, documentation, etc.
    const items: ContextItem[] = [];
    
    // Gather from services that provide semi-static context
    for (const service of agent.app.getServices()) {
      if (service.getSemiStaticContext) {
        const serviceItems = await service.getSemiStaticContext(agent);
        items.push(...serviceItems);
      }
    }
    
    this.items = items;
    this.metadata.createdAt = Date.now();
    this.metadata.tokenCount = this.estimateTokens();
  }
  
  getItems(): ContextItem[] {
    this.metadata.lastAccessed = Date.now();
    this.metadata.accessCount++;
    return this.items;
  }
}

class DynamicContextLayer implements CachedContextLayer {
  layer = ContextLayer.DYNAMIC;
  items: ContextItem[] = [];
  metadata = {
    createdAt: Date.now(),
    lastAccessed: Date.now(),
    accessCount: 0,
    tokenCount: 0,
    ttl: 30 * 1000 // 30 seconds
  };
  
  constructor(private vectorDB: VectorDatabase) {}
  
  isValid(): boolean {
    const age = Date.now() - this.metadata.createdAt;
    return this.items.length > 0 && age < this.metadata.ttl;
  }
  
  async refresh(agent: Agent): Promise<void> {
    // Load RAG results based on recent conversation
    const chatService = agent.requireServiceByType(ChatService);
    const recentMessages = chatService.getChatMessages(agent).slice(-3);
    
    const query = this.extractQuery(recentMessages);
    const results = await this.vectorDB.search(query, { limit: 5 });
    
    this.items = results.map(r => ({
      content: r.content,
      metadata: {
        layer: "dynamic",
        type: "rag",
        relevance: r.score,
        source: r.source
      }
    }));
    
    this.metadata.createdAt = Date.now();
    this.metadata.tokenCount = this.estimateTokens();
  }
  
  getItems(): ContextItem[] {
    this.metadata.lastAccessed = Date.now();
    this.metadata.accessCount++;
    return this.items;
  }
}
```

### 3. Smart Cache Invalidation

```typescript
class SmartCacheInvalidator {
  constructor(private cacheManager: ContextCacheManager) {
    // Listen for events that should invalidate cache
    this.setupInvalidationListeners();
  }
  
  private setupInvalidationListeners(): void {
    // Invalidate semi-static when files change
    agent.on("fileChanged", (event) => {
      this.cacheManager.invalidateLayer(event.agentId, ContextLayer.SEMI_STATIC);
    });
    
    // Invalidate dynamic when conversation context changes significantly
    agent.on("topicChanged", (event) => {
      this.cacheManager.invalidateLayer(event.agentId, ContextLayer.DYNAMIC);
    });
    
    // Invalidate static when config changes
    agent.on("configChanged", (event) => {
      this.cacheManager.invalidateLayer(event.agentId, ContextLayer.STATIC);
    });
  }
}
```

### 4. Token Budget Optimization

```typescript
class LayeredTokenBudget {
  constructor(
    private maxTokens: number,
    private layerBudgets: Map<ContextLayer, number>
  ) {}
  
  async optimizeContext(
    layeredContext: LayeredContext
  ): Promise<ContextItem[]> {
    const items: ContextItem[] = [];
    let remainingBudget = this.maxTokens;
    
    // Allocate tokens by layer priority
    const layerOrder = [
      ContextLayer.STATIC,
      ContextLayer.EPHEMERAL,
      ContextLayer.DYNAMIC,
      ContextLayer.SEMI_STATIC
    ];
    
    for (const layer of layerOrder) {
      const budget = this.layerBudgets.get(layer) ?? remainingBudget;
      const layerItems = layeredContext.getLayer(layer).getItems();
      
      const selected = this.selectItemsWithinBudget(
        layerItems,
        Math.min(budget, remainingBudget)
      );
      
      items.push(...selected);
      remainingBudget -= this.estimateTokens(selected);
      
      if (remainingBudget <= 0) break;
    }
    
    return items;
  }
}
```

## RAG Integration

### RAG Cache Layer

```typescript
class RAGCacheLayer implements CachedContextLayer {
  layer = ContextLayer.DYNAMIC;
  private queryCache = new Map<string, ContextItem[]>();
  
  constructor(
    private vectorDB: VectorDatabase,
    private config: {
      ttl: number;
      maxCacheSize: number;
      cacheStrategy: "lru" | "lfu" | "relevance";
    }
  ) {}
  
  async refresh(agent: Agent): Promise<void> {
    const query = this.extractCurrentQuery(agent);
    const cacheKey = this.hashQuery(query);
    
    // Check query cache first
    if (this.queryCache.has(cacheKey)) {
      const cached = this.queryCache.get(cacheKey)!;
      if (this.isCacheValid(cached)) {
        this.items = cached;
        return;
      }
    }
    
    // Fetch from vector DB
    const results = await this.vectorDB.search(query, { limit: 5 });
    
    this.items = results.map(r => ({
      content: r.content,
      metadata: {
        layer: "dynamic",
        type: "rag",
        relevance: r.score,
        cachedAt: Date.now()
      }
    }));
    
    // Update query cache
    this.queryCache.set(cacheKey, this.items);
    this.pruneCache();
  }
  
  private pruneCache(): void {
    if (this.queryCache.size <= this.config.maxCacheSize) return;
    
    // Prune based on strategy
    if (this.config.cacheStrategy === "lru") {
      this.pruneLRU();
    } else if (this.config.cacheStrategy === "relevance") {
      this.pruneByRelevance();
    }
  }
}
```

### Hybrid Cache Strategy

```typescript
class HybridRAGCache {
  private memoryCache: Map<string, ContextItem[]>;
  private diskCache: DiskCache;
  
  async get(query: string): Promise<ContextItem[] | null> {
    // Check memory first
    if (this.memoryCache.has(query)) {
      return this.memoryCache.get(query)!;
    }
    
    // Check disk cache
    const diskResult = await this.diskCache.get(query);
    if (diskResult) {
      // Promote to memory cache
      this.memoryCache.set(query, diskResult);
      return diskResult;
    }
    
    return null;
  }
  
  async set(query: string, items: ContextItem[]): Promise<void> {
    // Write to both caches
    this.memoryCache.set(query, items);
    await this.diskCache.set(query, items);
  }
}
```

## Configuration

```typescript
// In agent config
export default {
  chat: {
    contextCache: {
      enabled: true,
      layers: {
        static: {
          ttl: Infinity,
          providers: ["system-prompt"]
        },
        semiStatic: {
          ttl: 300000, // 5 minutes
          providers: ["codebase", "documentation"]
        },
        dynamic: {
          ttl: 30000, // 30 seconds
          providers: ["rag"],
          cacheStrategy: "relevance",
          maxCacheSize: 100
        }
      },
      tokenBudget: {
        total: 100000,
        byLayer: {
          static: 5000,
          semiStatic: 30000,
          dynamic: 20000,
          ephemeral: 45000
        }
      }
    }
  }
};
```

## Commands

```bash
/context cache show              # Show cache status
/context cache invalidate static # Invalidate layer
/context cache clear             # Clear all caches
/context cache stats             # Show cache statistics
/context cache config ttl=60000  # Configure cache
```

## Advantages

- **Performance**: Reuse expensive context gathering operations
- **Token Efficiency**: Smart budget allocation across layers
- **Scalability**: Handles large context efficiently
- **Predictable**: Clear cache invalidation rules
- **Observable**: Cache statistics and hit rates

## Disadvantages

- **Complexity**: Multiple cache layers to manage
- **Memory Usage**: Caching consumes memory
- **Staleness**: Risk of using outdated context
- **Debugging**: Cache issues can be subtle

## Migration Path

1. Create ContextCacheManager infrastructure
2. Implement basic single-layer cache
3. Add multi-layer support
4. Migrate context providers to use cache
5. Add smart invalidation
6. Optimize token budgets

## File Changes

- `pkg/chat/cache/ContextCacheManager.ts` (new)
- `pkg/chat/cache/layers/` (new directory)
- `pkg/chat/cache/CachedContextLayer.ts` (new)
- `pkg/chat/cache/LayeredContext.ts` (new)
- `pkg/chat/commands/context.ts` (new)
- `pkg/chat/chatRequestBuilder/createChatRequest.ts` (modify)
