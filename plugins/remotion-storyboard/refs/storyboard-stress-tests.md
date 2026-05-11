# Storyboard Stress-Test References

These reference cases are for pressure-testing both storyboard skills across different runtimes and animation archetypes. The Manim cases intentionally emphasize math, physics/dynamics, algorithms, and data explanation because those are the runtime's clearest strengths.

Use them to verify that the model:

- adapts scene count and shot density to runtime
- changes emphasis by animation type instead of defaulting to a product intro
- keeps runtime-specific implementation guidance aligned to the target system
- exposes enough shot-level detail to drive actual production
- produces a Markdown handoff that is rich enough to stand alone without a companion HTML board

## How To Use

Run each case against both skills:

- `remotion-storyboard-director`
- `manim-storyboard-director`

Then inspect the output for:

- scene count
- shot count
- pacing curve
- runtime-specific implementation notes
- uv-based setup and render workflow for Manim outputs
- Markdown richness and handoff clarity
- failure modes such as generic 5-scene output, flat pacing, or missing shot-level detail

## Expected Shape Matrix

| Case | Runtime | Expected scene range | Expected shot range | Main design pressure |
|---|---:|---:|---:|---|
| Formula intuition | 20s | 3-4 | 6-9 | notation continuity, visual intuition |
| Dynamics explanation | 30s | 4-5 | 8-12 | state variables, trajectories, updater logic |
| Algorithm / data explainer | 45s | 5-7 | 12-18 | state transitions, chart scales, reusable builders |

## Case 1: 20-Second Formula Intuition

### Test Brief

- Goal: explain why Euler's identity connects rotation on the complex plane to sine and cosine
- Runtime: 20 seconds
- Aspect ratio: 16:9
- Tone: clear, elegant, mathematical
- Audio: calm voiceover, light emphasis hits, optional subtitles
- Assets: equation text only; no external media

### Remotion Prompt

```text
Turn this 20-second formula intuition into a Remotion storyboard.

Topic: Euler's identity and complex rotation
Type: math visualization
Runtime: 20 seconds
Aspect ratio: 16:9
Tone: clear, elegant, mathematical
Requirements: show unit circle, rotating point, cosine/sine projections, equation continuity, calm voiceover, optional subtitles
```

### Manim Prompt

```text
Turn this 20-second formula intuition into a Manim scene plan.

Topic: Euler's identity and complex rotation
Type: math visualization
Runtime: 20 seconds
Aspect ratio: 16:9
Tone: clear, elegant, mathematical
Requirements: NumberPlane or ComplexPlane, unit circle, rotating point driven by ValueTracker, cosine/sine projections, TransformMatchingTex, equation continuity, calm voiceover, optional subtitles
```

### What Good Output Looks Like

- 3 to 4 scenes and about 6 to 9 shots
- a clear progression: complex plane → rotating radius → x/y projections → equation lockup
- notation stays continuous instead of jumping between unrelated formulas
- Remotion output can describe the same visual beats in Sequence/component terms
- Manim output identifies ComplexPlane or NumberPlane, unit circle, Dot, Line projections, ValueTracker/updater lifecycle, and TransformMatchingTex
- Manim CLI workflow defaults to `uv init`, `uv add manim`, `uv run manim checkhealth`, and `uv run manim -pql ...`

### Failure Signals

- treats the equation as decorative typography
- omits the complex plane or projection logic
- changes notation without explaining continuity
- uses ValueTracker/updaters without saying when they begin and end

## Case 2: 30-Second Damped Oscillator

### Test Brief

- Goal: explain why a damped spring eventually stops oscillating
- Runtime: 30 seconds
- Aspect ratio: 16:9
- Tone: precise, physical, calm
- Audio: concise voiceover plus light sound design
- Assets: no external media; use simple shapes, graph, and equations

### Remotion Prompt

```text
Turn this 30-second damped oscillator explanation into a Remotion storyboard.

Topic: Damped harmonic oscillator
Type: physics / dynamics explanation
Runtime: 30 seconds
Aspect ratio: 16:9
Tone: precise, physical, calm
Requirements: show mass-spring system, displacement curve, damping force, energy decay, voiceover-supported pacing
```

### Manim Prompt

```text
Turn this 30-second damped oscillator explanation into a Manim scene plan.

Topic: Damped harmonic oscillator
Type: physics / dynamics explanation
Runtime: 30 seconds
Aspect ratio: 16:9
Tone: precise, physical, calm
Requirements: mass-spring system, ValueTracker-driven displacement, force vectors, displacement-time graph, energy decay curve, updater lifecycle, voiceover-supported pacing
```

### What Good Output Looks Like

- 4 to 5 scenes and about 8 to 12 shots
- state variables are named: displacement, velocity, damping coefficient, energy
- the spring/mass view and graph view remain visually synchronized
- Remotion output can map the physical states to components and overlays
- Manim output explains VGroups, ValueTracker/updaters, force vector updates, graph plotting, axes ranges, and where updaters are removed
- Manim CLI workflow uses `uv run manim ...` rather than bare `manim ...`

### Failure Signals

- shows a bouncing object with no damping logic
- omits axis ranges, units, or energy decay
- uses continuous updaters without lifecycle notes
- confuses force direction, displacement, and velocity

## Case 3: 45-Second Algorithm and Data Explainer

### Test Brief

- Goal: explain how Dijkstra's algorithm finds shortest paths on a weighted graph
- Runtime: 45 seconds
- Aspect ratio: 16:9
- Tone: clear, systematic, technical
- Audio: calm voiceover plus subtitles
- Assets: graph data only; no external media

### Remotion Prompt

```text
Turn this 45-second Dijkstra explanation into a Remotion storyboard.

Topic: Dijkstra's shortest path algorithm
Type: algorithm visualization
Runtime: 45 seconds
Aspect ratio: 16:9
Tone: clear, systematic, technical
Requirements: weighted graph, visited set, priority queue state, distance table, highlighted relaxations, final shortest path, voiceover and subtitles
```

### Manim Prompt

```text
Turn this 45-second Dijkstra explanation into a Manim scene plan.

Topic: Dijkstra's shortest path algorithm
Type: algorithm visualization
Runtime: 45 seconds
Aspect ratio: 16:9
Tone: clear, systematic, technical
Requirements: weighted graph mobjects, visited set, priority queue display, distance table, highlighted edge relaxations, final shortest path, reusable graph/table builders, voiceover and subtitles
```

### What Good Output Looks Like

- 5 to 7 scenes and about 12 to 18 shots
- a clear act structure such as problem → data structure setup → repeated relaxation → final path
- alternation between sparse orientation beats and denser algorithm state updates
- distinct layouts for graph, priority queue, distance table, and final route
- Remotion output maps well to Sequence groups and reusable scene components
- Manim output maps well to Scene classes, reusable graph/table mobject builders, comparison highlights, state transition helpers, and explicit render commands
- Manim output includes a uv-based project setup and render workflow

### Failure Signals

- equal-length scenes with no pacing curve
- repetitive graph highlights with no state table updates
- no shot list or no explicit transitions
- runtime-specific implementation notes are too generic to build from
- no invariant, visited-set, or priority-queue explanation

## Review Questions

- Did the skill adapt the structure to the runtime instead of forcing a default 30-second shape?
- Did the skill adapt the motion language to the animation archetype?
- Did Manim output use uv as the default setup and render workflow?
- Can an engineer build the result without inventing missing beats?
- Is the Markdown artifact strong enough to stand on its own as a production handoff?
