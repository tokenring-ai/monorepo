docker run --env-file .env -it --net host --volume $(pwd):/app --workdir /app/app/coder oven/bun run src/tr-coder.ts -s ../../
