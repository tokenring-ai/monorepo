# Frontend Knowledge Repository

This file maintains knowledge about frontend components, UI patterns, and client-side functionality in the TokenRing project.

## Discovered Frontend Systems

### Web Frontend Architecture (@tokenring-ai/web-frontend)

**Technology Stack:**
- React 18 with TypeScript
- Vite for build tooling and development server
- WebSocket-based real-time communication
- Dark theme terminal-inspired design
- CSS modules for styling

**Key Features:**
- CLI-style interface with syntax-colored output
- Real-time agent communication and event streaming
- Agent management (selection, creation, switching)
- Message types: chat (green), reasoning (yellow), system (blue), input (cyan)
- Automatic scrolling and input focus management
- Responsive design with mobile considerations

**Component Structure:**
```
frontend/src/
├── App.tsx           # Main application component
├── client.ts         # WebSocket client for agent communication
└── App.css          # Dark theme styles
```

**State Management Pattern:**
- React hooks (useState, useEffect, useRef)
- Event-driven architecture via WebSocket events
- Client-side state: connected status, agents list, current agent, messages, input

### CLI Interface (@tokenring-ai/cli)

**Technology Stack:**
- Node.js with TypeScript
- Inquirer.js for interactive prompts
- Chalk for terminal coloring
- Eventemitter3 for event handling

**Key Features:**
- REPL (Read-Eval-Print Loop) interface
- Built-in commands: /help, /exit, /multi, /edit
- Keyboard shortcuts (Ctrl-T for quick actions)
- Human interface request handling
- Real-time event processing
- History navigation

**Input Handling Patterns:**
- Command input with auto-completion
- Multi-line text editing via system editor
- Confirmation prompts with timeout support
- Tree-based selection for hierarchical data
- Password input with secure masking
- Web page opening integration

**Package Structure:**
```
pkg/cli/
├── AgentCLIService.ts       # Core CLI implementation
├── inputHandlers.ts         # Human interface handlers
├── chatCommands.ts          # Slash commands
├── ctrlTHandler.ts          # Keyboard shortcuts
└── commands/                # Individual command implementations
```

### Feedback System (@tokenring-ai/feedback)

**Core Tools:**
1. **askHuman**: Chat-based questioning with text/choice responses
2. **getFileFeedback**: Browser-based file content review (text/Markdown/HTML/JSON)
3. **reactFeedback**: React component preview and feedback collection

**Technology Stack:**
- Express.js for web servers
- esbuild for JavaScript bundling
- marked.js for Markdown rendering
- React for component previews
- Open command for browser launching

**Integration Patterns:**
- Seamless agent tool integration
- Temporary file management with cleanup
- Content type-specific rendering
- Safe isolation and security measures

### Inquirer.js Components

**Custom Components:**
- **@tokenring-ai/inquirer-command-prompt**: Command history, auto-completion, multi-line support
- **@tokenring-ai/inquirer-tree-selector**: Hierarchical selection with lazy loading

**Features:**
- File-backed history persistence
- Ephemeral history for temporary sessions
- Tree navigation with single/multiple selection
- Configurable page sizes and loops

## Design Patterns

### 1. Real-time Communication Pattern
```typescript
// WebSocket event-driven architecture
client.on('event:output.chat', (data) => {
  setMessages(m => [...m, {type: 'chat', content: data.content}]);
});

// Agent state management
client.on('event:state.busy', (data) => {
  setBusy(true);
  setBusyMessage(data.message);
});
```

### 2. Component Architecture Pattern
```typescript
// Functional component with hooks
export default function App() {
  const [state, setState] = useState(initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Event listeners and cleanup
  }, []);
  
  // Render logic with proper state handling
}
```

### 3. CLI Input Handling Pattern
```typescript
// Promise-based input handling with abort signals
export async function askForCommand(options, signal: AbortSignal): Promise<string> {
  return await commandPrompt(options, { signal });
}
```

### 4. Human Interface Request Pattern
```typescript
// Standardized request handling
interface HumanInterfaceRequest {
  type: 'ask' | 'confirm' | 'selection' | 'password';
  message: string;
  options?: any;
}
```

## UI Component Architectures

### 1. **Dual Interface Pattern**
The project implements both web and CLI interfaces, providing flexibility for different user preferences:
- **Web Frontend**: Visual, browser-based interface with React components
- **CLI Interface**: Terminal-based REPL experience with Inquirer.js prompts

### 2. **Event-Driven State Management**
Both interfaces use event-driven patterns for state updates:
- Web frontend uses WebSocket events to update React state
- CLI uses event emitters for real-time agent communication
- Consistent event naming: `event:output.chat`, `event:state.busy`, etc.

### 3. **Human Interface Request Pattern**
Standardized approach for complex user interactions:
```typescript
interface HumanInterfaceRequest {
  type: 'ask' | 'confirm' | 'selection' | 'password' | 'treeSelection';
  message: string;
  options?: any;
  timeout?: number;
}
```

### 4. **Command-Based Navigation**
CLI interface implements familiar command patterns:
- Slash commands: `/help`, `/edit`, `/multi`, `/exit`
- Keyboard shortcuts: `Ctrl-T` for quick actions
- History navigation with arrow keys

### 5. **Message Type System**
Consistent message categorization across interfaces:
- **Chat**: Agent responses (green)
- **Reasoning**: Agent thinking process (yellow)
- **System**: System messages with levels (blue/warning/error)
- **Input**: User input (cyan)

### 6. **Safe Content Handling**
Security-focused content management:
- Temporary file creation and cleanup
- Content type-specific rendering
- Browser sandboxing for React previews
- Secure input validation

## Responsive Design Patterns

### 1. **Web Frontend Layouts**
```css
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}
```

### 2. **CLI Responsive Design**
- Terminal width adaptation
- Command history scrolling
- Page size configuration for tree selectors
- Touch-friendly keyboard shortcuts

### 3. **Cross-Platform Considerations**
- Editor selection based on OS (`EDITOR` env var)
- Platform-specific keyboard handling
- Consistent color schemes across environments

## User Experience Patterns

### 1. **Progressive Disclosure**
- Agent selection → Chat interface → Detailed commands
- Simple commands → Complex multi-step workflows
- Basic interactions → Advanced features

### 2. **Immediate Feedback**
- Real-time event streaming
- Visual loading states (spinners, pulsing)
- Keyboard shortcuts for common actions

### 3. **Error Recovery**
- Graceful fallbacks for failed operations
- Timeout handling for human interface requests
- Cleanup on cancellation or errors

### 4. **Accessibility Features**
- Screen reader compatible event announcements
- Keyboard-only navigation support
- High contrast color schemes
- Focus management for complex interactions

## Modern UI Design Systems

### **WebTerminal Design Philosophy**
Based on `app/webterminal/design/ui.design.md` and `ui.design.v2.html`:

**Color Palette:**
- Background: `#0f0f14` (Deep blue-black)
- Surfaces: `#1a1b26` (Slightly lighter dark blue)
- Hover States: `#252638` (Mid-tone for interaction feedback)
- Primary Text: `#e0e0e0` (Light gray for readability)
- Secondary Text: `#a0a0b0` (Dimmed for hierarchy)
- Accent Color: `#7c3aed` (Vibrant purple for highlights)
- Success: `#4ade80` (Green for positive states)
- Borders: `#2a2b3a` (Subtle definition)

**Layout Components:**
- Top navigation bar with gradient background
- Icon-based sidebar navigation with tooltips
- File explorer with tree view and color-coded icons
- Dockable terminal interface
- Message bubbles with distinct styles
- Organized settings panel with toggles and sliders

**Modern Visual Elements:**
- Subtle gradients for depth
- Glassmorphism effects
- Smooth animations and micro-interactions
- Custom styled form controls
- Consistent border radius throughout

## State Management Approaches

### **Web Frontend:**
- Local component state with React hooks
- Event-driven updates via WebSocket
- No global state management library

### **CLI Interface:**
- Service-based state management
- Event emitter pattern
- Command context preservation

## API Integration Patterns

### **WebSocket Communication:**
```typescript
// Client-side WebSocket implementation
class AgentClient {
  connect(): Promise<void>
  sendInput(message: string): void
  on(event: string, callback: Function): void
  disconnect(): void
}
```

### **HTTP/Express Integration:**
- File content serving for feedback tools
- Static file serving for React previews
- Browser-based preview servers

## Accessibility Implementation

### **Current State:**
- Basic accessibility context in ink components
- Screen reader detection capability
- Keyboard navigation support in CLI
- Focus management in web interface

### **Areas for Enhancement:**
- ARIA labels and roles
- Color contrast compliance
- Screen reader announcements
- Focus indicators

## Development Workflow Patterns

### **Build Process:**
- Vite for web frontend development
- TypeScript compilation for all packages
- Hot reload for development
- Production build optimization

### **Testing:**
- Vitest for unit testing
- Integration testing for CLI components
- End-to-end testing for web interface

## Cross-Platform Compatibility

### **Web Frontend:**
- Modern browser support
- Progressive enhancement
- Fallback mechanisms

### **CLI Interface:**
- Cross-platform terminal support
- Platform-specific editor integration
- Consistent behavior across OS

## Frontend Agent Specializations

### **UI/UX Designer Agent**
- Focuses on user experience design
- Creates wireframes and design systems
- Implements accessibility guidelines
- Designs responsive layouts

### **Frontend Engineer Agent**
- Implements UI components
- Handles state management
- Optimizes performance
- Ensures accessibility compliance

## Advanced Component Libraries

### **Inquirer.js Enhancements**

**@tokenring-ai/inquirer-command-prompt:**
- History navigation with up/down arrows
- Auto-completion from static arrays or async functions
- Multi-line input support (Meta+M)
- Input validation and transformation
- Custom theming and styling

**@tokenring-ai/inquirer-tree-selector:**
- Hierarchical navigation with arrow keys
- Single/multiple selection modes
- Lazy loading of child nodes
- Keyboard navigation (Space, Enter, Esc, PageUp/PageDown)
- Configurable page size and looping

### **React Component Patterns**

**Functional Components with Hooks:**
```typescript
export default function App() {
  const [state, setState] = useState(initialState);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Event listeners and cleanup
  }, []);
  
  // Render logic with proper state handling
}
```

**Context API for Global State:**
- Used in feedback tools for React previews
- Browser-based component rendering
- Safe isolation and cleanup

## Performance Optimizations

### **Web Frontend:**
- Virtual scrolling for large message lists
- Debounced WebSocket event handling
- CSS-in-JS for dynamic styling
- Lazy loading of components

### **CLI Interface:**
- Pagination for large data sets
- Efficient event filtering
- Memory management for history
- Async loading patterns

## Security Considerations

### **Content Safety:**
- Temporary file cleanup in feedback tools
- Browser sandboxing for React previews
- Input validation and sanitization
- Secure handling of sensitive data

### **CLI Security:**
- Password input masking
- Command validation
- Safe file system operations
- Timeout handling for human requests

## Future Considerations

1. **State Management**: Consider implementing Redux/Zustand for complex state
2. **Component Library**: Build a design system with reusable components
3. **Testing**: Expand test coverage for UI components
4. **Performance**: Implement code splitting and lazy loading
5. **Accessibility**: Enhance WCAG compliance
6. **Mobile**: Improve mobile responsiveness and touch interactions

## Integration Patterns

The frontend systems integrate seamlessly through:
- Agent-based architecture
- WebSocket communication
- Standardized request/response patterns
- Shared component libraries
- Consistent design tokens and themes

## Key Insights

1. **Event-Driven Architecture**: Both web and CLI interfaces use event-driven patterns for real-time updates
2. **Component Modularity**: Clear separation of concerns with reusable components
3. **Accessibility First**: Built-in support for screen readers and keyboard navigation
4. **Developer Experience**: Hot reload, TypeScript, and modern tooling
5. **Cross-Platform**: Consistent experience across web and terminal environments
6. **Human-in-the-Loop**: Strong feedback mechanisms integrated throughout

## Template System

Based on `pkg/template/docs/design.md`, the frontend includes a powerful template system:

### **Template Registry Pattern:**
```typescript
interface TemplateFunction {
  (input: string): Promise<ChatRequest>;
}

class TemplateRegistry {
  register(name: string, template: TemplateFunction): void;
  unregister(name: string): void;
  get(name: string): TemplateFunction;
  list(): string[];
}
```

### **Template Chaining:**
Templates can specify `nextTemplate` property for multi-step processing:
- Translation → Summarization
- Data Extraction → Formatting
- Content Generation → Review
- Multi-step analysis workflows

### **User Commands:**
- `/template list` - List available templates
- `/template run <name> <input>` - Execute template
- `/template info <name>` - Show template details

This knowledge repository will be updated as new frontend patterns and implementations are discovered in the codebase.