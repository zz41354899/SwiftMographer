# SwiftMographer Constitution

This document defines the non-negotiable product and quality rules for SwiftMographer.

## English

### Article I - Mission

SwiftMographer exists to turn rough motion ideas into buildable, runtime-specific storyboard handoffs for Remotion and Manim.

### Article II - One Artifact

The delivery contract is one premium Markdown handoff.

- no companion HTML storyboard artifact
- no loose outline pretending to be a production handoff
- no duplicated artifact content across multiple formats unless a future product decision explicitly reintroduces that contract

### Article III - Scene and Shot Discipline

Every storyboard must think in two layers:

- scene = narrative section
- shot = concrete visual beat with explicit timing and purpose

If the work stops at a broad scene list, it is incomplete.

### Article IV - Runtime Truth

Remotion and Manim are not interchangeable.

- Remotion outputs should think in sequences, components, springs, interpolation, and composition pacing.
- Manim outputs should think in Python scene classes, mobjects, animation primitives, camera movement, render commands, and environment setup.

### Article V - Production Quality

Every handoff must be:

- explicit about timing
- specific about motion behavior
- readable under real production pressure
- detailed enough that design and engineering do not have to invent missing beats

Vague phrasing, generic premium language, and decorative filler are quality failures.

### Article VI - Visual Restraint

The default taste level is minimal, modern, and controlled.

- use contrast, hierarchy, rhythm, and spacing
- avoid gratuitous transitions and motion gimmicks
- prefer clarity over spectacle unless the brief explicitly demands a different tone

### Article VII - Runtime and Format Adaptation

The plugin must adapt to runtime and animation archetype.

- a 6-second logo ident should not look like a 30-second SaaS ad
- an 18-second kinetic typography piece should not read like a UI walkthrough
- a 45-second explainer should not collapse into a few equal-length cards

### Article VIII - Stress-Test Standard

The repository stress tests are part of the quality bar.

- 6-second logo ident
- 18-second kinetic typography
- 45-second explainer

Changes that weaken these cases are regressions.

### Article IX - Contract Synchronization

If the delivery contract changes, all of the following must be updated together:

- skills
- hooks
- manifests
- README and documentation
- install-surface copy and assets
- stress-test references

No surface should advertise a contract the runtime no longer enforces.

### Article X - Versioning

Breaking delivery-contract changes require a version bump.

## 繁體中文

### 第一條 - 任務

SwiftMographer 的任務，是把模糊的動態概念轉成 Remotion 與 Manim 可直接落地的分鏡 handoff。

### 第二條 - 單一產物

目前的交付契約只有一份高品質 Markdown handoff。

- 不再附帶 HTML storyboard artifact
- 不接受只有大綱但不能落地的交付
- 除非未來產品決策明確改回，否則不重新回到雙產物模式

### 第三條 - Scene 與 Shot 紀律

每份 storyboard 都必須同時有兩層：

- scene = 敘事段落
- shot = 有明確時序與目的的具體視覺節拍

如果只剩 scene list，代表交付還不完整。

### 第四條 - 尊重 Runtime 真相

Remotion 與 Manim 不能寫成一樣的東西。

- Remotion 應以 sequences、components、spring、interpolate 與 composition pacing 為核心
- Manim 應以 Python scene classes、mobjects、animation primitives、camera movement、render commands 與 environment setup 為核心

### 第五條 - 生產級品質

每份 handoff 都必須：

- 時序明確
- 動態行為具體
- 在真實製作壓力下仍然可讀
- 細節充足到設計與工程不需要自行腦補缺失節拍

空泛的高級感敘述、泛用形容詞與裝飾性廢話，都算品質失敗。

### 第六條 - 視覺克制

預設美學是極簡、現代、節制。

- 用對比、層級、節奏與留白解決問題
- 避免無意義轉場與花哨動作
- 除非 brief 明確要求，否則清楚永遠優先於炫技

### 第七條 - Runtime 與片型自適應

plugin 必須依時長與片型改變結構。

- 6 秒 logo ident 不能長得像 30 秒 SaaS 廣告
- 18 秒 kinetic typography 不能退化成 UI walkthrough
- 45 秒 explainer 不能變成幾張平均長度卡片

### 第八條 - 壓測標準

repo 內的 stress tests 不是附加項，而是品質門檻的一部分：

- 6 秒 logo ident
- 18 秒 kinetic typography
- 45 秒 explainer

任何讓這三個案例退化的改動，都算 regression。

### 第九條 - 契約同步

只要交付契約改變，就必須同步更新：

- skills
- hooks
- manifests
- README 與說明文件
- install-surface 文案與資產
- stress-test references

不允許外部文案和實際 runtime 契約互相衝突。

### 第十條 - 版本策略

只要交付契約發生 breaking change，就必須升版。
