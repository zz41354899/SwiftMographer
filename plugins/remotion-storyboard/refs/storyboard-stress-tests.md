# Storyboard Stress-Test References

These reference cases are for pressure-testing both storyboard skills across different runtimes and animation archetypes.

Use them to verify that the model:

- adapts scene count and shot density to runtime
- changes emphasis by animation type instead of defaulting to a product intro
- keeps runtime-specific implementation guidance aligned to the target system
- exposes enough shot-level detail to drive actual production
- produces a Markdown handoff that is rich enough to stand alone without a companion HTML board

## How To Use

Run each case against both skills:

- `remotion-storyboard-director`
- `hyperframes-storyboard-director`

Then inspect the output for:

- scene count
- shot count
- pacing curve
- runtime-specific implementation notes
- Markdown richness and handoff clarity
- failure modes such as generic 5-scene output, flat pacing, or missing shot-level detail

## Expected Shape Matrix

| Case | Runtime | Expected scene range | Expected shot range | Main design pressure |
|---|---:|---:|---:|---|
| Logo ident | 6s | 1-2 | 2-4 | compact reveal logic, clean hold |
| Kinetic typography | 18s | 3-4 | 6-9 | line timing, mask logic, beat rhythm |
| Explainer | 45s | 5-7 | 12-18 | clarity, density control, modular sequencing |

## Case 1: 6-Second Logo Ident

### Test Brief

- Goal: launch a new AI creative tooling brand called `FrameForge`
- Runtime: 6 seconds
- Aspect ratio: 1:1
- Tone: minimal, precise, high-end
- Audio: one restrained hit at reveal, no voiceover
- Assets: abstract logo mark plus wordmark

### Remotion Prompt

```text
Turn this 6-second logo ident into a Remotion storyboard.

Brand: FrameForge
Type: logo ident
Runtime: 6 seconds
Aspect ratio: 1:1
Tone: minimal, precise, high-end
Requirements: clean silhouette reveal, one restrained audio hit, no voiceover, end on a held logo lockup
```

### HyperFrames Prompt

```text
Turn this 6-second logo ident into a HyperFrames composition plan.

Brand: FrameForge
Type: logo ident
Runtime: 6 seconds
Aspect ratio: 1:1
Tone: minimal, precise, high-end
Requirements: deterministic HTML structure, compact clip phases, one restrained audio hit, end on a held logo lockup
```

### What Good Output Looks Like

- 1 to 2 scenes, not 5 scenes
- 2 to 4 shots or motion phases with explicit timing
- clear reveal sequence such as silhouette build → mark reveal → wordmark settle → final hold
- minimal copy and no fake feature messaging
- Remotion output favors a compact Sequence layout and a few reusable reveal components
- HyperFrames output favors a small number of clips, explicit phase boundaries, and minimal track usage

### Failure Signals

- invents a full product narrative
- adds unnecessary subtitles or feature bullets
- treats the ident like a SaaS explainer
- omits the final hold

## Case 2: 18-Second Kinetic Typography

### Test Brief

- Goal: announce a manifesto-style message for a productivity brand
- Runtime: 18 seconds
- Aspect ratio: 9:16
- Tone: bold, editorial, rhythmic
- Audio: beat-driven music, no voiceover
- Copy: `Plan faster. Think clearer. Ship with confidence.`

### Remotion Prompt

```text
Turn this 18-second kinetic typography concept into a Remotion storyboard.

Brand: Northstar OS
Type: kinetic typography
Runtime: 18 seconds
Aspect ratio: 9:16
Tone: bold, editorial, rhythmic
Copy: Plan faster. Think clearer. Ship with confidence.
Requirements: beat-accurate type timing, strong hierarchy shifts, no UI demo, no voiceover
```

### HyperFrames Prompt

```text
Turn this 18-second kinetic typography concept into a HyperFrames composition plan.

Brand: Northstar OS
Type: kinetic typography
Runtime: 18 seconds
Aspect ratio: 9:16
Tone: bold, editorial, rhythmic
Copy: Plan faster. Think clearer. Ship with confidence.
Requirements: HTML-friendly text wrappers, deterministic timing, beat-accurate transitions, no UI demo, no voiceover
```

### What Good Output Looks Like

- 3 to 4 scenes and about 6 to 9 shots
- strong line grouping and emphasis changes across the three phrases
- type masks, stagger logic, scale shifts, or directional wipes tied to beat timing
- readable holds between aggressive beats
- Remotion output names components such as TypeLineGroup, AccentWord, MaskWipe, or BeatDivider
- HyperFrames output explains line wrappers, mask layers, and whether CSS or GSAP controls the reveals

### Failure Signals

- treats the piece like a UI walkthrough
- leaves long static text on screen with no internal shot logic
- uses the same composition for every phrase
- ignores beat timing or line hierarchy

## Case 3: 45-Second Explainer

### Test Brief

- Goal: explain how an internal AI knowledge assistant works for enterprise teams
- Runtime: 45 seconds
- Aspect ratio: 16:9
- Tone: clear, trustworthy, modern
- Audio: calm voiceover plus subtitles
- Assets: simple product UI, diagrams, and iconography

### Remotion Prompt

```text
Turn this 45-second explainer into a Remotion storyboard.

Product: Atlas Knowledge AI
Type: explainer
Runtime: 45 seconds
Aspect ratio: 16:9
Tone: clear, trustworthy, modern
Requirements: voiceover-supported pacing, subtitle support, diagram moments, UI staging, end with a confident brand payoff
```

### HyperFrames Prompt

```text
Turn this 45-second explainer into a HyperFrames composition plan.

Product: Atlas Knowledge AI
Type: explainer
Runtime: 45 seconds
Aspect ratio: 16:9
Tone: clear, trustworthy, modern
Requirements: deterministic HTML structure, clip-based sequencing, subtitle support, diagram moments, UI staging, and final render workflow
```

### What Good Output Looks Like

- 5 to 7 scenes and about 12 to 18 shots
- a clear act structure such as problem → mechanism → payoff
- alternation between sparse orientation beats and denser information beats
- distinct layouts for overview, UI detail, diagram explanation, and closing payoff
- Remotion output maps well to Sequence groups and reusable scene components
- HyperFrames output maps well to track zones, layered clips, and deterministic HTML modules

### Failure Signals

- equal-length scenes with no pacing curve
- repetitive card layouts from start to finish
- no shot list or no explicit transitions
- runtime-specific implementation notes are too generic to build from

## Review Questions

- Did the skill adapt the structure to the runtime instead of forcing a default 30-second shape?
- Did the skill adapt the motion language to the animation archetype?
- Can an engineer build the result without inventing missing beats?
- Is the Markdown artifact strong enough to stand on its own as a production handoff?