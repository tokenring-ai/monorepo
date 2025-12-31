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
- Tailwind CSS v4 for responsive design

**Key Features:**
- CLI-style interface with syntax-colored output
- Real-time agent communication and event streaming
- Agent management (selection, creation, switching)
- Message types: chat (green), reasoning (yellow), system (blue), input (cyan)
- Automatic scrolling and input focus management
- Mobile-first responsive design

**Component Structure:**
```
frontend/src/
├── App.tsx           # Main application component
├── App.css           # Responsive styles and utilities
├── components/
│   ├── TopBar.tsx    # Navigation bar with mobile menu
│   ├── Sidebar.tsx   # Collapsible sidebar for mobile
│   └── ui/           # Reusable UI components
├── pages/
│   ├── AgentSelection.tsx  # Home page with agent list
│   └── ChatPage.tsx        # Main chat interface
└── hooks/            # Custom React hooks
```

### Mobile Responsiveness

**Custom Breakpoints:**
- **xs**: 480px - Extra small screens
- **sm**: 640px - Small screens  
- **md**: 768px - Medium screens (tablet)
- **lg**: 1024px - Large screens

**Viewport Configuration:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**Minimum Width Enforcement:**
```css
/* Force minimum 400px width on all devices */
@media (max-width: 399px) {
  html {
    min-width: 400px;
  }
}

/* iOS Safari specific fix */
@supports (-webkit-touch-callout: none) {
  html, body {
    min-width: 400px;
  }
}
```

**Mobile-First Design Patterns:**

1. **Responsive TopBar Layout**
   ```tsx
   <div className="flex items-center gap-1 sm:gap-4 overflow-x-hidden">
     {/* Mobile menu button - hidden on desktop */}
     <button onClick={onMenuClick} className="md:hidden p-1.5 flex-shrink-0">
       <Menu size={18} />
     </button>
     
     {/* Logo - truncates on small screens */}
     <h1 className="text-accent text-sm font-bold truncate max-w-[100px]">
       TokenRing
     </h1>
     
     {/* Agent selector - hidden on very small screens */}
     <div className="hidden xs:flex flex-1 max-w-[200px] sm:max-w-md flex-shrink-0">
       <Select>...</Select>
     </div>
     
     {/* Right side actions */}
     <div className="ml-auto flex items-center gap-0.5 sm:gap-2 flex-shrink-0">
       {/* Icons only on mobile, labels on desktop */}
     </div>
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
     transition-transform duration-300 ease-in-out z-40
     ${isMobile ? 'w-64' : 'w-16'}
     bg-sidebar
   `}>
     <Sidebar isMobile={isMobile} ... />
   </div>
   ```

3. **Touch-Friendly Targets**
   ```css
   @media (max-width: 479px) {
     /* Minimum 44px touch targets for mobile */
     button, .cursor-pointer {
       min-height: 44px;
       min-width: 44px;
     }
     
     input[type="text"], select {
       min-height: 44px;
     }
   }
   ```

4. **Responsive Typography**
   ```css
   /* Font sizes adapt to screen size */
   .text-accent { 
     @apply text-2xl sm:text-4xl font-bold; 
   }
   
   /* Logo truncates on small screens */
   h1.truncate {
     max-width: 100px;
   }
   ```

5. **Safe Area Insets for Notched Devices**
   ```css
   @supports (padding: env(safe-area-inset-bottom)) {
     .safe-area-bottom {
       padding-bottom: env(safe-area-inset-bottom);
     }
   }
   ```

**Mobile-Specific Components:**

1. **Mobile Menu Toggle**
   - Appears in TopBar when sidebar is present
   - Opens sidebar with slide-in animation
   - Shows overlay backdrop when open
   - Uses X icon when open, Menu icon when closed

2. **Collapsible Sidebar**
   - Collapsible navigation sidebar on mobile
   - Full-width sidebar with touch-friendly buttons
   - Smooth slide-in/out transitions
   - Icons with labels on mobile

3. **Responsive Forms**
   - Larger input fields on mobile (44px minimum height)
   - Accessible tap targets
   - Mobile-optimized spacing
   - Select dropdowns with proper sizing

4. **File Browser Mobile View**
   - Stacked layout for mobile
   - Larger touch targets
   - Read-only preview on mobile

**Accessibility for Mobile:**
- Minimum 44x44px touch targets
- Proper ARIA labels for mobile controls
- Focus management when opening/closing sidebar
- Reduced motion support via `prefers-reduced-motion`
- High contrast mode support

**Responsive CSS Utilities:**
```css
/* Extra small screens (480px) */
@media (min-width: 480px) {
  .xs\:flex { display: flex; }
  .xs\:hidden { display: none; }
  .xs\:w-auto { width: auto; }
}

/* Mobile styles */
@media (max-width: 479px) {
  .hidden-mobile { display: none !important; }
  .text-sm-mobile { font-size: 0.875rem; }
  .gap-2-mobile { gap: 0.5rem; }
}

/* Desktop styles */
@media (min-width: 768px) {
  .hidden-desktop { display: none !important; }
}
```

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
