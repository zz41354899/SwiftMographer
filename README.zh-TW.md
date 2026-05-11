# SwiftMographer

[English](README.md)

SwiftMographer 是一個以 GitHub 為來源的 plugin repository，目標是把模糊的動態概念轉成可直接交付給設計與工程的高品質 Markdown 分鏡文件，並同時支援 Remotion 與 HyperFrames。

這個 repo 同時服務兩種情境：

- 給 Codex 與 Claude Code 透過 marketplace 安裝
- 給本地開發者迭代 skill、hook、install surface 文案與資產

## 內容總覽

- 一個 plugin：`plugins/remotion-storyboard`
- 兩個 runtime-specific skills：
  - `remotion-storyboard-director`
  - `hyperframes-storyboard-director`
- 一個 stop hook，用來驗證最終 storyboard 交付格式
- 一組 marketplace / install surface 資產
- 一份壓測用的 stress-test references

## 專案憲法

品質標準與不可妥協原則寫在 [CONSTITUTION.md](CONSTITUTION.md)。

摘要如下：

- 只交付一份高品質 Markdown handoff，不再交付 Markdown + HTML 雙產物
- 必須同時具備 scene-level 與 shot-level 思考
- 必須尊重 runtime 真相：Remotion 偏 sequence / component，HyperFrames 偏 HTML / clip / track
- 輸出要能直接實作，不能只停在漂亮但空泛的敘述

## 交付契約

所有 storyboard 類回覆最後只保留一個 `md` code block。

這份 Markdown 必須能單獨成立，內容要足以支撐設計與工程交接，包括表格、shot 細節、runtime notes 與實作結構。`plugins/remotion-storyboard/hooks/hooks.json` 會驗證這個契約。

## Marketplace 相容性

此 repo 同時提供兩種 marketplace 入口：

- `.agents/plugins/marketplace.json` 給 Codex
- `.claude-plugin/marketplace.json` 給 Claude Code

也就是說，同一個 GitHub repository 可以給兩個生態系使用，只是它們讀取的 marketplace manifest 格式不同。

## 從 GitHub 安裝

### Codex

先把這個 repository 加進 marketplace：

```bash
codex plugin marketplace add zz41354899/SwiftMographer --ref main
```

也可以用完整 Git URL：

```bash
codex plugin marketplace add https://github.com/zz41354899/SwiftMographer.git --ref main
```

接著：

1. 重新啟動 Codex。
2. 打開 marketplace 清單。
3. 選擇 `SwiftMographer Motion Plugins`。
4. 安裝 `Motion Storyboard`。

補充：

- `--ref main` 代表固定使用 main branch
- 不要只 sparse checkout `.agents/plugins`，因為 plugin 本體在 `plugins/`
- 之後可用 `codex plugin marketplace upgrade` 更新

### Claude Code

先把 repo 加進 marketplace：

```bash
claude plugin marketplace add zz41354899/SwiftMographer@main
```

也可以用完整 Git URL：

```bash
claude plugin marketplace add https://github.com/zz41354899/SwiftMographer.git#main
```

接著安裝：

```bash
claude plugin install remotion-storyboard@swiftmographer
```

補充：

- Claude Code 讀的是 `.claude-plugin/marketplace.json`
- 後續可用 `claude plugin marketplace update` 更新
- 本地可用 `claude plugin validate .` 驗證

## Marketplace / Install Surface 來源檔案

以下檔案共同定義使用者在 marketplace / install flow 會看到的內容：

- Codex plugin manifest：`plugins/remotion-storyboard/.codex-plugin/plugin.json`
- Claude plugin manifest：`plugins/remotion-storyboard/.claude-plugin/plugin.json`
- Codex marketplace entry：`.agents/plugins/marketplace.json`
- Claude marketplace entry：`.claude-plugin/marketplace.json`
- install-surface 資產：`plugins/remotion-storyboard/assets/`

這些檔案的訊息現在已經對齊成同一件事：這個 plugin 交付的是高品質 Markdown storyboard handoff，加上對應 runtime 的實作規劃。

## Skills 分工

### Remotion

Remotion skill 主要負責：

- sequence timing
- component architecture
- scene 與 shot 結構
- springs、interpolate 與節奏控制
- 直接可交接的 Markdown storyboard

### HyperFrames

HyperFrames skill 主要負責：

- deterministic HTML composition 結構
- clip timing 與 track layout
- CSS / GSAP / Lottie 的實作規劃
- runtime-specific 的 Markdown handoff

## 品質把關

repo 目前內建：

- 一個 stop hook，驗證最後是否為 `md` storyboard block
- 一份 stress-test references：`plugins/remotion-storyboard/refs/storyboard-stress-tests.md`
- 兩份 skill 內建的 runtime adaptation 與 shot-density 規則

目前壓測案例包含：

- 6 秒 logo ident
- 18 秒 kinetic typography
- 45 秒 explainer

它們的用途是檢查 skill 是否真的會依時長、片型、節奏與 runtime 改變輸出，而不是退化回單一產品片模板。

## 範例 Prompt

### Remotion

```text
Turn this 30-second SaaS product intro concept into a Remotion storyboard.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: Apple-like minimal, clean, restrained
Aspect ratio: 16:9
Requirements: subtitle rhythm, no voiceover, end on a product logo lockup
```

### HyperFrames

```text
Turn this launch concept into a HyperFrames composition plan.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: restrained, cinematic, minimal
Aspect ratio: 16:9
Requirements: deterministic HTML structure, GSAP animation notes, caption timing, final render workflow
```

## Repo 結構

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
        ├── hooks/
        ├── refs/
        └── skills/
```

## 授權

此 repository 採用 MIT License，請見 [LICENSE](LICENSE)。