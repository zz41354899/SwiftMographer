# SwiftMographer

This workspace includes a local Codex plugin for turning rough video ideas into implementation-ready motion storyboards.

## Included plugin

- `plugins/remotion-storyboard`

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