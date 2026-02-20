# Documentation Knowledge Repository

This file maintains knowledge about documentation standards, patterns, and structure in the Token Ring project.

## 1. Documentation Hierarchy and Structure

### Root Level Documentation
- **README.md**: Main project overview with applications (Coder/Writer), quick start, package ecosystem overview
- **PACKAGES.md**: Comprehensive package index with 50+ packages organized by category
- **DEPENDENCIES.md**: Dependency graph and relationships
- **AGENTS.md**: Agent definitions and capabilities

### Package-Level Documentation
- **Individual README.md files**: Each of the 50+ packages has its own detailed README
- **Consistent structure across all packages**:
  - Overview/Purpose
  - Installation
  - Features
  - Core Components/API
  - Usage Examples
  - Configuration
  - Dependencies
  - License
- **Testing**: Packages use vitest for unit testing
- **Examples**: When creating examples, use bun as the interpreter

### Application-Level Documentation
- **app/coder/README.md**: Comprehensive developer assistant application (50-package ecosystem)
- **app/writer/README.md**: Content creation and management application
- **app/webterminal/README.md**: Lightweight coding terminal interface

### Plugin Documentation
- **Website Documentation**: `docs/docs/plugins/<plugin-name>.md`
- **Consistent structure across all plugins**:
  - Overview and Purpose
  - Key Features
  - Core Components
  - Services: Documentation of TokenRingService implementations
  - Provider Documentation: If applicable, document provider interfaces
  - RPC Endpoints: If applicable, document RPC endpoints
  - Chat Commands: Document slash-prefixed commands available in the interface
  - Configuration
  - Integration
  - Usage Examples
  - Best Practices
  - Testing and Development
  - Dependencies
  - Related Components

## 2. Documentation Categories and Patterns

### Core Foundation Packages
Pattern: Focus on architecture and service management
- **@tokenring-ai/agent**: Central orchestration system with agent teams and state management
- **@tokenring-ai/ai-client**: Multi-provider AI integration with model registry and capabilities
- **@tokenring-ai/app**: Base application framework with service management and plugin architecture
- **@tokenring-ai/utility**: Shared utilities and helpers

**Documentation Pattern:**
- Architecture overview with component diagrams
- Service interfaces and API references
- Integration examples with other packages
- Configuration schemas and type definitions
- Event system and streaming capabilities
- Command system and human interaction handling
- JSON-RPC API endpoints and WebSocket communication
- State management and persistence patterns

### Plugin Documentation Pattern
Pattern: Focus on functionality and integration
- **@tokenring-ai/scheduler**: Automated scheduling service with task management
- **@tokenring-ai/image-generation**: AI-powered image generation with metadata management
- **@tokenring-ai/audio**: Voice recording, playback, and speech processing
- **@tokenring-ai/web-host**: Web server for serving resources and APIs

**Documentation Pattern:**
- Overview and purpose with key features
- Core components and service architecture
- API reference with method signatures
- Configuration examples and schema definitions
- Usage examples with integration patterns
- Chat command documentation and examples
- Error handling and monitoring capabilities
- Integration with agent system
- Testing setup and development information

## 3. Documentation Writing Standards

### Technical Writing Standards
- **Consistent Terminology**: Uses "Agent", "Service", "Tool", "Command" consistently across all documentation
- **Type-Safe Examples**: All code examples use proper TypeScript types and imports
- **Comprehensive API Reference**: Detailed method signatures with parameters and return types
- **Real-world Usage**: Practical examples showing integration patterns between packages
- **Tech Stack**: Packages use bun, vitest, and typescript
- **Event-Driven Architecture**: Clear documentation of event systems and streaming capabilities
- **Human Interface Patterns**: Documentation of human interaction requests and responses
- **State Management**: Comprehensive coverage of state persistence and restoration
- **Command Systems**: Detailed documentation of chat command patterns and usage
- **JSON-RPC APIs**: Clear documentation of remote procedure call endpoints

### 1. Documentation standards for README.md
```markdown
# Plugin Name

## Overview
- Brief description of functionality
- Key features list with bullet points
- Integration points with other packages

## Installation
- Package installation command
- Dependencies list

## Features
- Bullet-point list of main capabilities

## Core Components/API
- Core classes, interfaces, and functions
- Method signatures with parameters and return types
- Configuration examples

## Usage Examples
- Multiple usage examples demonstrating different scenarios
- Show both basic and advanced usage patterns

## Configuration
- Configuration options and schemas
- Configuration example

## Integration
- Integration with other packages
- Plugin registration
- Service registration

## RPC Endpoints
- Include this section if the package defines RPC endpoints
- Markdown table with endpoints, with name, request params, response params

## State Management
- State slice documentation
- Persistence and restoration patterns
- Checkpoint generation and recovery

## License

MIT License - see LICENSE file for details.
```

### 2. Documentation Website Standards
Each package will maintain up-to-date user documentation on the documentation website, which will be placed in `docs/docs/plugins/<package-name>.md`

#### File Naming and Organization
- **Package overview**: `docs/docs/plugins/<package-name>.md`
- **Consistent naming**: Use hyphenated lowercase names (e.g., `token-ring-app.md`)
- **CLI Plugin**: `cli.md` (not `cli-plugin.md` or `command-line-interface.md`)

#### Content Structure
Each documentation file should follow this structure:
1. **Title and Overview**: Clear title and brief description
2. **Key Features**: Bullet-point list of main capabilities
3. **Core Components**: Detailed breakdown of main classes, interfaces, and functions
4. **Services**: Documentation of TokenRingService implementations
5. **Provider Documentation**: If applicable, document provider interfaces
6. **RPC Endpoints**: If applicable, document RPC endpoints
7. **Chat Commands**: Document slash-prefixed commands available in the interface
8. **Configuration**: Configuration options and schemas
9. **Integration**: How the component integrates with other packages
10. **Usage Examples**: Practical code examples
11. **Best Practices**: Recommendations for usage
12. **Testing**: Testing setup and examples
13. **Dependencies**: Package dependencies and version requirements
14. **Related Components**: Cross-references to related components

#### Code Examples
- Use TypeScript syntax with proper imports
- Include error handling in examples
- Show both basic and advanced usage patterns
- Include event handling examples
- Show configuration examples
- Demonstrate integration with other packages
- For CLI packages, show both plugin and manual usage patterns
- For provider-based packages, show both registration patterns
- For provider extension packages, document both direct instantiation and plugin registration patterns
- For web-host packages, document both HTTP and WebSocket RPC clients
- For terminal packages, show session lifecycle and output collection examples
- For POSIX packages, document sandboxing modes and isolation levels
- For escalation packages, document communication channel patterns with async generators
- For chat packages, document context handlers and their usage patterns

#### Provider Documentation
For packages with provider architecture:
- Document provider interface definitions
- Show provider configuration schemas
- Include examples for both plugin-based and programmatic registration
- Document provider-specific options and capabilities
- Explain the KeyedRegistry pattern for provider management

### API Documentation
- Include method signatures with parameters and return types
- Document parameter descriptions and types
- Show example usage for each method
- Include error handling documentation
- Document event types and their usage
- Include configuration schema documentation

#### Integration Documentation
- Show how the component integrates with the agent system
- Document service registration patterns
- Show command and tool registration examples
- Include event handling integration
- Document human interface request patterns
- Show state management integration
- Document plugin installation and configuration

#### Testing and Development
- Include testing setup and examples
- Show build and development instructions
- Document package structure
- Include dependencies and version information
- Provide license and copyright information

### 3. Documentation Maintenance

#### Update Process
1. **Analyze current functionality**: Review plugin source code and implementation
2. **Compare with existing documentation**: Identify discrepancies and missing information
3. **Update README**: Modify or create README if needed to match current functionality
4. **Update website**: Update website documentation to match current functionality

#### Documentation Standards Enforcement
- **Consistency**: Ensure consistent terminology and formatting across all documentation
- **Accuracy**: Verify that all examples and code snippets are current and functional
- **Completeness**: Ensure all features and APIs are documented
- **Maintainability**: Use modular documentation structure that's easy to update
- **Accessibility**: Ensure documentation is clear and understandable to both technical and non-technical audiences

#### Documentation Tools
- **File System**: Use the filesystem tools to search for and update documentation files
- **Code Analysis**: Review source code to understand current functionality
- **Structure Verification**: Verify that documentation follows the established patterns
