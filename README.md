# SwiftMographer

[繁體中文](README.zh-TW.md)

SwiftMographer is a GitHub-hosted plugin repository for turning rough motion ideas into high-quality Markdown storyboard handoffs for Remotion and Manim.

The repository is designed for two use cases at once:

- marketplace installation in Codex and Claude Code
- repo-local iteration on runtime-specific storyboard skills, hooks, and install-surface assets

## What Ships

- one plugin: `plugins/remotion-storyboard`
- two runtime-specific skills:
	- `remotion-storyboard-director`
	- `manim-storyboard-director`
- one stop hook that validates the final storyboard contract
- install-surface assets for marketplace presentation
- stress-test references for runtime and format regression checks

## Project Constitution

The quality bar and non-negotiable rules live in [CONSTITUTION.md](CONSTITUTION.md).

In short:

- one premium Markdown handoff, not dual Markdown + HTML artifacts
- scene-level and shot-level thinking are both required
- runtime truth matters: Remotion stays sequence/component-oriented; Manim stays Python scene/mobject/render-oriented
- outputs should be buildable, not decorative or vague

## Delivery Contract

Every storyboard delivery ends with one self-contained `md` block only.

That Markdown handoff should be rich enough for direct design and engineering use, with strong tables, shot detail, runtime notes, and implementation structure. The stop hook at `plugins/remotion-storyboard/hooks/hooks.json` enforces that contract.

## Marketplace Compatibility

This repository ships both marketplace entry points:

- `.agents/plugins/marketplace.json` for Codex
- `.claude-plugin/marketplace.json` for Claude Code

That means the same GitHub repository can be used in both ecosystems, while each tool reads its own marketplace manifest shape.

## Install from GitHub

### Codex

Register this repository as a marketplace source:

```bash
codex plugin marketplace add zz41354899/SwiftMographer --ref main
```

You can also use the full Git URL:

```bash
codex plugin marketplace add https://github.com/zz41354899/SwiftMographer.git --ref main
```

Then:

1. Restart Codex.
2. Open Codex settings and go to the plugin directory.
3. Choose `SwiftMographer Motion Plugins`.
4. Confirm `Motion Storyboard` is installed and enabled.

Notes:

- `--ref main` pins installation to the main branch.
- The Codex marketplace policy marks `Motion Storyboard` as `INSTALLED_BY_DEFAULT` to avoid unnecessary install gating. If your Codex build still shows an install button, use it once, then confirm the enable toggle is on.
- do not use sparse checkout for only `.agents/plugins`; the plugin lives under `plugins/`
- refresh later with `codex plugin marketplace upgrade`
- Codex stores installed plugins under `~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/` and tracks enablement in `~/.codex/config.toml`.

### Claude Code

Add this repository as a marketplace source:

```bash
claude plugin marketplace add zz41354899/SwiftMographer@main
```

Or use the full Git URL:

```bash
claude plugin marketplace add https://github.com/zz41354899/SwiftMographer.git#main
```

Then install:

```bash
claude plugin install remotion-storyboard@swiftmographer
```

Notes:

- Claude Code uses `.claude-plugin/marketplace.json`
- refresh later with `claude plugin marketplace update`
- validate locally with `claude plugin validate .`

## Marketplace / Install Surface Source of Truth

These files define what users see in marketplace and install flows:

- Codex plugin manifest: `plugins/remotion-storyboard/.codex-plugin/plugin.json`
- Claude plugin manifest: `plugins/remotion-storyboard/.claude-plugin/plugin.json`
- Codex marketplace entry: `.agents/plugins/marketplace.json`
- Claude marketplace entry: `.claude-plugin/marketplace.json`
- install-surface assets: `plugins/remotion-storyboard/assets/`

The manifests are intentionally aligned around one message: this plugin produces high-quality Markdown storyboard handoffs plus runtime-specific implementation guidance.

## Codex Compatibility Notes

Codex install-surface image fields in `plugins/remotion-storyboard/.codex-plugin/plugin.json` point to PNG files:

- `assets/icon.png`
- `assets/logo.png`
- `assets/screenshot-storyboard-board.png`
- `assets/screenshot-dual-artifacts.png`

The matching SVG files remain in `assets/` as editable source artwork. Keep the Codex manifest pointed at PNG assets because Codex screenshots are expected to be PNG files, and some install surfaces may not render SVGs consistently. Starter prompts in the Codex manifest are also kept under the 128-character UI limit.

## Windows and Apple Silicon Compatibility

The storyboard stop hook is implemented in `plugins/remotion-storyboard/scripts/validate-storyboard.js` and is launched through `node`, not a hard-coded Unix Python path. This keeps the plugin usable across Windows native terminals, WSL, Intel macOS, and Apple Silicon Macs including M1, M2, and M3.

For Windows native installs, make sure `node` is available on `PATH`. WSL users can follow the Linux-style flow as long as Node.js is installed inside the WSL distribution.

## Skill Coverage

### Remotion

The Remotion skill is optimized for:

- sequence timing
- component architecture
- scene and shot structure
- springs, interpolations, and pacing
- production-ready Markdown handoff documents

### Manim

The Manim skill is optimized for:

- Python Scene class structure
- mobject hierarchy and helper-method planning
- Manim animation primitives, timing, camera movement, and render workflow
- runtime-specific Markdown handoff documents

## Quality Controls

The repository includes:

- a stop hook that validates a final `md` storyboard block
- stress-test references at `plugins/remotion-storyboard/refs/storyboard-stress-tests.md`
- shot-density and runtime-adaptation rules inside both skills

The current stress tests cover:

- 6-second logo ident
- 18-second kinetic typography
- 45-second explainer

Use them to check whether the skills adapt scene count, shot count, pacing, and runtime-specific implementation detail instead of collapsing into a generic product-intro pattern.

## Example Prompts

### Remotion

```text
Turn this 30-second SaaS product intro concept into a Remotion storyboard.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: Apple-like minimal, clean, restrained
Aspect ratio: 16:9
Requirements: subtitle rhythm, no voiceover, end on a product logo lockup
```

### Manim

```text
Turn this launch concept into a Manim scene plan.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: restrained, cinematic, minimal
Aspect ratio: 16:9
Requirements: Python Scene class structure, mobject hierarchy, caption timing, final render workflow
```

## Repository Layout

```text
.
├── .agents/plugins/marketplace.json
├── .claude-plugin/marketplace.json
├── CONSTITUTION.md
├── LICENSE
├── README.md
├── README.zh-TW.md
└── plugins/
		└── remotion-storyboard/
				├── .claude-plugin/plugin.json
				├── .codex-plugin/plugin.json
				├── assets/
				│   ├── *.png
				│   └── *.svg
				├── hooks/
				├── refs/
				├── scripts/
				└── skills/
```

## License

This repository is licensed under the MIT License. See [LICENSE](LICENSE).
