import type { AgentConfig } from '@tokenring-ai/agent/schema';
import {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import {FileSystemAgentConfig} from "@tokenring-ai/filesystem/schema";
import {SchedulerAgentConfig} from "@tokenring-ai/scheduler/schema";

export default {
  name: "Scheduling agent",
  description: "This agent is designed to test the scheduler",
  category: "Testing",
  minimumRunning: 1,
  chat: {
    autoCompact: true,
    systemPrompt: "",
    enabledTools: ["@tokenring-ai/research/research", "@tokenring-ai/agent/runAgent", "@tokenring-ai/websearch/searchNews"]
  },
  scheduler: {
    autoStart: true,
    tasks: {
      "helloWorldTask": {
        message: "hello",
        //every: "2 minutes",
        after: "09:00",
        weekdays: "mon tue wed thu fri"
      },
      "helloWorldTask2": {
        message: "hello",
        //every: "2 minutes",
        after: "04:08",
        before: "04:13",
        weekdays: "mon tue wed thu fri"
      },
    }
  },
} satisfies AgentConfig & ChatAgentConfig & SchedulerAgentConfig;