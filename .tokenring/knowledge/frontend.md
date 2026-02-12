# Frontend Knowledge Repository

This file maintains knowledge about frontend components, UI patterns, and client-side functionality in the TokenRing project.

## 📚 Style Guide Reference

For detailed visual and interactive design standards, see the **[Chat Frontend Style Guide](./style-guide-chat-frontend.md)**.

The style guide includes:
- Complete color palette with hex codes
- Typography specifications
- Spacing and sizing scales
- Component patterns (buttons, inputs, cards, etc.)
- Animation and transition guidelines
- Accessibility best practices
- Responsive design patterns
- Common utility patterns

**Quick Links:**
- [Color Palette](./style-guide-chat-frontend.md#color-palette)
- [Component Patterns](./style-guide-chat-frontend.md#component-patterns)
- [Accessibility](./style-guide-chat-frontend.md#accessibility)
- [Responsive Design](./style-guide-chat-frontend.md#responsive-design)

---

## Discovered Frontend Systems

### Web Frontend Architecture (@tokenring-ai/web-frontend)

**Technology Stack:**
- React 19 with TypeScript
- Vite for build tooling and development server
- WebSocket-based real-time communication
- Tailwind CSS v4 with custom theming system
- SWR for data fetching
- React Router v7 for navigation
- Framer Motion for animations
- Radix UI primitives for accessible components
- @monaco-editor/react for code editing
- @uiw/react-md-editor for markdown editing
- Focus-trap-react for overlay focus management
- react-virtuoso for virtualized lists

**Key Features:**
- Dual-mode interface: Agent selection dashboard and chat interface
- CLI-style chat interface with syntax-colored message types
- Real-time agent communication and event streaming
- Agent management (selection, creation, deletion, switching)
- Model selector with provider grouping and search
- Tool selector with category-based organization
- Dark/light theme toggle with persistent preference
- File browser with preview and editing capabilities
- Command history navigation with arrow keys
- Command autocomplete with slash commands
- Toast notification system for user feedback
- Connection status indicator
- Mobile-responsive design

**Message Types:**
- `agent.created` - Green, indicating agent lifecycle events
- `agent.stopped` - Red/pink, indicating agent lifecycle events
- `output.info` - Gray, standard information messages
- `output.warning` - Amber/warning colors
- `output.error` - Red/error colors
- `output.artifact` - Various colors by MIME type (code, markdown, JSON, HTML, images)
- `output.chat` - Default text for chat messages
- `output.reasoning` - Italic, amber icon for agent reasoning
- `input.received` - Indigo/dark indigo for user input
- `input.handled` - Emerald for successful command handling
- `question.request` - Cyan for agent questions requiring input
- `question.response` - Cyan background for agent question responses
- `reset` - Purple for system resets
- `abort` - Red for aborted operations

**Component Structure:**
```
frontend/chat/src/
├── App.tsx                  # Main application component with routing
├── components/
│   ├── ui/
│   │   ├── toast.tsx        # Toast notification system
│   │   ├── notification-menu.tsx # User notifications
│   │   ├── light-dark-selector.tsx # Theme toggle
│   │   ├── dropdown-menu.tsx # Radix UI dropdown
│   │   └── select.tsx       # Radix UI select
│   ├── chat/
│   │   ├── MessageList.tsx  # Virtualized message list
│   │   ├── MessageComponent.tsx # Individual message rendering
│   │   ├── ChatHeader.tsx   # Header with model/tool selectors
│   │   ├── ChatFooter.tsx   # Input area with commands and suggestions
│   │   └── AutoScrollContainer.tsx # Scroll management
│   ├── editor/
│   │   ├── CodeEditor.tsx   # Monaco editor wrapper
│   │   └── MarkdownEditor.tsx # React-MD-Editor wrapper
│   ├── Sidebar.tsx          # Navigation sidebar with loading states
│   ├── SidebarContext.tsx   # Sidebar state management
│   ├── ModelSelector.tsx    # AI model selector with provider groups
│   ├── ToolSelector.tsx     # Tool selector with categories
│   ├── FileBrowserOverlay.tsx # File browser with preview pane
│   ├── ErrorBoundary.tsx    # Error boundary component
│   ├── ChatInputContext.tsx # Input persistence across routes
│   └── question/            # Interactive question components
│       ├── InlineQuestion.tsx
│       └── inputs/
│           ├── text-inline.tsx
│           ├── file-inline.tsx
│           ├── tree-inline.tsx
│           └── form-inline.tsx
├── pages/
│   ├── AgentSelection.tsx   # Dashboard with agents, workflows, templates
│   └── ChatPage.tsx         # Main chat interface
├── hooks/
│   ├── useAgentEventState.ts
│   ├── useAgentExecutionState.ts
│   ├── useConnectionStatus.ts
│   ├── useTheme.ts
│   └── useSidebar.ts
├── rpc.ts                   # RPC client definitions and SWR hooks
└── lib/
    └── utils.ts             # Utility functions (cn, etc.)
```

## UI Components

### Toast Notification System

**Location:** `frontend/chat/src/components/ui/toast.tsx`

**Purpose:** Provides user feedback for success, error, info, and warning states.

**Features:**
- Auto-dismiss after configurable duration
- Multiple toast support with stacking
- Keyboard accessible (ESC to close)
- Icon-based type indicators
- Smooth enter/exit animations using Framer Motion
- Focus management with ARIA roles
- Integration with notificationManager singleton

**Usage:**
```tsx
import { toastManager } from './components/ui/toast.tsx';

// Simple usage
toastManager.success('Operation completed');
toastManager.error('Something went wrong');
toastManager.info('New message received');
toastManager.warning('Action required');

// With options
toastManager.error('Failed to save', {
  duration: 5000,
  title: 'Error'
});
```

**Toast Container Integration:**
```tsx
import { ToastContainer, notificationManager } from './components/ui/toast.tsx';

function App() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const cleanup = notificationManager.subscribeToasts(setToasts);
    return cleanup;
  }, []);

  return (
    <>
      {/* Your app content */}
      <ToastContainer toasts={toasts} onRemove={(id) => notificationManager.removeToast(id)} />
    </>
  );
}
```

**Toast Types:**
- `success` - Green, checkmark icon
- `error` - Red, alert circle icon, assertive aria-live
- `info` - Blue, info icon
- `warning` - Amber, warning triangle icon

**Accessibility:**
- `role="alert"` for notifications
- `aria-live="polite"` (default) or `"assertive"` for errors
- Focus management for keyboard users
- Screen reader announcements

### ModelSelector Component

**Location:** `frontend/chat/src/components/ModelSelector.tsx`

**Features:**
- Dropdown-based model selection using Radix UI
- Groups models by provider (Anthropic, Azure, Google, OpenAI, etc.)
- Shows availability status (● for available, ○ for unavailable)
- Search/filter functionality across models
- Auto-expand provider with currently selected model
- Loading state during model change
- Toast notifications for success/error feedback
- Checkmark for currently selected model
- Provider icons and color coding

**Error Handling:**
```tsx
try {
  await chatRPCClient.setModel({ agentId, model: modelId });
  toastManager.success(`Model changed to ${modelId.split('/').pop()}`, { duration: 3000 });
} catch (error) {
  toastManager.error(error.message || 'Failed to select model', { duration: 5000 });
}
```

### ToolSelector Component

**Location:** `frontend/chat/src/components/ToolSelector.tsx`

**Features:**
- Dropdown-based tool selection using Radix UI
- Groups tools by package category (@tokenring-ai/*)
- Shows enabled/disabled status per tool
- Category-level toggle (enable/disable all tools in category)
- Search/filter functionality across tools
- Auto-expand categories with enabled tools
- Tool count badges (enabled/total)
- Package icons and color coding
- Keyboard accessible navigation

**Usage:**
```tsx
<ToolSelector agentId={agentId} />
```

### Sidebar Component

**Location:** `frontend/chat/src/components/Sidebar.tsx`

**Features:**
- Responsive (collapsible on desktop, slide-in on mobile)
- Loading states for all sections (agents, workflows, templates)
- Keyboard navigation support
- ARIA labels and roles
- Active state indicators for current agent
- Agent status (idle/busy) with animated spinners
- Mobile menu toggle with keyboard support

**Loading States:**
```tsx
{agents.isLoading ? (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
  </div>
) : activeAgentsList.length === 0 ? (
  <div className="px-3 py-4 text-center text-zinc-600 text-xs">
    No active agents
  </div>
) : (
  // Render agents
)}
```

### FileBrowserOverlay Component

**Location:** `frontend/chat/src/components/overlay/file-browser.tsx`

**Features:**
- File browser overlay with focus trap
- Directory navigation with breadcrumbs
- File search functionality
- File upload capability (max 5MB)
- Hidden file toggle
- File selection for chat context
- File preview with markdown/code editing
- Download functionality
- File metadata display
- Resizable preview pane
- Keyboard accessible navigation

**Usage:**
```tsx
<FileBrowserOverlay
  agentId={agentId}
  isOpen={showFileBrowser}
  onClose={() => setShowFileBrowser(false)}
/>
```

**File Operations:**
- Add/remove files from chat context
- Download files
- Upload new files
- Edit text files (markdown, code)
- Preview images, code, markdown, HTML, and JSON

### AutoScrollContainer Component

**Location:** `frontend/chat/src/components/chat/AutoScrollContainer.tsx`

**Features:**
- Auto-scroll to bottom when new messages arrive
- Persistent scroll position when user scrolls up
- Manual scroll-to-bottom button
- Resize observer for content changes
- Mutation observer for DOM changes

**Usage:**
```tsx
<AutoScrollContainer>
  <MessageList messages={messages} agentId={agentId} busyWith={busyWith} />
</AutoScrollContainer>
```

### ErrorBoundary Component

**Location:** `frontend/chat/src/components/ErrorBoundary.tsx`

**Features:**
- Catch React rendering errors
- Customizable fallback UI
- Display error message and stack trace
- Try-again button for recovery

**Usage:**
```tsx
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### InlineQuestion Component

**Location:** `frontend/chat/src/components/question/InlineQuestion.tsx`

**Features:**
- Expandable/collapsible question panels
- Keyboard navigation (Enter/Space to toggle, Escape to close)
- Auto-scroll into view when rendered
- Focus management for first input
- ARIA roles and attributes

**Input Types:**
- `text` - Single/multi-line text input
- `fileSelect` - File browser with tree view
- `treeSelect` - Hierarchical selection tree
- `form` - Multi-section wizard-style forms

### ConfirmDialog Component

**Location:** `frontend/chat/src/components/overlay/confirm-dialog.tsx`

**Features:**
- Focus trap for accessibility
- Backdrop blur effect
- Variant styling (danger, warning, info)
- Customizable confirm/cancel buttons
- Keyboard navigation

**Usage:**
```tsx
<ConfirmDialog
  title="Delete Agent"
  message="Are you sure you want to delete this agent?"
  confirmText="Delete"
  variant="danger"
  onConfirm={handleConfirmDelete}
  onCancel={() => setConfirmDelete(null)}
/>
```

### ChatFooter Component (Command History Navigation)

**Location:** `frontend/chat/src/components/chat/ChatFooter.tsx`

**Features:**
- Command suggestion autocomplete with arrow keys
- Command history navigation with up/down arrow keys
- Persistent input state across navigation
- Context-aware keyboard shortcuts
- Keyboard navigation support for all interactive elements

**Command History Navigation:**
- `ArrowUp` - Navigate to previous command in history
- `ArrowDown` - Navigate to next command in history
- When reaching the beginning/end of history, returns to original input
- Input state is preserved during history navigation

**Implementation Pattern:**
```tsx
const [historyIndex, setHistoryIndex] = useState<number | null>(null);
const [historyBuffer, setHistoryBuffer] = useState('');

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (commandHistory.length > 0) {
      if (historyIndex === null) {
        // Start navigating history, save current input
        setHistoryBuffer(input);
        setHistoryIndex(commandHistory.length - 1);
      } else if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
      }
      if (historyIndex !== null && commandHistory[historyIndex]) {
        setInput(commandHistory[historyIndex]);
      }
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex !== null) {
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
        if (commandHistory[historyIndex + 1]) {
          setInput(commandHistory[historyIndex + 1]);
        }
      } else {
        // Go back to the original input before history navigation
        setInput(historyBuffer);
        setHistoryIndex(null);
        setHistoryBuffer('');
      }
    }
    return;
  }
};
```

**Usage:**
```tsx
<ChatFooter
  agentId={agentId}
  input={input}
  setInput={setInput}
  commandHistory={commandHistory.data || []}
  onSubmit={handleSubmit}
  // ...other props
/>
```

---

## RPC Clients and Data Fetching

### RPC Client Architecture

**Locations:** `frontend/chat/src/rpc.ts`

**Clients:**
- `agentRPCClient` - Agent lifecycle management
- `aiRPCClient` - AI model and tool management
- `chatRPCClient` - Chat-specific operations
- `filesystemRPCClient` - File system operations
- `workflowRPCClient` - Workflow management

**SWR Hooks:**
```typescript
// Agent management
useAgentList() - List all agents (refresh: 1s)
useAgent(agentId) - Get agent details (refresh: 15s)
useAvailableCommands(agentId) - Available commands
useCommandHistory(agentId) - Command history (max 50 commands)

// Model and tool management
useModel(agentId) - Current model (refresh: 15s)
useChatModelsByProvider() - Models grouped by provider
useAvailableTools() - Available tools
useEnabledTools(agentId) - Enabled tools (refresh: 5s)

// File system
useDirectoryListing(opts) - Directory contents (refresh: 5s)
useFileContents(path, agentId) - File contents
useSelectedFiles(agentId) - Selected chat files
```

---

## Interactive Question Components

### InlineQuestion

**Location:** `frontend/chat/src/components/question/InlineQuestion.tsx`

**Features:**
- Expandable/collapsible question panels
- Keyboard navigation (Enter/Space to toggle, Escape to close)
- Auto-scroll into view when rendered
- Focus management for first input
- ARIA roles and attributes

**Input Types:**
- `text` - Single/multi-line text input
- `fileSelect` - File browser with tree view
- `treeSelect` - Hierarchical selection tree
- `form` - Multi-section wizard-style forms

### Focus Management Pattern

```tsx
// Auto-focus on mount
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (autoFocus && inputRef.current) {
    inputRef.current.focus();
  }
}, [autoFocus]);

// Scroll into view
useEffect(() => {
  if (containerRef.current) {
    containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}, []);
```

### Keyboard Navigation

**Pattern: Keyboard event handlers**
```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  } else if (e.key === 'Escape') {
    handleCancel();
  }
};
```

---

## CLI Interface (@tokenring-ai/cli)

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

---

## Modern UI Design Systems

### **WebTerminal Design Philosophy**

**Color Palette:**
- Background: `#050505` (Deep black) / `#fafaf9` (Paper light)
- Surfaces: `#0a0a0f` (Slightly lighter) / `#f5f5f4` (Paper light)
- Hover States: `#151520` (Mid-tone) / `rgba(0, 0, 0, 0.05)` (Paper light)
- Primary Text: `#e0e0e0` (Light gray) / `#1c1917` (Paper dark)
- Secondary Text: `#a0a0b0` (Dimmed) / `#44403c` (Paper dim)
- Accent Colors:
  - Indigo: `#6366f1` (Primary actions)
  - Cyan: `#06b6d4` (Information)
  - Purple: `#a855f7` (Secondary actions)
  - Amber: `#f59e0b` (Warnings/busy state)
  - Emerald: `#10b981` (Success)
  - Red: `#ef4444` (Errors)
- Borders: `#18181b` (Subtle definition) / `#e7e5e4` (Paper light)

**Layout Components:**
- Top navigation bar with gradient background
- Icon-based sidebar navigation with tooltips
- File explorer with tree view and color-coded icons
- Dockable terminal interface
- Message bubbles with distinct styles
- Organized settings panel with toggles and sliders

**Modern Visual Elements:**
- Subtle gradients for depth
- Glassmorphism effects (`bg-black/50`)
- Smooth animations and micro-interactions
- Custom styled form controls
- Consistent border radius throughout
- Focus-visible rings for keyboard navigation

**Animation System:**
- Framer Motion for smooth transitions
- Enter/exit animations for toasts
- Hover states with scale transforms
- Loading spinners with animations
- Slide-in/out for mobile sidebar

**Typography:**
- Font family: System sans-serif (Inter fallback)
- Monospace: JetBrains Mono / Fira Code for code and terminal elements
- Responsive font sizes
- Line-height optimization for readability
- Truncation for long text

**Component Styling Patterns:**
```tsx
// Focus-visible pattern
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"

// Gradient pattern
className="bg-gradient-to-br from-cyan-500 to-purple-600"

// Disabled state
className="... disabled:opacity-50 disabled:cursor-not-allowed"

// Hover state
className="... hover:bg-zinc-900/30 transition-colors"
```

---

## Accessibility Patterns

### Skip Link Pattern

**Purpose:** Allows keyboard users to skip navigation and go directly to main content.

**Implementation:**
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Main content */}
</main>
```

**How it works:**
1. Link is hidden by default (`sr-only` class)
2. When user tabs to it, it becomes visible (`focus:not-sr-only`)
3. Clicking jumps to `#main-content`
4. `tabIndex={-1}` allows programmatic focus without adding to tab order

### Form Input Accessibility

**Pattern: Label + ARIA attributes**
```tsx
<label htmlFor="chat-input" className="sr-only">
  Command or message input
</label>
<input
  id="chat-input"
  aria-label="Command or message input"
  aria-describedby={hasSuggestions ? "command-suggestions" : undefined}
  aria-invalid={hasError}
  aria-required={true}
/>
```

### Button Accessibility

**Pattern: ARIA labels for icon-only buttons**
```tsx
<button
  aria-label="Send message"
  onClick={handleSubmit}
>
  <Send className="w-4 h-4" />
</button>
```

**Focus-visible styling:**
```tsx
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
```

### Modal Focus Management

**Pattern: Auto-focus on mount**
```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (autoFocus && inputRef.current) {
    inputRef.current.focus();
  }
}, [autoFocus]);
```

### ARIA Live Regions

**Pattern: Dynamic content announcements**
```tsx
<span aria-live="polite">{statusLine}</span>

<div role="status" aria-live="polite">
  {selectedCount} selected
</div>
```

---

## Mobile Responsiveness

**Custom Breakpoints:**
- **xs**: 480px - Extra small screens
- **sm**: 640px - Small screens
- **md**: 768px - Medium screens (tablet)
- **lg**: 1024px - Large screens

**Viewport Configuration:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**Mobile-First Design Patterns:**

1. **Responsive TopBar Layout**
   ```tsx
   <div className="flex items-center gap-1 sm:gap-4 overflow-x-hidden">
     {/* Mobile menu button - hidden on desktop */}
     <button onClick={onMenuClick} className="md:hidden p-1.5 flex-shrink-0">
       <Menu size={18} />
     </button>
   </div>
   ```

2. **Collapsible Sidebar for Mobile**
   ```tsx
   // Mobile sidebar with overlay
   {isMobile && isMobileSidebarOpen && (
     <div className="fixed inset-0 bg-black/50 z-30" />
   )}

   <div className={`\n     ${isMobile ? 'fixed' : 'relative'}\n     ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}\n   `}>
     <Sidebar ... />
   </div>
   ```

3. **Touch-Friendly Targets**
   ```css
   @media (max-width: 479px) {
     button, .cursor-pointer {
       min-height: 44px;
       min-width: 44px;
     }
   }
   ```

4. **Safe Area Insets for Notched Devices**
   ```css
   @supports (padding: env(safe-area-inset-bottom)) {
     .safe-area-bottom {
       padding-bottom: env(safe-area-inset-bottom);
     }
   }
   ```

**Accessibility for Mobile:**
- Minimum 44x44px touch targets
- Proper ARIA labels for mobile controls
- Focus management when opening/closing sidebar
- Reduced motion support via `prefers-reduced-motion`
- High contrast mode support

---

## Theme System

**Location:** `frontend/chat/src/hooks/useTheme.ts`

**Features:**
- Light mode: Paper-inspired theme with subtle texture
- Dark mode: Charcoal-inspired terminal theme
- Persistent preference in localStorage
- System preference detection on first load
- Smooth theme transitions

**Usage:**
```tsx
const [theme, setTheme] = useTheme();

// Toggle theme
setTheme(prev => prev === 'light' ? 'dark' : 'light');
```

**CSS Variables:**
```css
/* Light mode */
--bg-primary: #fafaf9;
--bg-secondary: #f5f5f4;
--bg-hover: rgba(0, 0, 0, 0.05);
--text-primary: #1c1917;
--text-muted: #78716c;

/* Dark mode */
--bg-primary: #0a0a0a;
--bg-secondary: #141414;
--bg-hover: rgba(255, 255, 255, 0.05);
--text-primary: #fafafa;
--text-muted: #a3a3a3;
```

---

## Connection Status

**Location:** `frontend/chat/src/hooks/useConnectionStatus.ts`

**Features:**
- Online/offline detection
- Last activity tracking
- Automatic reconnection awareness
- 30-second inactivity timeout

**Usage:**
```tsx
const { isOnline, lastActivity, recordActivity } = useConnectionStatus();
```

---

## Message Component

**Location:** `frontend/chat/src/components/chat/MessageComponent.tsx`

**Features:**
- Message type-specific styling and icons
- Markdown rendering with GFM support
- Code block syntax highlighting
- Copy-to-clipboard functionality
- Artifact display (images, code, JSON, HTML, diffs)
- Downloadable artifacts
- Timestamp formatting
- Smooth enter animations

**Message Footer Actions:**
- Copy message to clipboard
- Download artifacts
- Timestamp display

**Artifact Display:**
- Expandable/collapsible
- Type-specific rendering (code blocks, markdown, JSON preview, image, HTML iframe)
- MIME type-specific icons
- Summary information on collapsed view

---

## Agent Selection Page

**Location:** `frontend/chat/src/pages/AgentSelection.tsx`

**Features:**
- Dashboard for agent management
- Active agents grid with status indicators
- Workflow spawning
- Agent creation from templates
- Agent deletion with confirmation
- Loading states for all operations
- Toast notifications for errors
- Mobile-responsive grid layout

**Agent Status Indicators:**
- Idle: Pause icon, dim color
- Busy: Loading spinner, amber color

**Workflow Management:**
- Grid of available workflows
- Spawn workflow button
- Loading state during creation
- Auto-navigate to new agent

---

## File Browser Features

**Location:** `frontend/chat/src/components/overlay/file-browser.tsx`

**File Operations:**
- Add/remove files from chat context
- Download files
- Upload new files (max 5MB)
- Edit text files (markdown, code)
- Preview images, code, markdown, HTML, and JSON
- File search with debounce
- Hide/show hidden files

**Preview Features:**
- Markdown rendering with full GFM
- Code editing with Monaco editor
- Syntax highlighting by file extension
- Save functionality with save indicator
- Resizeable preview pane
- Breadcrumb navigation

---

## Key Dependencies

**Runtime Dependencies:**
- `react@^19.2.4` - Core UI library
- `react-dom@^19.2.4` - DOM rendering
- `react-router-dom@^7.13.0` - Routing
- `swr@^2.3.8` - Data fetching
- `framer-motion@^12.29.2` - Animations
- `@radix-ui/react-dropdown-menu@^2.1.16` - Dropdown
- `@radix-ui/react-scroll-area@^1.2.10` - Scroll area
- `@radix-ui/react-select@^2.2.6` - Select component
- `@uiw/react-md-editor@^4.0.11` - Markdown editor
- `@monaco-editor/react@^4.7.0` - Code editor
- `focus-trap-react@^12.0.0` - Focus trap
- `lucide-react@^0.563.0` - Icons
- `react-icons@^5.5.0` - Additional icons
- `react-markdown@^10.1.0` - Markdown rendering
- `react-virtuoso@^4.18.1` - Virtualized lists
- `remark-gfm@^4.0.1` - Markdown GFM
- `zod@^4.3.6` - Validation

**Build/Dev Dependencies:**
- `vite@^7.3.1` - Build tool
- `@vitejs/plugin-react@^5.1.2` - React plugin
- `tailwindcss@^4.1.18` - CSS framework
- `@tailwindcss/postcss@^4.1.18` - PostCSS plugin
- `@tailwindcss/typography@^0.5.19` - Typography plugin
- `@tailwindcss/forms@^0.5.11` - Forms plugin
- `typescript@^5.9.3` - Type checking
- `vitest@^4.0.18` - Testing

---

## RPC Endpoints

**Agent RPC:**
- `/agent/listAgents` - List all agents
- `/agent/getAgent/{agentId}` - Get agent details
- `/agent/createAgent` - Create new agent
- `/agent/deleteAgent` - Delete agent
- `/agent/getAvailableCommands/{agentId}` - Available commands
- `/agent/getCommandHistory/{agentId}` - Command history
- `/agent/sendInput` - Send user input
- `/agent/abortAgent` - Abort agent operation
- `/agent/resetAgent` - Reset agent state

**Chat RPC:**
- `/chat/model/{agentId}` - Get/set model
- `/chat/getAvailableTools` - List available tools
- `/chat/getEnabledTools/{agentId}` - Get enabled tools
- `/chat/enableTools` - Enable tools
- `/chat/disableTools` - Disable tools

**Filesystem RPC:**
- `/filesystem/listDirectory/{path}` - List directory
- `/filesystem/readTextFile/{path}` - Read file
- `/filesystem/writeFile` - Write file
- `/filesystem/stat` - File stats
- `/filesystem/addFileToChat` - Add file to chat
- `/filesystem/removeFileFromChat` - Remove file from chat
- `/filesystem/getSelectedFiles/{agentId}` - Get selected files

**Workflow RPC:**
- `/workflow/listWorkflows` - List workflows
- `/workflow/spawnWorkflow` - Spawn workflow

**AI Client RPC:**
- `/ai-client/chatModelsByProvider` - Models by provider

---

## Development Patterns

**State Management:**
- Component-level state for UI state
- SWR for data fetching and caching
- Context for global state (Sidebar, ChatInput)
- RPC clients for server communication

**Code Organization:**
- Features grouped by component directory
- Shared utilities in lib/utils.ts
- RPC clients centralized in rpc.ts
- Custom hooks for complex logic

**Styling:**
- Tailwind CSS v4 with utility classes
- Custom CSS variables for theming
- Component-specific styles when needed
- Consistent spacing and sizing

**Accessibility:**
- Semantic HTML elements
- ARIA attributes for interactive elements
- Keyboard navigation support
- Focus management in overlays
- Screen reader announcements

---

## Best Practices

1. **Use SWR for data fetching** - Benefits include caching, revalidation, and error handling
2. **Implement proper focus management** - Especially in modals and overlays
3. **Provide keyboard navigation** - For all interactive elements
4. **Use consistent theming** - Leverage CSS variables for theme switching
5. **Optimize lists** - Use react-virtuoso for large message lists
6. **Handle loading states** - Show appropriate loading indicators
7. **Provide user feedback** - Use toast notifications for important actions
8. **Support accessibility** - ARIA labels, keyboard navigation, focus rings
9. **Responsive design** - Mobile-first approach with responsive breakpoints
10. **Error boundaries** - Wrap components to catch rendering errors

---

## Key Files Reference

**Entry Points:**
- `frontend/chat/src/main.tsx` - Application entry point
- `frontend/chat/src/App.tsx` - Main component with routing
- `frontend/chat/src/index.css` - Global styles and theme variables
- `frontend/chat/src/rpc.ts` - RPC client setup and hooks

**Core Pages:**
- `frontend/chat/src/pages/ChatPage.tsx` - Chat interface
- `frontend/chat/src/pages/AgentSelection.tsx` - Agent dashboard

**Core Components:**
- `frontend/chat/src/components/chat/MessageList.tsx` - Message list
- `frontend/chat/src/components/chat/ChatHeader.tsx` - Header with selectors
- `frontend/chat/src/components/chat/ChatFooter.tsx` - Input area with history navigation
- `frontend/chat/src/components/ModelSelector.tsx` - Model selection
- `frontend/chat/src/components/ToolSelector.tsx` - Tool selection
- `frontend/chat/src/components/overlay/file-browser.tsx` - File browser

**Hooks:**
- `frontend/chat/src/hooks/useTheme.ts` - Theme management
- `frontend/chat/src/hooks/useConnectionStatus.ts` - Connection status
- `frontend/chat/src/hooks/useAgentEventState.ts` - Agent events
- `frontend/chat/src/hooks/useAgentExecutionState.ts` - Agent state

---
