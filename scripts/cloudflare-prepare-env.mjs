import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const wranglerPath = path.resolve("wrangler.toml");
const envPath = path.resolve(".env.local");

const parseEnvFile = (content) => {
  const map = new Map();
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();
    map.set(key, value);
  }
  return map;
};

const parseWranglerVars = (content) => {
  const lines = content.split(/\r?\n/);
  const vars = new Map();
  let inVars = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      inVars = trimmed === "[vars]";
      continue;
    }
    if (!inVars || !trimmed || trimmed.startsWith("#")) continue;

    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();

    if ((value.startsWith("\"") && value.endsWith("\"")) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    vars.set(key, value);
  }

  return vars;
};

const formatEnvLine = (key, value) => {
  const needsQuotes = /[\s#]/.test(value);
  const safeValue = value.replace(/"/g, '\\"');
  return `${key}=${needsQuotes ? `"${safeValue}"` : safeValue}`;
};

const loadWrangler = async () => {
  await access(wranglerPath);
  const content = await readFile(wranglerPath, "utf8");
  return parseWranglerVars(content);
};

const loadEnvLocal = async () => {
  try {
    const content = await readFile(envPath, "utf8");
    return parseEnvFile(content);
  } catch {
    return new Map();
  }
};

const wranglerVars = await loadWrangler();
const envLocal = await loadEnvLocal();

const newLines = [];
for (const [key, value] of wranglerVars.entries()) {
  if (!envLocal.has(key)) {
    newLines.push(formatEnvLine(key, value));
  }
}

if (newLines.length > 0) {
  const prefix = envLocal.size > 0 ? "\n" : "";
  await writeFile(envPath, prefix + newLines.join("\n") + "\n", { flag: "a" });
}
