# @tokenring/cli

The native TokenRing terminal client. It connects to an existing TokenRing One
instance or launches the bundled `@tokenring/one` dependency from its startup
menu.

## Install

```bash
npx @tokenring/cli
```

Or install both the client and backend globally:

```bash
npm install -g @tokenring/cli
tokenring
```

Run `tokenring` without a URL and choose **Launch TokenRing One**. The backend
runs as a child of the CLI; its stdout and stderr are captured so they do not
overwrite the TUI, and it is stopped when the CLI exits.

Connect to an existing instance by passing its URL:

```bash
tokenring http://127.0.0.1:3000
```

Use `tokenring --help` for all client options.

## Supported platforms

- macOS arm64 and x64
- Linux arm64 and x64

## License

MIT
