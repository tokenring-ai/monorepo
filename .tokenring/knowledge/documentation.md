# Documentation Knowledge Repository

This file maintains knowledge about documentation standards, patterns, and structure in the Token Ring project.

## 1. Documentation Hierarchy and Structure

### Root Level Documentation
- **README.md**: Main project overview with applications (Coder/Writer), quick start, package ecosystem overview
- **PACKAGES.md**: Comprehensive package index with 58+ packages organized by category
- **DEPENDENCIES.md**: Dependency graph and relationships
- **AGENTS.md**: Agent definitions and capabilities

### Package-Level Documentation
- **Individual README.md files**: Each of the 58+ packages has its own detailed README
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
- **app/coder/README.md**: Comprehensive developer assistant application (58-package ecosystem)
- **app/writer/README.md**: Content creation and management application
- **app/webterminal/README.md**: Lightweight coding terminal interface

### Plugin Documentation
- **Website Documentation**: `docs/docs/plugins/<plugin-name>.md`
- **Consistent structure across all plugins**:
  - Overview and Purpose
  - Key Features
  - Core Components
  - API Reference
  - Usage Examples
  - Configuration
  - Integration
  - Best Practices
  - Testing and Development
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

### Documentation Structure Pattern
```markdown
# Package Name

## Overview
- Brief description of functionality
- Key features list with bullet points
- Integration points with other packages

## Core Components
- Main classes/services with APIs
- Interface definitions and contracts
- Configuration options and schemas

## Services and APIs
- Service interfaces and implementations
- Method signatures with parameters and return types
- Event streaming capabilities
- JSON-RPC endpoint documentation

## Commands and Tools
- Available commands with usage examples
- Tool descriptions and execution patterns
- Chat command integration patterns

## Event System
- Event types and their meanings
- Event streaming patterns
- Event handling examples

## State Management
- State slice documentation
- Persistence and restoration patterns
- Checkpoint generation and recovery

## Human Interface
- Request types and handling
- Response patterns
- Interactive workflows

## Configuration
- Configuration schemas and validation
- Environment variables
- Setup requirements and options

## Usage Examples
- Basic integration examples
- Advanced usage patterns
- Real-world scenarios and workflows

## API Reference
- Method signatures with full parameters
- Parameter descriptions and types
- Return types and values
- Error handling documentation

## Tools/Commands
- Available tools with input schemas
- Command reference with examples
- Chat commands and their usage
- Automation hooks and workflows

## Integration
- Package cross-references
- Dependency relationships
- Import patterns across packages
- Configuration sharing patterns

## Development
- License and copyright information
```

### Plugin Documentation Standards
```markdown
# Plugin Name

## Overview
- Clear title and brief description
- Key features list with bullet points
- Integration with TokenRing ecosystem

## Core Components
- Main service classes and their responsibilities
- Interface definitions and contracts
- Configuration schemas and validation

## Services and APIs
- Service interfaces and implementations
- Method signatures with parameters and return types
- Event streaming capabilities

## Commands and Tools
- Available chat commands with usage examples
- Command descriptions and output formats
- Integration with agent system

## Configuration
- Configuration examples and schema definitions
- Environment variables
- Setup requirements and options

## Usage Examples
- Basic integration examples
- Advanced usage patterns
- Real-world scenarios

## API Reference
- Method signatures with full parameters
- Parameter descriptions and types
- Return types and values
- Error handling documentation

## Integration
- How the plugin integrates with the agent system
- Service registration patterns
- Command and tool registration examples
- Event handling integration
- Human interface request patterns

## Monitoring and Debugging
- Monitoring capabilities
- Debugging tools and commands
- Error handling patterns
- Performance tracking

## Development
- Testing setup and examples
- Build and development instructions
- Package structure
- Dependencies and version information
- License and copyright information
```

## 4. Component-Level Documentation Standards

### File Naming and Organization
- **Component README**: `docs/docs/plugins/<component-name>.md`
- **Package overview**: `docs/docs/plugins/<package-name>.md`
- **Consistent naming**: Use hyphenated lowercase names (e.g., `token-ring-app.md`)
- **Category organization**: Group related components together in overview

### Content Structure
Each component documentation should follow this structure:
1. **Title and Overview**: Clear title and brief description
2. **Core Properties**: Key properties and their purposes
3. **Key Features**: Bullet-point list of main capabilities
4. **Core Methods/API**: Detailed breakdown of main methods and their usage
5. **Usage Examples**: Practical code examples
6. **Configuration**: Configuration options and schemas
7. **Integration**: How the component integrates with other packages
8. **Best Practices**: Recommendations for usage
9. **Testing**: Testing setup and examples
10. **Related Components**: Cross-references to related components

### Code Examples
- Use TypeScript syntax with proper imports
- Include error handling in examples
- Show both basic and advanced usage patterns
- Include event handling examples
- Show configuration examples
- Demonstrate integration with other packages

### API Documentation
- Include method signatures with parameters and return types
- Document parameter descriptions and types
- Show example usage for each method
- Include error handling documentation
- Document event types and their usage
- Include configuration schema documentation

### Integration Documentation
- Show how the component integrates with the agent system
- Document service registration patterns
- Show command and tool registration examples
- Include event handling integration
- Document human interface request patterns
- Show state management integration

### Testing and Development
- Include testing setup and examples
- Show build and development instructions
- Document package structure
- Include dependencies and version information
- Provide license and copyright information

## 6. Plugin Documentation Standards

### File Naming and Organization
- **Plugin README**: `pkg/<plugin-name>/README.md`
- **Plugin website documentation**: `docs/docs/plugins/<plugin-name>.md`
- **Consistent naming**: Use hyphenated lowercase names (e.g., `web-host.md`)
- **Category organization**: Group related plugins together in the overview

### Content Structure
Each plugin documentation should follow this structure:
1. **Title and Overview**: Clear title and brief description
2. **Key Features**: Bullet-point list of main capabilities
3. **Core Components**: Detailed breakdown of main classes and services
4. **API Reference**: Comprehensive method signatures and interfaces
5. **Usage Examples**: Practical code examples
6. **Configuration**: Configuration options and schemas
7. **Integration**: How the plugin integrates with other packages
8. **Monitoring and Debugging**: Tools for monitoring and debugging
9. **Development**: Testing, build instructions, and licensing

### Code Examples
- Use TypeScript syntax with proper imports
- Include error handling in examples
- Show both basic and advanced usage patterns
- Include event handling examples
- Show configuration examples
- Demonstrate integration with other packages

### API Documentation
- Include method signatures with parameters and return types
- Document parameter descriptions and types
- Show example usage for each method
- Include error handling documentation
- Document event types and their usage
- Include configuration schema documentation

### Integration Documentation
- Show how the plugin integrates with the agent system
- Document service registration patterns
- Show command and tool registration examples
- Include event handling integration
- Document human interface request patterns
- Show state management integration

### Testing and Development
- Include testing setup and examples
- Show build and development instructions
- Document package structure
- Include dependencies and version information
- Provide license and copyright information

### Monitoring and Debugging Documentation
- Include monitoring capabilities and tools
- Document debugging commands and output formats
- Show error handling patterns
- Include performance tracking information
- Document logging and output patterns

## 7. Documentation Maintenance

### Update Process
1. **Analyze current functionality**: Review plugin source code and implementation
2. **Compare with existing documentation**: Identify discrepancies and missing information
3. **Update README**: Modify or create README if needed to match current functionality
4. **Update website**: Update website documentation to match current functionality
5. **Update knowledge repository**: Update this documentation knowledge repository with any new patterns or standards

### Documentation Standards Enforcement
- **Consistency**: Ensure consistent terminology and formatting across all documentation
- **Accuracy**: Verify that all examples and code snippets are current and functional
- **Completeness**: Ensure all features and APIs are documented
- **Maintainability**: Use modular documentation structure that's easy to update
- **Accessibility**: Ensure documentation is clear and understandable to both technical and non-technical audiences

### Documentation Tools
- **File System**: Use the filesystem tools to search for and update documentation files
- **Code Analysis**: Review source code to understand current functionality
- **Example Testing**: Test code examples to ensure they work with current versions
- **Structure Verification**: Verify that documentation follows the established patterns

### Documentation Review Process
1. **Technical Review**: Verify accuracy and completeness of technical content
2. **Example Verification**: Test all code examples for functionality
3. **Structure Review**: Ensure documentation follows established patterns
4. **Consistency Check**: Verify consistent terminology and formatting
5. **Accessibility Review**: Ensure documentation is clear and understandable
