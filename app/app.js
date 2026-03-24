throw new Error("Intentional failure for rollback test");
const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("CI/CD Pipeline Deployed Successfully \n");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});