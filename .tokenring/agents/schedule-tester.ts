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
        agentType: "writer",
        message: "/chat send hello",
        //every: "2 minutes",
        once: true,
        from: "09:00",
        on: "mon tue wed thu fri"
      },
      "helloWorldTask2": {
        agentType: "writer",
        message: "/chat send hello",
        //every: "2 minutes",
        once: true,
        from: "04:08",
        to: "04:13",
        on: "mon tue wed thu fri"
      },
    }
  },
} satisfies AgentConfig & ChatAgentConfig & SchedulerAgentConfig;