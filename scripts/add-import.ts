import fs from "node:fs";

const files = [
  "pkg/ai-client/ModelTypeRegistry.ts",
  "pkg/blog/BlogService.ts",
  "pkg/calendar/CalendarService.ts",
  "pkg/cdn/CDNService.ts",
  "pkg/chat/ChatService.ts",
  "pkg/checkpoint/AppCheckpointService.ts",
  "pkg/chrome/ChromeService.ts",
  "pkg/code-watch/CodeWatchService.ts",
  "pkg/email/EmailService.ts",
  "pkg/escalation/EscalationService.ts",
  "pkg/file-index/FileIndexService.ts",
  "pkg/google/GoogleService.ts",
  "pkg/image/ImageService.ts",
  "pkg/sandbox/SandboxService.ts",
  "pkg/scheduler/SchedulerService.ts",
  "pkg/scripting/ScriptingService.ts",
  "pkg/social/SocialMediaService.ts",
  "pkg/template/TemplateService.ts",
  "pkg/terminal/TerminalService.ts",
  "pkg/utility/registry/KeyedRegistry.ts",
  "pkg/video/VideoGenerationService.ts",
  "pkg/web-host/WebHostService.ts",
  "pkg/websearch/WebSearchService.ts",
  "pkg/workflow/WorkflowService.ts"
];

const importLine = `import { ConfigurationError } from "@tokenring-ai/app/types";\n`;

for (const file of files) {
  if (!fs.existsSync(file)) {
    console.warn(`⚠️ File not found: ${file}`);
    continue;
  }

  const content = fs.readFileSync(file, "utf8");

  if (content.includes('from "@tokenring-ai/app/types"') || content.includes("from '@tokenring-ai/app/types'")) {
    console.log(`⏭️  Already has import: ${file}`);
    //continue;
  }

  fs.writeFileSync(file, importLine + content, "utf8");
  console.log(`✅ Added import to: ${file}`);
}