import {configSchema} from "@tokenring-ai/writer/src/plugins";
import path from "path";
import {z} from "zod";

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
  researchModel: "google:gemini-3-flash",
 },
 chat: {
  defaultModels: ["llamacpp:*"],
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
} satisfies Partial<z.input<typeof configSchema>>;
