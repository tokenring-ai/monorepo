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
- React 18 with TypeScript
- Vite for build tooling and development server
- WebSocket-based real-time communication
- Dark theme terminal-inspired design
- CSS modules for styling
- Tailwind CSS v4 for responsive design
- Framer Motion for animations
- Radix UI primitives for accessible components
- SWR for data fetching

**Key Features:**
- CLI-style interface with syntax-colored output
- Real-time agent communication and event streaming
- Agent management (selection, creation, switching)
- Message types: chat (green), reasoning (yellow), system (blue), input (cyan)
- Automatic scrolling and input focus management
- Mobile-first responsive design
- Toast notification system for user feedback

**Component Structure:**
```
frontend/chat/src/
├── App.tsx                  # Main application component
├── components/
│   ├── ui/
│   │   ├── Toast.tsx        # Toast notification component
│   │   ├── dropdown-menu.tsx # Dropdown menu (Radix UI)
│   │   ├── select.tsx       # Select component (Radix UI)
│   │   └── FileBrowserOverlay.tsx
│   ├── Sidebar.tsx          # Navigation sidebar with loading states
│   ├── SidebarContext.tsx    # Sidebar state management
│   ├── ModelSelector.tsx     # AI model selector with error handling
│   ├── ToolSelector.tsx      # Tool selector
│   ├── ArtifactViewer.tsx    # Artifact display component
│   └── question/            # Interactive question components
│       ├── InlineQuestion.tsx
│       └── inputs/
│           ├── text-inline.tsx
│           ├── file-inline.tsx
│           ├── tree-inline.tsx
│           └── form-inline.tsx
├── pages/
│   ├── AgentSelection.tsx   # Home page with agent list
│   └── ChatPage.tsx         # Main chat interface
├── hooks/
│   ├── useAgentEventState.ts
│   ├── useAgentExecutionState.ts
│   └── useSidebar.ts
└── lib/
    └── utils.ts             # Utility functions (cn, etc.)
```

## UI Components

### Toast Notification System

**Location:** `frontend/chat/src/components/ui/Toast.tsx`

**Purpose:** Provides user feedback for success, error, info, and warning states.

**Features:**
- Auto-dismiss after configurable duration
- Multiple toast support with stacking
- Keyboard accessible (ESC to close)
- Icon-based type indicators
- Smooth enter/exit animations using Framer Motion
- Focus management with ARIA roles

**Usage:**
```tsx
import { toastManager } from './components/ui/Toast.tsx';

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
import { ToastContainer, toastManager } from './components/ui/Toast.tsx';

function App() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const unsubscribe = toastManager.subscribe(setToasts);
    return unsubscribe;
  }, []);

  return (
    <>
      {/* Your app content */}
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(t => t.filter(t => t.id !== id))} />
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
- Groups models by provider
- Shows availability status (● for available, ○ for unavailable)
- Loading state during model change
- Toast notifications for success/error feedback
- Checkmark for currently selected model

**Error Handling:**
```tsx
try {
  await chatRPCClient.setModel({ agentId, model: modelId });
  toastManager.success(`Model changed to ${name}`);
} catch (error) {
  toastManager.error(error.message, { duration: 5000 });
}
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

   <div className={`
     ${isMobile ? 'fixed' : 'relative'}
     ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
   `}>
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

## Modern UI Design Systems

### **WebTerminal Design Philosophy**

**Color Palette:**
- Background: `#050505` (Deep black)
- Surfaces: `#0a0a0f` (Slightly lighter)
- Hover States: `#151520` (Mid-tone for interaction feedback)
- Primary Text: `#e0e0e0` (Light gray for readability)
- Secondary Text: `#a0a0b0` (Dimmed for hierarchy)
- Accent Colors:
  - Indigo: `#6366f1` (Primary actions)
  - Cyan: `#06b6d4` (Information)
  - Purple: `#a855f7` (Secondary actions)
  - Amber: `#f59e0b` (Warnings/busy state)
  - Emerald: `#10b981` (Success)
  - Red: `#ef4444` (Errors)
- Borders: `#18181b` (Subtle definition)

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
- Font family: System sans-serif
- Monospace for code and terminal elements
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

**For detailed component patterns, button styles, input fields, cards, and animations, see the [Chat Frontend Style Guide](./style-guide-chat-frontend.md).**

END FILE ATTACHMENT
