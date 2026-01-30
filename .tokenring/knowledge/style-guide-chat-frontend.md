# Chat Frontend Style Guide

This document defines the visual and interactive design standards for the TokenRing chat frontend application.

## Table of Contents

- [Color Palette](#color-palette)
- [Typography](#typography)
- [Spacing & Sizing](#spacing--sizing)
- [Component Patterns](#component-patterns)
- [Animations & Transitions](#animations--transitions)
- [Accessibility](#accessibility)
- [Responsive Design](#responsive-design)
- [Common Utility Patterns](#common-utility-patterns)

---

## Color Palette

### Background Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Deep Black | `#050505` | Main background |
| Surface | `#0a0a0f` | Card backgrounds, panels |
| Hover Surface | `#151520` | Hover states, interactive elements |
| Border | `#18181b` | Borders, dividers |
| Panel Background | `#09090b` | Modal backgrounds, overlays |

### Text Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Primary Text | `#e0e0e0` | Main content text |
| Secondary Text | `#a0a0b0` | Labels, metadata |
| Muted Text | `#6b7280` | Disabled states, placeholders |
| Tertiary Text | `#4b5563` | Subtle hints, icons |

### Accent Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Indigo (Primary) | `#6366f1` | Primary buttons, active states, focus rings |
| Cyan (Info) | `#06b6d4` | Information, system messages |
| Purple (Secondary) | `#a855f7` | Secondary actions, highlights |
| Amber (Warning) | `#f59e0b` | Warnings, busy states |
| Emerald (Success) | `#10b981` | Success states, checkmarks |
| Red (Error) | `#ef4444` | Errors, alerts |

### Message Types

```tsx
// Chat messages
const messageStyles = {
  chat: 'text-emerald-400',        // Green - user messages
  reasoning: 'text-amber-400',     // Yellow - reasoning steps
  system: 'text-cyan-400',         // Blue - system messages
  input: 'text-cyan-300'           // Cyan - input prompts
};
```

### Status Colors

| Status | Color | Usage |
|--------|-------|-------|
| Idle | `#6366f1` (Indigo) | Agent idle, online |
| Busy | `#f59e0b` (Amber) | Agent busy, processing |
| Available | `#10b981` (Emerald) | Model/tool available |
| Selected | `#6366f1` (Indigo) | Currently selected item |
| Disabled | `#4b5563` (Gray) | Disabled states |

---

## Typography

### Font Family

```tsx
// Primary font
className="font-sans"

// Monospace for code/terminal elements
className="font-mono"
```

### Font Sizes

| Size | Class | Usage |
|------|-------|-------|
| Small | `text-xs` | Labels, metadata, badges |
| Base | `text-sm` | Body text, inputs |
| Large | `text-base` | Headings, important text |
| XL | `text-lg` | Section headers |
| 2XL | `text-xl` | Page titles |

### Font Weights

```tsx
className="font-normal"   // Body text
className="font-medium"  // Emphasized text
className="font-semibold" // Headings
className="font-bold"    // Important text
```

### Line Heights

```tsx
className="leading-tight"   // Tight for headings
className="leading-normal"  // Normal for body
className="leading-relaxed" // Relaxed for long text
```

---

## Spacing & Sizing

### Spacing Scale (Tailwind)

```tsx
// Margin and padding scale
className="p-1"   // 4px
className="p-2"   // 8px
className="p-3"   // 12px
className="p-4"   // 16px
className="p-6"   // 24px
className="p-8"   // 32px

className="m-1"   // 4px
className="m-2"   // 8px
className="m-4"   // 16px
className="m-6"   // 24px
className="m-8"   // 32px
```

### Component Sizing

```tsx
// Input fields
className="h-10 px-3 py-2 text-sm"

// Buttons
className="h-9 px-4 text-sm"

// Icons
className="w-4 h-4"   // Small icons
className="w-5 h-5"   // Medium icons
className="w-6 h-6"   // Large icons
className="w-8 h-8"   // Extra large icons

// Avatars
className="w-8 h-8 rounded-full"
className="w-10 h-10 rounded-full"
className="w-12 h-12 rounded-full"
```

### Border Radius

```tsx
className="rounded-md"   // 4px - Buttons, inputs
className="rounded-lg"   // 8px - Cards, panels
className="rounded-full" // 9999px - Avatars, badges
```

---

## Component Patterns

### Chat Header

**Location:** `frontend/chat/src/components/chat/ChatHeader.tsx`

**Features:**
- Responsive header with mobile menu button
- Agent status indicator (idle/busy)
- Model selector, tool selector, theme toggle, notifications

**Implementation:**

```tsx
<header className="h-14 border-b border-zinc-900 flex items-center justify-between px-6 bg-[#050505] z-10 shrink-0">
  <div className="flex items-center gap-4">
    {/* Mobile menu button */}
    <button
      onClick={toggleMobileSidebar}
      className="md:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 active:scale-95 transition-transform"
      aria-label="Toggle sidebar menu"
    >
      <Zap className="w-4 h-4 text-white" fill="currentColor"/>
    </button>

    {/* Agent status */}
    <div className="flex items-center gap-2.5">
      <div className={`w-2 h-2 rounded-full ${idle ? 'bg-indigo-500' : 'bg-amber-500'} animate-pulse`}/>
      <span className="text-xs font-medium text-zinc-400">
        {agent.data?.config.name}
      </span>
    </div>
  </div>

  {/* Right side controls */}
  <div className="flex items-center gap-3">
    <ModelSelector agentId={agentId}/>
    <ToolSelector agentId={agentId}/>
    <LightDarkModeSelector/>
    <NotificationPanel/>
  </div>
</header>
```

**Key Design Elements:**
- Gradient button for mobile menu (cyan to purple)
- Status indicator with pulse animation
- Consistent spacing (gap-3, gap-4)
- Focus-visible rings for accessibility

---

### Chat Footer

**Location:** `frontend/chat/src/components/chat/ChatFooter.tsx`

**Features:**
- Command input with auto-resize textarea
- Command suggestions dropdown
- Send/abort button
- Status bar with keyboard shortcuts
- Command history panel

**Implementation:**

```tsx
<footer className="shrink-0 bg-zinc-900/80 border-t border-zinc-900 relative">
  <div className="relative">
    {/* Input area */}
    <div className="flex items-start gap-4 px-6 py-4">
      {/* Prompt character */}
      <div className="shrink-0 h-lh items-center flex justify-center select-none text-lg">
        <span className="text-indigo-500 font-bold">&gt;</span>
      </div>

      {/* Textarea */}
      <div className="flex-1 relative pt-0.75">
        <label htmlFor="chat-input" className="sr-only">Command or message input</label>
        <textarea
          id="chat-input"
          className={`w-full bg-transparent border-none focus:ring-0 resize-none text-sm font-mono text-zinc-200 placeholder-zinc-400 p-0 leading-relaxed outline-none disabled:opacity-50 ${inputError ? 'placeholder:text-red-400/50' : ''}`}
          placeholder={inputError ? 'Please enter a message or command...' : 'Execute command or send message...'}
          disabled={!idle || !!waitingOn}
          aria-label="Command or message input"
          aria-invalid={inputError}
          aria-required="true"
        />
      </div>

      {/* Send/Abort button */}
      <div className="shrink-0">
        {idle ? (
          <button
            aria-label="Send message"
            onClick={onSubmit}
            className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            aria-label="Abort agent"
            onClick={() => agentRPCClient.abortAgent({ agentId, reason: 'User abort' })}
            className="p-2 rounded hover:bg-zinc-800 transition-colors text-zinc-400 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <Square className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>

    {/* Status bar */}
    <div className="h-10 bg-zinc-900/50 border-t border-zinc-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        {/* Status indicator */}
        <div className={`w-1.5 h-1.5 ${idle ? 'bg-indigo-500' : 'bg-amber-500'} rounded-full animate-pulse`} />
        <span className={`text-[10px] ${idle ? 'text-indigo-400' : 'text-amber-400'} font-mono uppercase`}>
          {idle ? 'Online' : 'Busy'}
        </span>
      </div>

      {/* Keyboard shortcuts */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] text-zinc-500">
        <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 font-mono">Enter</kbd>
        <span>Send</span>
        <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 font-mono">Shift+Enter</kbd>
        <span>New line</span>
      </div>
    </div>
  </div>
</footer>
```

**Key Design Elements:**
- Monospace font for input
- Auto-resize textarea with dynamic height
- Command suggestions with Framer Motion animations
- Status bar with keyboard shortcuts
- Color-coded status indicator

---

### Message List

**Location:** `frontend/chat/src/components/chat/MessageList.tsx`

**Features:**
- Session start divider
- Message components with animations
- Busy state indicator with bouncing dots
- Auto-scroll container

**Implementation:**

```tsx
<div className="h-4" />
<div className="px-6 py-4 flex items-center gap-4 text-zinc-300 select-none">
  <div className="h-px bg-zinc-600 flex-1" />
  <span className="text-[10px] uppercase tracking-widest">Session Start • {new Date().toLocaleDateString()}</span>
  <div className="h-px bg-zinc-600 flex-1" />
</div>

<AnimatePresence mode="popLayout">
  {messages.map((msg, i) => (
    <MessageComponent
      key={i}
      msg={msg}
      agentId={agentId}
      hasResponse={msg.type === 'question.request' ? answeredQuestions.has(msg.requestId) : false}
    />
  ))}
</AnimatePresence>

{busyWith && (
  <div className="flex items-center gap-4 px-6 py-2 animate-pulse">
    <div className="mt-0.5 shrink-0 w-4 flex justify-center">
      <div className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
    <div className="text-zinc-300 text-sm leading-relaxed">{busyWith}...</div>
  </div>
)}
```

**Key Design Elements:**
- Session divider with date
- PopLayout animation for smooth message transitions
- Bouncing dots for busy state
- Consistent spacing (gap-4, px-6, py-4)

---

### Auto Scroll Container

**Location:** `frontend/chat/src/components/chat/AutoScrollContainer.tsx`

**Features:**
- Auto-scroll to bottom on new messages
- Manual scroll-to-bottom button
- Resize observer for dynamic content
- Smooth scrolling behavior

**Implementation:**

```tsx
<div className="relative flex-1 overflow-hidden">
  <main
    ref={scrollRef}
    onScroll={handleScroll}
    className={`flex-1 overflow-y-auto p-0 flex flex-col font-mono text-sm relative scroll-smooth bg-[#050505] h-full ${className}`}
  >
    <div ref={contentRef} className="flex flex-col min-h-full pb-4">
      {children}
    </div>
  </main>

  {/* Scroll to bottom button */}
  <AnimatePresence>
    {showScrollButton && (
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        onClick={scrollToBottom}
        className="absolute right-4 bottom-4 p-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors z-20 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        title="Scroll to bottom"
        aria-label="Scroll to bottom of chat"
      >
        <ChevronDown className="w-4 h-4" />
      </motion.button>
    )}
  </AnimatePresence>
</div>
```

**Key Design Elements:**
- Fixed position scroll button with Framer Motion
- Indigo background with hover state
- Shadow for depth
- Focus-visible ring for accessibility

---

### Message Component

**Location:** `frontend/chat/src/components/chat/MessageComponent.tsx`

**Features:**
- Message type-specific styling
- Copy to clipboard functionality
- Framer Motion animations
- Markdown rendering support

**Implementation:**

```tsx
<motion.div
  variants={{
    hidden: { opacity: 0, x: -4 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, ease: 'easeOut' as any } },
  }}
  initial="hidden"
  animate="visible"
  className={`group relative flex flex-row items-start gap-3 px-3 py-3 transition-colors border-l-2 ${
    msg.type === 'input.received' ? 'bg-purple-800/20 border-purple-500/50' : 'hover:bg-zinc-700/30 border-transparent hover:border-zinc-600'
  }`}
>
  {/* Icon */}
  <div className="shrink-0 w-6 flex justify-center items-center prose prose-sm">
    {getIcon(msg)}
  </div>

  {/* Content */}
  <div className={`prose prose-sm prose-invert ${getContentColor(msg)}`}>
    {msg.type === 'input.received' ? (
      <p>{msg.message}</p>
    ) : 'message' in msg ? (
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.message}</ReactMarkdown>
    ) : null}

    {/* Timestamp and copy button */}
    <div className="flex flex-row items-center gap-3 pb-2 text-xs text-zinc-400 font-mono">
      {'message' in msg && msg.message && (
        <button
          onClick={handleCopy}
          className="cursor-pointer transition-colors"
          title={copied ? 'Copied!' : 'Copy message'}
          aria-label={copied ? 'Message copied to clipboard' : 'Copy message to clipboard'}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
        </button>
      )}
      {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </div>
  </div>
</motion.div>
```

**Key Design Elements:**
- Slide-in animation from left
- Type-specific background colors
- Copy button with state feedback
- Monospace timestamps

---

### Toast Notification System

**Location:** `frontend/chat/src/components/ui/Toast.tsx`

**Features:**
- Multiple toast types (success, error, info, warning)
- Auto-dismiss with configurable duration
- Stacking support
- Framer Motion animations
- ARIA live regions

**Implementation:**

```tsx
// Toast component
<motion.div
  initial={{ opacity: 0, x: 100, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  exit={{ opacity: 0, x: 100, scale: 0.95 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
  className={cn(
    'flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-[300px] max-w-md',
    toastStyles[type]
  )}
  role="alert"
  aria-live={type === 'error' ? 'assertive' : 'polite'}
>
  <Icon className="w-5 h-5 shrink-0 mt-0.5" />
  <div className="flex-1 min-w-0">
    {title && <h4 className="font-medium text-sm mb-1">{title}</h4>}
    <p className="text-sm leading-relaxed break-words">{message}</p>
  </div>
  {onClose && (
    <button
      onClick={() => setIsVisible(false)}
      className="shrink-0 p-0.5 rounded hover:bg-black/20 transition-colors"
      aria-label="Close toast"
    >
      <X className="w-4 h-4" />
    </button>
  )}
</motion.div>

// Toast container
<div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 pointer-events-none">
  <AnimatePresence mode="popLayout">
    {toasts.map((toast) => (
      <div key={toast.id} className="pointer-events-auto">
        <Toast {...toast} onClose={() => toast.id && onRemove(toast.id)} />
      </div>
    ))}
  </AnimatePresence>
</div>
```

**Toast Types:**

```tsx
const toastStyles = {
  success: 'border-emerald-500/50 bg-emerald-900/90 text-emerald-100',
  error: 'border-red-500/50 bg-red-900/90 text-red-100',
  info: 'border-blue-500/50 bg-blue-900/90 text-blue-100',
  warning: 'border-amber-500/50 bg-amber-900/90 text-amber-100',
};
```

**Key Design Elements:**
- Slide-in from right with scale effect
- Type-specific colors and borders
- Close button with hover state
- Stacking from bottom-right
- ARIA live regions for screen readers

---

### Dropdown Menu

**Location:** `frontend/chat/src/components/ui/dropdown-menu.tsx`

**Features:**
- Radix UI primitives
- Custom styling
- Focus management
- Keyboard navigation

**Implementation:**

```tsx
const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuContent = React.forwardRef<...>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-32 overflow-hidden rounded-lg border bg-secondary border-primary p-1 shadow-lg",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

const DropdownMenuItem = React.forwardRef<...>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none transition-colors hover:bg-hover focus:bg-hover text-primary",
      className
    )}
    {...props}
  />
))
```

**Key Design Elements:**
- Portal for proper z-index
- Side offset for visibility
- Hover and focus states
- Consistent padding and spacing

---

### Select Component

**Location:** `frontend/chat/src/components/ui/select.tsx`

**Features:**
- Radix UI primitives
- Custom styling
- Checkmark indicator
- Search functionality

**Implementation:**

```tsx
const SelectTrigger = React.forwardRef<...>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between rounded-lg border bg-input border-primary px-3 py-2 text-sm text-primary focus:outline-none focus:border-focus disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

const SelectItem = React.forwardRef<...>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-2 pl-8 pr-2 text-sm outline-none hover:bg-hover focus:bg-hover text-primary transition-colors",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-accent" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
```

**Key Design Elements:**
- Consistent height (h-9)
- Checkmark indicator for selected items
- ChevronDown icon
- Disabled state styling

---

### File Browser Overlay

**Location:** `frontend/chat/src/components/ui/FileBrowserOverlay.tsx`

**Features:**
- File tree view
- Search functionality
- File selection with checkboxes
- Preview pane with resize handle
- File type icons

**Implementation:**

```tsx
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px] animate-in fade-in duration-200">
  <div className="w-full max-w-6xl h-[85vh] bg-[#09090b] border border-zinc-800 rounded-xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5 relative">
    {/* Header */}
    <div className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 bg-zinc-900/30 shrink-0 select-none">
      <div className="flex items-center gap-2 text-zinc-400">
        <Folder size={16} />
        <span className="text-xs font-medium tracking-wide">File Browser</span>
      </div>
      <div className="flex items-center gap-3">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
        <input
          type="text"
          placeholder="Search files..."
          className="bg-zinc-900 border border-zinc-800 rounded-md py-1.5 pl-8 pr-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 w-48 transition-all"
        />
        <button onClick={onClose}><X size={20} /></button>
      </div>
    </div>

    {/* File list */}
    <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] text-zinc-500 font-semibold border-b border-zinc-800/50">
            <th className="pl-2 pr-4 py-2 font-medium w-8">
              <div className="w-3 h-3 border border-zinc-700 rounded bg-zinc-800/50"></div>
            </th>
            <th className="px-2 py-2 font-medium">Name</th>
            <th className="px-2 py-2 font-medium w-24 hidden sm:table-cell">Size</th>
            <th className="px-2 py-2 font-medium w-32 hidden sm:table-cell">Actions</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {sortedFiles.map((file, i) => (
            <tr
              key={i}
              onClick={() => handleFileClick(file)}
              className={cn(
                "group transition-colors border-b border-zinc-800/30 cursor-pointer",
                isSelected ? "bg-indigo-500/5" : "hover:bg-zinc-800/30"
              )}
            >
              <td className="pl-2 pr-4 py-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    isInChat ? handleRemoveFile(file) : handleAddFile(file);
                  }}
                  className={cn(
                    "w-3 h-3 border rounded flex items-center justify-center transition-all",
                    isInChat
                      ? "border-indigo-500 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.3)]"
                      : "border-zinc-700 hover:border-zinc-500"
                  )}
                >
                  {isInChat && <Check size={10} className="text-white" />}
                </div>
              </td>
              <td className="px-2 py-2">
                <div className="flex items-center gap-2 font-medium">
                  {getFileIcon(file, isDir)}
                  {displayName}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
```

**File Type Icons:**

```tsx
const getFileIcon = (file: string, isDir: boolean, size = 16) => {
  if (isDir) return <Folder className="text-indigo-400" size={size} />;
  if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.jsx')) {
    return <FileText className="text-cyan-500" size={size} />;
  }
  if (file.endsWith('.json')) return <Code className="text-amber-500" size={size} />;
  if (file.endsWith('.md')) return <FileText className="text-purple-400" size={size} />;
  if (file.match(/\.(png|jpe?g|gif|svg|webp)$/i)) return <ImageIcon className="text-purple-400" size={size} />;
  return <FileText className="text-zinc-400" size={size} />;
};
```

**Key Design Elements:**
- Modal overlay with backdrop blur
- File tree with expand/collapse
- Checkboxes for selection
- File type color coding
- Search functionality
- Preview pane with resize handle

---

### Model Selector

**Location:** `frontend/chat/src/components/ModelSelector.tsx`

**Features:**
- Provider-based grouping
- Search functionality
- Availability indicators
- Currently selected model highlighting

**Implementation:**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded hover:bg-secondary/10 transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary">
      {isSelecting ? (
        <Cpu className="w-3.5 h-3.5 text-muted animate-spin" />
      ) : (
        <Cpu className="w-3.5 h-3.5 text-dim group-hover:text-muted" />
      )}
      <span className="text-xs font-mono text-muted group-hover:text-secondary truncate max-w-64">
        {isSelecting ? 'Loading...' : (currentModel.data?.model ?? 'Select model...')}
      </span>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="max-h-150 overflow-hidden flex flex-col bg-[#09090b] border-zinc-800" style={{ width: '560px' }}>
    {/* Search */}
    <div className="relative group px-3 py-2 shrink-0">
      <input
        type="text"
        placeholder="Filter models..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
      />
    </div>

    {/* Provider groups */}
    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-1 space-y-0.5">
      {Object.entries(groupedModels).map(([provider, models]) => (
        <div key={provider} className="flex flex-col">
          {/* Provider header */}
          <div
            className="flex items-center cursor-pointer py-1.5 hover:bg-zinc-800/50 rounded-md px-2 transition-colors group select-none"
            onClick={() => toggleProvider(provider)}
          >
            <span className="w-5 flex items-center justify-center text-zinc-500 group-hover:text-zinc-400">
              <svg className="w-3 h-3 transition-transform duration-200">
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </svg>
            </span>
            <div className="flex-1 flex items-center gap-2 text-zinc-300 text-xs font-medium">
              <span className={providerColor}>{providerIcon}</span>
              {provider}
            </div>
            <span className="text-[9px] font-mono text-zinc-600 px-1.5">{models.length}</span>
          </div>

          {/* Model list */}
          {isExpanded && (
            <div className="flex flex-col pl-5 mt-0.5 space-y-0.5">
              {models.map((model) => (
                <div
                  key={model.modelId}
                  onClick={() => handleSelectModel(model.modelId)}
                  className="flex items-center cursor-pointer py-1.5 hover:bg-zinc-800/30 rounded-md px-3 transition-colors group"
                >
                  <div className={`w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 shadow-[0_0_6px_rgba(0,0,0,0.3)] ${
                    currentModel.data?.model === model.modelId
                      ? 'bg-indigo-500 shadow-[0_0_6px_rgba(99,102,241,0.6)]'
                      : model.available
                        ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                        : 'bg-zinc-600'
                  }`} />
                  <span className="flex-1 text-xs font-mono text-zinc-300 group-hover:text-zinc-200 truncate">
                    {model.modelName}
                  </span>
                  {currentModel.data?.model === model.modelId && (
                    <Check className="w-3 h-3 text-indigo-400 ml-2 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </DropdownMenuContent>
</DropdownMenu>
```

**Provider Colors:**

```tsx
const providerColors: Record<string, string> = {
  anthropic: 'text-indigo-500',
  azure: 'text-blue-500',
  cerebras: 'text-amber-500',
  deepseek: 'text-cyan-500',
  google: 'text-blue-400',
  groq: 'text-orange-500',
  openai: 'text-white',
  openrouter: 'text-purple-500',
  qwen: 'text-pink-500',
  xai: 'text-zinc-100',
  zai: 'text-green-500',
};
```

**Key Design Elements:**
- Provider grouping with expand/collapse
- Search functionality
- Availability indicators (green = available, gray = unavailable)
- Currently selected model with checkmark
- Provider-specific colors

---

### Tool Selector

**Location:** `frontend/chat/src/components/ToolSelector.tsx`

**Features:**
- Package-based grouping
- Enable/disable functionality
- Search functionality
- Selection count indicators

**Implementation:**

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded hover:bg-secondary/10 transition-colors cursor-pointer group">
      <RiStackFill className="w-3.5 h-3.5 text-dim group-hover:text-muted" />
      <span className="text-xs font-mono text-muted group-hover:text-secondary truncate max-w-48">
        {enabledTools.data?.tools?.length ?? 0} enabled
      </span>
    </div>
  </DropdownMenuTrigger>

  <DropdownMenuContent className="max-h-150 overflow-hidden flex flex-col bg-[#09090b] border-zinc-800" style={{ width: '560px' }}>
    {/* Search */}
    <div className="relative group px-3 py-2 shrink-0">
      <input
        type="text"
        placeholder="Filter tools..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-1.5 pl-9 pr-3 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
      />
    </div>

    {/* Package groups */}
    <div className="flex-1 overflow-y-auto custom-scrollbar px-3 py-1 space-y-0.5">
      {Object.entries(filteredToolsByCategory.grouped).sort().map((category) => (
        <div key={category} className="flex flex-col">
          {/* Package header */}
          <div
            className="flex items-center cursor-pointer py-1.5 hover:bg-zinc-800/50 rounded-md px-2 transition-colors group select-none"
            onClick={() => togglePackage(category)}
          >
            <span className="w-5 flex items-center justify-center text-zinc-500 group-hover:text-zinc-400">
              <svg className="w-3 h-3 transition-transform duration-200">
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </svg>
            </span>
            <div className="flex-1 flex items-center gap-2 text-zinc-300 text-xs font-medium">
              <span className={packageColor}>{packageIcon}</span>
              {category}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-zinc-600">
                {enabledToolCount}/{toolCount}
              </span>
              {enabledToolCount === toolCount
                ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
                : enabledToolCount > 0
                  ? <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_6px_rgba(255,193,7,0.4)]" />
                  : null
              }
            </div>
          </div>

          {/* Tool list */}
          {isExpanded && (
            <div className="flex flex-col pl-5 mt-0.5 space-y-0.5">
              {Object.entries(categoryTools).map(([displayName, toolName]) => {
                const isEnabled = enabledSet.has(toolName);
                return (
                  <div
                    key={toolName}
                    onClick={() => handleToggleTool(toolName)}
                    className="flex items-center cursor-pointer py-1.5 hover:bg-zinc-800/30 rounded-md px-3 transition-colors group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full mr-2.5 shrink-0 shadow-[0_0_6px_rgba(0,0,0,0.3)] ${
                      isEnabled
                        ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]'
                        : 'bg-zinc-600'
                    }`} />
                    <span className="flex-1 text-xs font-mono text-zinc-300 group-hover:text-zinc-200 truncate">
                      {displayName}
                    </span>
                    {isEnabled ? (
                      <RiCheckLine className="w-3 h-3 text-emerald-500 ml-2 shrink-0" />
                    ) : (
                      <RiCloseLine className="w-3 h-3 text-zinc-600 ml-2 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  </DropdownMenuContent>
</DropdownMenu>
```

**Package Colors:**

```tsx
const packageColors: Record<string, string> = {
  '@tokenring-ai/agent': 'text-indigo-500',
  '@tokenring-ai/ai-client': 'text-blue-500',
  '@tokenring-ai/websearch': 'text-cyan-500',
  '@tokenring-ai/filesystem': 'text-emerald-500',
  '@tokenring-ai/memory': 'text-purple-500',
  '@tokenring-ai/git': 'text-orange-500',
  '@tokenring-ai/testing': 'text-pink-500',
  '@tokenring-ai/codebase': 'text-amber-500',
  '@tokenring-ai/code-watch': 'text-yellow-500',
  '@tokenring-ai/file-index': 'text-red-500',
  '@tokenring-ai/iterables': 'text-teal-500',
  '@tokenring-ai/scripting': 'text-lime-500',
  '@tokenring-ai/tasks': 'text-green-500',
  '@tokenring-ai/slack': 'text-indigo-500',
  '@tokenring-ai/telegram': 'text-blue-500',
  '@tokenring-ai/feedback': 'text-purple-500',
  '@tokenring-ai/blog': 'text-cyan-500',
  '@tokenring-ai/ghost-io': 'text-magenta-500',
  '@tokenring-ai/wordpress': 'text-blue-400',
  '@tokenring-ai/newsrpm': 'text-orange-500',
  '@tokenring-ai/reddit': 'text-red-500',
  '@tokenring-ai/audio': 'text-violet-500',
  '@tokenring-ai/linux-audio': 'text-violet-500',
  '@tokenring-ai/sandbox': 'text-blue-500',
  '@tokenring-ai/docker': 'text-blue-500',
  '@tokenring-ai/kubernetes': 'text-cyan-500',
  '@tokenring-ai/aws': 'text-orange-500',
  '@tokenring-ai/mcp': 'text-pink-500',
  '@tokenring-ai/research': 'text-purple-500',
  '@tokenring-ai/cli': 'text-emerald-500',
  '@tokenring-ai/cli-ink': 'text-emerald-500',
  '@tokenring-ai/web-host': 'text-orange-500',
};
```

**Key Design Elements:**
- Package grouping with expand/collapse
- Search functionality
- Enable/disable toggle
- Selection count indicators (green = all enabled, yellow = partial)
- Package-specific colors

---

### Sidebar

**Location:** `frontend/chat/src/components/Sidebar.tsx`

**Features:**
- Collapsible sidebar (expanded/collapsed)
- Mobile slide-in sidebar
- Agent list with status indicators
- Workflow spawning
- Agent template creation
- Loading states

**Implementation:**

```tsx
<aside
  aria-label="Navigation sidebar"
  className={`fixed md:relative border-r border-primary bg-primary flex flex-col shrink-0 overflow-hidden h-full z-40 transition-all duration-300 ease-in-out md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} ${isSidebarExpanded ? 'w-80' : 'w-16'} top-0 left-0 md:static`}
>
  {/* Header */}
  <div className={`p-4 flex items-center shrink-0 ${isSidebarExpanded ? 'justify-between' : 'justify-between md:justify-center'}`}>
    <div
      className="flex items-center gap-3 cursor-pointer group"
      onClick={isSidebarExpanded ? () => navigateAndClose('/') : toggleSidebar}
    >
      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/10 shrink-0 transition-transform duration-200 ${!isSidebarExpanded ? 'group-hover:scale-110' : ''}`}>
        <Zap className="w-5 h-5 text-white" fill="currentColor" />
      </div>
      {isSidebarExpanded && (
        <h1 className="text-primary font-bold tracking-tight text-lg">TokenRing</h1>
      )}
    </div>

    {isSidebarExpanded && (
      <button onClick={toggleSidebar} className="hidden md:block text-muted hover:text-primary transition-colors p-1">
        <PanelLeftClose className="w-5 h-5" />
      </button>
    )}
  </div>

  {/* Content */}
  {isSidebarExpanded ? (
    <div className="flex-1 px-3 py-2 space-y-6 overflow-y-auto">
      {/* Active Agents */}
      <div>
        <div className="flex items-center justify-between px-2 mb-3">
          <h2 className="text-[10px] font-bold text-amber-600/90 uppercase tracking-widest flex items-center gap-2">
            <Cpu className="w-4 h-4" />
            Active Agents
          </h2>
          <span className="text-[9px] text-muted">{activeAgentsList.length} running</span>
        </div>
        {agents.isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-dim animate-spin" />
          </div>
        ) : (
          <div className="space-y-1">
            {activeAgentsList.map((agent) => (
              <div
                key={agent.id}
                onClick={() => navigateAndClose(`/agent/${agent.id}`)}
                className={`group flex items-center gap-3 px-3 py-2 rounded transition-colors cursor-pointer ${currentAgentId === agent.id ? 'bg-secondary/50' : 'hover:bg-secondary/30'}`}
              >
                <div className="shrink-0">
                  {agent.idle ? (
                    <Pause className="w-3.5 h-3.5 text-dim" />
                  ) : (
                    <div className="w-3.5 h-3.5 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${currentAgentId === agent.id ? 'text-primary' : 'text-secondary'}`}>{agent.name}</div>
                  <div className="text-[9px] text-muted mt-0.5 truncate">{agent.statusMessage || (agent.idle ? 'Agent is idle' : 'Agent is busy')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Workflows */}
      <div>
        <h2 className="text-[10px] font-bold text-cyan-600/90 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
          <Play className="w-4 h-4" />
          Workflows
        </h2>
        {/* Workflow items */}
      </div>

      {/* Agent Templates */}
      <div>
        <h2 className="text-[10px] font-bold text-purple-400/90 uppercase tracking-widest mb-3 px-2 flex items-center gap-2">
          <User className="w-4 h-4" />
          Agent Templates
        </h2>
        {/* Template items */}
      </div>
    </div>
  ) : (
    <div className="flex-1 px-2 py-2 space-y-2 overflow-y-auto">
      {/* Collapsed mode: Show icons only */}
      <div className="group flex items-center justify-center p-2 rounded transition-colors cursor-pointer">
        <Cpu className="w-5 h-5 text-amber-600" />
      </div>
    </div>
  )}

  {/* Footer */}
  {isSidebarExpanded && (
    <div className="p-4 border-t border-primary shrink-0 hidden md:block">
      <button className="flex items-center gap-3 w-full px-3 py-2 text-muted hover:text-secondary transition-colors cursor-pointer">
        <Settings className="w-4 h-4" />
        <span className="text-sm">Preferences</span>
      </button>
    </div>
  )}
</aside>
```

**Key Design Elements:**
- Gradient logo button
- Collapsible sidebar with smooth transition
- Status indicators (idle/busy with spinners)
- Loading states with spinners
- Section headers with uppercase tracking
- Hover effects on interactive items

---

### Inline Question Component

**Location:** `frontend/chat/src/components/question/InlineQuestion.tsx`

**Features:**
- Expandable/collapsible question panels
- Multiple input types (text, file, tree, form)
- Auto-submit countdown timer
- Keyboard navigation
- Focus management

**Implementation:**

```tsx
<div ref={containerRef} className="mt-3 border border-primary rounded-lg overflow-hidden bg-secondary/50" role="region" aria-labelledby={`question-title-${request.requestId}`}>
  {/* Header */}
  <div
    ref={headerRef}
    onClick={() => setIsExpanded(!isExpanded)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsExpanded(!isExpanded);
      }
    }}
    className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    tabIndex={0}
    role="button"
    aria-expanded={isExpanded}
    aria-controls={`question-content-${request.requestId}`}
    id={`question-title-${request.requestId}`}
  >
    <div className="flex items-center gap-2">
      <span className="text-accent text-sm font-medium">
        {request.message || 'Please provide input'}
      </span>
    </div>
    <div className="flex items-center gap-2">
      {countdown !== null && countdown > 0 && (
        <span className="text-[10px] text-accent font-medium">
          {countdown}s
        </span>
      )}
      <span className="text-[10px] text-muted uppercase font-medium">
        {question.type}
      </span>
      {isExpanded ? (
        <ChevronDown size={14} className="text-tertiary" aria-hidden="true" />
      ) : (
        <ChevronRight size={14} className="text-tertiary" aria-hidden="true" />
      )}
    </div>
  </div>

  {/* Content */}
  {isExpanded && (
    <div
      id={`question-content-${request.requestId}`}
      className="border-t border-primary"
      role="region"
      aria-labelledby={`question-title-${request.requestId}`}
      onKeyDown={handleKeyDown}
    >
      {question.type === 'treeSelect' && (
        <TreeInlineQuestion question={question} agentId={agentId} requestId={request.requestId} onClose={() => setIsExpanded(false)} />
      )}
      {question.type === 'text' && (
        <TextInlineQuestion question={question} agentId={agentId} requestId={request.requestId} onClose={() => setIsExpanded(false)} />
      )}
      {question.type === 'fileSelect' && (
        <FileInlineQuestion question={question} agentId={agentId} requestId={request.requestId} onClose={() => setIsExpanded(false)} />
      )}
      {question.type === 'form' && (
        <FormInlineQuestion question={question} agentId={agentId} requestId={request.requestId} onClose={() => setIsExpanded(false)} />
      )}
    </div>
  )}
</div>
```

**Key Design Elements:**
- Expandable/collapsible with chevron icon
- Countdown timer display
- Type indicator
- Focus management
- Auto-scroll into view

---

### Text Input Question

**Location:** `frontend/chat/src/components/question/inputs/text-inline.tsx`

**Features:**
- Single or multi-line text input
- Masked input support
- Required field validation
- Submit/Cancel buttons

**Implementation:**

```tsx
<div className="p-4 space-y-3">
  {label && (
    <label className="block text-sm text-primary">
      {label}
      {required && <span className="text-error ml-1">*</span>}
    </label>
  )}
  <div className="relative">
    {expectedLines > 1 ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={Math.min(expectedLines, 4)}
        style={masked ? { WebkitTextSecurity: 'disc' } as React.CSSProperties & { WebkitTextSecurity: string } : {}}
        placeholder={required ? "Required..." : "Optional..."}
        disabled={isSubmitting}
        className="w-full bg-primary border border-primary rounded-lg text-primary text-sm p-3 outline-none focus:border-accent transition-colors resize-none disabled:opacity-50"
        aria-required={required}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        type={masked ? 'password' : 'text'}
        placeholder={required ? "Required..." : "Optional..."}
        disabled={isSubmitting}
        className="w-full bg-primary border border-primary rounded-lg text-primary text-sm p-2.5 outline-none focus:border-accent transition-colors disabled:opacity-50"
        aria-required={required}
      />
    )}
  </div>
  <div className="flex items-center justify-between">
    <button
      onClick={handleCancel}
      disabled={isSubmitting}
      className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      <X size={14} />
      Cancel
    </button>
    <button
      onClick={handleSubmit}
      disabled={isSubmitting || (required && !value.trim())}
      className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
    >
      {isSubmitting ? 'Sending...' : 'Submit'}
      <Send size={14} />
    </button>
  </div>
</div>
```

**Key Design Elements:**
- Single or multi-line input
- Masked input support (password field)
- Required field indicator (*)
- Submit/Cancel buttons
- Disabled state styling

---

### File Selection Question

**Location:** `frontend/chat/src/components/question/inputs/file-inline.tsx`

**Features:**
- File tree view
- File/directory selection
- Selection validation (min/max)
- Loading states

**Implementation:**

```tsx
<div ref={containerRef} className="p-3 space-y-3">
  <div
    role="tree"
    aria-label="File browser"
    className="max-h-[300px] overflow-y-auto custom-scrollbar border border-primary/50 rounded-lg bg-primary p-2"
  >
    {files.has('.') ? renderTree('.', 0) : (
      <div className="text-center text-muted text-sm py-8">Loading files...</div>
    )}
  </div>
  {error && <div className="text-error text-xs px-1" role="alert">{error}</div>}
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className={`text-xs ${isSelectionValid() ? 'text-primary' : 'text-error'}`} aria-live="polite">
        {selected.size} selected
      </span>
      {(minimumSelections !== undefined || maximumSelections !== undefined) && (
        <span className="text-xs text-muted">
          {minimumSelections !== undefined && `min ${minimumSelections}`}
          {minimumSelections !== undefined && maximumSelections !== undefined && ' · '}
          {maximumSelections !== undefined && `max ${maximumSelections}`}
        </span>
      )}
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={handleCancel}
        disabled={isSubmitting}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        <X size={14} />
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !isSelectionValid()}
        className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
        <Send size={14} />
      </button>
    </div>
  </div>
</div>
```

**Key Design Elements:**
- File tree with expand/collapse
- Selection count display
- Validation messages
- Min/max selection limits
- Loading states

---

### Tree Selection Question

**Location:** `frontend/chat/src/components/question/inputs/tree-inline.tsx`

**Features:**
- Hierarchical tree selection
- Multiple selection support
- Selection validation
- Keyboard navigation

**Implementation:**

```tsx
<div ref={containerRef} className="p-3 space-y-3">
  <div
    role="tree"
    aria-label="Select from tree"
    className="max-h-[300px] overflow-y-auto custom-scrollbar border border-primary/50 rounded-lg bg-primary"
  >
    {question.tree.map((root, index) => (
      <CompactTreeNode
        key={index}
        node={root}
        depth={0}
        selected={selected}
        onToggle={handleToggle}
        onExpand={() => toggleExpand(index)}
        isExpanded={expandedNodes.has(index)}
        multiple={multiple}
        canSelect={canSelect}
        isFirstNode={index === 0}
      />
    ))}
  </div>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <span className={`text-xs ${isValid ? 'text-primary' : 'text-error'}`} aria-live="polite">
        {selectionCount} selected
      </span>
      {(minimumSelections !== undefined || maximumSelections !== undefined) && (
        <span className="text-xs text-muted">
          {minimumSelections !== undefined && `min ${minimumSelections}`}
          {minimumSelections !== undefined && maximumSelections !== undefined && ' · '}
          {maximumSelections !== undefined && `max ${maximumSelections}`}
        </span>
      )}
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={handleCancel}
        disabled={isSubmitting}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        <X size={14} />
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        disabled={isSubmitting || !isValid}
        className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {isSubmitting ? 'Sending...' : 'Submit'}
        <Send size={14} />
      </button>
    </div>
  </div>
</div>
```

**Key Design Elements:**
- Hierarchical tree structure
- Multiple selection support
- Selection validation
- Keyboard navigation (Arrow keys)
- Checkmark indicators

---

### Form Question

**Location:** `frontend/chat/src/components/question/inputs/form-inline.tsx`

**Features:**
- Multi-section wizard
- Field-by-field navigation
- Progress indicator
- Multiple field types

**Implementation:**

```tsx
<div ref={containerRef} className="p-4 space-y-3">
  {/* Progress indicator */}
  <div className="flex items-center justify-between text-xs" aria-live="polite">
    <div className="flex items-center gap-2">
      <span className="text-muted">Section {currentSection + 1} of {question.sections.length}</span>
      <span className="text-muted">·</span>
      <span className="text-muted">Field {currentField + 1} of {totalFields}</span>
    </div>
    <span className="text-accent font-medium">{section.name}</span>
  </div>

  {/* Description */}
  {section.description && (
    <p className="text-xs text-muted italic">{section.description}</p>
  )}

  {/* Field content */}
  <div className="min-h-[150px] flex flex-col">
    {field.type === 'text' && (
      <div className="flex-1 flex flex-col space-y-2">
        <label className="block text-sm text-primary" htmlFor={`form-field-${fieldKey}`}>
          {field.label}
          {field.required && <span className="text-error ml-1">*</span>}
        </label>
        {field.description && <p className="text-xs text-muted">{field.description}</p>}
        <input
          ref={inputRef}
          id={`form-field-${fieldKey}`}
          type={field.masked ? 'password' : 'text'}
          defaultValue={currentFieldValue || field.defaultValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (e.currentTarget.value) {
                handleFieldSubmit(e.currentTarget.value);
              }
            } else if (e.key === 'Escape') {
              handleCancel();
            }
          }}
          className="w-full bg-primary border border-primary rounded-lg text-primary text-sm p-2.5 outline-none focus:border-accent transition-colors"
          aria-required={field.required}
        />
      </div>
    )}

    {field.type === 'treeSelect' && (
      <div className="flex-1 flex flex-col space-y-2 min-h-[150px]">
        <label className="block text-sm text-primary">{field.label}</label>
        <div className="border border-primary/50 rounded-lg flex-1 flex flex-col overflow-hidden">
          <TreeInlineQuestion question={field} agentId={agentId} requestId={requestId} onClose={() => handleFieldSubmit(null)} autoFocus={autoFocus} />
        </div>
      </div>
    )}

    {field.type === 'fileSelect' && (
      <div className="flex-1 flex flex-col space-y-2 min-h-[150px]">
        <label className="block text-sm text-primary">{field.label}</label>
        {field.description && <p className="text-xs text-muted">{field.description}</p>}
        <div className="border border-primary/50 rounded-lg flex-1 flex flex-col overflow-hidden">
          <FileInlineQuestion question={field} agentId={agentId} requestId={requestId} onClose={() => handleFieldSubmit(null)} autoFocus={autoFocus} />
        </div>
      </div>
    )}
  </div>

  {/* Actions */}
  <div className="flex items-center justify-between pt-2">
    <div className="flex gap-2">
      <button
        onClick={handleCancel}
        disabled={isSubmitting}
        className="flex items-center gap-1.5 text-xs text-muted hover:text-primary transition-colors disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        <X size={14} />
        Cancel
      </button>
      {canGoPrevious && (
        <button
          onClick={handlePrevious}
          disabled={isSubmitting}
          className="flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors disabled:opacity-50 bg-tertiary px-2 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
        >
          <ChevronLeft size={14} />
          Previous
        </button>
      )}
    </div>
    {field.type === 'text' && (
      <button
        onClick={(e) => {
          const input = e.currentTarget.parentElement?.parentElement?.querySelector('input') as HTMLInputElement;
          if (input?.value) handleFieldSubmit(input.value);
        }}
        className="flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {isLastField && isLastSection ? 'Submit' : 'Next'}
        <ChevronRight size={14} />
      </button>
    )}
  </div>
</div>
```

**Key Design Elements:**
- Progress indicator (section/field count)
- Section name display
- Field description
- Previous/Next navigation
- Submit button for final section

---

## Animations & Transitions

### Smooth Transitions

```tsx
// Color transitions
className="transition-colors duration-200"

// Transform transitions
className="transition-transform duration-200"

// All transitions
className="transition-all duration-200 ease-in-out"
```

### Hover Effects

```tsx
// Background color change
className="hover:bg-zinc-900/30 transition-colors"

// Scale effect
className="hover:scale-105 transition-transform duration-200"

// Border highlight
className="hover:border-indigo-500 transition-colors"
```

### Framer Motion Animations

```tsx
import { motion } from 'framer-motion';

// Toast enter animation
<motion.div
  initial={{ opacity: 0, x: 100, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  exit={{ opacity: 0, x: 100, scale: 0.95 }}
  transition={{ duration: 0.2, ease: 'easeOut' }}
>
  {/* Toast content */}
</motion.div>

// Sidebar slide animation
<motion.div
  initial={{ x: '-100%' }}
  animate={{ x: 0 }}
  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
>
  {/* Sidebar content */}
</motion.div>

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

### Loading States

```tsx
// Spinner
<div className="flex items-center justify-center">
  <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
</div>

// Skeleton loading
<div className="animate-pulse">
  <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
  <div className="h-4 bg-zinc-800 rounded w-1/2" />
</div>
```

---

## Accessibility

### Focus Management

```tsx
// Skip link pattern
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  Skip to main content
</a>

<main id="main-content" tabIndex={-1}>
  {/* Main content */}
</main>

// Focus-visible rings
className="... focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
```

### ARIA Attributes

```tsx
// Labels
<label htmlFor="input-id" className="sr-only">
  Label text
</label>

// Live regions
<span aria-live="polite">{statusLine}</span>

<div role="status" aria-live="polite">
  {selectedCount} selected
</div>

// Icon-only buttons
<button aria-label="Send message">
  <Send className="w-4 h-4" />
</button>

// Error states
<input
  aria-invalid={hasError}
  aria-describedby={errorId}
/>

// Loading states
<div role="status" aria-live="polite">
  <Loader2 className="w-6 h-6 animate-spin" />
  <span className="sr-only">Loading...</span>
</div>
```

### Keyboard Navigation

```tsx
// Enter key handler
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSubmit();
  }
};

// Escape key handler
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Escape') {
    handleCancel();
  }
};

// Tab order management
<button tabIndex={-1} />
```

### Screen Reader Only

```tsx
// Hidden from visual but visible to screen readers
className="sr-only"

// Usage
<span className="sr-only">Loading...</span>
<label className="sr-only">Input label</label>
```

---

## Responsive Design

### Breakpoints

```tsx
// Custom breakpoints
xs: 480px   // Extra small screens
sm: 640px   // Small screens
md: 768px   // Medium screens (tablet)
lg: 1024px  // Large screens (desktop)
```

### Mobile-First Patterns

```tsx
// Responsive padding
className="p-2 sm:p-4 md:p-6"

// Responsive font sizes
className="text-xs sm:text-sm md:text-base"

// Responsive layouts
<div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
  {/* Content */}
</div>

// Responsive visibility
<div className="hidden sm:block">
  {/* Visible on mobile, hidden on desktop */}
</div>

<div className="block sm:hidden">
  {/* Visible on desktop, hidden on mobile */}
</div>
```

### Mobile-Specific Components

```tsx
// Mobile menu button
<button onClick={onMenuClick} className="md:hidden p-1.5 flex-shrink-0">
  <Menu size={18} />
</button>

// Mobile sidebar overlay
{isMobile && isMobileSidebarOpen && (
  <div className="fixed inset-0 bg-black/50 z-30" />
)}

// Collapsible sidebar
<div className={`
  ${isMobile ? 'fixed' : 'relative'}
  ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
`}>
  <Sidebar ... />
</div>
```

### Touch-Friendly Targets

```css
@media (max-width: 479px) {
  button, .cursor-pointer {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### Safe Area Insets for Notched Devices

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

## Common Utility Patterns

### Focus Management

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

### Conditional Classes

```tsx
// Using cn utility
import { cn } from '../lib/utils';

<div className={cn(
  'base-classes',
  isActive && 'active-classes',
  isError && 'error-classes',
  isLoading && 'loading-classes'
)} />
```

### Loading States

```tsx
// Conditional rendering
{isLoading ? (
  <div className="flex items-center justify-center py-8">
    <Loader2 className="w-6 h-6 text-zinc-600 animate-spin" />
  </div>
) : data ? (
  <div className="content">
    {/* Render data */}
  </div>
) : (
  <div className="text-center text-zinc-600 text-xs">
    No data available
  </div>
)}
```

### Error Handling

```tsx
// Try-catch with toast
try {
  await chatRPCClient.sendInput({ agentId, message });
  toastManager.success('Message sent');
} catch (error) {
  toastManager.error(error.message, { duration: 5000 });
}
```

### Conditional Styling

```tsx
// Status-based styling
<div className={cn(
  'px-3 py-1 rounded-full text-xs font-medium',
  status === 'active' && 'bg-emerald-500/10 text-emerald-400',
  status === 'busy' && 'bg-amber-500/10 text-amber-400',
  status === 'error' && 'bg-red-500/10 text-red-400'
)}>
  {status}
</div>
```

### Utility Functions

```tsx
// Format timestamps
const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Truncate text
const truncate = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};
```

---

## Component Structure

### ChatPage Structure

```tsx
export default function ChatPage({ agentId }: { agentId: string }) {
  // State
  const [input, setInput] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showFileBrowser, setShowFileBrowser] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [toasts, setToasts] = useState<any[]>();

  // Hooks
  const { messages } = useAgentEventState(agentId);
  const { idle, busyWith, statusLine, waitingOn } = useAgentExecutionState(agentId);
  const commandHistory = useCommandHistory(agentId);
  const availableCommands = useAvailableCommands(agentId);

  // Effects
  useEffect(() => {
    const cleanup = notificationManager.subscribeToasts(setToasts);
    return cleanup as () => void;
  }, []);

  // Handlers
  const handleSubmit = async () => {
    // Validation and submission logic
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toast Container */}
      <ToastContainer toasts={toasts || []} onRemove={(id) => toastManager.remove(id)} />

      {/* File Browser Overlay */}
      <FileBrowserOverlay
        agentId={agentId}
        isOpen={showFileBrowser}
        onClose={() => setShowFileBrowser(false)}
      />

      {/* Header */}
      <ChatHeader agentId={agentId} idle={idle} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AutoScrollContainer>
          <MessageList messages={messages} agentId={agentId} busyWith={busyWith || undefined} />
        </AutoScrollContainer>

        {/* Footer */}
        <ChatFooter
          agentId={agentId}
          input={input}
          setInput={setInput}
          inputError={inputError}
          setInputError={setInputError}
          idle={idle}
          waitingOn={waitingOn ? 'waiting' : undefined}
          statusLine={statusLine || undefined}
          availableCommands={filteredAvailableCommands}
          commandHistory={commandHistory.data || []}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
          setShowFileBrowser={setShowFileBrowser}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
```

---

## Best Practices

1. **Always use semantic HTML** - Use `<main>`, `<header>`, `<footer>`, `<nav>` where appropriate
2. **Maintain consistent spacing** - Use the spacing scale consistently throughout the app
3. **Provide proper labels** - All interactive elements should have accessible labels
4. **Handle loading states** - Always show loading indicators for async operations
5. **Provide error feedback** - Use toasts or inline messages for errors
6. **Test keyboard navigation** - Ensure all interactive elements are keyboard accessible
7. **Use appropriate animations** - Keep animations smooth and consider reduced motion preferences
8. **Follow mobile-first approach** - Design for mobile first, then enhance for larger screens
9. **Use proper contrast ratios** - Ensure text is readable against backgrounds
10. **Document complex components** - Add comments for complex logic and interactions

---

## References

- [Frontend Knowledge Repository](./frontend.md)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives)
- [Framer Motion Documentation](https://www.framer.com/motion/)
