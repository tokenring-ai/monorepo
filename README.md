# TokenRing AI Monorepo

**A comprehensive AI-powered development and content creation ecosystem**

TokenRing AI is a modular TypeScript monorepo hosting two flagship applications—**TokenRing Coder** and **TokenRing Writer**—built on a foundation of 50+ specialized packages. The ecosystem provides AI-assisted coding, content creation, and workflow automation through a unified agent-based architecture.

## 🎯 Applications

### TokenRing Coder
An AI-powered coding assistant with a comprehensive 45-package ecosystem for local development. Supports multiple AI providers, multi-agent workflows, and advanced development tools including code intelligence, testing, git integration, and cloud services.

**Key Features:**
- Multiple AI providers (OpenAI, Anthropic, Google, Groq, Cerebras, DeepSeek)
- Multi-agent orchestration with specialized roles (frontend, backend, DevOps, testing)
- Code intelligence with Tree-sitter integration
- Git operations with auto-commit
- Docker and Kubernetes integration
- Database support (MySQL, SQLite, PostgreSQL)
- Audio processing and transcription
- Web search and browser automation

[📖 Full Coder Documentation](app/coder/README.md)

### TokenRing Writer
A unified platform for writing and managing news articles and blog posts. Leverages AI to assist with writing, editing, research, and publishing workflows.

**Key Features:**
- Specialized content creation agents (writer, editor, researcher, publisher)
- Interactive chat interface for content assistance
- Persistent content history in SQLite
- Publishing integration with Ghost.io, WordPress, and more
- Research capabilities with web search and Wikipedia
- Multi-model AI support

[📖 Full Writer Documentation](app/writer/README.md)

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) runtime (v1.0+)
- Git
- API keys for AI providers (OpenAI, Anthropic, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/tokenring-ai/tokenring.git
cd tokenring

# Initialize submodules
git submodule update --init --recursive

# Install dependencies
bun install
```

### Running Applications

#### TokenRing Coder
```bash
# Run with npx (no installation)
npx @tokenring-ai/coder --source ./your-project --initialize

# Run locally
bun run coder

# Run with Docker
docker pull ghcr.io/tokenring-ai/tokenring-coder:latest
docker run -ti --rm -v ./your-project:/repo:rw ghcr.io/tokenring-ai/tokenring-coder:latest
```

#### TokenRing Writer
```bash
# Run with npx (no installation)
npx @tokenring-ai/writer --source ./your-content --initialize

# Run locally
bun run writer

# Run with Docker
docker pull ghcr.io/tokenring-ai/writer:latest
docker run -ti --rm -v ./your-content:/repo:rw ghcr.io/tokenring-ai/writer:latest
```

## 📦 Package Ecosystem

The monorepo contains 50+ specialized packages organized into functional categories:

### Core Foundation (5 packages)
- **[@tokenring-ai/app](pkg/app)** - Base application framework with service management
- **[@tokenring-ai/agent](pkg/agent)** - Central orchestrator for AI agents with tools and commands
- **[@tokenring-ai/ai-client](pkg/ai-client)** - Unified AI client for chat/embeddings/images
- **[@tokenring-ai/chat](pkg/chat)** - AI chat configuration and tool management
- **[@tokenring-ai/utility](pkg/utility)** - Shared utilities (cache, logging, shell escape)

### Storage & Database (7 packages)
- **[@tokenring-ai/database](pkg/database)** - Abstract database layer with SQL execution
- **[@tokenring-ai/mysql](pkg/mysql)** - MySQL integration with connection pooling
- **[@tokenring-ai/drizzle-storage](pkg/drizzle-storage)** - Multi-database ORM (SQLite, MySQL, PostgreSQL)
- **[@tokenring-ai/checkpoint](pkg/checkpoint)** - Agent state persistence
- **[@tokenring-ai/queue](pkg/queue)** - Task queuing with checkpoint preservation
- **[@tokenring-ai/s3](pkg/s3)** - AWS S3 filesystem and CDN
- **[@tokenring-ai/cdn](pkg/cdn)** - Abstract CDN service

### Development Tools (10 packages)
- **[@tokenring-ai/testing](pkg/testing)** - Agent testing framework with auto-repair
- **[@tokenring-ai/git](pkg/git)** - Git operations with auto-commit
- **[@tokenring-ai/javascript](pkg/javascript)** - ESLint, package management, script execution
- **[@tokenring-ai/codebase](pkg/codebase)** - Codebase context injection
- **[@tokenring-ai/code-watch](pkg/code-watch)** - AI comment-triggered modifications
- **[@tokenring-ai/file-index](pkg/file-index)** - Semantic file search with Tree-sitter
- **[@tokenring-ai/iterables](pkg/iterables)** - Batch processing with /foreach command
- **[@tokenring-ai/scripting](pkg/scripting)** - Scripting language with variables and functions
- **[@tokenring-ai/tasks](pkg/tasks)** - Multi-agent workflow orchestration
- **[@tokenring-ai/memory](pkg/memory)** - Short-term memory and attention storage

### Web & External Services (11 packages)
- **[@tokenring-ai/websearch](pkg/websearch)** - Abstract web search interface
- **[@tokenring-ai/serper](pkg/serper)** - Google search via Serper.dev
- **[@tokenring-ai/scraperapi](pkg/scraperapi)** - Web scraping and SERP results
- **[@tokenring-ai/chrome](pkg/chrome)** - Puppeteer browser automation
- **[@tokenring-ai/wikipedia](pkg/wikipedia)** - Wikipedia API integration
- **[@tokenring-ai/aws](pkg/aws)** - AWS STS/S3 clients with authentication
- **[@tokenring-ai/docker](pkg/docker)** - Docker container management
- **[@tokenring-ai/kubernetes](pkg/kubernetes)** - Kubernetes resource discovery
- **[@tokenring-ai/sandbox](pkg/sandbox)** - Abstract sandbox interface
- **[@tokenring-ai/mcp](pkg/mcp)** - Model Context Protocol client
- **[@tokenring-ai/research](pkg/research)** - Research tools and workflows

### Communication & Publishing (8 packages)
- **[@tokenring-ai/slack](pkg/slack)** - Slack bot integration
- **[@tokenring-ai/telegram](pkg/telegram)** - Telegram bot integration
- **[@tokenring-ai/feedback](pkg/feedback)** - Human feedback tools
- **[@tokenring-ai/blog](pkg/blog)** - Blog abstraction layer
- **[@tokenring-ai/ghost-io](pkg/ghost-io)** - Ghost.io publishing integration
- **[@tokenring-ai/wordpress](pkg/wordpress)** - WordPress publishing integration
- **[@tokenring-ai/newsrpm](pkg/newsrpm)** - NewsRPM article management
- **[@tokenring-ai/reddit](pkg/reddit)** - Reddit integration

### Audio & Media (2 packages)
- **[@tokenring-ai/audio](pkg/audio)** - Abstract audio framework
- **[@tokenring-ai/linux-audio](pkg/linux-audio)** - Linux audio implementation with naudiodon2

### UI & Frontend (5 packages)
- **[@tokenring-ai/cli](pkg/cli)** - REPL service with interactive prompts
- **[@tokenring-ai/cli-ink](pkg/cli-ink)** - React Ink-based CLI interface
- **[@tokenring-ai/web-host](pkg/web-host)** - Fastify-based web server
- **[@tokenring-ai/web-frontend](pkg/web-frontend)** - React frontend with CLI-style interface
- **[@tokenring-ai/agent-api](pkg/agent-api)** - WebSocket API for real-time communication

### Filesystem & Storage (2 packages)
- **[@tokenring-ai/filesystem](pkg/filesystem)** - Abstract filesystem interface
- **[@tokenring-ai/local-filesystem](pkg/local-filesystem)** - Local disk filesystem implementation

### Utilities & Infrastructure (5 packages)
- **[@tokenring-ai/vault](pkg/vault)** - Credential storage service
- **[@tokenring-ai/template](pkg/template)** - Template processing
- **[@tokenring-ai/cloudquote](pkg/cloudquote)** - Financial data tools
- **[@tokenring-ai/utility](pkg/utility)** - Shared utilities

[📋 Complete Package Index](PACKAGES.md) | [🔗 Dependency Graph](DEPENDENCIES.md)

## 🏗️ Architecture

The TokenRing ecosystem follows a modular, agent-centric architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                     Applications Layer                       │
│  ┌──────────────────────┐    ┌──────────────────────┐      │
│  │  TokenRing Coder     │    │  TokenRing Writer    │      │
│  │  (Development AI)    │    │  (Content Creation)  │      │
│  └──────────────────────┘    └──────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Agent Layer                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Agent Team (Multi-Agent Orchestration)              │  │
│  │  • Team Leader  • Frontend  • Backend  • DevOps      │  │
│  │  • Writer  • Editor  • Researcher  • Publisher       │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                      Core Services                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ AI Client│  │Filesystem│  │ Database │  │  Memory  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Integration Layer                          │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │ Git  │ │Docker│ │ AWS  │ │Slack │ │Search│ │ MCP  │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Principles

1. **Modularity**: Each package is self-contained with clear interfaces
2. **Agent-Centric**: All functionality exposed through agent tools and commands
3. **Pluggable**: Services can be swapped (e.g., different AI providers, databases)
4. **Type-Safe**: Full TypeScript with Zod validation
5. **Event-Driven**: EventEmitter-based communication between components

## 🛠️ Development

### Project Structure

```
tokenring/
├── app/                    # Applications
│   ├── coder/             # TokenRing Coder
│   └── writer/            # TokenRing Writer
├── pkg/                   # Packages
│   ├── agent/            # Core agent system
│   ├── ai-client/        # AI integration
│   ├── filesystem/       # File operations
│   └── ...               # 50+ packages
├── deps/                  # External dependencies
├── docker/               # Docker configurations
├── PACKAGES.md           # Package index
├── DEPENDENCIES.md       # Dependency graph
└── package.json          # Monorepo configuration
```

### Building

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun test

# Format code
bun run biome

# Type check
bun run type-check
```

### Creating a New Package

```bash
# Create package directory
mkdir -p pkg/my-package

# Create package.json
cat > pkg/my-package/package.json << EOF
{
  "name": "@tokenring-ai/my-package",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    "./*": "./*.ts"
  },
  "dependencies": {
    "@tokenring-ai/agent": "workspace:*"
  }
}
EOF

# Create main module
cat > pkg/my-package/index.ts << EOF
import { TokenRingPackage } from '@tokenring-ai/agent';

export const myPackage = new TokenRingPackage({
  name: 'my-package',
  version: '0.1.0',
  description: 'My new package',
  tools: [],
  commands: [],
  services: []
});

export default myPackage;
EOF

# Create README
cat > pkg/my-package/README.md << EOF
# @tokenring-ai/my-package

Description of my package.

## Installation

\`\`\`bash
bun add @tokenring-ai/my-package
\`\`\`

## Usage

\`\`\`typescript
import { myPackage } from '@tokenring-ai/my-package';
\`\`\`
EOF
```

### Running Tests

```bash
# Run all tests
bun test

# Run specific package tests
cd pkg/agent && bun test

# Run with coverage
bun test --coverage
```

## 🐳 Docker

Both applications are available as Docker images:

```bash
# TokenRing Coder
docker pull ghcr.io/tokenring-ai/tokenring-coder:latest
docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  -e ANTHROPIC_API_KEY \
  ghcr.io/tokenring-ai/tokenring-coder:latest

# TokenRing Writer
docker pull ghcr.io/tokenring-ai/writer:latest
docker run -ti --rm \
  -v ./your-content:/repo:rw \
  -e OPENAI_API_KEY \
  ghcr.io/tokenring-ai/writer:latest
```

### Docker Compose

```yaml
version: '3.8'
services:
  tokenring-coder:
    image: ghcr.io/tokenring-ai/tokenring-coder:latest
    volumes:
      - ./project:/repo:rw
    environment:
      - OPENAI_API_KEY
      - ANTHROPIC_API_KEY
    ports:
      - "3000:3000"

  tokenring-writer:
    image: ghcr.io/tokenring-ai/writer:latest
    volumes:
      - ./content:/repo:rw
    environment:
      - OPENAI_API_KEY
```

## ⚙️ Configuration

Both applications use `.tokenring/` directory for configuration:

### Coder Configuration (`.tokenring/coder-config.mjs`)
```javascript
export default {
  defaults: {
    agent: "teamLeader",
    model: "gpt-4o"
  },
  models: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://api.openai.com/v1"
    }
  },
  storage: {
    type: "drizzle",
    providers: { sqlite: { file: "./data/tokenring.db" } }
  }
};
```

### Writer Configuration (`.tokenring/writer-config.js`)
```javascript
export default {
  defaults: {
    agent: "contentWriter",
    model: "gpt-4o"
  },
  publishing: {
    ghost: {
      url: process.env.GHOST_URL,
      adminApiKey: process.env.GHOST_ADMIN_KEY
    }
  }
};
```

## 🤖 Available Agents

### Coder Agents
- **teamLeader** - Orchestrates full-stack projects
- **fullStackDeveloper** - Implements complete features
- **frontendDesign** - React/Vue components and UI
- **backendDesign** - Server-side logic and APIs
- **testEngineer** - Testing and quality assurance
- **devopsEngineer** - CI/CD and infrastructure
- **securityReview** - Security assessments

### Writer Agents
- **contentWriter** - Creates engaging articles and blog posts
- **managingEditor** - Coordinates content creation and assignments
- **researcher** - Gathers information and sources
- **publisher** - Manages publishing workflows

## 📚 Documentation

- [Coder Documentation](app/coder/README.md) - Complete guide to TokenRing Coder
- [Writer Documentation](app/writer/README.md) - Complete guide to TokenRing Writer
- [Package Index](PACKAGES.md) - Detailed package documentation
- [Dependency Graph](DEPENDENCIES.md) - Package dependencies and relationships
- [API Documentation](docs/) - API references and guides

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards
4. Add tests for new functionality
5. Run `bun run biome` to format code
6. Update documentation as needed
7. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use consistent naming conventions
- Write comprehensive tests
- Document all public APIs
- Keep packages focused and modular
- Respect semantic versioning

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- **Issues**: Report bugs on [GitHub Issues](https://github.com/tokenring-ai/tokenring/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/tokenring-ai/tokenring/discussions)
- **Documentation**: Comprehensive guides in the `docs/` directory
- **Package READMEs**: Detailed docs in each `pkg/*/README.md`

## 🔗 Links

- [GitHub Repository](https://github.com/tokenring-ai/tokenring)
- [NPM Organization](https://www.npmjs.com/org/tokenring-ai)
- [Docker Images](https://github.com/orgs/tokenring-ai/packages)
- [Website](https://tokenring.ai) (coming soon)

## 🌟 Features Highlights

### Multi-Provider AI Support
- OpenAI (GPT-4, GPT-3.5)
- Anthropic (Claude 3)
- Google (Gemini)
- Groq (Llama, Mixtral)
- Cerebras
- DeepSeek

### Development Capabilities
- Code editing and refactoring
- Automated testing with auto-repair
- Git operations with smart commits
- Docker and Kubernetes integration
- Database management (MySQL, PostgreSQL, SQLite)
- Web search and research
- Browser automation

### Content Creation
- AI-assisted writing and editing
- Research and fact-checking
- Multi-platform publishing
- Content management
- SEO optimization

### Infrastructure
- Local and cloud file systems
- AWS S3 integration
- Docker containerization
- Kubernetes orchestration
- Database abstraction layer

---

**Ready to supercharge your development and content creation with AI?**

Get started with TokenRing Coder or TokenRing Writer today! 🚀

*Built with ❤️ by the TokenRing AI team*
