export default {
 name: "All-Package Documentation Updater",
 description: "This agent will automatically update the documentation for each package in the TokenRing monorepo",
 agentType: "teamLeader",
 steps: [
  `/func js getPackageDirectories() { return (await import('fs')).globSync('pkg/*') }`,
  `/list @packages = getPackageDirectories()`,
  `/for $pkg in @packages {
    /eval /agent run documentationEngineer Search for all the files in $pkg/, and methodically update the packages README to match the current code in the package;
    /eval /agent run documentationEngineer Search for all the files in $pkg/ and docs/docs/plugins/*.md, and methodically update or create documentation in docs/docs/plugins/ to match the current functionality of the package (plugin)
   }`,
  //`create a task plan with one task per package in pkg/*/README.md, dispatching a documentation subagent, with instructions to update the packages README to match the current code in the package`
 ]
};

