export default [
 '/list @files = globFiles("pkg/*/README.md")',
 '/for $pkg in @files /call runAgent( \
  agentType: "brainstorm", \
  message: "start up a brainstorm agent, and instruct it to review all the code in the $pkg directory where the README file resides, and to retrieve any @tokenring-ai/ dependencies it imports, and brainstorm new ideas for the product", \
  context: "$pkg", \
 )'
];