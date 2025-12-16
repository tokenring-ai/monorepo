import path from "path";

export default {
 websearch: {
  defaultProvider: "chrome",
  providers: {
   chrome: {
    type: 'chrome',
    launch: true
   },/*
   serper: {
    type: 'serper',
    apiKey: process.env.SERPER_API_KEY,
   },
   scraperapi: {
    type: 'scraperapi',
    apiKey: process.env.SCRAPERAPI_API_KEY,
   },*/
  }
 },
 filesystem: {
  defaultProvider: "local",
  providers: {
   local: {
    type: "local",
    baseDirectory: path.resolve(import.meta.dirname,"../")
   }
  }
 },
 /*
 scheduler: {
  tasks: [
   {
    name: "Hello world",
    agentType: "writer",
    message: "/chat send hello",
    //every: "2 minutes",
    once: true,
    from: "09:00",
    on: "mon tue wed thu fri"
   },
   {
    name: "Hello world2",
    agentType: "writer",
    message: "/chat send hello",
    //every: "2 minutes",
    once: true,
    from: "04:08",
    to: "04:13",
    on: "mon tue wed thu fri"
   }
  ]
 },*/
 /*blog: {
  ghost: {
   type: 'ghost',
   adminApiKey: process.env.GHOST_ADMIN_API_KEY,
   contentApiKey: process.env.GHOST_CONTENT_API_KEY,
   url: process.env.GHOST_URL,
  },
 },*/
 wikipedia: {
  baseUrl: "https://en.wikipedia.org"
 },
 /*newsrpm: {
  apiKey: process.env.NEWSRPM_API_KEY,
 },
 cloudquote: {
  apiKey: process.env.CLOUDQUOTE_API_KEY,
 },*/
 research: {
  researchModel: "gemini-2.5-flash",
 },
 chat: {
  defaultModel: "LocalLLama:minimax/minimax-m2",
 },
 ai: {
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
  },
 },
 /*cdn: {
  ghost: {
   type: 'ghost',
   adminApiKey: process.env.GHOST_ADMIN_API_KEY,
   url: process.env.GHOST_URL,
  },

  s3: {
   type: 's3',
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
  }
 },*/
};
