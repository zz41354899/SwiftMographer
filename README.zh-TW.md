# SwiftMographer

[English](README.md)

SwiftMographer 是一個以 GitHub 為來源的 plugin repository，目標是把模糊的動態概念轉成可直接交付給設計與工程的高品質 Markdown 分鏡文件，並同時支援 Remotion 與 Manim。

這個 repo 同時服務兩種情境：

- 給 Codex 與 Claude Code 透過 marketplace 安裝
- 給本地開發者迭代 skill、hook、install surface 文案與資產

## 內容總覽

- 一個 plugin：`plugins/remotion-storyboard`
- 兩個 runtime-specific skills：
  - `remotion-storyboard-director`
  - `manim-storyboard-director`
- 一個 stop hook，用來驗證最終 storyboard 交付格式
- 一組 marketplace / install surface 資產
- 一份壓測用的 stress-test references

## 專案憲法

品質標準與不可妥協原則寫在 [CONSTITUTION.md](CONSTITUTION.md)。

摘要如下：

- 只交付一份高品質 Markdown handoff，不再交付 Markdown + HTML 雙產物
- 必須同時具備 scene-level 與 shot-level 思考
- 必須尊重 runtime 真相：Remotion 偏 sequence / component，Manim 偏 Python scene / mobject / render workflow
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
2. 打開 Codex settings，進入 plugin directory。
3. 選擇 `SwiftMographer Motion Plugins`。
4. 確認 `Motion Storyboard` 已安裝且已啟用。

補充：

- `--ref main` 代表固定使用 main branch
- Codex marketplace policy 已將 `Motion Storyboard` 設為 `INSTALLED_BY_DEFAULT`，以降低不必要的 install gating。如果你的 Codex build 仍顯示 install button，點一次後確認 enable toggle 已開啟。
- 不要只 sparse checkout `.agents/plugins`，因為 plugin 本體在 `plugins/`
- 之後可用 `codex plugin marketplace upgrade` 更新
- Codex 會把已安裝 plugin 放在 `~/.codex/plugins/cache/<marketplace>/<plugin>/<version>/`，並在 `~/.codex/config.toml` 記錄啟用狀態。

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

## Codex 相容性注意事項

`plugins/remotion-storyboard/.codex-plugin/plugin.json` 裡的 Codex install-surface 圖像欄位現在都指向 PNG：

- `assets/icon.png`
- `assets/logo.png`
- `assets/screenshot-storyboard-board.png`
- `assets/screenshot-dual-artifacts.png`

同名 SVG 仍保留在 `assets/` 作為可編輯的來源圖。Codex manifest 應維持指向 PNG，因為 Codex screenshots 預期是 PNG 檔，部分 install surface 對 SVG 的渲染也不一定一致。Codex manifest 的 starter prompts 也維持在 128 字元 UI 限制內。

## Windows 與 Apple Silicon 相容性

storyboard stop hook 已改由 `plugins/remotion-storyboard/scripts/validate-storyboard.js` 實作，並透過 `node` 啟動，不再寫死 Unix 專用的 Python 路徑。這讓 plugin 可同時支援 Windows native terminal、WSL、Intel macOS，以及 M1、M2、M3 等 Apple Silicon Mac。

Windows native 安裝時，請確認 `node` 可從 `PATH` 執行。WSL 使用者可以沿用 Linux 風格流程，只要 Node.js 安裝在該 WSL distribution 內即可。

## Skills 分工

### Remotion

Remotion skill 主要負責：

- sequence timing
- component architecture
- scene 與 shot 結構
- springs、interpolate 與節奏控制
- 直接可交接的 Markdown storyboard

### Manim

Manim skill 主要負責：

- Python Scene class 結構
- mobject hierarchy 與 helper-method 規劃
- Manim animation primitives、timing、camera movement 與 render workflow
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

### Manim

```text
Turn this launch concept into a Manim scene plan.

Product: AI meeting summary tool
Audience: startup teams and PMs
Style: restrained, cinematic, minimal
Aspect ratio: 16:9
Requirements: Python Scene class structure, mobject hierarchy, caption timing, final render workflow
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
        │   ├── *.png
        │   └── *.svg
        ├── hooks/
        ├── refs/
        ├── scripts/
        └── skills/
```

## 授權

此 repository 採用 MIT License，請見 [LICENSE](LICENSE)。
