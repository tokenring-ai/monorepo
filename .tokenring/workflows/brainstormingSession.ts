export default {
 name: "All-Package Brainstorming Session",
 description: "This agent will automatically run a brainstorming session for each package in the TokenRing monorepo",
 agentType: "teamLeader",
 steps: [`
Retrieve the list of packages in the pkg/ directory, by asking for all files with the name pkg/*/README.md.
Then create a task plan with one task per package, with a product design engineer selected as the agent to use.
Each task should instruct the product designer to review all the code in the package directory, 
brainstorm new ideas for improving the package, and save those ideas in a 'brainstorm/prd/{idea_name}.md' file 
`.trim()
 ],
};
 

