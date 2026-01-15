# UI/UX Knowledge Repository

This file maintains knowledge about user interface design, user experience patterns, and design systems in the TokenRing project.

## Project Overview

### Main Applications
1. **Web Frontend** (@tokenring-ai/web-frontend) - Interactive web-based interfaces
2. **CLI Applications** (@tokenring-ai/cli, @tokenring-ai/cli-ink) - Command-line interfaces  
3. **Feedback Systems** (@tokenring-ai/feedback) - User feedback and interaction capture

### Key UI/UX Packages
- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-frontend**: React frontend with CLI-style interface
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI)
- **@tokenring-ai/inquirer-command-prompt**: Interactive command prompt with history
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selections for hierarchical data

## Discovered UI/UX Information

### 1. Package Architecture and Design Patterns

#### Agent-Centric Architecture
The UI design follows an **agent-centric approach** where all functionality is exposed through agent tools and commands. This creates a unified interface pattern across different interaction modalities.

#### Multi-Modal Interface Support
- **Command-Line Interface (CLI)**: REPL-based interactions using Inquirer.js
- **React Ink**: Terminal UI using React components
- **Web Frontend**: Browser-based interface with CLI-style interactions
- **Feedback Systems**: Human-in-the-loop interactions for review and approval

#### Cross-Package UI Integration
The ecosystem shows sophisticated UI integration across packages:
- CLI uses Inquirer.js for interactive prompts (command-prompt, tree-selector)
- Feedback systems integrate with browser previews for file review
- Web-frontend provides unified interface combining CLI and web patterns

### 2. Interaction Design Patterns

#### Command-Based Workflows
- **Slash Commands**: `/help`, `/edit`, `/multi`, `/git`, `/memory`, `/queue`, etc.
- **Agent Selection**: Dynamic agent switching in REPL
- **Context Injection**: Tools for injecting codebases, files, and context into conversations
- **Keyboard Shortcuts**: Ctrl-T for quick actions and navigation

#### Human-in-the-Loop Design
- **File Feedback**: Preview and review files (text/MD/HTML/JSON)
- **React Component Preview**: Browser-based component testing
- **Approval Workflows**: User approval for tasks and modifications
- **Question Systems**: Text, single-choice, and multiple-choice questioning

#### Multi-Agent Orchestration
- **Team Coordination**: Multiple specialized agents working together
- **Agent Communication**: Inter-agent messaging and task delegation
- **Role-Based Interfaces**: Different UI patterns for different agent roles

### 3. User Experience Principles

#### Consistent Interaction Model
All interfaces maintain consistent command patterns and interaction flows across CLI, web, and feedback systems.

#### Progressive Disclosure
- **Tool Registration**: Dynamic tool registration based on available packages
- **Contextual Help**: Agent-specific help and documentation
- **Layered Complexity**: Simple interactions with advanced features available as needed

#### Persistent State
- **Chat Sessions**: Persistent conversations in SQLite
- **Checkpoints**: Agent state persistence across sessions
- **History Management**: Command and conversation history

### 4. Context Injection Design Patterns

#### Three Sophisticated Approaches

**Registry-Based Context Providers**
- Centralized registry system with explicit provider registration
- Priority-based context ordering
- Selective enabling/disabling of context sources
- Token estimation and metadata tracking

**Pipeline-Based Context Assembly**
- Pipeline architecture with stages of processors, filters, transformers
- Composable context processing with collectors, enrichers, filters
- Token budget management and relevance scoring
- Configurable pipeline stages

**Declarative Context Configuration**
- Query language for context requirements
- Declarative specification of context sources
- Runtime query overrides
- Constraint-based context filtering

### 5. Real-Time Communication Architecture

#### WebSocket-Based Communication
```typescript
// Real-time event handling in web frontend
client.on('event:output.chat', (data) => setMessages(m => [...m, {type: 'chat', content: data.content}]));
client.on('event:output.reasoning', (data) => setMessages(m => [...m, {type: 'reasoning', content: data.content}]));
client.on('event:state.busy', (data) => setBusy(true));
client.on('event:human.request', (data) => handleHumanInput(data));
```

#### Event-Driven UI Updates
- **Chat Messages**: Green color for agent responses
- **Reasoning Output**: Yellow for agent thinking process
- **System Messages**: Blue for info, yellow for warnings, red for errors
- **User Input**: Cyan for user messages
- **Busy States**: Loading indicators during processing

### 6. Specialized Design Agents

#### UI/UX Designer Agent
- **Purpose**: Design user interfaces, user experiences, and visual prototypes
- **Capabilities**: Wireframes, design systems, user flows, accessibility guidelines
- **Knowledge Repository**: Maintains `.tokenring/knowledge/ui-ux.md`

#### Product Design Engineer Agent
- **Purpose**: Product enhancement and PRD creation
- **Capabilities**: User experience optimization, feature specification, competitive analysis
- **Focus**: User-centric design thinking with technical constraints

#### API Designer Agent
- **Purpose**: Design and implement REST/GraphQL APIs
- **Capabilities**: API specifications, endpoint design, service contracts
- **Knowledge Repository**: Maintains `.tokenring/knowledge/apis.md`

### 7. Web Frontend Architecture

#### React-Based Interface
```typescript
// Component structure
export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
}
```

#### Features
- **Agent Management**: Select from running agents or create new ones
- **Real-time Display**: All agent events (chat, reasoning, system, input)
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Terminal-inspired interface for comfortable extended use

### 8. Feedback System Architecture

#### Human Interaction Tools
```typescript
// askHuman tool for human questioning
const result = await askHuman.execute({
  question: "What improvements would you suggest?",
  choices: ["Option A", "Option B", "Option C"],
  response_type: "multiple"
}, agent);

// getFileFeedback for file review
const result = await getFileFeedback.execute({
  filePath: "docs/sample.md",
  content: content,
  contentType: "text/markdown"
}, agent);
```

#### Supported Content Types
- **Text**: Plain text display
- **Markdown**: Rendering with syntax highlighting
- **HTML**: Content in iframe
- **JSON**: Syntax highlighted JSON display
- **React Components**: Browser-based component preview

### 9. CLI Design Patterns

#### Interactive Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show available commands | `/help` |
| `/exit` | Exit current agent | `/exit` |
| `/multi` | Open editor for multiline input | `/multi` |
| `/edit` | Open system editor for prompt | `/edit [text]` |

#### Keyboard Shortcuts
- **Ctrl-T Actions**: Help, create agent, switch agents, exit, detach
- **Navigation**: Arrow keys for command history
- **Cancellation**: Esc and Ctrl-C for operation abort

### 10. Accessibility and Responsive Design

#### Accessibility Features
- **Keyboard Navigation**: Full keyboard support across all interfaces
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Dark theme with appropriate contrast ratios
- **Focus Management**: Automatic focus restoration

#### Responsive Patterns
- **Adaptive Layouts**: Different UI patterns for CLI, web, and mobile
- **Progressive Enhancement**: Core functionality works across all devices
- **Touch-Friendly**: Appropriate touch targets for mobile interfaces

### 11. Design System Components

#### Consistent UI Elements
- **Message Types**: Consistent styling for chat, reasoning, system, input messages
- **Agent Cards**: Unified agent selection and management interface
- **Command Prompts**: Standardized input handling across interfaces
- **Status Indicators**: Consistent busy, idle, and error state displays

#### Theme and Styling
- **Dark Theme**: Primary theme for comfortable extended use
- **Syntax Highlighting**: Code and content highlighting
- **Consistent Colors**: Green (chat), yellow (reasoning), blue (system), cyan (input)
- **Typography**: Consistent font families and sizing

### 12. User Journey Mapping

#### Typical User Flows

**Developer Workflow**:
1. Start CLI or web interface
2. Select or create appropriate agent
3. Ask questions or issue commands
4. Receive AI responses with reasoning
5. Request file modifications or reviews
6. Approve or reject changes
7. Continue conversation or switch agents

**Content Creator Workflow**:
1. Access Writer application
2. Select writing agent
3. Provide content requirements
4. Review generated content
5. Request revisions or edits
6. Publish to target platforms

### 13. Integration with Development Tools

#### File System Integration
- **File Tree Selection**: Hierarchical file browsing with tree-selector
- **Content Preview**: Real-time file content display
- **Edit Integration**: Direct editor integration for file modifications

#### Version Control Integration
- **Git Commands**: Built-in git operations through CLI
- **Change Visualization**: Diff viewing and change tracking
- **Commit Management**: Automated commits with AI-generated messages

### 14. Performance and UX Optimization

#### Real-Time Performance
- **WebSocket Communication**: Low-latency agent communication
- **Incremental Updates**: Partial message rendering for better responsiveness
- **Auto-scroll**: Automatic scrolling to latest messages
- **Focus Management**: Smart input focus restoration

#### Loading States
- **Busy Indicators**: Spinners and progress messages
- **Lazy Loading**: Progressive content loading
- **Error Handling**: Graceful error recovery and user feedback

This comprehensive UI/UX architecture demonstrates a sophisticated, multi-modal approach to AI agent interaction, emphasizing human-centered design, accessibility, and consistent user experiences across different platforms and interaction modes.# UI/UX Knowledge Repository

This file maintains knowledge about user interface design, user experience patterns, and design systems in the TokenRing project.

## Project Overview

### Main Applications
1. **Web Frontend** (@tokenring-ai/web-frontend) - Interactive web-based interfaces
2. **CLI Applications** (@tokenring-ai/cli, @tokenring-ai/cli-ink) - Command-line interfaces  
3. **Feedback Systems** (@tokenring-ai/feedback) - User feedback and interaction capture

### Key UI/UX Packages
- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-frontend**: React frontend with CLI-style interface
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI)
- **@tokenring-ai/inquirer-command-prompt**: Interactive command prompt with history
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selections for hierarchical data

## Discovered UI/UX Information

### 1. Package Architecture and Design Patterns

#### Agent-Centric Architecture
The UI design follows an **agent-centric approach** where all functionality is exposed through agent tools and commands. This creates a unified interface pattern across different interaction modalities.

#### Multi-Modal Interface Support
- **Command-Line Interface (CLI)**: REPL-based interactions using Inquirer.js
- **React Ink**: Terminal UI using React components
- **Web Frontend**: Browser-based interface with CLI-style interactions
- **Feedback Systems**: Human-in-the-loop interactions for review and approval

#### Cross-Package UI Integration
The ecosystem shows sophisticated UI integration across packages:
- CLI uses Inquirer.js for interactive prompts (command-prompt, tree-selector)
- Feedback systems integrate with browser previews for file review
- Web-frontend provides unified interface combining CLI and web patterns

### 2. Interaction Design Patterns

#### Command-Based Workflows
- **Slash Commands**: `/help`, `/edit`, `/multi`, `/git`, `/memory`, `/queue`, etc.
- **Agent Selection**: Dynamic agent switching in REPL
- **Context Injection**: Tools for injecting codebases, files, and context into conversations
- **Keyboard Shortcuts**: Ctrl-T for quick actions and navigation

#### Human-in-the-Loop Design
- **File Feedback**: Preview and review files (text/MD/HTML/JSON)
- **React Component Preview**: Browser-based component testing
- **Approval Workflows**: User approval for tasks and modifications
- **Question Systems**: Text, single-choice, and multiple-choice questioning

#### Multi-Agent Orchestration
- **Team Coordination**: Multiple specialized agents working together
- **Agent Communication**: Inter-agent messaging and task delegation
- **Role-Based Interfaces**: Different UI patterns for different agent roles

### 3. User Experience Principles

#### Consistent Interaction Model
All interfaces maintain consistent command patterns and interaction flows across CLI, web, and feedback systems.

#### Progressive Disclosure
- **Tool Registration**: Dynamic tool registration based on available packages
- **Contextual Help**: Agent-specific help and documentation
- **Layered Complexity**: Simple interactions with advanced features available as needed

#### Persistent State
- **Chat Sessions**: Persistent conversations in SQLite
- **Checkpoints**: Agent state persistence across sessions
- **History Management**: Command and conversation history

### 4. Context Injection Design Patterns

#### Three Sophisticated Approaches

**Registry-Based Context Providers**
- Centralized registry system with explicit provider registration
- Priority-based context ordering
- Selective enabling/disabling of context sources
- Token estimation and metadata tracking

**Pipeline-Based Context Assembly**
- Pipeline architecture with stages of processors, filters, transformers
- Composable context processing with collectors, enrichers, filters
- Token budget management and relevance scoring
- Configurable pipeline stages

**Declarative Context Configuration**
- Query language for context requirements
- Declarative specification of context sources
- Runtime query overrides
- Constraint-based context filtering

### 5. Real-Time Communication Architecture

#### WebSocket-Based Communication
```typescript
// Real-time event handling in web frontend
client.on('event:output.chat', (data) => setMessages(m => [...m, {type: 'chat', content: data.content}]));
client.on('event:output.reasoning', (data) => setMessages(m => [...m, {type: 'reasoning', content: data.content}]));
client.on('event:state.busy', (data) => setBusy(true));
client.on('event:human.request', (data) => handleHumanInput(data));
```

#### Event-Driven UI Updates
- **Chat Messages**: Green color for agent responses
- **Reasoning Output**: Yellow for agent thinking process
- **System Messages**: Blue for info, yellow for warnings, red for errors
- **User Input**: Cyan for user messages
- **Busy States**: Loading indicators during processing

### 6. Specialized Design Agents

#### UI/UX Designer Agent
- **Purpose**: Design user interfaces, user experiences, and visual prototypes
- **Capabilities**: Wireframes, design systems, user flows, accessibility guidelines
- **Knowledge Repository**: Maintains `.tokenring/knowledge/ui-ux.md`

#### Product Design Engineer Agent
- **Purpose**: Product enhancement and PRD creation
- **Capabilities**: User experience optimization, feature specification, competitive analysis
- **Focus**: User-centric design thinking with technical constraints

#### API Designer Agent
- **Purpose**: Design and implement REST/GraphQL APIs
- **Capabilities**: API specifications, endpoint design, service contracts
- **Knowledge Repository**: Maintains `.tokenring/knowledge/apis.md`

### 7. Web Frontend Architecture

#### React-Based Interface
```typescript
// Component structure
export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
}
```

#### Features
- **Agent Management**: Select from running agents or create new ones
- **Real-time Display**: All agent events (chat, reasoning, system, input)
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Terminal-inspired interface for comfortable extended use

### 8. Feedback System Architecture

#### Human Interaction Tools
```typescript
// askHuman tool for human questioning
const result = await askHuman.execute({
  question: "What improvements would you suggest?",
  choices: ["Option A", "Option B", "Option C"],
  response_type: "multiple"
}, agent);

// getFileFeedback for file review
const result = await getFileFeedback.execute({
  filePath: "docs/sample.md",
  content: content,
  contentType: "text/markdown"
}, agent);
```

#### Supported Content Types
- **Text**: Plain text display
- **Markdown**: Rendering with syntax highlighting
- **HTML**: Content in iframe
- **JSON**: Syntax highlighted JSON display
- **React Components**: Browser-based component preview

### 9. CLI Design Patterns

#### Interactive Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show available commands | `/help` |
| `/exit` | Exit current agent | `/exit` |
| `/multi` | Open editor for multiline input | `/multi` |
| `/edit` | Open system editor for prompt | `/edit [text]` |

#### Keyboard Shortcuts
- **Ctrl-T Actions**: Help, create agent, switch agents, exit, detach
- **Navigation**: Arrow keys for command history
- **Cancellation**: Esc and Ctrl-C for operation abort

### 10. Accessibility and Responsive Design

#### Accessibility Features
- **Keyboard Navigation**: Full keyboard support across all interfaces
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Dark theme with appropriate contrast ratios
- **Focus Management**: Automatic focus restoration

#### Responsive Patterns
- **Adaptive Layouts**: Different UI patterns for CLI, web, and mobile
- **Progressive Enhancement**: Core functionality works across all devices
- **Touch-Friendly**: Appropriate touch targets for mobile interfaces

### 11. Design System Components

#### Consistent UI Elements
- **Message Types**: Consistent styling for chat, reasoning, system, input messages
- **Agent Cards**: Unified agent selection and management interface
- **Command Prompts**: Standardized input handling across interfaces
- **Status Indicators**: Consistent busy, idle, and error state displays

#### Theme and Styling
- **Dark Theme**: Primary theme for comfortable extended use
- **Syntax Highlighting**: Code and content highlighting
- **Consistent Colors**: Green (chat), yellow (reasoning), blue (system), cyan (input)
- **Typography**: Consistent font families and sizing

### 12. User Journey Mapping

#### Typical User Flows

**Developer Workflow**:
1. Start CLI or web interface
2. Select or create appropriate agent
3. Ask questions or issue commands
4. Receive AI responses with reasoning
5. Request file modifications or reviews
6. Approve or reject changes
7. Continue conversation or switch agents

**Content Creator Workflow**:
1. Access Writer application
2. Select writing agent
3. Provide content requirements
4. Review generated content
5. Request revisions or edits
6. Publish to target platforms

### 13. Integration with Development Tools

#### File System Integration
- **File Tree Selection**: Hierarchical file browsing with tree-selector
- **Content Preview**: Real-time file content display
- **Edit Integration**: Direct editor integration for file modifications

#### Version Control Integration
- **Git Commands**: Built-in git operations through CLI
- **Change Visualization**: Diff viewing and change tracking
- **Commit Management**: Automated commits with AI-generated messages

### 14. Performance and UX Optimization

#### Real-Time Performance
- **WebSocket Communication**: Low-latency agent communication
- **Incremental Updates**: Partial message rendering for better responsiveness
- **Auto-scroll**: Automatic scrolling to latest messages
- **Focus Management**: Smart input focus restoration

#### Loading States
- **Busy Indicators**: Spinners and progress messages
- **Lazy Loading**: Progressive content loading
- **Error Handling**: Graceful error recovery and user feedback

This comprehensive UI/UX architecture demonstrates a sophisticated, multi-modal approach to AI agent interaction, emphasizing human-centered design, accessibility, and consistent user experiences across different platforms and interaction modes.# UI/UX Knowledge Repository

This file maintains knowledge about user interface design, user experience patterns, and design systems in the TokenRing project.

## Project Overview

### Main Applications
1. **Web Frontend** (@tokenring-ai/web-frontend) - Interactive web-based interfaces
2. **CLI Applications** (@tokenring-ai/cli, @tokenring-ai/cli-ink) - Command-line interfaces  
3. **Feedback Systems** (@tokenring-ai/feedback) - User feedback and interaction capture

### Key UI/UX Packages
- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-frontend**: React frontend with CLI-style interface
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI)
- **@tokenring-ai/inquirer-command-prompt**: Interactive command prompt with history
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selections for hierarchical data

## Discovered UI/UX Information

### 1. Package Architecture and Design Patterns

#### Agent-Centric Architecture
The UI design follows an **agent-centric approach** where all functionality is exposed through agent tools and commands. This creates a unified interface pattern across different interaction modalities.

#### Multi-Modal Interface Support
- **Command-Line Interface (CLI)**: REPL-based interactions using Inquirer.js
- **React Ink**: Terminal UI using React components
- **Web Frontend**: Browser-based interface with CLI-style interactions
- **Feedback Systems**: Human-in-the-loop interactions for review and approval

#### Cross-Package UI Integration
The ecosystem shows sophisticated UI integration across packages:
- CLI uses Inquirer.js for interactive prompts (command-prompt, tree-selector)
- Feedback systems integrate with browser previews for file review
- Web-frontend provides unified interface combining CLI and web patterns

### 2. Interaction Design Patterns

#### Command-Based Workflows
- **Slash Commands**: `/help`, `/edit`, `/multi`, `/git`, `/memory`, `/queue`, etc.
- **Agent Selection**: Dynamic agent switching in REPL
- **Context Injection**: Tools for injecting codebases, files, and context into conversations
- **Keyboard Shortcuts**: Ctrl-T for quick actions and navigation

#### Human-in-the-Loop Design
- **File Feedback**: Preview and review files (text/MD/HTML/JSON)
- **React Component Preview**: Browser-based component testing
- **Approval Workflows**: User approval for tasks and modifications
- **Question Systems**: Text, single-choice, and multiple-choice questioning

#### Multi-Agent Orchestration
- **Team Coordination**: Multiple specialized agents working together
- **Agent Communication**: Inter-agent messaging and task delegation
- **Role-Based Interfaces**: Different UI patterns for different agent roles

### 3. User Experience Principles

#### Consistent Interaction Model
All interfaces maintain consistent command patterns and interaction flows across CLI, web, and feedback systems.

#### Progressive Disclosure
- **Tool Registration**: Dynamic tool registration based on available packages
- **Contextual Help**: Agent-specific help and documentation
- **Layered Complexity**: Simple interactions with advanced features available as needed

#### Persistent State
- **Chat Sessions**: Persistent conversations in SQLite
- **Checkpoints**: Agent state persistence across sessions
- **History Management**: Command and conversation history

### 4. Context Injection Design Patterns

#### Three Sophisticated Approaches

**Registry-Based Context Providers**
- Centralized registry system with explicit provider registration
- Priority-based context ordering
- Selective enabling/disabling of context sources
- Token estimation and metadata tracking

**Pipeline-Based Context Assembly**
- Pipeline architecture with stages of processors, filters, transformers
- Composable context processing with collectors, enrichers, filters
- Token budget management and relevance scoring
- Configurable pipeline stages

**Declarative Context Configuration**
- Query language for context requirements
- Declarative specification of context sources
- Runtime query overrides
- Constraint-based context filtering

### 5. Real-Time Communication Architecture

#### WebSocket-Based Communication
```typescript
// Real-time event handling in web frontend
client.on('event:output.chat', (data) => setMessages(m => [...m, {type: 'chat', content: data.content}]));
client.on('event:output.reasoning', (data) => setMessages(m => [...m, {type: 'reasoning', content: data.content}]));
client.on('event:state.busy', (data) => setBusy(true));
client.on('event:human.request', (data) => handleHumanInput(data));
```

#### Event-Driven UI Updates
- **Chat Messages**: Green color for agent responses
- **Reasoning Output**: Yellow for agent thinking process
- **System Messages**: Blue for info, yellow for warnings, red for errors
- **User Input**: Cyan for user messages
- **Busy States**: Loading indicators during processing

### 6. Specialized Design Agents

#### UI/UX Designer Agent
- **Purpose**: Design user interfaces, user experiences, and visual prototypes
- **Capabilities**: Wireframes, design systems, user flows, accessibility guidelines
- **Knowledge Repository**: Maintains `.tokenring/knowledge/ui-ux.md`

#### Product Design Engineer Agent
- **Purpose**: Product enhancement and PRD creation
- **Capabilities**: User experience optimization, feature specification, competitive analysis
- **Focus**: User-centric design thinking with technical constraints

#### API Designer Agent
- **Purpose**: Design and implement REST/GraphQL APIs
- **Capabilities**: API specifications, endpoint design, service contracts
- **Knowledge Repository**: Maintains `.tokenring/knowledge/apis.md`

### 7. Web Frontend Architecture

#### React-Based Interface
```typescript
// Component structure
export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
}
```

#### Features
- **Agent Management**: Select from running agents or create new ones
- **Real-time Display**: All agent events (chat, reasoning, system, input)
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Terminal-inspired interface for comfortable extended use

### 8. Feedback System Architecture

#### Human Interaction Tools
```typescript
// askHuman tool for human questioning
const result = await askHuman.execute({
  question: "What improvements would you suggest?",
  choices: ["Option A", "Option B", "Option C"],
  response_type: "multiple"
}, agent);

// getFileFeedback for file review
const result = await getFileFeedback.execute({
  filePath: "docs/sample.md",
  content: content,
  contentType: "text/markdown"
}, agent);
```

#### Supported Content Types
- **Text**: Plain text display
- **Markdown**: Rendering with syntax highlighting
- **HTML**: Content in iframe
- **JSON**: Syntax highlighted JSON display
- **React Components**: Browser-based component preview

### 9. CLI Design Patterns

#### Interactive Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show available commands | `/help` |
| `/exit` | Exit current agent | `/exit` |
| `/multi` | Open editor for multiline input | `/multi` |
| `/edit` | Open system editor for prompt | `/edit [text]` |

#### Keyboard Shortcuts
- **Ctrl-T Actions**: Help, create agent, switch agents, exit, detach
- **Navigation**: Arrow keys for command history
- **Cancellation**: Esc and Ctrl-C for operation abort

### 10. Accessibility and Responsive Design

#### Accessibility Features
- **Keyboard Navigation**: Full keyboard support across all interfaces
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Dark theme with appropriate contrast ratios
- **Focus Management**: Automatic focus restoration

#### Responsive Patterns
- **Adaptive Layouts**: Different UI patterns for CLI, web, and mobile
- **Progressive Enhancement**: Core functionality works across all devices
- **Touch-Friendly**: Appropriate touch targets for mobile interfaces

### 11. Design System Components

#### Consistent UI Elements
- **Message Types**: Consistent styling for chat, reasoning, system, input messages
- **Agent Cards**: Unified agent selection and management interface
- **Command Prompts**: Standardized input handling across interfaces
- **Status Indicators**: Consistent busy, idle, and error state displays

#### Theme and Styling
- **Dark Theme**: Primary theme for comfortable extended use
- **Syntax Highlighting**: Code and content highlighting
- **Consistent Colors**: Green (chat), yellow (reasoning), blue (system), cyan (input)
- **Typography**: Consistent font families and sizing

### 12. User Journey Mapping

#### Typical User Flows

**Developer Workflow**:
1. Start CLI or web interface
2. Select or create appropriate agent
3. Ask questions or issue commands
4. Receive AI responses with reasoning
5. Request file modifications or reviews
6. Approve or reject changes
7. Continue conversation or switch agents

**Content Creator Workflow**:
1. Access Writer application
2. Select writing agent
3. Provide content requirements
4. Review generated content
5. Request revisions or edits
6. Publish to target platforms

### 13. Integration with Development Tools

#### File System Integration
- **File Tree Selection**: Hierarchical file browsing with tree-selector
- **Content Preview**: Real-time file content display
- **Edit Integration**: Direct editor integration for file modifications

#### Version Control Integration
- **Git Commands**: Built-in git operations through CLI
- **Change Visualization**: Diff viewing and change tracking
- **Commit Management**: Automated commits with AI-generated messages

### 14. Performance and UX Optimization

#### Real-Time Performance
- **WebSocket Communication**: Low-latency agent communication
- **Incremental Updates**: Partial message rendering for better responsiveness
- **Auto-scroll**: Automatic scrolling to latest messages
- **Focus Management**: Smart input focus restoration

#### Loading States
- **Busy Indicators**: Spinners and progress messages
- **Lazy Loading**: Progressive content loading
- **Error Handling**: Graceful error recovery and user feedback

### 15. Modern WebTerminal Design Analysis

#### Dark Mode UI Design Philosophy
The WebTerminal application implements a sophisticated dark mode interface with:

**Color Palette**:
- **Background**: `#0f0f14` (Deep blue-black)
- **Surfaces**: `#1a1b26` (Slightly lighter dark blue)
- **Hover States**: `#252638` (Mid-tone for interaction feedback)
- **Primary Text**: `#e0e0e0` (Light gray for readability)
- **Secondary Text**: `#a0a0b0` (Dimmed for hierarchy)
- **Accent Color**: `#7c3aed` (Vibrant purple for highlights)
- **Success**: `#4ade80` (Green for positive states)
- **Borders**: `#2a2b3a` (Subtle definition)

#### Layout Architecture
- **Top Navigation Bar**: Clean gradient background with branding and user controls
- **Sidebar Navigation**: Icon-based vertical navigation with tooltips
- **File Explorer**: Tree view with expandable folders and color-coded icons
- **Terminal Interface**: Dockable terminal with command history
- **Chat Interface**: Message bubbles with syntax highlighting
- **Settings Panel**: Organized settings with toggle switches and sliders

#### Interactive Elements
- **Hover States**: Subtle animations and visual feedback
- **Glassmorphism Effects**: Modern UI elements with transparency
- **Smooth Animations**: Micro-interactions and transitions
- **Custom Form Controls**: Styled range sliders, input fields, and buttons
- **Context-Sensitive Menus**: Dynamic menus based on current context

### 16. Human Interface Request Patterns

#### Structured Interaction Types
The system implements a comprehensive human interface request system:

```typescript
export type HumanInterfaceDefinitions = {
  askForConfirmation: {
    request: { message: string; default?: boolean; timeout?: number };
    response: boolean;
  };
  openWebPage: {
    request: { url: string };
    response: boolean;
  };
  askForText: {
    request: { message: string };
    response: string | null;
  };
  askForPassword: {
    request: { message: string };
    response: string | null;
  };
  askForSingleTreeSelection: {
    request: { message?: string; tree: TreeLeaf; initialSelection?: string; loop?: boolean };
    response: string | null;
  };
  askForMultipleTreeSelection: {
    request: { message?: string; tree: TreeLeaf; initialSelection?: Iterable<string>; loop?: boolean };
    response: string[] | null;
  };
};
```

#### Tree-Based Selection Patterns
- **Hierarchical Data**: Tree structures for complex data selection
- **Single Selection**: Pick one item from tree hierarchy
- **Multiple Selection**: Select multiple items with iteration support
- **Initial Selection**: Pre-select items based on context
- **Looping**: Allow users to cycle through options

### 17. Template System UI Patterns

#### AI Template Integration
The template system provides structured prompt management:

**User Stories**:
- **Run Templates**: `/template run <templateName> <input>`
- **List Templates**: `/template list`
- **Template Info**: `/template info <templateName>`

**Template Chaining**:
- Multi-step processing workflows
- Output passing between templates
- Circular reference prevention
- Combined result presentation

#### Command Line Interface Design
```typescript
// Template execution flow
const template = templateRegistry.get("translateToFrench");
const chatRequest = await template("Hello world");
const response = await aiClient.streamChat(chatRequest);
```

### 18. Context Handler Integration Patterns

#### File System Context
The codebase integration provides rich file system context:

**File Tree Display**:
```typescript
// Directory tree generation
yield {
  role: "user",
  content: `// Directory Tree of project files:\n${Array.from(fileTreeFiles).sort().join("\n")}`
};
```

**Complete File Content**:
```typescript
// Full file content with syntax
yield {
  role: "user",
  content: `// Complete contents of file: ${file}\n${content}`
};
```

#### Database Context Integration
Available databases are presented as structured context:

```typescript
yield {
  role: "user",
  content: "/* These are the databases available for the database tool */:\n" +
    available.map((name) => `- ${name}`).join("\n")
};
```

### 19. CLI Vault Interface Design

#### Secure CLI Patterns
The vault CLI implements secure password handling:

**Interactive Password Entry**:
```typescript
async function askPassword(message: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    process.stdin.setRawMode(true);
    // Secure password handling with raw mode
  });
}
```

**Command Structure**:
- `vault init` - Initialize new vault
- `vault get <key>` - Retrieve secret value
- `vault set <key> <value>` - Set secret value
- `vault list` - List all keys
- `vault remove <key>` - Remove secret
- `vault change-password` - Update password
- `vault run <command>` - Execute with secrets

### 20. Documentation Engineering Patterns

#### Hierarchical Documentation Architecture
- **Root Level**: README.md, PACKAGES.md, DEPENDENCIES.md
- **Package Level**: Individual package documentation
- **Application Level**: App-specific documentation
- **Comprehensive Site**: 94+ markdown files with navigation

#### Consistent Documentation Templates
Universal structure pattern across 50+ packages:
- Overview/Purpose
- Installation/Setup
- Package Structure
- Core Components
- Usage Examples
- API Reference
- Tools/Commands
- Configuration
- Dependencies
- Development

#### Cross-Package Integration Documentation
- **Agent-Centric Architecture**: All packages integrate through @tokenring-ai/agent
- **Service Registry Patterns**: Clear service contracts and lifecycle
- **Tool Registration**: Standardized tool interfaces
- **Hook System Integration**: Documented integration patterns

This comprehensive UI/UX architecture demonstrates a sophisticated, multi-modal approach to AI agent interaction, emphasizing human-centered design, accessibility, and consistent user experiences across different platforms and interaction modes.# UI/UX Knowledge Repository

This file maintains knowledge about user interface design, user experience patterns, and design systems in the TokenRing project.

## Project Overview

### Main Applications
1. **Web Frontend** (@tokenring-ai/web-frontend) - Interactive web-based interfaces
2. **CLI Applications** (@tokenring-ai/cli, @tokenring-ai/cli-ink) - Command-line interfaces  
3. **Feedback Systems** (@tokenring-ai/feedback) - User feedback and interaction capture

### Key UI/UX Packages
- **@tokenring-ai/cli**: REPL service with interactive prompts
- **@tokenring-ai/cli-ink**: React Ink-based CLI interface
- **@tokenring-ai/web-frontend**: React frontend with CLI-style interface
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI)
- **@tokenring-ai/inquirer-command-prompt**: Interactive command prompt with history
- **@tokenring-ai/inquirer-tree-selector**: Tree-based selections for hierarchical data

## Discovered UI/UX Information

### 1. Package Architecture and Design Patterns

#### Agent-Centric Architecture
The UI design follows an **agent-centric approach** where all functionality is exposed through agent tools and commands. This creates a unified interface pattern across different interaction modalities.

#### Multi-Modal Interface Support
- **Command-Line Interface (CLI)**: REPL-based interactions using Inquirer.js
- **React Ink**: Terminal UI using React components
- **Web Frontend**: Browser-based interface with CLI-style interactions
- **Feedback Systems**: Human-in-the-loop interactions for review and approval

#### Cross-Package UI Integration
The ecosystem shows sophisticated UI integration across packages:
- CLI uses Inquirer.js for interactive prompts (command-prompt, tree-selector)
- Feedback systems integrate with browser previews for file review
- Web-frontend provides unified interface combining CLI and web patterns

### 2. Interaction Design Patterns

#### Command-Based Workflows
- **Slash Commands**: `/help`, `/edit`, `/multi`, `/git`, `/memory`, `/queue`, etc.
- **Agent Selection**: Dynamic agent switching in REPL
- **Context Injection**: Tools for injecting codebases, files, and context into conversations
- **Keyboard Shortcuts**: Ctrl-T for quick actions and navigation

#### Human-in-the-Loop Design
- **File Feedback**: Preview and review files (text/MD/HTML/JSON)
- **React Component Preview**: Browser-based component testing
- **Approval Workflows**: User approval for tasks and modifications
- **Question Systems**: Text, single-choice, and multiple-choice questioning

#### Multi-Agent Orchestration
- **Team Coordination**: Multiple specialized agents working together
- **Agent Communication**: Inter-agent messaging and task delegation
- **Role-Based Interfaces**: Different UI patterns for different agent roles

### 3. User Experience Principles

#### Consistent Interaction Model
All interfaces maintain consistent command patterns and interaction flows across CLI, web, and feedback systems.

#### Progressive Disclosure
- **Tool Registration**: Dynamic tool registration based on available packages
- **Contextual Help**: Agent-specific help and documentation
- **Layered Complexity**: Simple interactions with advanced features available as needed

#### Persistent State
- **Chat Sessions**: Persistent conversations in SQLite
- **Checkpoints**: Agent state persistence across sessions
- **History Management**: Command and conversation history

### 4. Context Injection Design Patterns

#### Three Sophisticated Approaches

**Registry-Based Context Providers**
- Centralized registry system with explicit provider registration
- Priority-based context ordering
- Selective enabling/disabling of context sources
- Token estimation and metadata tracking

**Pipeline-Based Context Assembly**
- Pipeline architecture with stages of processors, filters, transformers
- Composable context processing with collectors, enrichers, filters
- Token budget management and relevance scoring
- Configurable pipeline stages

**Declarative Context Configuration**
- Query language for context requirements
- Declarative specification of context sources
- Runtime query overrides
- Constraint-based context filtering

### 5. Real-Time Communication Architecture

#### WebSocket-Based Communication
```typescript
// Real-time event handling in web frontend
client.on('event:output.chat', (data) => setMessages(m => [...m, {type: 'chat', content: data.content}]));
client.on('event:output.reasoning', (data) => setMessages(m => [...m, {type: 'reasoning', content: data.content}]));
client.on('event:state.busy', (data) => setBusy(true));
client.on('event:human.request', (data) => handleHumanInput(data));
```

#### Event-Driven UI Updates
- **Chat Messages**: Green color for agent responses
- **Reasoning Output**: Yellow for agent thinking process
- **System Messages**: Blue for info, yellow for warnings, red for errors
- **User Input**: Cyan for user messages
- **Busy States**: Loading indicators during processing

### 6. Specialized Design Agents

#### UI/UX Designer Agent
- **Purpose**: Design user interfaces, user experiences, and visual prototypes
- **Capabilities**: Wireframes, design systems, user flows, accessibility guidelines
- **Knowledge Repository**: Maintains `.tokenring/knowledge/ui-ux.md`

#### Product Design Engineer Agent
- **Purpose**: Product enhancement and PRD creation
- **Capabilities**: User experience optimization, feature specification, competitive analysis
- **Focus**: User-centric design thinking with technical constraints

#### API Designer Agent
- **Purpose**: Design and implement REST/GraphQL APIs
- **Capabilities**: API specifications, endpoint design, service contracts
- **Knowledge Repository**: Maintains `.tokenring/knowledge/apis.md`

### 7. Web Frontend Architecture

#### React-Based Interface
```typescript
// Component structure
export default function App() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
}
```

#### Features
- **Agent Management**: Select from running agents or create new ones
- **Real-time Display**: All agent events (chat, reasoning, system, input)
- **Responsive Design**: Adapts to different screen sizes
- **Dark Theme**: Terminal-inspired interface for comfortable extended use

### 8. Feedback System Architecture

#### Human Interaction Tools
```typescript
// askHuman tool for human questioning
const result = await askHuman.execute({
  question: "What improvements would you suggest?",
  choices: ["Option A", "Option B", "Option C"],
  response_type: "multiple"
}, agent);

// getFileFeedback for file review
const result = await getFileFeedback.execute({
  filePath: "docs/sample.md",
  content: content,
  contentType: "text/markdown"
}, agent);
```

#### Supported Content Types
- **Text**: Plain text display
- **Markdown**: Rendering with syntax highlighting
- **HTML**: Content in iframe
- **JSON**: Syntax highlighted JSON display
- **React Components**: Browser-based component preview

### 9. CLI Design Patterns

#### Interactive Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/help` | Show available commands | `/help` |
| `/exit` | Exit current agent | `/exit` |
| `/multi` | Open editor for multiline input | `/multi` |
| `/edit` | Open system editor for prompt | `/edit [text]` |

#### Keyboard Shortcuts
- **Ctrl-T Actions**: Help, create agent, switch agents, exit, detach
- **Navigation**: Arrow keys for command history
- **Cancellation**: Esc and Ctrl-C for operation abort

### 10. Accessibility and Responsive Design

#### Accessibility Features
- **Keyboard Navigation**: Full keyboard support across all interfaces
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Dark theme with appropriate contrast ratios
- **Focus Management**: Automatic focus restoration

#### Responsive Patterns
- **Adaptive Layouts**: Different UI patterns for CLI, web, and mobile
- **Progressive Enhancement**: Core functionality works across all devices
- **Touch-Friendly**: Appropriate touch targets for mobile interfaces

### 11. Design System Components

#### Consistent UI Elements
- **Message Types**: Consistent styling for chat, reasoning, system, input messages
- **Agent Cards**: Unified agent selection and management interface
- **Command Prompts**: Standardized input handling across interfaces
- **Status Indicators**: Consistent busy, idle, and error state displays

#### Theme and Styling
- **Dark Theme**: Primary theme for comfortable extended use
- **Syntax Highlighting**: Code and content highlighting
- **Consistent Colors**: Green (chat), yellow (reasoning), blue (system), cyan (input)
- **Typography**: Consistent font families and sizing

### 12. User Journey Mapping

#### Typical User Flows

**Developer Workflow**:
1. Start CLI or web interface
2. Select or create appropriate agent
3. Ask questions or issue commands
4. Receive AI responses with reasoning
5. Request file modifications or reviews
6. Approve or reject changes
7. Continue conversation or switch agents

**Content Creator Workflow**:
1. Access Writer application
2. Select writing agent
3. Provide content requirements
4. Review generated content
5. Request revisions or edits
6. Publish to target platforms

### 13. Integration with Development Tools

#### File System Integration
- **File Tree Selection**: Hierarchical file browsing with tree-selector
- **Content Preview**: Real-time file content display
- **Edit Integration**: Direct editor integration for file modifications

#### Version Control Integration
- **Git Commands**: Built-in git operations through CLI
- **Change Visualization**: Diff viewing and change tracking
- **Commit Management**: Automated commits with AI-generated messages

### 14. Performance and UX Optimization

#### Real-Time Performance
- **WebSocket Communication**: Low-latency agent communication
- **Incremental Updates**: Partial message rendering for better responsiveness
- **Auto-scroll**: Automatic scrolling to latest messages
- **Focus Management**: Smart input focus restoration

#### Loading States
- **Busy Indicators**: Spinners and progress messages
- **Lazy Loading**: Progressive content loading
- **Error Handling**: Graceful error recovery and user feedback

### 15. Modern WebTerminal Design Analysis

#### Dark Mode UI Design Philosophy
The WebTerminal application implements a sophisticated dark mode interface with:

**Color Palette**:
- **Background**: `#0f0f14` (Deep blue-black)
- **Surfaces**: `#1a1b26` (Slightly lighter dark blue)
- **Hover States**: `#252638` (Mid-tone for interaction feedback)
- **Primary Text**: `#e0e0e0` (Light gray for readability)
- **Secondary Text**: `#a0a0b0` (Dimmed for hierarchy)
- **Accent Color**: `#7c3aed` (Vibrant purple for highlights)
- **Success**: `#4ade80` (Green for positive states)
- **Borders**: `#2a2b3a` (Subtle definition)

#### Layout Architecture
- **Top Navigation Bar**: Clean gradient background with branding and user controls
- **Sidebar Navigation**: Icon-based vertical navigation with tooltips
- **File Explorer**: Tree view with expandable folders and color-coded icons
- **Terminal Interface**: Dockable terminal with command history
- **Chat Interface**: Message bubbles with syntax highlighting
- **Settings Panel**: Organized settings with toggle switches and sliders

#### Interactive Elements
- **Hover States**: Subtle animations and visual feedback
- **Glassmorphism Effects**: Modern UI elements with transparency
- **Smooth Animations**: Micro-interactions and transitions
- **Custom Form Controls**: Styled range sliders, input fields, and buttons
- **Context-Sensitive Menus**: Dynamic menus based on current context

### 16. Human Interface Request Patterns

#### Structured Interaction Types
The system implements a comprehensive human interface request system:

```typescript
export type HumanInterfaceDefinitions = {
  askForConfirmation: {
    request: { message: string; default?: boolean; timeout?: number };
    response: boolean;
  };
  openWebPage: {
    request: { url: string };
    response: boolean;
  };
  askForText: {
    request: { message: string };
    response: string | null;
  };
  askForPassword: {
    request: { message: string };
    response: string | null;
  };
  askForSingleTreeSelection: {
    request: { message?: string; tree: TreeLeaf; initialSelection?: string; loop?: boolean };
    response: string | null;
  };
  askForMultipleTreeSelection: {
    request: { message?: string; tree: TreeLeaf; initialSelection?: Iterable<string>; loop?: boolean };
    response: string[] | null;
  };
};
```

#### Tree-Based Selection Patterns
- **Hierarchical Data**: Tree structures for complex data selection
- **Single Selection**: Pick one item from tree hierarchy
- **Multiple Selection**: Select multiple items with iteration support
- **Initial Selection**: Pre-select items based on context
- **Looping**: Allow users to cycle through options

### 17. Template System UI Patterns

#### AI Template Integration
The template system provides structured prompt management:

**User Stories**:
- **Run Templates**: `/template run <templateName> <input>`
- **List Templates**: `/template list`
- **Template Info**: `/template info <templateName>`

**Template Chaining**:
- Multi-step processing workflows
- Output passing between templates
- Circular reference prevention
- Combined result presentation

#### Command Line Interface Design
```typescript
// Template execution flow
const template = templateRegistry.get("translateToFrench");
const chatRequest = await template("Hello world");
const response = await aiClient.streamChat(chatRequest);
```

### 18. Context Handler Integration Patterns

#### File System Context
The codebase integration provides rich file system context:

**File Tree Display**:
```typescript
// Directory tree generation
yield {
  role: "user",
  content: `// Directory Tree of project files:\n${Array.from(fileTreeFiles).sort().join("\n")}`
};
```

**Complete File Content**:
```typescript
// Full file content with syntax
yield {
  role: "user",
  content: `// Complete contents of file: ${file}\n${content}`
};
```

#### Database Context Integration
Available databases are presented as structured context:

```typescript
yield {
  role: "user",
  content: "/* These are the databases available for the database tool */:\n" +
    available.map((name) => `- ${name}`).join("\n")
};
```

### 19. CLI Vault Interface Design

#### Secure CLI Patterns
The vault CLI implements secure password handling:

**Interactive Password Entry**:
```typescript
async function askPassword(message: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    process.stdin.setRawMode(true);
    // Secure password handling with raw mode
  });
}
```

**Command Structure**:
- `vault init` - Initialize new vault
- `vault get <key>` - Retrieve secret value
- `vault set <key> <value>` - Set secret value
- `vault list` - List all keys
- `vault remove <key>` - Remove secret
- `vault change-password` - Update password
- `vault run <command>` - Execute with secrets

### 20. Documentation Engineering Patterns

#### Hierarchical Documentation Architecture
- **Root Level**: README.md, PACKAGES.md, DEPENDENCIES.md
- **Package Level**: Individual package documentation
- **Application Level**: App-specific documentation
- **Comprehensive Site**: 94+ markdown files with navigation

#### Consistent Documentation Templates
Universal structure pattern across 50+ packages:
- Overview/Purpose
- Installation/Setup
- Package Structure
- Core Components
- Usage Examples
- API Reference
- Tools/Commands
- Configuration
- Dependencies
- Development

#### Cross-Package Integration Documentation
- **Agent-Centric Architecture**: All packages integrate through @tokenring-ai/agent
- **Service Registry Patterns**: Clear service contracts and lifecycle
- **Tool Registration**: Standardized tool interfaces
- **Hook System Integration**: Documented integration patterns

### 21. Agent Discovery and Selection Patterns

#### Available Agent Context Display
The system presents available agents with clear descriptions:

```typescript
yield {
  role: "user",
  content: '/* The following agents are available for use with agent & task planning tools */\n' +
    Object.entries(agentTypes)
      .filter(([name, config]) => config.callable)
      .map(([name, config]) => `- ${name}: ${config.description}`)
      .join("\n")
};
```

#### Agent Type Filtering
- **Callable Agents**: Only agents that can be invoked are shown
- **Description Integration**: Clear purpose and capabilities for each agent
- **Dynamic Discovery**: Real-time agent availability based on configuration

### 22. External Service Integration Patterns

#### Ghost.io Integration Architecture
Sophisticated external service integration with:

**Service-Based Architecture**:
- **GhostIOService**: Manages API connections and current state
- **Admin API**: For creating/updating/publishing posts
- **Content API**: For reading published posts
- **currentPost**: State management for post selection

**User Interface Patterns**:
- **Post Selection**: Tree-based selection interface
- **Status Display**: Draft/published status with metadata
- **Command Structure**: `/ghost post select`, `/ghost post info`, `/ghost post new`
- **Context Awareness**: Current post state influences available operations

#### State Management for External Services
- **Current Post**: Complete post object with metadata
- **Null State**: Indicates no post selected for creation
- **State Persistence**: Maintained across commands
- **Validation**: Ensures operations match state expectations

### 23. Docker Tool Integration Patterns

#### Complex CLI Tool Integration
Docker container management demonstrates advanced CLI integration:

**Structured Input Validation**:
```typescript
const inputSchema = z.object({
  containers: z.union([z.string(), z.array(z.string())]),
  attach: z.boolean().optional().default(false),
  interactive: z.boolean().optional().default(false),
  timeoutSeconds: z.number().int().optional().default(30),
}).strict();
```

**Progress Feedback Patterns**:
```typescript
agent.infoMessage(`[${name}] Starting container(s): ${containerList.join(", ")}...`);
agent.infoMessage(`[${name}] Executing: ${cmd}`);
agent.infoMessage(`[${name}] Successfully started container(s): ${containerList.join(", ")}`);
```

#### Error Handling and User Feedback
- **Timeout Management**: Configurable timeouts with limits
- **Exit Code Handling**: Proper exit code propagation
- **Output Capture**: STDOUT/STDERR capture and display
- **Container Validation**: Single container to array conversion

### 24. Multi-Modal Interface Consistency

#### Unified Command Patterns
Across all interfaces, consistent command structures:
- **Slash Commands**: `/command [subcommand] [parameters]`
- **Parameter Parsing**: Consistent parameter extraction
- **Help Integration**: Built-in help for all commands
- **Error Messages**: Standardized error response formats

#### Cross-Platform User Experience
- **CLI**: Terminal-based interaction with rich formatting
- **Web**: Browser-based interface with real-time updates
- **Hybrid**: WebTerminal combining both paradigms
- **Service Integration**: External service integration across all platforms

### 25. Advanced User Interaction Patterns

#### Contextual Command Execution
- **Agent-Aware Commands**: Commands adapt based on current agent
- **State-Aware Operations**: Operations validate state before execution
- **Progressive Enhancement**: Advanced features unlock based on context
- **Error Recovery**: Graceful error handling with suggested fixes

#### Dynamic Interface Generation
- **Agent-Specific Tools**: Tools appear based on agent capabilities
- **Context-Aware Menus**: Menus adapt to current context
- **Progressive Disclosure**: Advanced options hidden until needed
- **Intelligent Defaults**: Smart defaults based on user patterns

This comprehensive UI/UX architecture demonstrates a sophisticated, multi-modal approach to AI agent interaction, emphasizing human-centered design, accessibility, and consistent user experiences across different platforms and interaction modes.