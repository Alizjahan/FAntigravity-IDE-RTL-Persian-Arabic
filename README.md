<p align="center">
  <img src="https://raw.githubusercontent.com/Alizjahan/FAntigravity-IDE-RTL-Persian-arabic/main/assets/header.jpg" alt="FAntigravity IDE Banner" width="100%">
</p>

<div align="center">

# FAntigravity IDE RTL (Persian & Arabic)
### Intelligent Persian & Arabic RTL Typography Engine for AI Agent Chat in Antigravity IDE and VS Code

[![Release](https://img.shields.io/badge/Release-v1.0.0-0D9DF8?style=flat-square&logo=github)](https://github.com/Alizjahan/FAntigravity-IDE-RTL-Persian-arabic)
[![License](https://img.shields.io/badge/License-MIT-34C6BF?style=flat-square)](https://opensource.org/licenses/MIT)
[![Marketplace](https://img.shields.io/badge/Open%20VSX-Available-blue?style=flat-square)](https://open-vsx.org/)
[![Author](https://img.shields.io/badge/Maintainer-Aliz-0F6FFA?style=flat-square)](https://github.com/Alizjahan)

Read and write smoothly in Persian and Arabic inside your AI Chat without affecting code editors, file trees, or terminals.

[English Documentation](#overview) | [راهنمای فارسی](./README_FA.md) | [الدليل العربي](./README_AR.md)

</div>

---

## Overview

**FAntigravity IDE** is an official extension developed specifically for **Antigravity IDE** (and VS Code-based environments) to bring fluent right-to-left (RTL) reading, writing, and custom Persian and Arabic typography exclusively to the **AI Chat panel**.

Unlike global RTL patches that interfere with editor tabs, code buffers, or terminal lines, FAntigravity IDE is engineered with surgical CSS precision: it isolates chat discussions and prompt textboxes while ensuring that all code blocks, diff views, and editor panes remain strictly Left-to-Right (LTR).

---

## Key Features

- **Strict AI Chat Isolation**: Applies BiDi text heuristics and RTL layout solely to AI Chat inputs, assistant responses, and conversational markdown elements.
- **Zero Impact on Code Editors**: Main editor tabs, line numbers, Monaco editor buffers, integrated terminals, and file trees remain untouched in standard LTR.
- **Embedded Offline Fonts**:
  - **Dubai Font**: Modern, crisp, and high-readability typeface bundled locally for Persian and Arabic.
  - **Vazirmatn Variable**: High-fidelity Persian font embedded in WOFF2 format. Zero network requests, 100% offline.
  - **System Fonts**: Instant support for locally installed fonts (IRANSans, Sahel, Shabnam, Cairo, Amiri, Tahoma, etc.).
- **Isolated English Font via Unicode Range**: Customize English typography with dedicated `unicode-range` without disrupting Persian or Arabic characters.
- **Code Block Monospace Customizer**: Tailor the font family of code snippets and fenced code blocks independently.
- **Forced RTL Mode (راست‌چین اجباری)**: Ensure all messages flow RTL even if they start with English characters or technical tokens.
- **Tri-lingual Sidebar UI (FA / AR / EN)**: Interactive settings manager right in the Activity Bar with seamless one-click language toggle.
- **Code Block Preservation**: Fenced code blocks (`pre`, `code`), Monaco interactive result cells, and copy action buttons inside chat messages stay locked in LTR with monospace typography.
- **Persian Keyboard Symbol Fix**: Automatically resolves the Persian keyboard mapping where `Shift + 2` mistakenly inputs `٬` instead of `@` within the chat prompt box.
- **Status Bar Integration**: Quick toggle and font switcher accessible right from the bottom status bar.
- **Safe & Reversible**: Includes automatic `.bak` backup protection and complete single-click uninstallation.

---

## Chat-Only Isolation Scope

| Component | Applied Direction | Typography |
| :--- | :--- | :--- |
| AI Chat Messages (User & Assistant) | Auto RTL / LTR | Dubai / Vazirmatn / System / Custom |
| AI Chat Prompt Input (Textarea / Widget) | Auto RTL / LTR | Dubai / Vazirmatn / System / Custom |
| English Words in Chat | LTR Glyphs | Custom English Font (Isolated Unicode Range) |
| Chat Code Blocks (`pre`, `code`) | Strict LTR | Custom Code Font / Editor Monospace |
| Chat Action Buttons & Pills | Strict LTR | Theme Default |
| Main Code Editor & Tabs | Unaffected (LTR) | User Editor Font |
| Integrated Terminal | Unaffected (LTR) | Terminal Monospace |
| File Explorer & Sidebar | Unaffected (LTR) | Workbench Default |

---

## Installation

### Method 1: Extension Marketplace
1. In Antigravity IDE, press `Ctrl + Shift + X` (or `Cmd + Shift + X` on macOS).
2. Search for **FAntigravity IDE RTL (Persian & Arabic)**.
3. Click **Install**, then reload the window.

### Method 2: Offline VSIX Package
1. Download `fantigravity-ide-1.0.0.vsix` from the [Releases](https://github.com/Alizjahan/FAntigravity-IDE-RTL-Persian-arabic/releases) section.
2. In the Extensions view, click the `···` menu at the top-right and select **Install from VSIX...**.
3. Select the file and reload the IDE.

---

## Configuration Settings

Accessible via `Ctrl + ,` (or `Cmd + ,`) by searching `FAntigravity`:

| Setting | Description | Default |
| :--- | :--- | :--- |
| `fantigravity.chat.enabled` | Enable or disable RTL layout for AI Chat | `true` |
| `fantigravity.chat.fontFamily` | Selected font family (`Dubai`, `Vazirmatn`, `System`, `Custom`) | `Dubai` |
| `fantigravity.chat.customFontFamily` | Name of locally installed font on your OS | `""` |
| `fantigravity.chat.englishFontFamily` | Dedicated font for English words via Unicode Range | `""` |
| `fantigravity.chat.codeFontFamily` | Custom font for code snippets inside chat | `""` |
| `fantigravity.chat.fontSize` | Custom font size in pixels (`0` inherits IDE default) | `0` |
| `fantigravity.chat.lineHeight` | Line height ratio (`1.75` recommended for Persian/Arabic) | `1.75` |
| `fantigravity.chat.forceRtl` | Force all messages to RTL regardless of starting character | `false` |
| `fantigravity.chat.fixPersianAt` | Auto-remap `Shift + 2` to `@` in Persian keyboard layout | `true` |

---

## Available Commands

Press `Ctrl + Shift + P` (or `Cmd + Shift + P`) to access:

- `FAntigravity IDE: Toggle Persian/Arabic RTL for AI Chat`
- `FAntigravity IDE: Enable Persian/Arabic RTL for AI Chat`
- `FAntigravity IDE: Disable Persian/Arabic RTL for AI Chat`
- `FAntigravity IDE: Select Persian/Arabic Font for AI Chat`
- `FAntigravity IDE: Check Installation Status`
- `FAntigravity IDE: Reload Window`

---

## Multi-Language Guides

- [راهنمای فارسی (Persian Documentation)](./README_FA.md)
- [الدليل العربي (Arabic Documentation)](./README_AR.md)

---

## Author & Maintainer

Developed with ❤️ by **Aliz ([@Alizjahan](https://github.com/Alizjahan))**
- GitHub: [@Alizjahan](https://github.com/Alizjahan)
- Telegram: [@Alizjahan](https://t.me/Alizjahan)

---

## License

This project is licensed under the [MIT License](LICENSE).
