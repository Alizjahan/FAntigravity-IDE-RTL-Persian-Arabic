# Change Log

All notable changes to the "FAntigravity IDE" extension will be documented in this file.

## [1.0.4] - 2026-10-22

### Documentation
- **Official App/IDE Distinction Notice**: Added clear, formal notice in READMEs directing standalone desktop application users to the dedicated [FAntigravity-App-RTL-Persian-Arabic](https://github.com/Alizjahan/FAntigravity-App-RTL-Persian-Arabic) repository.

## [1.0.3] - 2026-10-19

### Documentation & Assets
- **Tri-Lingual UI Showcase**: Added matched-resolution screenshots of the settings panel in Persian, Arabic, and English to README documentation across Open VSX and GitHub.

## [1.0.2] - 2026-10-19

### Fixed & Improved
- **Math & LaTeX Isolation**: Full protection for KaTeX, MathML, and MathJax formulas. Mathematical formulas now strictly preserve original LTR direction, standard math fonts, and isolated bidi boundaries.
- **Theme Switcher Icons**: Added dynamic SVG icons for all 3 themes in the sidebar settings panel: Moon (Dark), Sun (Light), and Rainbow Star (Antigravity), along with translated tooltips.
- **Code Block Typography**: Enhanced code font family customization for code blocks and snippets in chat responses.
- **BiDi Heuristics**: Stripped inline LaTeX math before evaluating text direction to prevent formulas from triggering unintended RTL switches.

## [1.0.1] - 2026-10-09

### Added
- **Tri-lingual UI**: Added 3-Language switcher (Persian, Arabic, English) in the settings sidebar with one-click toggling.
- **Dubai Font**: Embedded modern Dubai font offline for Persian and Arabic reading.
- **Real-Time Live-Sync**: Live synchronization bridge for instant styling updates without reloading.

## [1.0.0] - 2026-10-09

### Initial Release
- Intelligent Bi-Directional (RTL) formatting scoped strictly to the AI Chat box.
- Embedded offline Vazirmatn Variable and Snapp Web fonts.
- Support for system fonts (IRANSans, B Nazanin, Tahoma, etc.) and custom font configuration.
- Strict LTR preservation for code blocks, terminal sessions, Monaco editor buffers, and inline backticks.
- Interactive status bar item and command palette integration for one-click toggling.
- Persian keyboard Shift+2 shortcut fix for @ character inside chat input.
- Atomic backup and restore mechanism ensuring zero corruption risks.
