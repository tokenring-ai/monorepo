export default {
 name: "All-Package Unit Test Updater",
 description: "This agent automatically updates unit tests for each package in the TokenRing monorepo using the testEngineer agent.",
 agentType: "teamLeader",
 steps: [`
    Retrieve the list of packages in the pkg/ directory, by asking for all files with the name pkg/*/README.md.
    Create a task plan with one task per package found in pkg/*. 
    For each package, use a testEngineer subagent with the following instructions:
    1. Scan the source code in the current package.
    2. Run the test suite with 'bun run vitest'.
    3. Many of the tests will fail, due to the app being massively updated since the tests were created.
    4. Design a new test suite for the package, removing any tests that are no longer relevant, and adding new tests where necessary.
  `]
};