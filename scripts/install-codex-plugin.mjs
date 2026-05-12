#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(__filename);
const repoRoot = path.resolve(scriptDir, "..");

const DEFAULT_MARKETPLACE_SOURCE = "https://github.com/zz41354899/SwiftMographer.git";
const DEFAULT_REF = "main";
const MARKETPLACE_NAME = "swiftmographer";
const PLUGIN_NAME = "remotion-storyboard";

function parseArgs(argv) {
  const hasLocalMarketplace = existsSync(path.join(repoRoot, ".agents", "plugins", "marketplace.json"));
  const args = {
    codexHome: process.env.CODEX_HOME || path.join(homedir(), ".codex"),
    marketplaceSource: hasLocalMarketplace ? repoRoot : DEFAULT_MARKETPLACE_SOURCE,
    ref: hasLocalMarketplace ? null : DEFAULT_REF,
    skipMarketplaceAdd: false,
  };
  let sourceProvided = false;
  let refProvided = false;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--codex-home") {
      args.codexHome = path.resolve(argv[++i]);
    } else if (arg === "--source") {
      args.marketplaceSource = argv[++i];
      sourceProvided = true;
    } else if (arg === "--ref") {
      args.ref = argv[++i];
      refProvided = true;
    } else if (arg === "--skip-marketplace-add") {
      args.skipMarketplaceAdd = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/install-codex-plugin.mjs [options]

Installs and enables Motion Storyboard for Codex.

Options:
  --codex-home <path>        Codex home directory. Defaults to CODEX_HOME or ~/.codex.
  --source <source>          Marketplace source passed to codex plugin marketplace add.
                             Defaults to this checkout, or GitHub when run as a standalone file.
  --ref <ref>                Optional marketplace ref. Defaults to main in standalone mode.
  --skip-marketplace-add     Use an already-added marketplace root.
`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (sourceProvided && !refProvided && !isGitMarketplaceSource(args.marketplaceSource)) {
    args.ref = null;
  }

  return args;
}

function isGitMarketplaceSource(source) {
  return (
    /^https?:\/\//.test(source) ||
    /^git@/.test(source) ||
    /^ssh:\/\//.test(source) ||
    /^[^/\s]+\/[^/\s]+(@[^/\s]+)?$/.test(source)
  );
}

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

function runCodex(args, cwd) {
  const result = spawnSync("codex", args, {
    cwd,
    encoding: "utf8",
    stdio: "pipe",
  });

  if (result.status !== 0) {
    const detail = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
    throw new Error(`codex ${args.join(" ")} failed${detail ? `:\n${detail}` : ""}`);
  }

  const output = [result.stdout, result.stderr].filter(Boolean).join("\n").trim();
  if (output) {
    console.log(output);
  }
}

function runCodexMarketplaceAdd(source, ref, cwd) {
  const args = ["plugin", "marketplace", "add", source];
  if (ref) {
    args.push("--ref", ref);
  }
  runCodex(args, cwd);
}

async function findMarketplaceRoot(args) {
  const localManifest = path.join(repoRoot, ".agents", "plugins", "marketplace.json");
  if (existsSync(localManifest)) {
    return repoRoot;
  }

  const cachedRoot = path.join(args.codexHome, ".tmp", "marketplaces", MARKETPLACE_NAME);
  const cachedManifest = path.join(cachedRoot, ".agents", "plugins", "marketplace.json");
  if (existsSync(cachedManifest)) {
    return cachedRoot;
  }

  const configPath = path.join(args.codexHome, "config.toml");
  if (existsSync(configPath)) {
    const configText = await readFile(configPath, "utf8");
    const sectionMatch = configText.match(
      /\[marketplaces\.swiftmographer\]([\s\S]*?)(?=\n\[|$)/,
    );
    const sourceMatch = sectionMatch?.[1]?.match(/^\s*source\s*=\s*"([^"]+)"\s*$/m);
    if (sourceMatch) {
      const configuredRoot = sourceMatch[1];
      const configuredManifest = path.join(configuredRoot, ".agents", "plugins", "marketplace.json");
      if (existsSync(configuredManifest)) {
        return configuredRoot;
      }
    }
  }

  throw new Error(
    `Cannot find ${MARKETPLACE_NAME} marketplace root. Run without --skip-marketplace-add or clone the repository first.`,
  );
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
  const cwd = existsSync(repoRoot) ? repoRoot : process.cwd();

  await mkdir(args.codexHome, { recursive: true });

  if (!args.skipMarketplaceAdd) {
    runCodexMarketplaceAdd(args.marketplaceSource, args.ref, cwd);
  }

  const marketplaceRoot = await findMarketplaceRoot(args);
  const marketplacePath = path.join(marketplaceRoot, ".agents", "plugins", "marketplace.json");
  const marketplace = await readJson(marketplacePath);
  const pluginEntry = marketplace.plugins?.find((plugin) => plugin.name === PLUGIN_NAME);

  if (!pluginEntry?.source?.path) {
    throw new Error(`Cannot find ${PLUGIN_NAME} in ${marketplacePath}`);
  }

  const pluginRoot = path.resolve(marketplaceRoot, pluginEntry.source.path);
  const manifestPath = path.join(pluginRoot, ".codex-plugin", "plugin.json");
  const manifest = await readJson(manifestPath);
  const version = manifest.version || "local";
  const pluginId = `${PLUGIN_NAME}@${MARKETPLACE_NAME}`;
  const cacheRoot = path.join(args.codexHome, "plugins", "cache", MARKETPLACE_NAME, PLUGIN_NAME, version);
  const configPath = path.join(args.codexHome, "config.toml");

  if (!existsSync(pluginRoot)) {
    throw new Error(`Plugin root does not exist: ${pluginRoot}`);
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
  console.log("Restart Codex or start a new thread for the plugin to appear.");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
