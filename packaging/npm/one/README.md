# @tokenring/one

**TokenRing One** — a local-first, multi-agent AI workspace for coding, research, documents, media, and automation.

This package installs the `tokenring-one` backend and its web frontend. The
interactive terminal client is published separately as `@tokenring/cli`.

## Install

Run without installing:

```bash
npx @tokenring/one
```

Or install globally:

```bash
npm install -g @tokenring/one
tokenring-one
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
# Backend and web UI in the current directory
tokenring-one

# Work on a specific project
tokenring-one --projectDirectory ./my-project

tokenring-one --listen 127.0.0.1 --port 3000
```

## Command line

```text
tokenring-one [options]
```

| Option | Description |
|--------|-------------|
| `--projectDirectory <path>` | Working directory (default: cwd) |
| `--dataDirectory <path>` | Data dir for knowledge, sessions, etc. (default: `<projectDirectory>/.tokenring`) |
| `--listen <host>` | HTTP server bind address (default: `127.0.0.1`) |
| `--port <port>` | HTTP server port (`0` chooses a free port) |
| `--vaultFile <path>` | Path to the secrets vault file (password from system secrets manager or `TR_VAULT_PASSWORD`; default `~/.config/tokenring/secrets.vault`) |
| `-h, --help` | Show help |
| `-V, --version` | Show version |

### Examples

```bash
tokenring-one --projectDirectory ./my-app --dataDirectory ./my-data
tokenring-one --listen 0.0.0.0 --port 3000
```

### Web UI authentication

```bash
TR_ADMIN_USER=user TR_ADMIN_PASSWORD=secure-password tokenring-one --port 3000
```

## Supported platforms

Prebuilt binaries are included for:

- `darwin-arm64`
- `darwin-x64`
- `linux-x64`
- `linux-arm64`

Other platforms exit with an unsupported-platform error.

## What this package contains

- `tokenring-one.js` — npm launcher that points the backend at the bundled frontend
- `bin/<platform>/tokenring-one` — prebuilt TokenRing One binary
- `frontend/` — web UI assets

## Other install options

**Docker**

```bash
docker pull ghcr.io/tokenring-ai/one:latest

docker run -ti --rm \
  -p 8080:80 \
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
bun run run:one
```

## Links

- [Monorepo](https://github.com/tokenring-ai/monorepo)
- [Documentation](https://github.com/tokenring-ai/monorepo/tree/main/docs)
- [Container image](https://ghcr.io/tokenring-ai/one)
- [npm package](https://www.npmjs.com/package/@tokenring/one)

## License

MIT
