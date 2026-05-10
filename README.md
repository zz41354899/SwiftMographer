# SwiftMographer

This workspace includes a local Codex plugin for turning rough video ideas into implementation-ready motion storyboards.

## Included plugin

- `plugins/remotion-storyboard`

## Marketplace compatibility

This repository now ships both marketplace entry points:

- `.agents/plugins/marketplace.json` for the standard Codex repo marketplace path
- `.claude-plugin/marketplace.json` for Claude Code marketplace compatibility

That means the same GitHub repository can be used in both Codex and Claude Code, but each tool reads a different marketplace manifest shape.

## Install from GitHub

This repository can be installed in Codex directly from GitHub through the marketplace flow described in the official plugin build docs.

### GitHub marketplace command

Register this repository as a marketplace source with the Codex CLI:

```bash
codex plugin marketplace add zz41354899/SwiftMographer --ref main
```

You can also use the full Git URL form if you prefer:

```bash
codex plugin marketplace add https://github.com/zz41354899/SwiftMographer.git --ref main
```

After adding the GitHub marketplace:

1. Restart Codex.
2. Open the plugin directory.
3. Choose the `SwiftMographer Local Plugins` marketplace.
4. Install `Motion Storyboard`.

Notes:

- This is a GitHub install path, not a local path install.
- `owner/repo` and Git URL sources are both supported by Codex.
- `--ref main` pins the marketplace to the main branch.
- Do not use `--sparse .agents/plugins` for this repo. The marketplace file lives in `.agents/plugins/marketplace.json`, but the plugin itself lives under `plugins/`, so sparse checkout of only `.agents/plugins` would miss the actual plugin files.
- To refresh later, run `codex plugin marketplace upgrade`.

## Install in Claude Code

Claude Code uses the `.claude-plugin/marketplace.json` manifest and a different CLI syntax.

### GitHub marketplace command

Add this repository from GitHub:

```bash
claude plugin marketplace add zz41354899/SwiftMographer@main
```

You can also use the full Git URL form with a ref suffix:

```bash
claude plugin marketplace add https://github.com/zz41354899/SwiftMographer.git#main
```

Then install the plugin from the marketplace:

```bash
claude plugin install remotion-storyboard@swiftmographer-local
```

Notes:

- Claude Code uses `@ref` with GitHub shorthand and `#ref` with git URLs.
- Claude Code reads `.claude-plugin/marketplace.json`, not `.agents/plugins/marketplace.json`.
- To refresh marketplaces later, run `claude plugin marketplace update`.
- To validate the marketplace locally in Claude Code environments, run `claude plugin validate .`.

### Local development alternative

If you are iterating on the plugin locally, you can register the repo root as a local marketplace source:

```bash
codex plugin marketplace add /absolute/path/to/SwiftMographer
```

This works because the repo already includes a repo-scoped marketplace at `.agents/plugins/marketplace.json` and the plugin directory at `plugins/remotion-storyboard`.

## Included skills

- `remotion-storyboard-director`
- `hyperframes-storyboard-director`

## What it does

The plugin packages runtime-specific skills focused on:

- translating a loose video concept into a structured scene-by-scene storyboard
- defining Remotion-friendly timing, sequences, transitions, and component boundaries
- defining HyperFrames-friendly HTML structure, timing attributes, track layout, and render workflow
- keeping the visual direction minimal, modern, and presentation-grade
- following the user's language naturally while keeping the underlying structure production-ready
- enforcing a final dual-artifact handoff with a Markdown storyboard followed by an HTML storyboard

## Bundled hook

The plugin now bundles a `Stop` hook via `plugins/remotion-storyboard/hooks/hooks.json`.

Its job is narrow: when a response looks like a storyboard delivery, it checks that the final two fenced artifacts are:

- one `md` storyboard block
- one `html` storyboard block

If that contract is missing, the hook asks Codex to continue and complete the missing deliverables.

## Install-surface metadata

The plugin manifest now includes:

- author and homepage metadata
- a composer icon
- a wide logo
- screenshot assets for the install surface

## Local marketplace

The repo-scoped marketplace is defined at:

- `.agents/plugins/marketplace.json`
- `.claude-plugin/marketplace.json`

Codex reads the standard repo marketplace path, while Claude Code reads the Claude-specific marketplace path.

## Example prompt

```text
Turn this 30-second SaaS product intro concept into a Remotion storyboard.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: Apple-like minimal, clean, restrained
Aspect ratio: 16:9
Requirements: subtitle rhythm, no voiceover, end on a product logo lockup
```

HyperFrames example:

```text
Turn this launch concept into a HyperFrames composition plan.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: restrained, cinematic, minimal
Aspect ratio: 16:9
Requirements: deterministic HTML structure, GSAP animation notes, caption timing, final render workflow
```