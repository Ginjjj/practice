const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const { rot13 } = require("./code.js");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    fs.readFile(path.join(__dirname, "rot13.html"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (pathname === "/submit" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const parsedBody = new URLSearchParams(body);
      const textInput = parsedBody.get("textInput");
      const encryptedText = rot13(textInput);

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ result: encryptedText }));
    });
  } else if (pathname === "/style.css") {
    fs.readFile(path.join(__dirname, "style.css"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (pathname === "/errstyle.css") {
    fs.readFile(path.join(__dirname, "errstyle.css"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.end(data);
    });
  } else if (pathname === "/code.js") {
    fs.readFile(path.join(__dirname, "code.js"), (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.end(data);
    });
  } else {
    fs.readFile(path.join(__dirname, "err404.html"), (err, data) => {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
