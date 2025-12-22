# Testing Knowledge Repository

This file maintains knowledge about testing strategies, test suites, and quality assurance in the TokenRing project.

## Discovered Testing Information

### Project Overview
- **50+ package ecosystem** with comprehensive testing infrastructure
- Packages are located in pkg/{packageName}/...
- **TypeScript-based monorepo** containing a AI agent systems

### Testing methodology
- Tests are located in each package
- To locate tests, search for pkg/*/**.test.*
- To run the tests in a package, run bun test, or bunx vitest run
- Integration tests are preferred over unit tests

### How to mock the Agent and TokenRingApp classes

Most packages are agent-centric, requiring a valid agent to use for tests.
To mock the agent, use the following method:

import createTestingAgent from "@tokenring-ai/agent/test/createTestingAgent";
import createTestingApp from "@tokenring-ai/app/test/createTestingApp";

const app = createTestingApp();

// Create a mock agent
const createMockAgent = () => {
 const agent = createTestingAgent(app);
 
 vi.spyOn(agent, 'chatOutput');
 vi.spyOn(agent, 'infoLine');
 vi.spyOn(agent, 'errorLine');
 
 return agent;
}; 

_(Knowledge will be accumulated here as the agent learns about the codebase)_