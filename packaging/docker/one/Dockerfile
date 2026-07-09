# vim:set ft=docker/dockerfile:1.8
# syntax=docker/dockerfile:1.8

FROM debian:trixie

LABEL org.opencontainers.image.source="https://github.com/tokenring-ai/monorepo"

COPY dist /dist
ARG TARGETARCH
RUN <<EOF
set -e
cp "/dist/tokenring-linux-${TARGETARCH}" /dist/tokenring
chmod 755 /dist/tokenring
rm -f /dist/tokenring-linux-*

apt update
apt install -y git python3 libportaudio2 build-essential
apt remove -y build-essential
apt autoremove -y
rm -rf /var/cache/apt /var/lib/apt/lists/*
EOF

EXPOSE 80

WORKDIR /dist
CMD ["/dist/tokenring"]
