export default {
 name: "All-Package Documentation Updater",
 description: "This agent will automatically update the documentation for each package in the TokenRing monorepo",
 agentType: "teamLeader",
 steps: [`
 create a task plan with one task per package in pkg/*/README.md, dispatching a documentation subagent, with instructions to update the packages README to match the current code in the package`
 ]
};

