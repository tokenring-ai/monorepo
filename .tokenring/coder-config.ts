/* eslint-disable turbo/no-undeclared-env-vars */
import {configSchema} from "@tokenring-ai/coder/src/plugins";
import fs from "fs";
import path from "path";
import {z} from "zod";
import {workflows} from "./workflows/index.js";

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
let dynamicCodebaseResources = {};
let dynamicRepoMapResources = {};

for (const pkgRoot of packageRoots) {
 const dirs = getSubdirectories(pkgRoot);
 for (const dir of dirs) {
  makeFileTreeEntry(pkgRoot, dir, dynamicCodebaseResources);
  makeRepoMapEntry(pkgRoot, dir, dynamicRepoMapResources);
  makeWholeFileEntry(pkgRoot, dir, dynamicCodebaseResources);
 }
}

export default {
  workflows,
  chat: {
    defaultModels: ["llamacpp:*"],
  },
  sandbox: {
    default: {
      provider: "docker",
    },
    providers: {
      docker: {
        type: "docker",
      }
    }
  },
  ai: {
    /*
    providers: {
      Anthropic: {
        provider: "anthropic",
        apiKey: process.env.ANTHROPIC_API_KEY,
      },
      Azure: {
        provider: "azure",
        apiKey: process.env.AZURE_API_KEY,
        baseURL: process.env.AZURE_API_ENDPOINT,
      },
      Cerebras: {
        provider: "cerebras",
        apiKey: process.env.CEREBRAS_API_KEY,
      },
      DeepSeek: {
        provider: "deepseek",
        apiKey: process.env.DEEPSEEK_API_KEY,
      },
      Google: {
        provider: "google",
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      },
      Groq: {
        provider: "groq",
        apiKey: process.env.GROQ_API_KEY,
      },
      LLama: {
        provider: "openaiCompatible",
        apiKey: process.env.LLAMA_API_KEY,
        baseURL: 'https://api.llama.com/compat/v1',
      },
      OpenAI: {
        provider: "openai",
        apiKey: process.env.OPENAI_API_KEY
      },
      LlamaCPP: {
        provider: "openaiCompatible",
        baseURL: "http://192.168.15.20:11434",
        apiKey: "sk-ABCD1234567890",
      },
      LocalLLama: {
        provider: "openaiCompatible",
        baseURL: "http://192.168.15.25:11434/v1",
        apiKey: "sk-ABCD1234567890"
      },
      OpenRouter: {
        provider: "openrouter",
        apiKey: process.env.OPENROUTER_API_KEY
      },
      Perplexity: {
        provider: "perplexity",
        apiKey: process.env.PERPLEXITY_API_KEY,
      },
      Qwen: {
        provider: "openaiCompatible",
        apiKey: process.env.DASHSCOPE_API_KEY,
        baseURL: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1'
      },
      xAi: {
        provider: "xai",
        apiKey: process.env.XAI_API_KEY,
      },
    },*/
  },
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
  filesystem: {
    defaultProvider: "local",
    providers: {
      local: {
        type: "local",
        baseDirectory: path.resolve(import.meta.dirname, "../"),
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
  },
  codebase: {
    resources: {
      ...dynamicRepoMapResources,
      ...dynamicCodebaseResources,
    },
  },
  testing: {
    maxAutoRepairs: 5,
    resources: {
      tsc: {
        type: "shell",
        name: "Typescript Check",
        command: "npx tsc --noEmit",
        workingDirectory: "./",
      },
      vitest: {
        type: "shell",
        name: "Vitest Testing",
        command: "set -o pipefail && vitest run --no-color --reporter tap-flat --silent | grep -v '^ok' | sed -n 1,500p",
        workingDirectory: "./",
      },
    },
  },
} satisfies Partial<z.input<typeof configSchema>>;