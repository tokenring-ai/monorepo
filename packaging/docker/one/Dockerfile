# vim:set ft=docker/dockerfile:1.8
# syntax=docker/dockerfile:1.8

FROM debian:trixie

LABEL org.opencontainers.image.source="https://github.com/tokenring-ai/monorepo"

COPY dist /dist
ARG TARGETARCH
RUN <<EOF
set -e
cp "/dist/tokenring-one-linux-${TARGETARCH}" /dist/tokenring-one
chmod 755 /dist/tokenring-one
rm -f /dist/tokenring-one-linux-*

apt update
apt install -y git python3 build-essential
apt remove -y build-essential
apt autoremove -y
rm -rf /var/cache/apt /var/lib/apt/lists/*
EOF

EXPOSE 80

ENV FRONTEND_DIRECTORY=/dist/frontend
WORKDIR /repo
CMD ["/dist/tokenring-one", "--listen", "0.0.0.0", "--port", "80", "--projectDirectory", "/repo"]
