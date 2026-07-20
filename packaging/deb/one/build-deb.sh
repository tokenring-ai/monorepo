#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: build-deb.sh --version VERSION --arch ARCH --binary PATH --frontend PATH --outdir PATH

Build a TokenRing One .deb package for Linux.

  --version VERSION   Package version (no leading v)
  --arch ARCH         Debian architecture: amd64 or arm64
  --binary PATH       Path to the prebuilt tokenring binary
  --frontend PATH     Path to the built frontend/one dist directory
  --outdir PATH       Directory to write the .deb into
EOF
  exit 1
}

VERSION=""
ARCH=""
BINARY=""
FRONTEND=""
OUTDIR=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --version) VERSION="${2:-}"; shift 2 ;;
    --arch) ARCH="${2:-}"; shift 2 ;;
    --binary) BINARY="${2:-}"; shift 2 ;;
    --frontend) FRONTEND="${2:-}"; shift 2 ;;
    --outdir) OUTDIR="${2:-}"; shift 2 ;;
    -h|--help) usage ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      ;;
  esac
done

if [[ -z "$VERSION" || -z "$ARCH" || -z "$BINARY" || -z "$FRONTEND" || -z "$OUTDIR" ]]; then
  echo "Missing required arguments" >&2
  usage
fi

case "$ARCH" in
  amd64|arm64) ;;
  *)
    echo "Unsupported arch: $ARCH (expected amd64 or arm64)" >&2
    exit 1
    ;;
esac

if [[ ! -f "$BINARY" ]]; then
  echo "Binary not found: $BINARY" >&2
  exit 1
fi

if [[ ! -d "$FRONTEND" ]]; then
  echo "Frontend directory not found: $FRONTEND" >&2
  exit 1
fi

if ! command -v dpkg-deb >/dev/null 2>&1; then
  echo "dpkg-deb is required to build .deb packages" >&2
  exit 1
fi

PKG_NAME="tokenring-one"
PKG_ROOT="$(mktemp -d)"
trap 'rm -rf "$PKG_ROOT"' EXIT

LIB_DIR="$PKG_ROOT/usr/lib/tokenring-ai/one"
BIN_DIR="$PKG_ROOT/usr/bin"
DOC_DIR="$PKG_ROOT/usr/share/doc/$PKG_NAME"
DEBIAN_DIR="$PKG_ROOT/DEBIAN"

mkdir -p "$LIB_DIR" "$BIN_DIR" "$DOC_DIR" "$DEBIAN_DIR"

install -m 755 "$BINARY" "$LIB_DIR/tokenring"
mkdir -p "$LIB_DIR/frontend"
cp -a "$FRONTEND"/. "$LIB_DIR/frontend/"

cat > "$BIN_DIR/tokenring" <<'EOF'
#!/bin/sh
export FRONTEND_DIRECTORY=/usr/lib/tokenring-ai/one/frontend
exec /usr/lib/tokenring-ai/one/tokenring "$@"
EOF
chmod 755 "$BIN_DIR/tokenring"

cat > "$DOC_DIR/copyright" <<'EOF'
Format: https://www.debian.org/doc/packaging-manuals/copyright-format/1.0/
Upstream-Name: tokenring-one
Source: https://github.com/tokenring-ai/monorepo

Files: *
Copyright: TokenRing AI contributors
License: MIT
EOF

cat > "$DOC_DIR/changelog" <<EOF
$PKG_NAME ($VERSION) unstable; urgency=medium

  * Release $VERSION

 -- TokenRing AI <support@tokenring.ai>  $(date -u '+%a, %d %b %Y %H:%M:%S +0000')
EOF
gzip -9n "$DOC_DIR/changelog"

INSTALLED_SIZE="$(du -sk "$PKG_ROOT" | cut -f1)"

cat > "$DEBIAN_DIR/control" <<EOF
Package: $PKG_NAME
Version: $VERSION
Section: devel
Priority: optional
Architecture: $ARCH
Maintainer: TokenRing AI <support@tokenring.ai>
Installed-Size: $INSTALLED_SIZE
Recommends: git
Homepage: https://github.com/tokenring-ai/monorepo
Description: TokenRing One local AI workspace
 TokenRing One is a local-first multi-agent workspace for coding, research,
 documents, media, and automation. This package installs the tokenring
 command and ships the prebuilt native binary for the target architecture.
EOF

mkdir -p "$OUTDIR"
DEB_PATH="$OUTDIR/${PKG_NAME}_${VERSION}_${ARCH}.deb"
dpkg-deb --build --root-owner-group "$PKG_ROOT" "$DEB_PATH"
echo "Built $DEB_PATH"
