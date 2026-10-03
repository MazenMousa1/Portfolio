// Optional local preview: node preview.cjs
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const root = __dirname;
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml",
  ".ttf": "font/ttf", ".woff2": "font/woff2", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".pdf": "application/pdf", ".ico": "image/x-icon"
};
http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname); }
  catch { response.writeHead(400); response.end("Invalid URL"); return; }
  const filename = path.resolve(root, "." + (pathname === "/" ? "/index.html" : pathname));
  const relative = path.relative(root, filename);
  if (relative.startsWith("..") || path.isAbsolute(relative) || relative.split(path.sep).some(part => part.startsWith("."))) {
    response.writeHead(403); response.end("Forbidden"); return;
  }
  fs.readFile(filename, (error, content) => {
    if (error) { response.writeHead(404); response.end("Not found"); return; }
    response.writeHead(200, {"Content-Type": mime[path.extname(filename)] || "application/octet-stream", "Cache-Control": "no-store"});
    response.end(content);
  });
}).listen(8000, "127.0.0.1", () => console.log("Portfolio preview: http://127.0.0.1:8000"));
