# TokenRing AI Implementation Guide

## Practical Implementation Examples and Patterns

This guide provides concrete code examples and implementation patterns for working with the TokenRing AI ecosystem.

## Table of Contents

1. [Creating Custom Packages](#creating-custom-packages)
2. [Building Agent Teams](#building-agent-teams)
3. [Implementing Services](#implementing-services)
4. [Creating Tools](#creating-tools)
5. [Developing Commands](#developing-commands)
6. [State Management Patterns](#state-management-patterns)
7. [Testing Implementations](#testing-implementations)
8. [Integration Examples](#integration-examples)
9. [Workflow Automation](#workflow-automation)
10. [Error Handling Patterns](#error-handling-patterns)

## Creating Custom Packages

### Basic Package Structure

```typescript
// pkg/my-package/index.ts
import { TokenRingPackage } from '@tokenring-ai/agent';

export const myPackage = new TokenRingPackage({
  name: 'my-package',
  version: '0.1.0',
  description: 'Custom TokenRing package',
  tools: [
    {
      name: 'my-tool',
      description: 'Custom tool for specific functionality',
      inputSchema: {
        param1: z.string(),
        param2: z.number().optional()
      },
      execute: async (input, agent) => {
        // Tool implementation
        return { result: `Processed ${input.param1}` };
      }
    }
  ],
  commands: [
    {
      name: 'my-command',
      description: 'Custom command for interactive use',
      execute: async (remainder, agent) => {
        // Command implementation
        await agent.events.chatOutput(`Executed: ${remainder}`);
      },
      help: () => 'Usage: /my-command <args>'
    }
  ],
  services: [
    {
      name: 'my-service',
      description: 'Custom service',
      start: async (agentTeam) => {
        // Service startup logic
      },
      attach: async (agent) => {
        // Agent attachment logic
      }
    }
  ]
});

export default myPackage;
```

### Package Configuration

```json
{
  "name": "@tokenring-ai/my-package",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": "./index.ts",
    "./*": "./*.ts"
  },
  "dependencies": {
    "@tokenring-ai/agent": "^0.2.0",
    "@tokenring-ai/utility": "^0.2.0",
    "zod": "^4.1.13"
  }
}
```

## Building Agent Teams

### Basic Team Setup

```typescript
import { AgentTeam } from '@tokenring-ai/agent';
import { FileSystemService } from '@tokenring-ai/filesystem';
import { AIService } from '@tokenring-ai/ai-client';

async function setupAgentTeam(): Promise<AgentTeam> {
  const team = new AgentTeam();
  
  // Add core services
  const fsService = new FileSystemService({
    defaultSelectedFiles: ['src/index.ts']
  });
  team.addService(fsService);
  
  // Register packages
  await team.addPackages([
    require('@tokenring-ai/git').default,
    require('@tokenring-ai/testing').default,
    require('@tokenring-ai/javascript').default
  ]);
  
  return team;
}
```

### Multi-Agent Workflow

```typescript
async function coordinateDevelopment(agentTeam: AgentTeam, task: string) {
  // Create specialized agents
  const architectAgent = await agentTeam.createAgent('systemArchitect');
  const frontendAgent = await agentTeam.createAgent('frontendDesign');
  const backendAgent = await agentTeam.createAgent('backendDesign');
  const testAgent = await agentTeam.createAgent('testEngineer');
  
  // Coordinate workflow
  await architectAgent.handleInput({ 
    message: `Design architecture for: ${task}` 
  });
  
  await backendAgent.handleInput({ 
    message: `Implement backend for: ${task}` 
  });
  
  await frontendAgent.handleInput({ 
    message: `Build frontend for: ${task}` 
  });
  
  await testAgent.handleInput({ 
    message: `Test the implementation` 
  });
  
  // Cleanup
  await agentTeam.deleteAgent(architectAgent);
  await agentTeam.deleteAgent(frontendAgent);
  await agentTeam.deleteAgent(backendAgent);
  await agentTeam.deleteAgent(testAgent);
}
```

## Implementing Services

### Custom Service Implementation

```typescript
import { TokenRingService } from '@tokenring-ai/agent';
import { z } from 'zod';

export class DatabaseService implements TokenRingService {
  name = "database-service";
  description = "Custom database operations";
  
  private connections = new Map<string, any>();
  
  async start(agentTeam: AgentTeam): Promise<void> {
    // Initialize service
    console.log('Database service starting...');
  }
  
  async stop(agentTeam: AgentTeam): Promise<void> {
    // Cleanup connections
    this.connections.clear();
  }
  
  async attach(agent: Agent): Promise<void> {
    // Register with agent
    agent.events.chatOutput('Database service attached');
  }
  
  async detach(agent: Agent): Promise<void> {
    // Cleanup agent-specific resources
  }
  
  async getContextItems(agent: Agent): AsyncGenerator<ContextItem> {
    // Provide context to agents
    yield {
      content: 'Database service context',
      metadata: { source: 'database-service' }
    };
  }
  
  // Custom methods
  async query(sql: string, params: any[] = []): Promise<any> {
    // Implement query logic
    return { rows: [], count: 0 };
  }
}
```

### Service Integration Pattern

```typescript
class ServiceIntegration {
  constructor(
    private agentTeam: AgentTeam,
    private agent: Agent
  ) {}
  
  async getRequiredService<T extends TokenRingService>(
    serviceType: new () => T
  ): Promise<T> {
    return this.agent.requireServiceByType(serviceType);
  }
  
  async validateServiceDependencies(): Promise<boolean> {
    const required = [
      FileSystemService,
      AIService,
      GitService
    ];
    
    for (const ServiceClass of required) {
      try {
        await this.agent.requireServiceByType(ServiceClass);
      } catch (error) {
        console.error(`Missing required service: ${ServiceClass.name}`);
        return false;
      }
    }
    
    return true;
  }
}
```

## Creating Tools

### File Processing Tool

```typescript
const fileProcessorTool = {
  name: "file-processor",
  description: "Process files with custom logic",
  inputSchema: {
    files: z.array(z.string()),
    operation: z.enum(['analyze', 'transform', 'validate']),
    options: z.record(z.any()).optional()
  },
  execute: async (input, agent) => {
    const fsService = agent.requireServiceByType(FileSystemService);
    const results = [];
    
    for (const file of input.files) {
      try {
        const content = await fsService.getFile(file);
        let result;
        
        switch (input.operation) {
          case 'analyze':
            result = await analyzeFile(content, input.options);
            break;
          case 'transform':
            result = await transformFile(content, input.options);
            break;
          case 'validate':
            result = await validateFile(content, input.options);
            break;
        }
        
        results.push({ file, success: true, result });
      } catch (error) {
        results.push({ 
          file, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    return { results };
  }
};

// Usage
await agent.tools.fileProcessor.execute({
  files: ['src/main.ts', 'src/utils.ts'],
  operation: 'analyze',
  options: { complexity: true, dependencies: true }
}, agent);
```

### API Integration Tool

```typescript
const apiIntegrationTool = {
  name: "api-integration",
  description: "Integrate with external APIs",
  inputSchema: {
    endpoint: z.string(),
    method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
    headers: z.record(z.string()).optional(),
    body: z.any().optional(),
    timeout: z.number().optional()
  },
  execute: async (input, agent) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), input.timeout || 30000);
    
    try {
      const response = await fetch(input.endpoint, {
        method: input.method,
        headers: input.headers,
        body: input.body ? JSON.stringify(input.body) : undefined,
        signal: controller.signal
      });
      
      const data = await response.json();
      
      return {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        data
      };
    } catch (error) {
      return {
        error: error.message,
        status: 'failed'
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }
};
```

## Developing Commands

### Interactive Command Implementation

```typescript
const customCommand = {
  description: "Custom interactive command",
  execute: async (remainder: string, agent: Agent) => {
    const args = remainder.split(' ').filter(Boolean);
    const subcommand = args[0];
    
    switch (subcommand) {
      case 'list':
        return await listItems(agent, args.slice(1));
      case 'create':
        return await createItem(agent, args.slice(1));
      case 'delete':
        return await deleteItem(agent, args.slice(1));
      case 'help':
        return await showHelp(agent);
      default:
        await agent.events.chatOutput(
          "Unknown command. Use /custom help for usage information."
        );
    }
  },
  help: () => [
    "Custom Command - Manage custom items",
    "",
    "Usage:",
    "  /custom list [filter]     - List items",
    "  /custom create <name>     - Create new item",
    "  /custom delete <name>     - Delete item",
    "  /custom help              - Show this help",
    "",
    "Examples:",
    "  /custom list all",
    "  /custom create my-item",
    "  /custom delete old-item"
  ]
};

async function listItems(agent: Agent, args: string[]) {
  const filter = args[0] || 'all';
  // Implementation
  await agent.events.chatOutput(`Listing items with filter: ${filter}`);
}

async function createItem(agent: Agent, args: string[]) {
  const name = args[0];
  if (!name) {
    await agent.events.chatOutput("Please provide a name for the item.");
    return;
  }
  // Implementation
  await agent.events.chatOutput(`Created item: ${name}`);
}
```

### Command with Interactive Input

```typescript
const setupCommand = {
  description: "Interactive setup command",
  execute: async (remainder: string, agent: Agent) => {
    const config = await agent.askHuman({
      type: 'ask',
      message: 'Enter configuration (JSON format):',
      required: true
    });
    
    try {
      const parsed = JSON.parse(config);
      await setupWithConfig(parsed, agent);
      await agent.events.chatOutput('Setup completed successfully!');
    } catch (error) {
      await agent.events.chatOutput(`Invalid JSON: ${error.message}`);
    }
  },
  help: () => "Interactive setup - will prompt for configuration"
};
```

## State Management Patterns

### Complex State Slice

```typescript
class ProjectState implements StateSlice {
  name = 'project';
  projectConfig: ProjectConfig = { files: [], dependencies: [] };
  buildHistory: BuildRecord[] = [];
  currentTask?: TaskInfo;
  
  reset(what: ResetWhat[]): void {
    if (what.includes('chat')) {
      this.currentTask = undefined;
    }
    if (what.includes('memory')) {
      this.buildHistory = [];
    }
  }
  
  serialize(): object {
    return {
      projectConfig: this.projectConfig,
      buildHistory: this.buildHistory,
      currentTask: this.currentTask
    };
  }
  
  deserialize(obj: any): void {
    this.projectConfig = obj.projectConfig || { files: [], dependencies: [] };
    this.buildHistory = obj.buildHistory || [];
    this.currentTask = obj.currentTask;
  }
}

// Usage in agent
class ProjectManager {
  constructor(private agent: Agent) {}
  
  async initializeProject(config: ProjectConfig) {
    this.agent.initializeState(ProjectState, {});
    this.agent.mutateState(ProjectState, state => {
      state.projectConfig = config;
    });
  }
  
  async startTask(task: TaskInfo) {
    this.agent.mutateState(ProjectState, state => {
      state.currentTask = task;
      state.buildHistory.push({
        timestamp: Date.now(),
        task: task.name,
        status: 'started'
      });
    });
  }
  
  async completeTask(success: boolean, result: any) {
    this.agent.mutateState(ProjectState, state => {
      if (state.currentTask) {
        state.buildHistory.push({
          timestamp: Date.now(),
          task: state.currentTask.name,
          status: success ? 'completed' : 'failed',
          result
        });
        state.currentTask = undefined;
      }
    });
  }
}
```

### Persistent State Management

```typescript
class PersistentStateManager {
  constructor(
    private agent: Agent,
    private storage: AgentCheckpointStorage
  ) {}
  
  async saveState(key: string): Promise<void> {
    const checkpoint = this.agent.generateCheckpoint();
    await this.storage.saveCheckpoint(key, checkpoint);
  }
  
  async loadState(key: string): Promise<boolean> {
    try {
      const checkpoint = await this.storage.loadCheckpoint(key);
      if (checkpoint) {
        this.agent.restoreCheckpoint(checkpoint);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to load state:', error);
      return false;
    }
  }
  
  async switchProject(projectKey: string): Promise<void> {
    // Save current state
    await this.saveState(`current-${Date.now()}`);
    
    // Load project state
    const loaded = await this.loadState(projectKey);
    if (!loaded) {
      throw new Error(`Project state not found: ${projectKey}`);
    }
  }
}
```

## Testing Implementations

### Custom Testing Resource

```typescript
class APITestingResource implements TestingResource {
  name = "api-tests";
  description = "API endpoint testing";
  
  private latestResult?: TestResult;
  
  async runTest(agent: Agent): Promise<TestResult> {
    const startTime = new Date();
    
    try {
      const results = await this.runAPITests(agent);
      
      return {
        startedAt: startTime,
        finishedAt: new Date(),
        passed: results.every(r => r.passed),
        output: JSON.stringify(results, null, 2)
      };
    } catch (error) {
      return {
        startedAt: startTime,
        finishedAt: new Date(),
        passed: false,
        error: error.message
      };
    }
  }
  
  private async runAPITests(agent: Agent): Promise<APIResult[]> {
    const endpoints = await this.getTestEndpoints(agent);
    const results = [];
    
    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint.url);
        const passed = this.validateResponse(response, endpoint.expected);
        results.push({ endpoint: endpoint.name, passed });
      } catch (error) {
        results.push({ endpoint: endpoint.name, passed: false });
      }
    }
    
    return results;
  }
}
```

### Integration Testing Pattern

```typescript
class IntegrationTester {
  constructor(
    private agent: Agent,
    private fsService: FileSystemService,
    private testService: TestingService
  ) {}
  
  async testFileOperations(): Promise<TestResult> {
    const testFile = 'test-integration.txt';
    const testContent = 'Integration test content';
    
    try {
      // Write file
      await this.fsService.writeFile(testFile, testContent);
      
      // Read file
      const readContent = await this.fsService.getFile(testFile);
      
      // Verify
      const passed = readContent === testContent;
      
      // Cleanup
      await this.fsService.deleteFile(testFile);
      
      return {
        startedAt: new Date(),
        finishedAt: new Date(),
        passed,
        output: passed ? 'File operations working correctly' : 'Content mismatch'
      };
    } catch (error) {
      return {
        startedAt: new Date(),
        finishedAt: new Date(),
        passed: false,
        error: error.message
      };
    }
  }
  
  async runFullTestSuite(): Promise<Record<string, TestResult>> {
    const tests = [
      () => this.testFileOperations(),
      () => this.testGitOperations(),
      () => this.testAIIntegration()
    ];
    
    const results = {};
    
    for (const test of tests) {
      const result = await test();
      results[test.name] = result;
    }
    
    return results;
  }
}
```

## Integration Examples

### Multi-Service Integration

```typescript
class DevelopmentWorkflow {
  constructor(private agent: Agent) {
    this.fsService = this.agent.requireServiceByType(FileSystemService);
    this.aiService = this.agent.requireServiceByType(AIService);
    this.gitService = this.agent.requireServiceByType(GitService);
    this.testService = this.agent.requireServiceByType(TestingService);
  }
  
  async implementFeature(feature: string): Promise<void> {
    // 1. Analyze requirements using AI
    const analysis = await this.aiService.generateObject({
      prompt: `Analyze the following feature request: ${feature}`,
      schema: FeatureAnalysisSchema
    }, this.agent);
    
    // 2. Generate implementation plan
    const plan = await this.createImplementationPlan(analysis);
    
    // 3. Implement files
    for (const file of plan.files) {
      await this.fsService.writeFile(file.path, file.content);
    }
    
    // 4. Run tests
    const testResults = await this.testService.runTests({}, this.agent);
    
    // 5. Commit if tests pass
    if (Object.values(testResults).every(r => r.passed)) {
      await this.gitService.commit(`Implement ${feature}`, this.agent);
    }
  }
}
```

### External API Integration

```typescript
class ExternalServiceIntegration {
  constructor(
    private agent: Agent,
    private apiClient: APIClient
  ) {}
  
  async processWithExternalService(data: any): Promise<ProcessedResult> {
    // 1. Validate input
    const validated = await this.validateInput(data);
    
    // 2. Process with external service
    const result = await this.apiClient.process(validated);
    
    // 3. Store result in local system
    await this.storeResult(result);
    
    // 4. Notify agent
    await this.agent.events.chatOutput(
      `External processing completed: ${result.summary}`
    );
    
    return result;
  }
  
  private async validateInput(data: any): Promise<ValidatedData> {
    // Validation logic
    return { valid: true, data };
  }
  
  private async storeResult(result: ProcessedResult): Promise<void> {
    // Storage logic
  }
}
```

## Workflow Automation

### Automated Testing Pipeline

```typescript
class AutomatedTestPipeline {
  constructor(private agent: Agent) {}
  
  async runFullPipeline(): Promise<PipelineResult> {
    const results = {
      codeAnalysis: null,
      unitTests: null,
      integrationTests: null,
      securityScan: null,
      performanceTest: null
    };
    
    try {
      // 1. Code analysis
      results.codeAnalysis = await this.runCodeAnalysis();
      
      // 2. Unit tests
      results.unitTests = await this.runUnitTests();
      
      // 3. Integration tests
      results.integrationTests = await this.runIntegrationTests();
      
      // 4. Security scan
      results.securityScan = await this.runSecurityScan();
      
      // 5. Performance test
      results.performanceTest = await this.runPerformanceTest();
      
      // 6. Generate report
      const report = await this.generateReport(results);
      
      // 7. Auto-repair if needed
      if (!this.allTestsPassed(results)) {
        await this.autoRepair(results);
      }
      
      return { results, report, success: this.allTestsPassed(results) };
      
    } catch (error) {
      return { results, error: error.message, success: false };
    }
  }
  
  private async autoRepair(results: PipelineResults): Promise<void> {
    const repairAgent = await this.agent.createSubAgent('codeRepair');
    await repairAgent.handleInput({
      message: `Auto-repair needed. Test results: ${JSON.stringify(results)}`
    });
  }
}
```

### Task Orchestration

```typescript
class TaskOrchestrator {
  constructor(private agentTeam: AgentTeam) {}
  
  async executeComplexTask(task: ComplexTask): Promise<TaskResult> {
    const subtasks = this.decomposeTask(task);
    const results = [];
    
    for (const subtask of subtasks) {
      try {
        const agent = await this.agentTeam.createAgent(subtask.agentType);
        await agent.initialize();
        
        const result = await this.executeSubtask(subtask, agent);
        results.push(result);
        
        await this.agentTeam.deleteAgent(agent);
      } catch (error) {
        results.push({ 
          subtask: subtask.name, 
          success: false, 
          error: error.message 
        });
      }
    }
    
    return this.compileResults(task, results);
  }
  
  private decomposeTask(task: ComplexTask): Subtask[] {
    // Task decomposition logic
    return [];
  }
  
  private async executeSubtask(subtask: Subtask, agent: Agent): Promise<SubtaskResult> {
    // Subtask execution logic
    return { success: true, result: 'completed' };
  }
}
```

## Error Handling Patterns

### Comprehensive Error Handling

```typescript
class RobustOperation {
  constructor(private agent: Agent) {}
  
  async executeWithRetry<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    retryDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error;
        
        if (attempt < maxRetries) {
          await this.agent.events.systemMessage({
            message: `Operation failed (attempt ${attempt}/${maxRetries}): ${error.message}`,
            level: 'warning'
          });
          
          await this.sleep(retryDelay * attempt);
        }
      }
    }
    
    throw new Error(`Operation failed after ${maxRetries} attempts: ${lastError.message}`);
  }
  
  async handleGracefulFailure(operation: () => Promise<void>): Promise<void> {
    try {
      await operation();
    } catch (error) {
      await this.agent.events.systemMessage({
        message: `Operation failed: ${error.message}`,
        level: 'error'
      });
      
      // Attempt recovery
      await this.attemptRecovery(error);
      
      // Notify user
      await this.agent.events.chatOutput(
        `Operation encountered an error. Check logs for details.`
      );
    }
  }
  
  private async attemptRecovery(error: Error): Promise<void> {
    // Recovery logic
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
```

### Validation and Error Reporting

```typescript
class ValidationService {
  static validateInput<T>(
    input: any,
    schema: z.ZodSchema<T>
  ): { success: boolean; data?: T; error?: string } {
    try {
      const validated = schema.parse(input);
      return { success: true, data: validated };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map(err => 
          `${err.path.join('.')}: ${err.message}`
        );
        return { 
          success: false, 
          error: `Validation failed: ${errorMessages.join(', ')}` 
        };
      }
      return { success: false, error: error.message };
    }
  }
  
  static async reportValidationErrors(
    agent: Agent,
    validationResult: ValidationResult
  ): Promise<void> {
    await agent.events.chatOutput(
      `❌ Validation Error: ${validationResult.error}`
    );
    
    await agent.events.systemMessage({
      message: `Validation failed for user input: ${validationResult.error}`,
      level: 'error'
    });
  }
}
```

## Conclusion

This implementation guide provides practical patterns and examples for working with the TokenRing AI ecosystem. Key takeaways:

1. **Consistent Patterns**: Use the established patterns for services, tools, and commands
2. **Type Safety**: Leverage TypeScript and Zod for robust validation
3. **Error Handling**: Implement comprehensive error handling and recovery
4. **Testing**: Create comprehensive test suites for all components
5. **State Management**: Use state slices for clean state management
6. **Event-Driven**: Leverage the event system for responsive interactions

These patterns ensure maintainable, reliable, and extensible code within the TokenRing AI ecosystem.