# Token Ring Package Index

## Overview

The Token Ring monorepo hosts the development of the Token Ring Coder, Writer, and WebTerminal Applications, an interactive AI-powered
developer assistant. This framework enables conversational interaction with codebases, supporting tasks like code
editing, refactoring, testing, git operations, and integrations with external services (e.g., AWS, Docker, web search).
Built as a TypeScript monorepo using Bun, it provides pluggable packages under the `@tokenring-ai/*` scope for modular
AI agent functionality. Key features include persistent chat sessions in SQLite, command-based workflows, plugin
extensibility, and sandboxed execution. The ecosystem targets developers seeking AI-assisted coding in a secure, local
environment (version 0.1.0, early-stage).

## Package List

| Name                           | Description                                                                                                                       | Dependencies (Key)                                                                                                             | Main APIs/Exports                                                                                                                | Role/Integrations                                                                                       |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| @tokenring-ai/agent            | Core component for creating, managing, and orchestrating AI agents with tools, commands, hooks, and state persistence.            | @tokenring-ai/utility, eventemitter3, glob-gitignore, uuid; Peer: @tokenring-ai/ai-client                                        | Agent, AgentTeam, ContextStorage, HistoryStorage, types.ts, events                                                             | Central orchestrator; integrates with all packages via registries for tools/commands/services.          |
| @tokenring-ai/ai-client        | Unified AI client for chat/embeddings/images via Vercel AI SDK, with model registry and request builders.                         | ai, @ai-sdk/* (openai/anthropic/google/groq/etc.), @tokenring-ai/agent, axios, lodash-es, zod                                    | ModelRegistry, AIChatClient, createChatRequest, runChat, AIService                                                             | LLM core; integrates with all agent packages for AI calls.                                              |
| @tokenring-ai/audio            | Abstract audio framework for recording, playback, transcription, and text-to-speech synthesis.                                    | @tokenring-ai/agent, zod                                                                                                         | AudioProvider (abstract), AudioService, /voice command, record/transcribe/speak/playback tools                                 | Audio abstraction; extended by @tokenring-ai/linux-audio for platform-specific impl.                    |
| @tokenring-ai/aws              | AWS integration with STS/S3 clients, authentication, and bucket listing tool/command.                                             | @aws-sdk/client-s3, @aws-sdk/client-sts, @tokenring-ai/agent, @tokenring-ai/filesystem, node-fetch, zod                          | AWSService, listS3Buckets tool, /aws command                                                                                   | Cloud integration; uses agent tools for S3 ops.                                                         |
| @tokenring-ai/cdn              | Abstract CDN service for uploading/managing files in content delivery networks.                                                   | None specified                                                                                                                   | CDNService (abstract), upload/delete tools                                                                                     | Base for CDN integrations; extended by @tokenring-ai/s3 for AWS S3.                                     |
| @tokenring-ai/checkpoint       | Checkpoint service for storing Agent Checkpoints with a storage provider.                                                         | @tokenring-ai/agent                                                                                                              | CheckpointService, AgentCheckpointProvider (abstract)                                                                          | State persistence abstraction; used by @tokenring-ai/sqlite-storage.                                    |
| @tokenring-ai/chrome           | Puppeteer tool for browser automation scripts, capturing logs and results.                                                        | @tokenring-ai/agent, puppeteer                                                                                                   | ChromeWebSearchProvider, runPuppeteerScript tool                                                                               | Web automation; integrates with agent tools for scripting.                                              |
| @tokenring-ai/cli              | REPL service for interactive CLI with agent selection, event processing, and commands (/help, /edit, etc.).                       | @tokenring-ai/agent, @tokenring-ai/ai-client, @tokenring-ai/utility, @inquirer/prompts, chalk, ora, execa, open                  | REPLService, REPLInput utils, chatCommands (help/exit/multi/edit)                                                              | Terminal UI; powers main CLI app, integrates all agent packages.                                        |
| @tokenring-ai/codebase         | Service for injecting codebase structure/files into agent context via memories and resources.                                     | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/utility                                                             | CodeBaseService, FileTreeResource, WholeFileResource, RepoMapResource, /codebaseResources command                              | Code awareness; integrates with agent memories and filesystem.                                          |
| @tokenring-ai/code-watch       | File watcher that detects AI comment triggers (e.g., # AI!) and spawns agents for code mods/questions.                            | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/filesystem                                                           | CodeWatchService                                                                                                               | Dev workflow; integrates with agent team and filesystem watching.                                       |
| @tokenring-ai/database         | Abstract database layer with resource management, SQL execution, schema inspection tools.                                         | @tokenring-ai/agent                                                                                                              | DatabaseService, DatabaseProvider (abstract), SqlIterableProvider, listDatabases/executeSql/showSchema tools                   | DB abstraction; extended by mysql; integrates with agent tools.                                         |
| @tokenring-ai/docker           | Docker integration via CLI for container/image management, with sandbox provider.                                                 | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/sandbox, @tokenring-ai/utility, execa, glob-gitignore, zod          | DockerService, DockerSandboxProvider, dockerRun/buildImage/list* tools                                                         | Containerization; extends sandbox; integrates with agent filesystem.                                    |
| @tokenring-ai/feedback         | Tools for human feedback: ask questions, review files (text/MD/HTML/JSON), preview React components in browser.                   | @tokenring-ai/agent, @tokenring-ai/filesystem, esbuild, express, marked, open, react, zod                                        | askHuman, getFileFeedback, reactFeedback tools                                                                                 | Human-in-loop; integrates with agent for UI interactions and file ops.                                  |
| @tokenring-ai/file-index       | File indexing/search with semantic chunking (Tree-sitter symbols, sentencex), ephemeral provider.                                 | @tokenring-ai/agent, @tokenring-ai/filesystem, chokidar, gpt-tokenizer, sentencex, tree-sitter*                                  | FileIndexProvider (abstract), EphemeralFileIndexProvider, FileIndexService, hybridSearch tool, /search command                 | Codebase search; integrates with agent memories and filesystem watching.                                |
| @tokenring-ai/filesystem       | Abstract filesystem with ops (read/write/search/glob), ignore filters, tools/commands, dirty tracking.                            | @tokenring-ai/ai-client, @tokenring-ai/agent, ignore, path-browserify                                                            | FileSystemService, FileSystemProvider (abstract), file_write/append/search/patch tools, terminal/bash, /file /foreach commands | Core FS abstraction; extended by local-filesystem/s3; used by all file-interacting pkgs.                |
| @tokenring-ai/git              | Git integration for commits, rollbacks, branch management, with auto-commit hook after tests.                                     | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/testing, @tokenring-ai/utility, execa, zod | GitService, commit/rollback/branch tools, /git command, autoCommit hook                                                        | Version control; integrates with agent testing and ai-client for messages.                              |
| @tokenring-ai/iterables        | Pluggable system for defining and using named iterables with /foreach command for batch processing.                               | @tokenring-ai/agent                                                                                                              | IterableService, IterableProvider (abstract), /iterable command, glob provider                                                 | Batch processing; integrates with filesystem for glob patterns and custom providers.                    |
| @tokenring-ai/javascript       | JS dev tools: ESLint auto-fix, npm/yarn/pnpm package install/remove, JS script execution.                                         | @tokenring-ai/agent, @tokenring-ai/filesystem, eslint, execa, jiti, jscodeshift, zod                                             | eslint, installPackages, removePackages, runJavaScriptScript tools                                                             | Code tooling; integrates with agent filesystem for JS workflows.                                        |
| @tokenring-ai/kubernetes       | Kubernetes client for resource discovery/listing across namespaces, with agent tool.                                              | @tokenring-ai/agent, @kubernetes/client-node, zod                                                                                | KubernetesService, listKubernetesApiResources tool                                                                             | Infra integration; tools for agent to query K8s clusters.                                               |
| @tokenring-ai/linux-audio      | Linux-specific audio implementation using naudiodon2 for recording, playback, transcription, and TTS.                             | @tokenring-ai/audio, naudiodon2, wav, OpenAI SDK                                                                                 | LinuxAudioProvider                                                                                                             | Platform audio; extends @tokenring-ai/audio for Linux systems.                                          |
| @tokenring-ai/local-filesystem | Concrete FS implementation for local disk ops, extending FileSystemService with chokidar watching.                                | @tokenring-ai/filesystem, chokidar, execa, fs-extra, glob                                                                        | LocalFileSystemService                                                                                                         | FS backend; used by agent filesystem service for local projects.                                        |
| @tokenring-ai/mcp              | MCP (Model Context Protocol) client for connecting agents with MCP servers via stdio/SSE/HTTP transports.                         | @tokenring-ai/agent, @modelcontextprotocol/sdk                                                                                   | MCPService, stdio/SSE/HTTP transports                                                                                          | Protocol integration; enables external tool/resource access via MCP.                                    |
| @tokenring-ai/memory           | Short-term memory/attention storage for agents, with tools/commands for adding/retrieving items.                                  | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | ShortTermMemoryService, tools (add-memory/add-goal/add-focus), /memory /attention commands                                     | Agent context; integrates with chatRequestBuilder for memory injection.                                 |
| @tokenring-ai/mysql            | MySQL database integration extending DatabaseProvider for connection pooling, SQL execution, and schema inspection.               | @tokenring-ai/database, mysql2                                                                                                   | MySQLProvider, executeSql, showSchema                                                                                          | DB backend; integrates with agent database service for queries/schemas.                                 |
| @tokenring-ai/naudiodon3       | Node Stream bindings for PortAudio, providing native audio I/O capabilities.                                                      | PortAudio (native)                                                                                                               | AudioIO, AudioInput, AudioOutput streams                                                                                       | Native audio; used by @tokenring-ai/linux-audio for audio operations.                                   |
| @tokenring-ai/queue            | In-memory queue for work items (chat prompts/tasks) with checkpoint preservation for sequential processing.                       | @tokenring-ai/ai-client, @tokenring-ai/agent, @tokenring-ai/history                                                              | WorkQueueService, /queue command, addTaskToQueue tool                                                                          | Task batching; integrates with agent for deferred execution and checkpoints.                            |
| @tokenring-ai/s3               | AWS S3 integration implementing FileSystemProvider and CDNProvider for bucket-based file ops and content delivery.                | @tokenring-ai/agent, @aws-sdk/client-s3; Peer: @tokenring-ai/cdn, @tokenring-ai/filesystem                                       | S3FileSystemProvider, S3CDNProvider                                                                                            | Storage/CDN backend; integrates with agent filesystem and cdn services.                                 |
| @tokenring-ai/sandbox          | Abstract sandbox interface for isolated container management (e.g., Docker), with service for providers and agent tools/commands. | @tokenring-ai/agent, zod                                                                                                         | SandboxProvider (abstract), SandboxService, tools (createContainer, executeCommand), /sandbox command                          | Enables secure execution; extended by @tokenring-ai/docker for concrete impl.                           |
| @tokenring-ai/scraperapi       | ScraperAPI integration for web scraping, Google SERP/news, extending WebSearchProvider.                                           | @tokenring-ai/websearch, @tokenring-ai/utility                                                                                   | ScraperAPIWebSearchProvider, searchWeb, searchNews, fetchPage                                                                  | Web search/scraping; integrates with agent websearch service.                                           |
| @tokenring-ai/scripting        | Scripting language with variables, functions, LLM integration, and predefined command sequences.                                  | @tokenring-ai/agent                                                                                                              | ScriptingService, /script /var /func /call /list /for /if /while commands                                                      | Workflow automation; enables reusable command sequences and dynamic scripting.                          |
| @tokenring-ai/serper           | Serper.dev API integration for Google web/news search, extending WebSearchProvider.                                               | @tokenring-ai/websearch                                                                                                          | SerperWebSearchProvider, searchWeb, searchNews, fetchPage                                                                      | Web search; alternative to scraperapi in websearch registry.                                            |
| @tokenring-ai/tasks            | Task planning and execution with multi-step workflows, user approval, and agent dispatch.                                         | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | TaskService, /tasks command, tasks/add tool                                                                                    | Workflow orchestration; enables complex multi-agent task coordination.                                  |
| @tokenring-ai/testing          | Testing framework for agents with resources (e.g., shell commands), service for execution, auto-repair hooks.                     | @tokenring-ai/agent, @tokenring-ai/filesystem, @tokenring-ai/utility, @tokenring-ai/ai-client, @tokenring-ai/queue               | TestingService, TestingResource (abstract), ShellCommandTestingResource, /test /repair commands, autoTest/autoRepair hooks     | Ensures code integrity; integrates with agent lifecycle and ai-client for repairs.                      |
| @tokenring-ai/utility          | General-purpose helpers: promise abandonment, in-memory cache, log formatting, pretty strings, shell escaping.                    | None                                                                                                                             | abandon, Cache, formatLogMessages, infoLine/successLine/etc., shellEscape                                                      | Shared utils; used across packages (e.g., agent, filesystem) for caching/logging.                       |
| @tokenring-ai/websearch        | Abstract web search interface with pluggable providers, tools for search/news/page fetch, and chat commands.                      | @tokenring-ai/agent, zod                                                                                                         | WebSearchProvider (abstract), WebSearchService, tools (searchWeb, searchNews, fetchPage), /websearch command                   | Web integration base; extended by @tokenring-ai/serper, @tokenring-ai/scraperapi, @tokenring-ai/chrome. |
| @tokenring-ai/wikipedia        | Wikipedia API integration for searching articles and fetching page content, with agent tools and service.                         | @tokenring-ai/agent, @tokenring-ai/utility, zod                                                                                  | WikipediaService, tools (search, getPage), /wikipedia command                                                                  | Knowledge retrieval; tools integrate with agent for wiki queries.                                       |

## Categories

### Core

- **@tokenring-ai/agent**: Agent orchestration and state management.
- **@tokenring-ai/ai-client**: AI model registry and chat/embeddings.
- **@tokenring-ai/utility**: Shared utilities (cache, logging, shell escape).
- **@tokenring-ai/filesystem**: Abstract filesystem operations.
- **@tokenring-ai/memory**: Short-term memory and attention storage.
- **@tokenring-ai/queue**: Task queuing with checkpoints.
- **@tokenring-ai/checkpoint**: Checkpoint service abstraction.

### Storage & Database

- **@tokenring-ai/database**: Abstract DB layer.
- **@tokenring-ai/mysql**: MySQL integration.
- **@tokenring-ai/sqlite-storage**: SQLite for checkpoints.
- **@tokenring-ai/s3**: S3 filesystem/CDN.
- **@tokenring-ai/cdn**: Abstract CDN service.

### Development Tools

- **@tokenring-ai/testing**: Agent testing and auto-repair.
- **@tokenring-ai/git**: Git operations and auto-commit.
- **@tokenring-ai/javascript**: ESLint, package management, JS execution.
- **@tokenring-ai/codebase**: Codebase injection into context.
- **@tokenring-ai/code-watch**: AI comment-triggered modifications.
- **@tokenring-ai/file-index**: Semantic file search and indexing.
- **@tokenring-ai/iterables**: Named iterables for batch processing.
- **@tokenring-ai/scripting**: Scripting language with variables and functions.
- **@tokenring-ai/tasks**: Task planning and multi-agent orchestration.

### Integrations & External Services

- **@tokenring-ai/websearch**: Abstract web search.
- **@tokenring-ai/serper**: Google search via Serper.
- **@tokenring-ai/scraperapi**: Web scraping/SERP.
- **@tokenring-ai/wikipedia**: Wikipedia API.
- **@tokenring-ai/chrome**: Puppeteer browser automation.
- **@tokenring-ai/aws**: AWS STS/S3 clients.
- **@tokenring-ai/docker**: Docker container management.
- **@tokenring-ai/kubernetes**: K8s resource discovery.
- **@tokenring-ai/sandbox**: Abstract sandbox (extended by docker).
- **@tokenring-ai/mcp**: Model Context Protocol client.

### Audio & Media

- **@tokenring-ai/audio**: Abstract audio framework.
- **@tokenring-ai/linux-audio**: Linux audio implementation.
- **@tokenring-ai/naudiodon3**: Native audio I/O bindings.

### UI & CLI

- **@tokenring-ai/cli**: REPL and interactive prompts.
- **@tokenring-ai/feedback**: Human feedback tools (questions, file previews, React UI).
- **@tokenring-ai/local-filesystem**: Local FS implementation.

## Cross-Package Interactions

The ecosystem is agent-centric: `@tokenring-ai/agent` is the hub, registering tools/commands/services from other
packages via registries. For example:



## Quick Start

See the root [README.md](README.md) for monorepo setup and running the Coder CLI.
