export default {
 name: "All-Package Refactoring Agent",
 description: "This agent will automatically analyze code and identify refactoring opportunities for each package in the TokenRing monorepo",
 agentType: "teamLeader",
 steps: [`
Retrieve the list of packages in the pkg/ directory, by asking for all files with the name pkg/*/README.md.
Then create a task plan with one task per package, with a product design engineer selected as the agent to use.
Each task should instruct the code quality engineer to review all the code in the package directory,
and to analyze code for common refactoring opportunities, code smells, complexity issues, architectural improvements, 
outdated patterns and practices - and to save those ideas in a 'design/code-quality/{idea_name}.md' file 
`.trim()
 ]
};