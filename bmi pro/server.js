import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const MIME_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {

    const pathname = decodeURIComponent(
        new URL(req.url, `http://${req.headers.host}`).pathname
    );

    const relativePath = pathname === "/"
        ? "index.html"
        : pathname.replace(/^\/+/, "");

    const filePath = path.resolve(__dirname, relativePath);

    if (
        filePath !== __dirname &&
        !filePath.startsWith(__dirname + path.sep)
    ) {
        res.writeHead(403);
        res.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, content) => {

        if (error) {

            res.writeHead(404);
            res.end("File not found");
            return;

        }

        const extension = path.extname(filePath);

        res.writeHead(200, {
            "Content-Type":
                MIME_TYPES[extension] || "application/octet-stream"
        });

        res.end(content);

    });

});

server.listen(PORT, () => {

    console.log(`BMI Pro running at http://localhost:${PORT}`);

});