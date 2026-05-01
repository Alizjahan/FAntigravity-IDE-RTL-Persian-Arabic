import { STORAGE_KEY, BRIDGE_PORT } from './constants.js';

/**
 * Generate client-side runtime JavaScript engine that runs inside workbench documents
 */
export function generateRuntimeJs(config = {}) {
    return `/* ==========================================================================
   FAntigravity IDE RTL (Persian & Arabic) - Runtime Engine
   Real-Time Live-Sync via Local HTTP Bridge & Dynamic DOM Styling
   Scoped strictly to AI Agent Chat & Jetski Trajectory Surfaces
   ========================================================================== */
(function() {
    'use strict';

    var STORAGE_KEY = '${STORAGE_KEY}';
    var BRIDGE_URL = 'http://127.0.0.1:${BRIDGE_PORT}/config';
    var ARABIC_PERSIAN_RE = /[\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF]/;

    var _config = ${JSON.stringify(config)};
    var _enabled = _config.enabled !== false;
    var _forceRTL = Boolean(_config.forceRTL);

    var HTML = document.documentElement;
    var isStandalone = (location.pathname || '').toLowerCase().indexOf('agent') !== -1;

    if (isStandalone) {
        HTML.classList.add('fantigravity-standalone');
    }

    // Try reading cached state
    try {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            var parsed = JSON.parse(saved);
            _enabled = parsed.enabled !== false;
            _forceRTL = Boolean(parsed.forceRTL);
            _config = Object.assign({}, _config, parsed);
        }
    } catch (_) {}

    if (_enabled) {
        HTML.classList.add('fantigravity-on');
    } else {
        HTML.classList.remove('fantigravity-on');
    }

    function isRtlText(text) {
        if (!text) return false;
        var clean = text.replace(/[\\u200B-\\u200F\\uFEFF\\s]/g, '');
        return ARABIC_PERSIAN_RE.test(clean);
    }

    function buildDynamicCss(cfg) {
        var fontFaces = 
            "@font-face {\\n" +
            "    font-family: 'Vazirmatn';\\n" +
            "    src: local('Vazirmatn'), local('Vazirmatn-Regular'), url('./Vazirmatn-Variable.woff2') format('woff2');\\n" +
            "    font-weight: 100 900;\\n" +
            "    font-style: normal;\\n" +
            "    font-display: swap;\\n" +
            "}\\n" +
            "@font-face {\\n" +
            "    font-family: 'Dubai';\\n" +
            "    src: local('Dubai'), local('Dubai-Regular'), url('./Dubai-Regular.ttf') format('truetype');\\n" +
            "    font-weight: 100 900;\\n" +
            "    font-style: normal;\\n" +
            "    font-display: swap;\\n" +
            "}\\n";

        // 1. English Font with Unicode-Range: restricts English font strictly to Latin glyphs
        var enFont = "";
        var rawEn = (cfg.enFontFamily || '').trim();
        if (rawEn) {
            var baseEn = rawEn.replace(/[-\\s]?Regular$/i, '');
            fontFaces += 
                "@font-face {\\n" +
                "    font-family: 'CustomEnglishFont';\\n" +
                "    src: local('" + rawEn + "'), local('" + baseEn + "');\\n" +
                "    font-weight: 100 900;\\n" +
                "    unicode-range: U+0000-007F, U+0080-00FF, U+0100-017F, U+0180-024F;\\n" +
                "}\\n";
            enFont = "'CustomEnglishFont', ";
        }

        // 2. Custom Code Font
        var codeFont = "";
        var rawCode = (cfg.codeFontFamily || '').trim();
        if (rawCode) {
            var baseCode = rawCode.replace(/[-\\s]?Regular$/i, '');
            fontFaces += 
                "@font-face {\\n" +
                "    font-family: 'CustomCodeFont';\\n" +
                "    src: local('" + rawCode + "'), local('" + baseCode + "');\\n" +
                "    font-weight: 100 900;\\n" +
                "}\\n";
            codeFont = "'CustomCodeFont', ";
        }

        // 3. Custom Persian Font
        var rawCustom = (cfg.customFontFamily || '').trim();
        if (cfg.fontFamily === 'custom' && rawCustom) {
            var baseCustom = rawCustom.replace(/[-\\s]?Regular$/i, '');
            fontFaces += 
                "@font-face {\\n" +
                "    font-family: 'UserPersianFont';\\n" +
                "    src: local('" + rawCustom + "'), local('" + baseCustom + "');\\n" +
                "    font-weight: 100 900;\\n" +
                "}\\n";
        }

        var faFont = "'Vazirmatn', 'Dubai', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif";
        if (cfg.fontFamily === 'Dubai') {
            faFont = "'Dubai', 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif";
        } else if (cfg.fontFamily === 'custom' && rawCustom) {
            faFont = "'UserPersianFont', 'Vazirmatn', 'Dubai', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        } else if (cfg.fontFamily === 'System Default') {
            faFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'IRANSans', 'Tahoma', Roboto, sans-serif";
        }

        var codeStack = codeFont + (rawCode ? "'" + rawCode + "', " : "") + "Consolas, 'Courier New', monospace";
        var fs = (cfg.fontSize > 0) ? cfg.fontSize + 'px' : '13px';
        var lh = cfg.lineHeight || 1.7;

        var forceRtlRules = cfg.forceRTL ? (
            "html.fantigravity-on [data-testid=\\"user-input-step\\"],\\n" +
            "html.fantigravity-on [data-testid=\\"user-input-step\\"] *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] p,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] li,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h1,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h2,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h3,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h4,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h5,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] h6,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] blockquote,\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] .whitespace-pre-wrap,\\n" +
            "html.fantigravity-on .leading-relaxed p,\\n" +
            "html.fantigravity-on .leading-relaxed li,\\n" +
            "html.fantigravity-on .leading-relaxed h1,\\n" +
            "html.fantigravity-on .leading-relaxed h2,\\n" +
            "html.fantigravity-on .leading-relaxed h3,\\n" +
            "html.fantigravity-on .animate-markdown,\\n" +
            "html.fantigravity-on .markdown-root p,\\n" +
            "html.fantigravity-on .markdown-root li,\\n" +
            "html.fantigravity-on .chat-container p,\\n" +
            "html.fantigravity-on .chat-container li,\\n" +
            "html.fantigravity-on.fantigravity-standalone body p,\\n" +
            "html.fantigravity-on.fantigravity-standalone body li,\\n" +
            "html.fantigravity-on.fantigravity-standalone body h1,\\n" +
            "html.fantigravity-on.fantigravity-standalone body h2 {\\n" +
            "    direction: rtl !important;\\n" +
            "    text-align: right !important;\\n" +
            "    unicode-bidi: isolate !important;\\n" +
            "}\\n\\n"
        ) : "";

        return fontFaces +
            ":root {\\n" +
            "    --fantigravity-chat-font: " + enFont + faFont + " !important;\\n" +
            "    --fantigravity-code-font: " + codeStack + " !important;\\n" +
            "    --fantigravity-chat-line-height: " + lh + " !important;\\n" +
            "    --fantigravity-chat-font-size: " + fs + " !important;\\n" +
            "}\\n\\n" +
            "html.fantigravity-on [data-testid=\\"user-input-step\\"],\\n" +
            "html.fantigravity-on [data-testid=\\"user-input-step\\"] *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"],\\n" +
            "html.fantigravity-on [data-testid=\\"conversation-view\\"] *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on .leading-relaxed,\\n" +
            "html.fantigravity-on .leading-relaxed *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on .animate-markdown,\\n" +
            "html.fantigravity-on .animate-markdown *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on .markdown-root,\\n" +
            "html.fantigravity-on .markdown-root *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on .chat-container,\\n" +
            "html.fantigravity-on .chat-container *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on.fantigravity-standalone body,\\n" +
            "html.fantigravity-on.fantigravity-standalone body *:not(pre):not(code):not(.monaco-editor),\\n" +
            "html.fantigravity-on [data-lexical-editor=\\"true\\"],\\n" +
            "html.fantigravity-on [contenteditable=\\"true\\"],\\n" +
            "html.fantigravity-on [contenteditable=\\"true\\"] *,\\n" +
            "html.fantigravity-on [data-lexical-text=\\"true\\"],\\n" +
            "html.fantigravity-on textarea,\\n" +
            "html.fantigravity-on .agent_input_box {\\n" +
            "    font-family: var(--fantigravity-chat-font) !important;\\n" +
            "    line-height: " + lh + " !important;\\n" +
            "    font-size: " + fs + " !important;\\n" +
            "}\\n\\n" +
            "html.fantigravity-on pre,\\n" +
            "html.fantigravity-on code,\\n" +
            "html.fantigravity-on pre *,\\n" +
            "html.fantigravity-on code *,\\n" +
            "html.fantigravity-on .code-block,\\n" +
            "html.fantigravity-on .code-block *,\\n" +
            "html.fantigravity-on .code-line,\\n" +
            "html.fantigravity-on .code-line *,\\n" +
            "html.fantigravity-on .font-mono,\\n" +
            "html.fantigravity-on [class*=\\"font-mono\\"],\\n" +
            "html.fantigravity-on [class*=\\"font-mono\\"] *,\\n" +
            "html.fantigravity-on .monaco-editor,\\n" +
            "html.fantigravity-on .monaco-editor *,\\n" +
            "html.fantigravity-on [class*=\\"monaco-editor\\"] * {\\n" +
            "    direction: ltr !important;\\n" +
            "    text-align: left !important;\\n" +
            "    unicode-bidi: isolate !important;\\n" +
            "    font-family: var(--fantigravity-code-font) !important;\\n" +
            "}\\n\\n" +
            forceRtlRules;
    }

    function updateDynamicStyleTag(css) {
        var styleEl = document.getElementById('fantigravity-dynamic-override');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'fantigravity-dynamic-override';
            (document.head || document.documentElement).appendChild(styleEl);
        }
        styleEl.textContent = css;
    }

    function processTextBlock(el) {
        if (!el || el.nodeType !== 1) return;
        var tag = el.tagName;
        if (tag === 'PRE' || tag === 'CODE') return;
        if (el.closest('pre') || el.closest('code') || el.closest('.monaco-editor') || el.closest('[class*="font-mono"]')) return;
        if (tag === 'BUTTON' || el.closest('button') || el.closest('[role="button"]') || el.closest('svg') || el.closest('.codicon')) return;
        if (el.classList.contains('katex') || el.closest('.katex')) return;

        var text = el.textContent || '';
        var hasRtl = isRtlText(text);

        if (hasRtl || _forceRTL) {
            el.style.setProperty('direction', 'rtl', 'important');
            el.style.setProperty('text-align', 'right', 'important');
            el.style.setProperty('unicode-bidi', 'isolate', 'important');
            el.setAttribute('data-fantigravity-dir', 'rtl');

            // In Tailwind flex containers (like step titles or flex row headers)
            if (window.getComputedStyle(el).display === 'flex') {
                el.style.setProperty('justify-content', 'flex-start', 'important');
            }

            // Math inside RTL block must remain strictly LTR
            var mathEls = el.querySelectorAll('.katex, .katex-html');
            for (var m = 0; m < mathEls.length; m++) {
                mathEls[m].style.setProperty('direction', 'ltr', 'important');
                mathEls[m].style.setProperty('text-align', 'left', 'important');
                mathEls[m].style.setProperty('unicode-bidi', 'isolate', 'important');
            }
        } else {
            el.style.setProperty('direction', 'ltr', 'important');
            el.style.setProperty('text-align', 'left', 'important');
            el.style.setProperty('unicode-bidi', 'isolate', 'important');
            el.setAttribute('data-fantigravity-dir', 'ltr');
        }
    }

    function scanAll() {
        if (!_enabled) return;

        // Headings (H1..H6) above boxes and inside chat
        var headings = document.querySelectorAll(
            'h1, h2, h3, h4, h5, h6, ' +
            '[data-testid="conversation-view"] h1, [data-testid="conversation-view"] h2, [data-testid="conversation-view"] h3, ' +
            '[data-testid="conversation-view"] h4, [data-testid="conversation-view"] h5, [data-testid="conversation-view"] h6, ' +
            '.leading-relaxed.select-text h1, .leading-relaxed.select-text h2, .leading-relaxed.select-text h3'
        );
        for (var h = 0; h < headings.length; h++) {
            processTextBlock(headings[h]);
        }

        // 1. User Prompts & Bubbles
        var userBubbles = document.querySelectorAll(
            '[data-testid="user-input-step"] .whitespace-pre-wrap, ' +
            '[data-testid="user-input-step"] p, ' +
            'div.whitespace-pre-wrap'
        );
        for (var i = 0; i < userBubbles.length; i++) {
            processTextBlock(userBubbles[i]);
        }

        // 2. AI Assistant Responses, Paragraphs, Lists, Blockquotes
        var chatBlocks = document.querySelectorAll(
            '[data-testid="conversation-view"] p, [data-testid="conversation-view"] li, [data-testid="conversation-view"] blockquote, ' +
            '.leading-relaxed.select-text p, .leading-relaxed.select-text li, .animate-markdown, ' +
            '.markdown-root p, .markdown-root li, .rendered-markdown p, .rendered-markdown li, ' +
            '.chat-container p, .chat-container li'
        );
        for (var j = 0; j < chatBlocks.length; j++) {
            processTextBlock(chatBlocks[j]);
        }

        // 3. Standalone agent window direct paragraphs and headings
        if (isStandalone) {
            var agentDirect = document.querySelectorAll('body p, body li, body blockquote, body h1, body h2, body h3, body h4, body h5, body h6');
            for (var k = 0; k < agentDirect.length; k++) {
                processTextBlock(agentDirect[k]);
            }
        }
    }

    function scanInputEditors() {
        if (!_enabled) return;
        var inputs = document.querySelectorAll('[data-lexical-editor="true"], [contenteditable="true"], textarea, .agent_input_box, [role="textbox"]');
        for (var i = 0; i < inputs.length; i++) {
            var inp = inputs[i];
            var text = inp.tagName === 'TEXTAREA' ? inp.value : inp.textContent;
            if (isRtlText(text) || _forceRTL) {
                inp.style.setProperty('direction', 'rtl', 'important');
                inp.style.setProperty('text-align', 'right', 'important');
            } else {
                inp.style.setProperty('direction', 'ltr', 'important');
                inp.style.setProperty('text-align', 'left', 'important');
            }
        }
    }

    function revertModifications() {
        var modified = document.querySelectorAll('[data-fantigravity-dir]');
        for (var i = 0; i < modified.length; i++) {
            var el = modified[i];
            el.style.removeProperty('direction');
            el.style.removeProperty('text-align');
            el.style.removeProperty('unicode-bidi');
            el.removeAttribute('data-fantigravity-dir');
        }

        var inputs = document.querySelectorAll('[data-lexical-editor="true"], [contenteditable="true"], textarea, .agent_input_box, [role="textbox"]');
        for (var j = 0; j < inputs.length; j++) {
            inputs[j].style.removeProperty('direction');
            inputs[j].style.removeProperty('text-align');
        }
    }

    // Apply configuration changes live without page reload
    function applyLiveConfig(cfg) {
        if (!cfg) return;
        _config = Object.assign({}, _config, cfg);
        _enabled = _config.enabled !== false;
        _forceRTL = Boolean(_config.forceRTL);

        updateDynamicStyleTag(buildDynamicCss(_config));

        if (_enabled) {
            HTML.classList.add('fantigravity-on');
            scanAll();
            scanInputEditors();
        } else {
            HTML.classList.remove('fantigravity-on');
            revertModifications();
        }

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(_config));
        } catch (_) {}
    }

    var _observer = null;
    var _debounceTimer = null;

    function startObserver() {
        if (_observer) {
            _observer.disconnect();
            _observer = null;
        }

        _observer = new MutationObserver(function() {
            if (!_enabled) return;
            if (_debounceTimer) clearTimeout(_debounceTimer);
            _debounceTimer = setTimeout(function() {
                scanAll();
            }, 60);
        });

        _observer.observe(document.body || document.documentElement, {
            childList: true,
            subtree: true
        });

        scanAll();
        scanInputEditors();
    }

    // Input listener for real-time typing
    document.addEventListener('input', function(e) {
        var t = e.target;
        if (t && (t.closest('[data-lexical-editor="true"]') || t.closest('[contenteditable="true"]') || t.tagName === 'TEXTAREA')) {
            scanInputEditors();
        }
    }, true);

    // Sync via Storage Event (between windows sharing origin)
    window.addEventListener('storage', function(e) {
        if (e.key === STORAGE_KEY && e.newValue) {
            try {
                applyLiveConfig(JSON.parse(e.newValue));
            } catch (_) {}
        }
    });

    // Poll Local HTTP Bridge for instant real-time sync across all windows
    var lastBridgeJson = '';
    function pollBridge() {
        fetch(BRIDGE_URL + '?_t=' + Date.now(), { cache: 'no-store' })
            .then(function(res) { return res.ok ? res.json() : null; })
            .then(function(data) {
                if (data) {
                    var str = JSON.stringify(data);
                    if (str !== lastBridgeJson) {
                        lastBridgeJson = str;
                        applyLiveConfig(data);
                    }
                }
            })
            .catch(function() {});
    }

    function init() {
        updateDynamicStyleTag(buildDynamicCss(_config));
        startObserver();
        setInterval(pollBridge, 250);
        pollBridge();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
`;
}
