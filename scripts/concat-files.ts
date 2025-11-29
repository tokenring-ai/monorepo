#!/usr/bin/env bun

import {readdir, readFile} from "node:fs/promises";
import {join, relative} from "node:path";

const args = process.argv.slice(2);
const dir = args[0] || ".";
const extensions = args[1]?.split(",") || [".ts", ".js", ".tsx", ".jsx", ".json"];

async function* walkDir(dir: string): AsyncGenerator<string> {
  const entries = await readdir(dir, {withFileTypes: true});
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "dist") {
      yield* walkDir(path);
    } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
      yield path;
    }
  }
}

const files: string[] = [];
for await (const file of walkDir(dir)) {
  files.push(file);
}

files.sort();

for (const file of files) {
  const content = await readFile(file, "utf-8");
  const relPath = relative(dir, file);
  console.log(`\n${"=".repeat(80)}`);
  console.log(`File: ${relPath}`);
  console.log("=".repeat(80));
  console.log(content);
}
