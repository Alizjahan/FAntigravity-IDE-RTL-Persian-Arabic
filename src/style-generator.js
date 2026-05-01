import { FONTS } from './constants.js';

export function getEmbeddedFonts() {
    return `
@font-face {
    font-family: 'Vazirmatn';
    src: local('Vazirmatn'), local('Vazirmatn-Regular'), url('./Vazirmatn-Variable.woff2') format('woff2');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Dubai';
    src: local('Dubai'), local('Dubai-Regular'), url('./Dubai-Regular.ttf') format('truetype');
    font-weight: 100 900;
    font-style: normal;
    font-display: swap;
}
`;
}

/**
 * Generate CSS stylesheet placed in workbench directory
 */
export function generateChatStyles(config = {}) {
    const {
        enabled = true,
        forceRTL = false,
        fontFamily = FONTS.VAZIRMATN,
        customFontFamily = '',
        enFontFamily = '',
        codeFontFamily = '',
        fontSize = 13,
        lineHeight = 1.7
    } = config;

    const embeddedFontsCss = getEmbeddedFonts();

    // Custom Font Face definitions
    let extraFontFaces = '';

    // 1. English Font with Unicode-Range (strictly limits English font to Latin glyphs)
    let enFontStack = '';
    const rawEn = (enFontFamily || '').trim();
    if (rawEn) {
        const baseEn = rawEn.replace(/[-\s]?Regular$/i, '');
        extraFontFaces += `
@font-face {
    font-family: 'CustomEnglishFont';
    src: local('${rawEn}'), local('${baseEn}');
    font-weight: 100 900;
    unicode-range: U+0000-007F, U+0080-00FF, U+0100-017F, U+0180-024F;
}
`;
        enFontStack = "'CustomEnglishFont', ";
    }

    // 2. Custom User Persian Font
    const rawCustom = (customFontFamily || '').trim();
    if (fontFamily === 'custom' && rawCustom) {
        const baseCustom = rawCustom.replace(/[-\s]?Regular$/i, '');
        extraFontFaces += `
@font-face {
    font-family: 'UserPersianFont';
    src: local('${rawCustom}'), local('${baseCustom}');
    font-weight: 100 900;
}
`;
    }

    // 3. Custom Code Font
    const rawCode = (codeFontFamily || '').trim();
    let codeFontStack = '';
    if (rawCode) {
        const baseCode = rawCode.replace(/[-\s]?Regular$/i, '');
        extraFontFaces += `
@font-face {
    font-family: 'CustomCodeFont';
    src: local('${rawCode}'), local('${baseCode}');
    font-weight: 100 900;
}
`;
        codeFontStack = "'CustomCodeFont', ";
    }

    // Determine font stack
    let faFontStack = "'Vazirmatn', 'Dubai', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif";
    if (fontFamily === 'Dubai' || fontFamily === FONTS.DUBAI) {
        faFontStack = "'Dubai', 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif";
    } else if (fontFamily === 'custom' && rawCustom) {
        faFontStack = `'UserPersianFont', 'Vazirmatn', 'Dubai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;
    } else if (fontFamily === 'System Default' || fontFamily === FONTS.SYSTEM_DEFAULT) {
        faFontStack = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'IRANSans', 'Tahoma', Roboto, sans-serif";
    }

    const fontSizeRule = fontSize > 0 ? `font-size: ${fontSize}px !important;` : '';
    const lineHeightRule = `line-height: ${lineHeight} !important;`;

    return `/* ==========================================================================
   FAntigravity IDE RTL (Persian & Arabic) - Stylesheet
   Scoped strictly to AI Agent Chat & Jetski Trajectory Surfaces
   ========================================================================== */

${embeddedFontsCss}
${extraFontFaces}

:root {
    --fantigravity-chat-font: ${enFontStack}${faFontStack};
    --fantigravity-code-font: ${codeFontStack}Consolas, 'Courier New', monospace;
    --fantigravity-chat-line-height: ${lineHeight};
    --fantigravity-chat-font-size: ${fontSize}px;
}

/* 1. Base typography for Agent Chat */
html.fantigravity-on [data-testid="user-input-step"],
html.fantigravity-on [data-testid="user-input-step"] *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on [data-testid="conversation-view"],
html.fantigravity-on [data-testid="conversation-view"] *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on .leading-relaxed,
html.fantigravity-on .leading-relaxed *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on .animate-markdown,
html.fantigravity-on .animate-markdown *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on .markdown-root,
html.fantigravity-on .markdown-root *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on .chat-container,
html.fantigravity-on .chat-container *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on.fantigravity-standalone body,
html.fantigravity-on.fantigravity-standalone body *:not(pre):not(code):not(.monaco-editor) {
    font-family: var(--fantigravity-chat-font) !important;
}

html.fantigravity-on [data-testid="user-input-step"] .whitespace-pre-wrap,
html.fantigravity-on [data-testid="user-input-step"] p,
html.fantigravity-on [data-testid="conversation-view"] p,
html.fantigravity-on [data-testid="conversation-view"] li,
html.fantigravity-on [data-testid="conversation-view"] blockquote,
html.fantigravity-on [data-testid="conversation-view"] h1,
html.fantigravity-on [data-testid="conversation-view"] h2,
html.fantigravity-on [data-testid="conversation-view"] h3,
html.fantigravity-on [data-testid="conversation-view"] h4,
html.fantigravity-on [data-testid="conversation-view"] h5,
html.fantigravity-on [data-testid="conversation-view"] h6,
html.fantigravity-on .leading-relaxed.select-text p,
html.fantigravity-on .leading-relaxed.select-text li,
html.fantigravity-on .leading-relaxed.select-text h1,
html.fantigravity-on .leading-relaxed.select-text h2,
html.fantigravity-on .leading-relaxed.select-text h3,
html.fantigravity-on .leading-relaxed.select-text h4,
html.fantigravity-on .leading-relaxed.select-text h5,
html.fantigravity-on .leading-relaxed.select-text h6,
html.fantigravity-on .animate-markdown,
html.fantigravity-on .markdown-root p,
html.fantigravity-on .markdown-root li,
html.fantigravity-on .markdown-root h1,
html.fantigravity-on .markdown-root h2,
html.fantigravity-on .markdown-root h3,
html.fantigravity-on .chat-container p,
html.fantigravity-on .chat-container li,
html.fantigravity-on.fantigravity-standalone body p,
html.fantigravity-on.fantigravity-standalone body li,
html.fantigravity-on.fantigravity-standalone body h1,
html.fantigravity-on.fantigravity-standalone body h2,
html.fantigravity-on.fantigravity-standalone body h3 {
    ${lineHeightRule}
    ${fontSizeRule}
}

/* Headings in chat (above boxes and markdown titles) */
html.fantigravity-on h1,
html.fantigravity-on h2,
html.fantigravity-on h3,
html.fantigravity-on h4,
html.fantigravity-on h5,
html.fantigravity-on h6 {
    font-family: var(--fantigravity-chat-font) !important;
}

/* When RTL is detected or forced */
html.fantigravity-on [data-fantigravity-dir="rtl"] {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}

html.fantigravity-on [data-fantigravity-dir="ltr"] {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}

${forceRTL ? `
/* Force RTL mode */
html.fantigravity-on [data-testid="user-input-step"],
html.fantigravity-on [data-testid="user-input-step"] *:not(pre):not(code):not(.monaco-editor),
html.fantigravity-on [data-testid="conversation-view"] p,
html.fantigravity-on [data-testid="conversation-view"] li,
html.fantigravity-on [data-testid="conversation-view"] blockquote,
html.fantigravity-on [data-testid="conversation-view"] h1,
html.fantigravity-on [data-testid="conversation-view"] h2,
html.fantigravity-on [data-testid="conversation-view"] h3,
html.fantigravity-on [data-testid="conversation-view"] h4,
html.fantigravity-on [data-testid="conversation-view"] h5,
html.fantigravity-on [data-testid="conversation-view"] h6,
html.fantigravity-on [data-testid="conversation-view"] .whitespace-pre-wrap,
html.fantigravity-on .leading-relaxed p,
html.fantigravity-on .leading-relaxed li,
html.fantigravity-on .leading-relaxed h1,
html.fantigravity-on .leading-relaxed h2,
html.fantigravity-on .leading-relaxed h3,
html.fantigravity-on .animate-markdown,
html.fantigravity-on .markdown-root p,
html.fantigravity-on .markdown-root li,
html.fantigravity-on .chat-container p,
html.fantigravity-on .chat-container li,
html.fantigravity-on.fantigravity-standalone body p,
html.fantigravity-on.fantigravity-standalone body li,
html.fantigravity-on.fantigravity-standalone body h1,
html.fantigravity-on.fantigravity-standalone body h2 {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
}
` : ''}

/* 2. List layout corrections for RTL */
html.fantigravity-on [data-testid="conversation-view"] ul,
html.fantigravity-on [data-testid="conversation-view"] ol,
html.fantigravity-on.fantigravity-standalone body ul,
html.fantigravity-on.fantigravity-standalone body ol {
    padding-left: 0 !important;
    padding-inline-start: 1.8rem !important;
}

/* 3. Blockquote styling */
html.fantigravity-on blockquote {
    border-left: none !important;
    border-inline-start: 4px solid var(--vscode-textBlockQuote-border, #34C6BF) !important;
    padding-left: 0 !important;
    padding-inline-start: 1rem !important;
}

/* 4. Input Composer & Prompt Editor */
html.fantigravity-on [data-lexical-editor="true"],
html.fantigravity-on [contenteditable="true"],
html.fantigravity-on textarea,
html.fantigravity-on .agent_input_box {
    font-family: var(--fantigravity-chat-font) !important;
}

/* --------------------------------------------------------------------------
   5. STRICT LTR PRESERVATION FOR CODE SNIPPETS, TERMINAL & ACTION BUTTONS
   -------------------------------------------------------------------------- */
html.fantigravity-on pre,
html.fantigravity-on code,
html.fantigravity-on pre *,
html.fantigravity-on code *,
html.fantigravity-on .code-block,
html.fantigravity-on .code-block *,
html.fantigravity-on .code-line,
html.fantigravity-on .code-line *,
html.fantigravity-on .font-mono,
html.fantigravity-on [class*="font-mono"],
html.fantigravity-on [class*="font-mono"] *,
html.fantigravity-on div[data-testid="code-gutter"],
html.fantigravity-on div[data-testid="code-gutter"] *,
html.fantigravity-on .monaco-editor,
html.fantigravity-on .monaco-editor *,
html.fantigravity-on [class*="monaco-editor"] * {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
    font-family: var(--fantigravity-code-font) !important;
}

/* Inline code backticks */
html.fantigravity-on :not(pre) > code {
    direction: ltr !important;
    unicode-bidi: isolate !important;
    font-family: var(--fantigravity-code-font) !important;
    display: inline-block !important;
    padding: 0.1em 0.35em !important;
}

/* Math blocks stay strictly LTR */
html.fantigravity-on .katex,
html.fantigravity-on .katex-html {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
}

/* Buttons, icons, chevrons, step badges */
html.fantigravity-on button,
html.fantigravity-on button *,
html.fantigravity-on svg,
html.fantigravity-on svg *,
html.fantigravity-on [role="button"],
html.fantigravity-on [role="button"] *,
html.fantigravity-on [class*="badge"],
html.fantigravity-on [class*="toolbar"],
html.fantigravity-on .codicon,
html.fantigravity-on .user-input-buttons-container,
html.fantigravity-on .user-input-buttons-container * {
    direction: ltr !important;
    text-align: left !important;
}
`;
}
