export default {
 name: "All-Package Unit Test Updater",
 description: "This agent automatically updates unit tests for each package in the TokenRing monorepo using the testEngineer agent.",
 agentType: "teamLeader",
 steps: [`
    Create a task plan with one task per package found in pkg/*. 
    For each package, dispatch a testEngineer subagent with the following instructions:
    1. Scan the source code in the current package.
    2. Run the test suite with Vitest.
    3. Many of the tests will fail, due to the app being massively updated since the tests were created.
    4. Design a new test suite for the package, removing any tests that are no longer relevant, and adding new tests where necessary.
    5. Do not run the new test suite yet, as it must be reviewed by the user for safety.
  `]
};