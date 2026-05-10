# SwiftMographer

This workspace includes a local Codex plugin for turning rough video ideas into implementation-ready motion storyboards.

## Included plugin

- `plugins/remotion-storyboard`

## Install in Codex

This repo follows the Codex marketplace model described in the official plugin build docs.

### Install from GitHub

Register this repository as a marketplace source with the Codex CLI:

```bash
codex plugin marketplace add zz41354899/SwiftMographer --ref main
```

You can also use the full Git URL form if you prefer:

```bash
codex plugin marketplace add https://github.com/zz41354899/SwiftMographer.git --ref main
```

After adding the marketplace:

1. Restart Codex.
2. Open the plugin directory.
3. Choose the `SwiftMographer Local Plugins` marketplace.
4. Install `Motion Storyboard`.

Notes:

- `owner/repo` and Git URL sources are both supported by Codex.
- `--ref main` pins the marketplace to the main branch.
- Do not use `--sparse .agents/plugins` for this repo. The marketplace file lives in `.agents/plugins/marketplace.json`, but the plugin itself lives under `plugins/`, so sparse checkout of only `.agents/plugins` would miss the actual plugin files.
- To refresh later, run `codex plugin marketplace upgrade`.

### Install from a local clone

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

Codex can load the plugin from that marketplace after restart.

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