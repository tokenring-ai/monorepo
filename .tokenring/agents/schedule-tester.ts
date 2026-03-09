import type { AgentConfig } from '@tokenring-ai/agent/schema';
import type {ChatAgentConfig} from "@tokenring-ai/chat/schema";
import type {SchedulerAgentConfig} from "@tokenring-ai/scheduler/schema";

export default {
  agentType: "schedule-tester",
  displayName: "Scheduling agent",
  description: "This agent is designed to test the scheduler",
  category: "Testing",
  minimumRunning: 1,
  chat: {
    compaction: {
      policy: "automatic",
    },
    systemPrompt: "",
    enabledTools: []
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