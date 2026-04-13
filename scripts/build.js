const fs = require("fs");
const path = require("path");

const root = process.cwd();
const distDir = path.join(root, "dist");

const includePaths = [
  "assets",
  "components",
  "layouts",
  "snippets",
  "templates",
  "features.json",
  "requirements.json",
  "schema.json",
  "settings.default.json",
  "settings.json",
  "server.js",
  "package.json",
  "package-lock.json",
  ".env.example",
];

function copyEntry(relativePath) {
  const source = path.join(root, relativePath);
  if (!fs.existsSync(source)) {
    return;
  }

  const target = path.join(distDir, relativePath);
  const stat = fs.statSync(source);

  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    fs.cpSync(source, target, { recursive: true });
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

for (const entry of includePaths) {
  copyEntry(entry);
}

console.log("Build complete.");
console.log(`Output: ${distDir}`);
