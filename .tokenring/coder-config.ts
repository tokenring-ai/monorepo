import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "../");

function getSubdirectories(srcPath: string) {
  const filePath = path.join(rootDir, srcPath);
  if (!fs.existsSync(filePath)) return [];
  return fs
  .readdirSync(filePath)
  .filter((f) => fs.statSync(path.join(filePath, f)).isDirectory())
  .map((f) => f);
}

function makeFileTreeEntry(pkgRoot: string, dir: string, resources: Record<string, any>) {
 const name = `fileTree/${dir}`;
 resources[name] = {
  type: "fileTree",
  description: `${pkgRoot}/${dir} File Tree`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

function makeRepoMapEntry(pkgRoot: string, dir: string, resources: Record<string, any>) {
 const name = `repoMap/${dir}`;
 resources[name] = {
  type: "repoMap",
  description: `${pkgRoot}/${dir} Repo Map`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

function makeWholeFileEntry(pkgRoot: string, dir: string, resources: Record<string, any>) {
 const name = `wholeFile/${dir}`;
 resources[name] = {
  type: "wholeFile",
  description: `${pkgRoot}/${dir} Source Files`,
  items: [
   {
    path: `./${pkgRoot}/${dir}`,
    include: /\.(prisma|graphql|txt|js|jsx|md|json)$/,
   },
  ],
 };
}

const packageRoots = ["pkg", "app", "frontend"];
const dynamicCodebaseResources = {};
const dynamicRepoMapResources = {};

for (const pkgRoot of packageRoots) {
 const dirs = getSubdirectories(pkgRoot);
 for (const dir of dirs) {
  makeFileTreeEntry(pkgRoot, dir, dynamicCodebaseResources);
  makeRepoMapEntry(pkgRoot, dir, dynamicRepoMapResources);
  makeWholeFileEntry(pkgRoot, dir, dynamicCodebaseResources);
 }
}

export default {
  /*websearch: {
    defaultProvider: "serper",
    providers: {
      serper: {
        type: "serper",
        apiKey: process.env.SERPER_API_KEY,
      },
      scraperapi: {
        type: "scraperapi",
        apiKey: process.env.SCRAPERAPI_API_KEY,
      },
    }
  },*/
  /*filesystem: {
    providers: {
      local: {
        type: "posix",
        indexedFiles: [
          {path: "./pkg", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
          {path: "./app", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
          {path: "./frontend", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
        ],
        watchedFiles: [
          {path: "./pkg", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
          {path: "./app", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
          {path: "./frontend", include: /.(js|ts|jsx|tsx|md|sql|txt)$/},
        ],
      }
    }
  },*/
  codebase: {
    resources: {
      ...dynamicRepoMapResources,
      ...dynamicCodebaseResources,
    },
  },
};
