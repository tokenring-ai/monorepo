# @tokenring-ai/one

**TokenRing One** — a local-first, multi-agent AI workspace for coding, research, documents, media, and automation.

This package installs the `tokenring` command and runs a prebuilt native binary for your platform (no Bun install required at runtime).

## Install

Run without installing:

```bash
npx @tokenring-ai/one
```

Or install globally:

```bash
npm install -g @tokenring-ai/one
tokenring
```

## Requirements

| Requirement | Details |
|-------------|---------|
| **OS / CPU** | macOS arm64 or x64, Linux x64, or Linux arm64 |
| **AI provider** | At least one API key (see below) |
| **Git** | Recommended if you want agents to work with repositories |
| **Audio (optional)** | PortAudio is bundled in this package for Linux and macOS |

### API keys

Set whichever providers you use:

```bash
export OPENAI_API_KEY=sk-...
export ANTHROPIC_API_KEY=sk-ant-...
export GOOGLE_GENERATIVE_AI_API_KEY=...
export GROQ_API_KEY=...
export CEREBRAS_API_KEY=...
export DEEPSEEK_API_KEY=...
export XAI_API_KEY=...
export OPENROUTER_API_KEY=...

# Optional: web search
export SERPER_API_KEY=...
```

## Quick start

```bash
# Interactive CLI in the current directory
tokenring

# Work on a specific project
tokenring --projectDirectory ./my-project

# One-shot prompt, then exit
tokenring -p "Fix the failing tests"

# Web UI
tokenring --http 127.0.0.1:3000

# Start with a specific agent
tokenring --agent leader "Plan a React component for the settings page"
```

## Command line

```text
tokenring [options] [prompt]
```

| Option | Description |
|--------|-------------|
| `--ui <cli\|none>` | UI mode (default: `cli`) |
| `--projectDirectory <path>` | Working directory (default: cwd) |
| `--dataDirectory <path>` | Data dir for knowledge, sessions, etc. (default: `<projectDirectory>/.tokenring`) |
| `--agent <type>` | Agent to start with (default: `code`) |
| `--http [host:port]` | HTTP server + web UI (default host `127.0.0.1`, random port if omitted) |
| `--auth` | Require auth for the web UI (`TR_AUTH_PASSWORD` or `TR_AUTH_BEARER`) |
| `--acp` | ACP mode over stdin/stdout |
| `--vault [path]` | Secrets vault (password via prompt or `TR_VAULT_PASSWORD`; default `~/.tokenring/secrets.vault`) |
| `-p` | Exit when the agent finishes |
| `-h, --help` | Show help |
| `-V, --version` | Show version |

### Examples

```bash
tokenring --projectDirectory ./my-app --dataDirectory ./my-data
tokenring --agent leader "Create a new React component"
tokenring -p "Fix the bug in app.ts"
tokenring --acp --projectDirectory ./my-app
tokenring --ui none
```

### Web UI authentication

```bash
TR_AUTH_PASSWORD=user:secure-password tokenring --http 127.0.0.1:3000 --auth
TR_AUTH_BEARER=user:secure-token tokenring --http 127.0.0.1:3000 --auth
```

## Supported platforms

Prebuilt binaries are included for:

- `darwin-arm64`
- `darwin-x64`
- `linux-x64`
- `linux-arm64`

Other platforms exit with an unsupported-platform error.

## What this package contains

- `tokenring.js` — launcher (npm `bin` entry); sets `LD_LIBRARY_PATH` on Linux and points at the bundled frontend
- `bin/<platform>/tokenring` — prebuilt TokenRing One binary
- Platform native libraries (e.g. PortAudio) next to the binary where needed
- `frontend/` — web UI assets for `--http`

## Other install options

**Docker**

```bash
docker pull ghcr.io/tokenring-ai/one:latest

docker run -ti --rm \
  -v ./your-project:/repo:rw \
  -e OPENAI_API_KEY \
  ghcr.io/tokenring-ai/one:latest
```

**From source** (Bun monorepo)

```bash
git clone https://github.com/tokenring-ai/monorepo.git
cd monorepo
git submodule update --init --recursive
bun install
bun run tokenring
```

## Links

- [Monorepo](https://github.com/tokenring-ai/monorepo)
- [Documentation](https://github.com/tokenring-ai/monorepo/tree/main/docs)
- [Container image](https://ghcr.io/tokenring-ai/one)
- [npm package](https://www.npmjs.com/package/@tokenring-ai/one)

## License

MIT
