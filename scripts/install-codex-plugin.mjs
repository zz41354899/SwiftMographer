#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), "..");
const marketplacePath = path.join(repoRoot, ".agents", "plugins", "marketplace.json");

function parseArgs(argv) {
  const args = {
    codexHome: process.env.CODEX_HOME || path.join(homedir(), ".codex"),
    marketplaceSource: repoRoot,
    ref: null,
    skipMarketplaceAdd: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--codex-home") {
      args.codexHome = path.resolve(argv[++i]);
    } else if (arg === "--source") {
      args.marketplaceSource = argv[++i];
    } else if (arg === "--ref") {
      args.ref = argv[++i];
    } else if (arg === "--skip-marketplace-add") {
      args.skipMarketplaceAdd = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/install-codex-plugin.mjs [options]

Options:
  --codex-home <path>        Codex home directory. Defaults to CODEX_HOME or ~/.codex.
  --source <source>          Marketplace source passed to codex plugin marketplace add.
                             Defaults to this repository checkout.
  --ref <ref>                Optional marketplace ref passed to codex plugin marketplace add.
  --skip-marketplace-add     Only install the plugin cache and enable it in config.toml.
`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function runCodexMarketplaceAdd(source, ref, cwd) {
  const commandArgs = ["plugin", "marketplace", "add", source];
  if (ref) {
    commandArgs.push("--ref", ref);
  }

  const result = spawnSync("codex", commandArgs, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`codex plugin marketplace add failed${detail ? `:\n${detail}` : ""}`);
  }

  if (result.stdout.trim()) {
    console.log(result.stdout.trim());
  }
}

function upsertEnabledPlugin(configText, pluginId) {
  const section = `[plugins."${pluginId}"]`;
  const lines = configText.split(/\r?\n/);
  const start = lines.findIndex((line) => line.trim() === section);

  if (start === -1) {
    const prefix = configText.trimEnd();
    return `${prefix}${prefix ? "\n\n" : ""}${section}\nenabled = true\n`;
  }

  let end = lines.length;
  for (let i = start + 1; i < lines.length; i += 1) {
    if (/^\s*\[.*\]\s*$/.test(lines[i])) {
      end = i;
      break;
    }
  }

  const enabledIndex = lines
    .slice(start + 1, end)
    .findIndex((line) => /^\s*enabled\s*=/.test(line));

  if (enabledIndex === -1) {
    lines.splice(end, 0, "enabled = true");
  } else {
    lines[start + 1 + enabledIndex] = "enabled = true";
  }

  return lines.join("\n").replace(/\s*$/, "\n");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const marketplace = await readJson(marketplacePath);
  const pluginEntry = marketplace.plugins?.find((plugin) => plugin.name === "remotion-storyboard");

  if (!pluginEntry) {
    throw new Error("Cannot find remotion-storyboard in .agents/plugins/marketplace.json");
  }

  const marketplaceName = marketplace.name;
  const pluginName = pluginEntry.name;
  const pluginRoot = path.resolve(repoRoot, pluginEntry.source.path);
  const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
  const manifest = await readJson(manifestPath);
  const version = manifest.version || "local";
  const pluginId = `${pluginName}@${marketplaceName}`;
  const cacheRoot = path.join(args.codexHome, "plugins", "cache", marketplaceName, pluginName, version);
  const configPath = path.join(args.codexHome, "config.toml");

  if (!existsSync(pluginRoot)) {
    throw new Error(`Plugin root does not exist: ${pluginRoot}`);
  }

  await mkdir(args.codexHome, { recursive: true });

  if (!args.skipMarketplaceAdd) {
    runCodexMarketplaceAdd(args.marketplaceSource, args.ref, repoRoot);
  }

  await rm(cacheRoot, { recursive: true, force: true });
  await mkdir(path.dirname(cacheRoot), { recursive: true });
  await cp(pluginRoot, cacheRoot, {
    recursive: true,
    filter: (source) => path.basename(source) !== ".DS_Store",
  });

  const existingConfig = existsSync(configPath) ? await readFile(configPath, "utf8") : "";
  await writeFile(configPath, upsertEnabledPlugin(existingConfig, pluginId));

  console.log(`Installed ${pluginId} ${version} into ${cacheRoot}`);
  console.log(`Enabled ${pluginId} in ${configPath}`);
  console.log("Restart Codex or start a new thread for the bundled skills to appear.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
