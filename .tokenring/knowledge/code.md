# TokenRing AI Monorepo Knowledge Base

## Overview

The TokenRing AI monorepo is a comprehensive TypeScript ecosystem containing 50+ packages organized around a modular, agent-centric architecture. It hosts two flagship applications: **TokenRing Coder** (AI-powered development assistant) and **TokenRing Writer** (content creation platform). Built as a monorepo using Bun, it provides pluggable packages under the `@tokenring-ai/*` scope for modular AI agent functionality.

## Table of Contents

1. [Monorepo Structure](#monorepo-structure)
2. [Core Architecture Patterns](#core-architecture-patterns)
3. [Agent System](#agent-system)
4. [Package Categories](#package-categories)
5. [Development Workflows](#development-workflows)
6. [Testing Framework](#testing-framework)
7. [Integration Patterns](#integration-patterns)
8. [Context Management](#context-management)
9. [State Management](#state-management)
10. [Development Guidelines](#development-guidelines)

## Monorepo Structure

```
tokenring/
├── app/                    # Applications
│   ├── coder/             # TokenRing Coder (AI-powered development assistant)
│   └── writer/            # TokenRing Writer (content creation platform)
├── pkg/                   # Packages (50+ specialized packages)
│   ├── agent/            # Core agent system
│   ├── ai-client/        # AI integration with multi-provider support
│   ├── filesystem/       # Abstract filesystem interface
│   ├── git/              # Git operations with auto-commit
│   ├── testing/          # Agent testing framework
│   ├── codebase/         # Codebase context injection
│   ├── queue/            # Task queuing with checkpoints
│   ├── memory/           # Short-term memory storage
│   └── [40+ more packages]
├── design/               # Architecture design documents
├── deps/                 # External dependencies
├── docker/              # Docker configurations
└── docs/                # Documentation
```

### Package Structure Patterns

Each package follows a consistent structure:

```
pkg/package-name/
├── index.ts              # Main entry point
├── README.md             # Package documentation
├── package.json          # Package metadata
├── tsconfig.json         # TypeScript configuration
├── src/                  # Source code (if present)
├── tools/                # AI tools
├── commands/             # Chat commands
├── hooks/                # Lifecycle hooks
├── state/                # State slices
└── test/                 # Test files
```

## Core Architecture Patterns

### 1. Agent-Centric Design

The entire ecosystem revolves around **agents** that can execute commands, use tools, run hooks, maintain state, and communicate through asynchronous events.

**Key Components:**
- **AgentTeam**: Central orchestrator managing agents, packages, and shared registries
- **Agent**: Individual AI agent with state management, event emission, and command processing
- **Services**: Shared functionality registered with agents
- **Tools**: Executable capabilities that agents can use
- **Commands**: Interactive slash commands for agent interaction
- **Hooks**: Lifecycle automation points

### 2. Service Registration Pattern

All packages implement the `TokenRingService` interface and register themselves with the agent system:

```typescript
class PackageService implements TokenRingService {
  name = "package-service";
  description = "Service description";
  
  async attach(agent: Agent): Promise<void> {
    // Register tools
    agent.tools.register("tool-name", toolDefinition);
    
    // Register commands
    agent.commands.register("command-name", commandDefinition);
    
    // Add context providers
    agent.contextProviders.add(this);
  }
}
```

### 3. Registry-Based Architecture

The system uses typed registries for managing components:

```typescript
// AgentTeam registries
- packages: TokenRing packages
- services: Shared services (typed registry)
- chatCommands: Chat commands
- tools: Available tools
- hooks: Lifecycle hooks
```

### 4. Event-Driven Communication

Agents communicate via an event system:

```typescript
// Agent events
agent.events(signal).forEach(event => {
  switch (event.type) {
    case 'output.chat':
      console.log('Chat:', event.data.content);
      break;
    case 'state.busy':
      console.log('Agent busy:', event.data.message);
      break;
    case 'human.request':
      handleHumanInput(event.data);
      break;
  }
});
```

## Agent System

### Agent Types

#### Interactive Agents
- Direct user interaction
- Real-time event streaming
- Human input requests

#### Background Agents
- Autonomous operation
- Task queue processing
- Monitoring and automation

### Agent Configuration

```typescript
const agentConfig: AgentConfig = {
  name: "specialistAgent",
  description: "Specialized development agent",
  visual: { color: "blue" },
  ai: {
    systemPrompt: "You are a specialist...",
    temperature: 0.7,
    maxTokens: 4000
  },
  type: "interactive",
  persistent: true
};
```

### Core Agent Methods

```typescript
// State Management
agent.initializeState(MyStateSlice, {});
agent.mutateState(MyStateSlice, state => state.update());
const checkpoint = agent.generateCheckpoint();

// Event Handling
for await (const event of agent.events(signal)) {
  // Handle events
}

// Input Processing
await agent.handleInput({ message: "Your request" });

// Human Interaction
await agent.askHuman(request);
agent.sendHumanResponse(sequence, response);
```

## Package Categories

### Core Foundation (7 packages)

- **@tokenring-ai/agent**: Central orchestrator for AI agents
- **@tokenring-ai/ai-client**: Unified AI client with multi-provider support
- **@tokenring-ai/utility**: Shared utilities and helpers
- **@tokenring-ai/filesystem**: Abstract filesystem interface
- **@tokenring-ai/memory**: Short-term memory and attention storage
- **@tokenring-ai/queue**: Task queuing with checkpoint preservation
- **@tokenring-ai/checkpoint**: Agent state persistence abstraction

### Storage & Database (7 packages)

- **@tokenring-ai/database**: Abstract database layer
- **@tokenring-ai/mysql**: MySQL integration
- **@tokenring-ai/sqlite-storage**: SQLite for checkpoints
- **@tokenring-ai/s3**: AWS S3 integration
- **@tokenring-ai/cdn**: Abstract CDN service
- **@tokenring-ai/checkpoint**: Agent state persistence
- **@tokenring-ai/drizzle-storage**: Multi-database ORM

### Development Tools (10 packages)

- **@tokenring-ai/testing**: Agent testing framework with auto-repair
- **@tokenring-ai/git**: Git operations with auto-commit
- **@tokenring-ai/javascript**: ESLint, package management
- **@tokenring-ai/codebase**: Codebase context injection
- **@tokenring-ai/code-watch**: AI comment-triggered modifications
- **@tokenring-ai/file-index**: Semantic file search with Tree-sitter
- **@tokenring-ai/iterables**: Batch processing with /foreach command
- **@tokenring-ai/scripting**: Scripting language with variables and functions
- **@tokenring-ai/tasks**: Multi-agent workflow orchestration
- **@tokenring-ai/memory**: Context memory management

### Web & External Services (11 packages)

- **@tokenring-ai/websearch**: Abstract web search interface
- **@tokenring-ai/serper**: Google search via Serper.dev
- **@tokenring-ai/scraperapi**: Web scraping and SERP results
- **@tokenring-ai/chrome**: Puppeteer browser automation
- **@tokenring-ai/wikipedia**: Wikipedia API integration
- **@tokenring-ai/aws**: AWS STS/S3 clients
- **@tokenring-ai/docker**: Docker container management
- **@tokenring-ai/kubernetes**: Kubernetes resource discovery
- **@tokenring-ai/sandbox**: Abstract sandbox interface
- **@tokenring-ai/mcp**: Model Context Protocol client
- **@tokenring-ai/research**: Research tools and workflows

### Communication & Publishing (8 packages)

- **@tokenring-ai/slack**: Slack bot integration
- **@tokenring-ai/telegram**: Telegram bot integration
- **@tokenring-ai/feedback**: Human feedback tools
- **@tokenring-ai/blog**: Blog abstraction layer
- **@tokenring-ai/ghost-io**: Ghost.io publishing integration
- **@tokenring-ai/wordpress**: WordPress publishing integration
- **@tokenring-ai/newsrpm**: NewsRPM article management
- **@tokenring-ai/reddit**: Reddit integration

### Audio & Media (2 packages)

- **@tokenring-ai/audio**: Abstract audio framework
- **@tokenring-ai/linux-audio**: Linux audio implementation with naudiodon2

### UI & Frontend (5 packages)

- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-host**: Fastify-based web server
- **@tokenring-ai/web-frontend**: React frontend with CLI-style interface
- **@tokenring-ai/agent-api**: WebSocket API for real-time communication

## Development Workflows

### Agent-Centric Development

1. **Create Agent Team**
   ```typescript
   const team = new AgentTeam();
   await team.addPackages([packageInfo]);
   const agent = await team.createAgent('agent-type');
   ```

2. **Process Input**
   ```typescript
   const controller = new AbortSignal();
   for await (const event of agent.events(controller)) {
     // Handle events
   }
   await agent.handleInput({ message: "Your request" });
   ```

3. **State Management**
   ```typescript
   agent.initializeState(MyStateSlice, {});
   agent.mutateState(MyStateSlice, state => state.update());
   const checkpoint = agent.generateCheckpoint();
   ```

### Multi-Agent Orchestration

```typescript
// Create specialized agents
const frontendAgent = await team.createAgent('frontendDesign');
const backendAgent = await team.createAgent('backendDesign');
const testAgent = await team.createAgent('testEngineer');

// Coordinate workflows
await testAgent.handleInput({ message: "Run tests for new feature" });
await backendAgent.handleInput({ message: "Implement API endpoints" });
await frontendAgent.handleInput({ message: "Build user interface" });
```

### Workflow Automation

- **Scripting**: Variables, functions, and control flow
- **Tasks**: Multi-step workflow orchestration
- **Iterables**: Batch processing with `/foreach`
- **Hooks**: Lifecycle automation (auto-test, auto-repair)

## Testing Framework

### Testing Framework Architecture

```typescript
// Register testing resources
const shellResource = new ShellCommandTestingResource({
  name: 'build-test',
  command: 'npm run build',
  workingDirectory: './project'
});

testingService.registerResource(shellResource, 'build-test');
testingService.enableResources(['build-test']);

// Execute tests
const results = await testingService.runTests({}, agent);
```

### Automated Testing Patterns

1. **Auto-Test Hook**
   ```typescript
   // Runs after file modifications
   async function afterChatComplete(agent: Agent): Promise<void> {
     if (fsService.getDirty()) {
       await testingService.runTests({}, agent);
     }
   }
   ```

2. **Auto-Repair Hook**
   ```typescript
   // Queues repair tasks for failures
   async function afterTesting(agent: Agent): Promise<void> {
     if (!testingService.allTestsPassed(agent)) {
       await queueService.enqueueRepairTask(agent);
     }
   }
   ```

3. **Repair Agent**
   ```typescript
   const repairAgent = await team.createAgent('codeRepair');
   await repairAgent.handleInput({ 
     message: `Fix test failures: ${failureDetails}` 
   });
   ```

### Testing Commands

- `/test [name|all]` - Run tests
- `/repair [--modify code|test|either]` - Auto-repair failures
- Interactive test selection and configuration

## Integration Patterns

### Service Integration

```typescript
class ServiceIntegration {
  async attach(agent: Agent): Promise<void> {
    // Access other services
    const fsService = agent.requireServiceByType(FileSystemService);
    const aiService = agent.requireServiceByType(AIService);
    
    // Register with agent team
    agent.team.addService(this);
  }
}
```

### Tool Integration

```typescript
const toolDefinition = {
  name: "custom-tool",
  description: "Custom tool description",
  inputSchema: z.object({
    param1: z.string(),
    param2: z.number()
  }),
  execute: async (input, agent) => {
    // Tool implementation
  }
};
```

### Command Integration

```typescript
const commandDefinition = {
  description: "Custom command description",
  execute: async (remainder: string, agent) => {
    // Command implementation
  },
  help: () => "Command usage information"
};
```

## Context Management

### Context Injection Patterns

The codebase implements three approaches for context management:

#### 1. Registry-Based (Approach 1)
```typescript
// Explicit provider registration
contextRegistry.register({
  name: "codebase/files",
  priority: 10,
  position: "prior",
  enabled: true,
  getContext: async (agent) => {
    return await gatherCodebaseContext(agent);
  }
});
```

#### 2. Pipeline-Based (Approach 2)
```typescript
// Pipeline assembly
const pipeline = new ContextPipelineBuilder()
  .collect(new SystemPromptCollector())
  .collect(new PriorMessagesCollector())
  .enrich(new RelevanceScorer())
  .filter(new TokenBudgetFilter(100000))
  .build();
```

#### 3. Declarative (Approach 3)
```typescript
// Declarative configuration
const contextQuery = {
  sources: [
    { type: "system-prompt" },
    { type: "conversation-history", params: { last: 10 } },
    { type: "rag", params: { limit: 5 } }
  ],
  constraints: { maxTokens: 100000 }
};
```

### RAG Integration

```typescript
class RAGContextProvider implements ContextProvider {
  async getContext(agent: Agent): Promise<ContextItem[]> {
    const query = extractQuery(agent);
    const results = await vectorDB.search(query, { limit: 5 });
    
    return results.map(r => ({
      content: r.content,
      metadata: {
        source: "rag",
        relevance: r.score,
        source: r.source
      }
    }));
  }
}
```

## State Management

### State Slices

```typescript
class CustomState implements StateSlice {
  name = 'CustomState';
  data: any[] = [];
  
  reset(what: ResetWhat[]): void {
    if (what.includes('chat')) {
      this.data = [];
    }
  }
  
  serialize(): object {
    return { data: this.data };
  }
  
  deserialize(obj: any): void {
    this.data = obj.data || [];
  }
}

// Usage in agent
agent.initializeState(CustomState, {});
agent.mutateState(CustomState, state => {
  state.data.push(newItem);
});
```

### Checkpointing

```typescript
// Generate checkpoint
const checkpoint = agent.generateCheckpoint();

// Restore from checkpoint
agent.restoreState(checkpoint.state);

// Persistence across sessions
const storage = new SQLiteAgentStateStorage();
await storage.saveCheckpoint(agentId, checkpoint);
const savedCheckpoint = await storage.loadCheckpoint(agentId);
```

### Memory Management

```typescript
// Short-term memory
await memoryService.addMemory({
  content: "User prefers TypeScript",
  type: "preference",
  relevance: 0.8
}, agent);

// Attention management
await attentionService.addAttention({
  content: "Current task focus",
  priority: 1.0
}, agent);

// Memory retrieval
const memories = await memoryService.getMemories(agent);
```

## Key Architectural Principles

### 1. Modularity
- Each package is self-contained with clear interfaces
- Minimal dependencies between packages
- Plugin architecture for extensibility

### 2. Agent-Centric
- All functionality exposed through agents
- Uniform interface across packages
- Event-driven communication

### 3. Type Safety
- Full TypeScript coverage with strict mode
- Zod schema validation for runtime type checking
- Comprehensive type definitions

### 4. Event-Driven
- Async generator patterns for events
- Decoupled component communication
- Reactive architecture

### 5. Pluggable
- Multiple provider support (AI, storage, etc.)
- Swap implementations without code changes
- Configuration-driven behavior

### 6. Testable
- Comprehensive testing framework
- Auto-repair capabilities
- Mock-friendly design

## Development Guidelines

### Code Style
- Consistent naming conventions
- Comprehensive error handling
- Async/await patterns throughout
- Proper resource cleanup
- ES modules architecture (`"type": "module"`)

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Naming Conventions
- **Packages**: `@tokenring-ai/{name}` with kebab-case naming
- **Services**: `{Name}Service` suffix for service classes
- **Tools**: `{Action}` format (e.g., `commitTool`, `rollbackTool`)
- **Commands**: Lowercase with forward slash prefix (e.g., `/git`, `/test`)
- **Agents**: CamelCase descriptive names (e.g., `teamLeader`, `contentWriter`)

### Testing Strategy
- Unit tests for individual components
- Integration tests for service interactions
- End-to-end tests for workflows
- Auto-repair for test failures
- Vitest testing framework

### Documentation
- README files for each package
- TypeScript interfaces for APIs
- Usage examples and patterns
- Architecture decision records

## Cross-Package Interactions

The ecosystem is agent-centric: `@tokenring-ai/agent` is the hub, registering tools/commands/services from other packages via registries. Key interactions include:

### Agent Workflow
- Agent uses `@tokenring-ai/ai-client` for LLM calls
- Uses `@tokenring-ai/filesystem` for file operations
- Uses `@tokenring-ai/memory` for context
- Uses `@tokenring-ai/queue` for batching

### Dev Pipeline
- `@tokenring-ai/code-watch` detects changes
- Triggers agent with `@tokenring-ai/javascript` (ESLint)
- Runs `@tokenring-ai/testing` (tests)
- Auto-commits via `@tokenring-ai/git` if passing

### Search/Integrations
- `@tokenring-ai/websearch` with providers
- `@tokenring-ai/file-index` searches codebase internally
- Results fed to agent context

### Infra/Storage
- `@tokenring-ai/sandbox` via `@tokenring-ai/docker` for execution
- `@tokenring-ai/database` with `@tokenring-ai/mysql` for queries
- `@tokenring-ai/aws` for cloud operations
- `@tokenring-ai/checkpoint` with `@tokenring-ai/sqlite-storage` for persistence

### UI Flow
- `@tokenring-ai/cli` runs REPL with `@tokenring-ai/inquirer-*` prompts
- `@tokenring-ai/feedback` for human reviews

### Workflow Automation
- `@tokenring-ai/scripting` enables reusable command sequences
- `@tokenring-ai/tasks` orchestrates multi-agent workflows
- `@tokenring-ai/iterables` provides batch processing

## Available Agents

### Coder Agents
- **teamLeader** - Orchestrates full-stack projects
- **fullStackDeveloper** - Implements complete features
- **frontendDesign** - React/Vue components and UI
- **backendDesign** - Server-side logic and APIs
- **testEngineer** - Testing and quality assurance
- **devopsEngineer** - CI/CD and infrastructure
- **securityReview** - Security assessments

### Writer Agents
- **contentWriter** - Creates engaging articles and blog posts
- **managingEditor** - Coordinates content creation and assignments
- **researcher** - Gathers information and sources
- **publisher** - Manages publishing workflows

## Configuration

Both applications use `.tokenring/` directory for configuration:

### Coder Configuration (`.tokenring/coder-config.mjs`)
```javascript
export default {
  defaults: {
    agent: "teamLeader",
    model: "gpt-4o"
  },
  models: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1"
    }
  },
  storage: {
    type: "drizzle",
    providers: { sqlite: { file: "./data/tokenring.db" } }
  }
};
```

### Writer Configuration (`.tokenring/writer-config.js`)
```javascript
export default {
  defaults: {
    agent: "contentWriter",
    model: "gpt-4o"
  },
  publishing: {
    ghost: {
      url: process.env.GHOST_URL,
      adminApiKey: process.env.GHOST_ADMIN_KEY
    }
  }
};
```

## Multi-Provider AI Support

- **OpenAI** (GPT-4, GPT-3.5) - Chat, embeddings, images, speech, transcription
- **Anthropic** (Claude 3) - Chat completion
- **Google** (Gemini) - Chat and image generation
- **xAI** (Grok) - Chat and image generation
- **DeepSeek** - Chat completion
- **Groq** - Fast inference with Llama models
- **Cerebras** - Ultra-fast inference
- **Perplexity** - Web search integration
- **Azure** - Azure OpenAI Service
- **Ollama** - Local models
- **OpenRouter** - Access to many providers
- **Fal** - Image generation

## Conclusion

The TokenRing AI monorepo demonstrates a sophisticated approach to building AI-powered development tools through a modular, agent-centric architecture. Its patterns and practices provide a solid foundation for building extensible AI systems with strong typing, comprehensive testing, and flexible integration capabilities.

Key strengths include:
- **Clear separation of concerns** through package-based architecture
- **Robust agent system** with event-driven communication
- **Comprehensive testing** with auto-repair capabilities
- **Flexible integration** through well-defined interfaces
- **Type-safe development** with full TypeScript coverage

This knowledge base serves as a reference for understanding and extending the TokenRing AI ecosystem.# TokenRing AI Monorepo Knowledge Base

## Overview

The TokenRing AI monorepo is a comprehensive TypeScript ecosystem containing 50+ packages organized around a modular, agent-centric architecture. It hosts two flagship applications: **TokenRing Coder** (AI-powered development assistant) and **TokenRing Writer** (content creation platform). Built as a monorepo using Bun, it provides pluggable packages under the `@tokenring-ai/*` scope for modular AI agent functionality.

## Table of Contents

1. [Monorepo Structure](#monorepo-structure)
2. [Core Architecture Patterns](#core-architecture-patterns)
3. [Agent System](#agent-system)
4. [Package Categories](#package-categories)
5. [Development Workflows](#development-workflows)
6. [Testing Framework](#testing-framework)
7. [Integration Patterns](#integration-patterns)
8. [Context Management](#context-management)
9. [State Management](#state-management)
10. [Development Guidelines](#development-guidelines)
11. [Cognitive Workspace Innovation](#cognitive-workspace-innovation)

## Monorepo Structure

```
tokenring/
├── app/                    # Applications
│   ├── coder/             # TokenRing Coder (AI-powered development assistant)
│   └── writer/            # TokenRing Writer (content creation platform)
├── pkg/                   # Packages (50+ specialized packages)
│   ├── agent/            # Core agent system
│   ├── ai-client/        # AI integration with multi-provider support
│   ├── filesystem/       # Abstract filesystem interface
│   ├── git/              # Git operations with auto-commit
│   ├── testing/          # Agent testing framework
│   ├── codebase/         # Codebase context injection
│   ├── queue/            # Task queuing with checkpoints
│   ├── memory/           # Short-term memory storage
│   └── [40+ more packages]
├── design/               # Architecture design documents
├── deps/                 # External dependencies
├── docker/              # Docker configurations
└── docs/                # Documentation
```

### Package Structure Patterns

Each package follows a consistent structure:

```
pkg/package-name/
├── index.ts              # Main entry point
├── README.md             # Package documentation
├── package.json          # Package metadata
├── tsconfig.json         # TypeScript configuration
├── src/                  # Source code (if present)
├── tools/                # AI tools
├── commands/             # Chat commands
├── hooks/                # Lifecycle hooks
├── state/                # State slices
└── test/                 # Test files
```

## Core Architecture Patterns

### 1. Agent-Centric Design

The entire ecosystem revolves around **agents** that can execute commands, use tools, run hooks, maintain state, and communicate through asynchronous events.

**Key Components:**
- **AgentTeam**: Central orchestrator managing agents, packages, and shared registries
- **Agent**: Individual AI agent with state management, event emission, and command processing
- **Services**: Shared functionality registered with agents
- **Tools**: Executable capabilities that agents can use
- **Commands**: Interactive slash commands for agent interaction
- **Hooks**: Lifecycle automation points

### 2. Service Registration Pattern

All packages implement the `TokenRingService` interface and register themselves with the agent system:

```typescript
class PackageService implements TokenRingService {
  name = "package-service";
  description = "Service description";
  
  async attach(agent: Agent): Promise<void> {
    // Register tools
    agent.tools.register("tool-name", toolDefinition);
    
    // Register commands
    agent.commands.register("command-name", commandDefinition);
    
    // Add context providers
    agent.contextProviders.add(this);
  }
}
```

### 3. Registry-Based Architecture

The system uses typed registries for managing components:

```typescript
// AgentTeam registries
- packages: TokenRing packages
- services: Shared services (typed registry)
- chatCommands: Chat commands
- tools: Available tools
- hooks: Lifecycle hooks
```

### 4. Event-Driven Communication

Agents communicate via an event system:

```typescript
// Agent events
agent.events(signal).forEach(event => {
  switch (event.type) {
    case 'output.chat':
      console.log('Chat:', event.data.content);
      break;
    case 'state.busy':
      console.log('Agent busy:', event.data.message);
      break;
    case 'human.request':
      handleHumanInput(event.data);
      break;
  }
});
```

## Agent System

### Agent Types

#### Interactive Agents
- Direct user interaction
- Real-time event streaming
- Human input requests

#### Background Agents
- Autonomous operation
- Task queue processing
- Monitoring and automation

### Agent Configuration

```typescript
const agentConfig: AgentConfig = {
  name: "specialistAgent",
  description: "Specialized development agent",
  visual: { color: "blue" },
  ai: {
    systemPrompt: "You are a specialist...",
    temperature: 0.7,
    maxTokens: 4000
  },
  type: "interactive",
  persistent: true
};
```

### Core Agent Methods

```typescript
// State Management
agent.initializeState(MyStateSlice, {});
agent.mutateState(MyStateSlice, state => state.update());
const checkpoint = agent.generateCheckpoint();

// Event Handling
for await (const event of agent.events(controller)) {
  // Handle events
}
await agent.handleInput({ message: "Your request" });

// Human Interaction
await agent.askHuman(request);
agent.sendHumanResponse(sequence, response);
```

## Package Categories

### Core Foundation (7 packages)

- **@tokenring-ai/agent**: Central orchestrator for AI agents
- **@tokenring-ai/ai-client**: Unified AI client with multi-provider support
- **@tokenring-ai/utility**: Shared utilities and helpers
- **@tokenring-ai/filesystem**: Abstract filesystem interface
- **@tokenring-ai/memory**: Short-term memory and attention storage
- **@tokenring-ai/queue**: Task queuing with checkpoint preservation
- **@tokenring-ai/checkpoint**: Agent state persistence abstraction

### Storage & Database (7 packages)

- **@tokenring-ai/database**: Abstract database layer
- **@tokenring-ai/mysql**: MySQL integration
- **@tokenring-ai/sqlite-storage**: SQLite for checkpoints
- **@tokenring-ai/s3**: AWS S3 integration
- **@tokenring-ai/cdn**: Abstract CDN service
- **@tokenring-ai/checkpoint**: Agent state persistence
- **@tokenring-ai/drizzle-storage**: Multi-database ORM

### Development Tools (10 packages)

- **@tokenring-ai/testing**: Agent testing framework with auto-repair
- **@tokenring-ai/git**: Git operations with auto-commit
- **@tokenring-ai/javascript**: ESLint, package management
- **@tokenring-ai/codebase**: Codebase context injection
- **@tokenring-ai/code-watch**: AI comment-triggered modifications
- **@tokenring-ai/file-index**: Semantic file search with Tree-sitter
- **@tokenring-ai/iterables**: Batch processing with /foreach command
- **@tokenring-ai/scripting**: Scripting language with variables and functions
- **@tokenring-ai/tasks**: Multi-agent workflow orchestration
- **@tokenring-ai/memory**: Context memory management

### Web & External Services (11 packages)

- **@tokenring-ai/websearch**: Abstract web search interface
- **@tokenring-ai/serper**: Google search via Serper.dev
- **@tokenring-ai/scraperapi**: Web scraping and SERP results
- **@tokenring-ai/chrome**: Puppeteer browser automation
- **@tokenring-ai/wikipedia**: Wikipedia API integration
- **@tokenring-ai/aws**: AWS STS/S3 clients
- **@tokenring-ai/docker**: Docker container management
- **@tokenring-ai/kubernetes**: Kubernetes resource discovery
- **@tokenring-ai/sandbox**: Abstract sandbox interface
- **@tokenring-ai/mcp**: Model Context Protocol client
- **@tokenring-ai/research**: Research tools and workflows

### Communication & Publishing (8 packages)

- **@tokenring-ai/slack**: Slack bot integration
- **@tokenring-ai/telegram**: Telegram bot integration
- **@tokenring-ai/feedback**: Human feedback tools
- **@tokenring-ai/blog**: Blog abstraction layer
- **@tokenring-ai/ghost-io**: Ghost.io publishing integration
- **@tokenring-ai/wordpress**: WordPress publishing integration
- **@tokenring-ai/newsrpm**: NewsRPM article management
- **@tokenring-ai/reddit**: Reddit integration

### Audio & Media (2 packages)

- **@tokenring-ai/audio**: Abstract audio framework
- **@tokenring-ai/linux-audio**: Linux audio implementation with naudiodon2

### UI & Frontend (5 packages)

- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-host**: Fastify-based web server

## Integration Patterns

### Service Integration

```typescript
class ServiceIntegration {
  async attach(agent: Agent): Promise<void> {
    // Access other services
    const fsService = agent.requireServiceByType(FileSystemService);
    const aiService = agent.requireServiceByType(AIService);
    
    // Register with agent team
    agent.team.addService(this);
  }
}
```

### Tool Integration

```typescript
const toolDefinition = {
  name: "custom-tool",
  description: "Custom tool description",
  inputSchema: z.object({
    param1: z.string(),
    param2: z.number()
  }),
  execute: async (input, agent) => {
    // Tool implementation
  }
};
```

### Command Integration

```typescript
const commandDefinition = {
  description: "Custom command description",
  execute: async (remainder: string, agent) => {
    // Command implementation
  },
  help: () => "Command usage information"
};
```

## State Management

### State Slices

```typescript
class CustomState implements StateSlice {
  name = 'CustomState';
  data: any[] = [];
  
  reset(what: ResetWhat[]): void {
    if (what.includes('chat')) {
      this.data = [];
    }
  }
  
  serialize(): object {
    return { data: this.data };
  }
  
  deserialize(obj: any): void {
    this.data = obj.data || [];
  }
}

// Usage in agent
agent.initializeState(CustomState, {});
agent.mutateState(CustomState, state => {
  state.data.push(newItem);
});
```

## Key Architectural Principles

### 1. Modularity
- Each package is self-contained with clear interfaces
- Minimal dependencies between packages
- Plugin architecture for extensibility

### 2. Agent-Centric
- All functionality exposed through agents
- Uniform interface across packages
- Event-driven communication

### 3. Type Safety
- Full TypeScript coverage with strict mode
- Zod schema validation for runtime type checking
- Comprehensive type definitions

### 4. Event-Driven
- Async generator patterns for events
- Decoupled component communication
- Reactive architecture

### 5. Pluggable
- Multiple provider support (AI, storage, etc.)
- Swap implementations without code changes
- Configuration-driven behavior

### 6. Testable
- Comprehensive testing framework
- Auto-repair capabilities
- Mock-friendly design

## Development Guidelines

### Code Style
- Consistent naming conventions
- Comprehensive error handling
- Async/await patterns throughout
- Proper resource cleanup
- ES modules architecture (`"type": "module"`)

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Naming Conventions
- **Packages**: `@tokenring-ai/{name}` with kebab-case naming
- **Services**: `{Name}Service` suffix for service classes
- **Tools**: `{Action}` format (e.g., `commitTool`, `rollbackTool`)
- **Commands**: Lowercase with forward slash prefix (e.g., `/git`, `/test`)
- **Agents**: CamelCase descriptive names (e.g., `teamLeader`, `contentWriter`)

### Testing Strategy
- Unit tests for individual components
- Integration tests for service interactions
- End-to-end tests for workflows
- Auto-repair for test failures
- Vitest testing framework

### Documentation
- README files for each package
- TypeScript interfaces for APIs
- Usage examples and patterns
- Architecture decision records

## Cross-Package Interactions

The ecosystem is agent-centric: `@tokenring-ai/agent` is the hub, registering tools/commands/services from other packages via registries. Key interactions include:

### Agent Workflow
- Agent uses `@tokenring-ai/ai-client` for LLM calls
- Uses `@tokenring-ai/filesystem` for file operations
- Uses `@tokenring-ai/memory` for context
- Uses `@tokenring-ai/queue` for batching

### Dev Pipeline
- `@tokenring-ai/code-watch` detects changes
- Triggers agent with `@tokenring-ai/javascript` (ESLint)
- Runs `@tokenring-ai/testing` (tests)
- Auto-commits via `@tokenring-ai/git` if passing

### Search/Integrations
- `@tokenring-ai/websearch` with providers
- `@tokenring-ai/file-index` searches codebase internally
- Results fed to agent context

### Infra/Storage
- `@tokenring-ai/sandbox` via `@tokenring-ai/docker` for execution
- `@tokenring-ai/database` with `@tokenring-ai/mysql` for queries
- `@tokenring-ai/aws` for cloud operations
- `@tokenring-ai/checkpoint` with `@tokenring-ai/sqlite-storage` for persistence

### UI Flow
- `@tokenring-ai/cli` runs REPL with `@tokenring-ai/inquirer-*` prompts
- `@tokenring-ai/feedback` for human reviews

### Workflow Automation
- `@tokenring-ai/scripting` enables reusable command sequences
- `@tokenring-ai/tasks` orchestrates multi-agent workflows
- `@tokenring-ai/iterables` provides batch processing


## Conclusion

The TokenRing AI monorepo demonstrates a sophisticated approach to building AI-powered development tools through a modular, agent-centric architecture. Its patterns and practices provide a solid foundation for building extensible AI systems with strong typing, comprehensive testing, and flexible integration capabilities.

Key strengths include:
- **Clear separation of concerns** through package-based architecture
- **Robust agent system** with event-driven communication
- **Comprehensive testing** with auto-repair capabilities
- **Flexible integration** through well-defined interfaces
- **Type-safe development** with full TypeScript coverage

This knowledge base serves as a reference for understanding and extending the TokenRing AI ecosystem.