export default {
  name: "All-Package Feature Brainstorm",
  description: "This agent will automatically create BRAINSTORM.md files in each package directory, brainstorming new features",
  agentType: "teamLeader",
  steps: [
    `/func js getPackageDirectories() { return (await import('fs')).globSync('pkg/*') }`,
    `/list @packages = getPackageDirectories()`,
    `/for $pkg in @packages {
      /eval /agent run productDesignEngineer Search for all the files in $pkg/, understand the current functionality of the package, and create or update $pkg/BRAINSTORM.md with brainstormed new features that would enhance this package
     }`
  ]
};
