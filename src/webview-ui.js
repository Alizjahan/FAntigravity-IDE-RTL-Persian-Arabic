import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let cachedIconBase64 = null;
let cachedVazirBase64 = null;

function getIconBase64() {
    if (!cachedIconBase64) {
        const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
        if (fs.existsSync(iconPath)) {
            cachedIconBase64 = fs.readFileSync(iconPath).toString('base64');
        }
    }
    return cachedIconBase64 ? `data:image/png;base64,${cachedIconBase64}` : '';
}

function getVazirBase64() {
    if (!cachedVazirBase64) {
        const fontPath = path.join(__dirname, '..', 'assets', 'fonts', 'Vazirmatn-Variable.woff2');
        if (fs.existsSync(fontPath)) {
            cachedVazirBase64 = fs.readFileSync(fontPath).toString('base64');
        }
    }
    return cachedVazirBase64;
}

/**
 * FAntigravity IDE - Exact UI match with FAntigravity Standalone App + 3-Language System
 */
export function getSidebarHtml(webview, extensionUri, config) {
    const isRTL = config.enabled !== false;
    const forceRTL = Boolean(config.forceRTL);
    const savedFaFont = config.fontFamily || 'Vazirmatn';
    const customFont = config.customFontFamily || '';
    const savedEnFont = config.enFontFamily || '';
    const savedCodeFont = config.codeFontFamily || '';
    const savedLH = config.lineHeight || 1.7;
    const savedFS = config.fontSize || 13;
    const customIconSrc = getIconBase64();
    const vazirBase64 = getVazirBase64();
    const currentTheme = config.theme || 'antigravity';

    const embeddedFontCss = vazirBase64 ? `
        @font-face {
            font-family: 'Vazirmatn';
            font-style: normal;
            font-weight: 100 900;
            font-display: swap;
            src: url('data:font/woff2;base64,${vazirBase64}') format('woff2');
        }
    ` : '';

    return `<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FAntigravity</title>
    <style>
        ${embeddedFontCss}

        :root,
        [data-theme="dark"] {
            --faliz-bg: #0d1117;
            --faliz-bg-card: #161b22;
            --faliz-bg-input: #10141a;
            --faliz-border: #30363d;
            --faliz-border-subtle: #21262d;
            --faliz-text-primary: #f0f6fc;
            --faliz-text-secondary: #c9d1d9;
            --faliz-text-muted: #8b949e;
            --faliz-accent: #0D9DF8;
            --faliz-accent-gradient: linear-gradient(135deg, #0D9DF8 0%, #0F6FFA 100%);
            --faliz-badge-bg: rgba(52, 198, 191, 0.15);
            --faliz-badge-text: #34C6BF;
            --faliz-badge-border: rgba(52, 198, 191, 0.35);
            --faliz-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.15);
        }

        [data-theme="light"] {
            --faliz-bg: #ffffff;
            --faliz-bg-card: #f6f8fa;
            --faliz-bg-input: #f6f8fa;
            --faliz-border: #d0d7de;
            --faliz-border-subtle: #e1e4e8;
            --faliz-text-primary: #1f2328;
            --faliz-text-secondary: #424a53;
            --faliz-text-muted: #656d76;
            --faliz-accent: #0F6FFA;
            --faliz-accent-gradient: linear-gradient(135deg, #0F6FFA 0%, #0D9DF8 100%);
            --faliz-badge-bg: rgba(26, 127, 55, 0.15);
            --faliz-badge-text: #1a7f37;
            --faliz-badge-border: rgba(26, 127, 55, 0.3);
            --faliz-shadow: 0 10px 28px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08);
        }

        [data-theme="antigravity"] {
            --faliz-bg: #050b14;
            --faliz-bg-card: #08111f;
            --faliz-bg-input: #02050a;
            --faliz-border: rgba(52, 198, 191, 0.4);
            --faliz-border-subtle: rgba(15, 111, 250, 0.3);
            --faliz-text-primary: #ffffff;
            --faliz-text-secondary: #34C6BF;
            --faliz-text-muted: #0D9DF8;
            --faliz-accent: #34C6BF;
            --faliz-accent-gradient: linear-gradient(135deg, #0F6FFA 0%, #0D9DF8 35%, #34C6BF 65%, #89DB76 90%, #FA9138 100%);
            --faliz-badge-bg: rgba(52, 198, 191, 0.2);
            --faliz-badge-text: #89DB76;
            --faliz-badge-border: rgba(52, 198, 191, 0.45);
            --faliz-shadow: 0 10px 28px rgba(0, 0, 0, 0.7), 0 0 14px rgba(15, 111, 250, 0.3);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif !important;
        }

        body {
            font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif !important;
            background-color: var(--faliz-bg);
            color: var(--faliz-text-primary);
            padding: 12px;
            font-size: 12px;
            direction: rtl;
            user-select: none;
            overflow-x: hidden;
            transition: direction 0.2s ease;
        }

        body.faliz-ltr {
            direction: ltr !important;
        }

        .faliz-panel {
            background-color: var(--faliz-bg);
            border: 1px solid var(--faliz-border);
            box-shadow: var(--faliz-shadow);
            border-radius: 12px;
            padding: 14px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            width: 100%;
        }

        /* Header */
        .faliz-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 8px;
        }

        .faliz-brand {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .faliz-logo {
            width: 24px !important;
            height: 24px !important;
            min-width: 24px !important;
            min-height: 24px !important;
            max-width: 24px !important;
            max-height: 24px !important;
            object-fit: contain !important;
            flex-shrink: 0 !important;
            aspect-ratio: 1 / 1 !important;
            border-radius: 4px;
            display: block;
        }

        .faliz-brand-texts {
            display: flex;
            flex-direction: column;
        }

        .faliz-title {
            font-size: 14px;
            font-weight: 800;
            line-height: 1.2;
            background: var(--faliz-accent-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .faliz-subtitle {
            font-size: 10px;
            color: var(--faliz-text-muted);
            font-weight: 600;
        }

        .faliz-header-actions {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .faliz-theme-toggle-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            height: 24px;
            border-radius: 6px;
            background: var(--faliz-bg-card);
            border: 1px solid var(--faliz-border);
            color: var(--faliz-text-primary);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .faliz-theme-toggle-btn:hover {
            border-color: var(--faliz-accent);
            transform: scale(1.05);
        }

        .faliz-separator {
            height: 1px;
            background-color: var(--faliz-border-subtle);
            margin: 4px -14px;
            width: calc(100% + 28px);
        }

        /* Controls row */
        .faliz-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 8px;
            height: 28px;
            padding: 0 2px;
        }

        .faliz-label {
            font-weight: 600;
            font-size: 11.5px;
            color: var(--faliz-text-primary);
            display: flex;
            align-items: center;
            gap: 6px;
            white-space: nowrap;
        }

        /* Toggle switch */
        .faliz-switch {
            position: relative;
            display: inline-block;
            width: 38px;
            height: 20px;
            flex-shrink: 0;
        }

        .faliz-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .faliz-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: var(--faliz-bg-card);
            border: 1px solid var(--faliz-border);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 20px;
        }

        .faliz-slider:before {
            position: absolute;
            content: "";
            height: 14px;
            width: 14px;
            left: 2px;
            bottom: 2px;
            background-color: var(--faliz-text-primary);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border-radius: 50%;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }

        input:checked + .faliz-slider {
            background: var(--faliz-accent-gradient);
        }

        input:checked + .faliz-slider:before {
            transform: translateX(18px);
        }

        .faliz-badge {
            display: inline-flex;
            align-items: center;
            padding: 1px 6px;
            border-radius: 10px;
            font-size: 10px;
            font-weight: 600;
        }

        .faliz-badge-active {
            background-color: var(--faliz-badge-bg);
            color: var(--faliz-badge-text);
            border: 1px solid var(--faliz-badge-border);
        }

        .faliz-badge-muted {
            background-color: var(--faliz-border-subtle);
            color: var(--faliz-text-muted);
            border: 1px solid var(--faliz-border);
        }

        /* Inputs & Selects */
        .faliz-input {
            font-size: 11.5px;
            border-radius: 6px;
            padding: 3px 8px;
            height: 25px;
            background-color: var(--faliz-bg-input);
            color: var(--faliz-text-primary);
            border: 1px solid var(--faliz-border);
            outline: none;
            width: 140px;
            font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif !important;
            transition: border-color 0.2s ease;
        }

        .faliz-input:focus {
            border-color: var(--faliz-accent);
        }

        select.faliz-input option {
            background-color: var(--faliz-bg-card);
            color: var(--faliz-text-primary);
            font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif !important;
        }

        /* Sliders */
        .faliz-range {
            width: 85px;
            accent-color: var(--faliz-accent);
            cursor: pointer;
        }

        .faliz-icon-btn {
            background: transparent;
            border: none;
            color: var(--faliz-text-muted);
            cursor: pointer;
            padding: 2px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: color 0.15s ease;
        }

        .faliz-icon-btn:hover {
            color: var(--faliz-text-primary);
        }

        /* Apply Button */
        .btn-apply {
            width: 100%;
            background: var(--faliz-accent-gradient);
            border: none;
            color: #ffffff !important;
            font-family: 'Vazirmatn', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, sans-serif !important;
            font-weight: 700 !important;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 12px;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(13, 157, 248, 0.35);
            transition: opacity 0.15s ease, transform 0.1s ease;
            margin-top: 6px;
            display: block;
            text-align: center;
        }

        .btn-apply:hover {
            opacity: 0.92;
        }

        .btn-apply:active {
            transform: scale(0.98);
        }

        .faliz-footer {
            text-align: center;
            font-size: 10px;
            color: var(--faliz-text-muted);
            padding-top: 6px;
        }

        .faliz-footer a {
            color: var(--faliz-accent);
            text-decoration: none;
            font-weight: 700;
        }
    </style>
</head>
<body data-theme="${currentTheme}">

    <div class="faliz-panel">
        <!-- Header -->
        <div class="faliz-header">
            <div class="faliz-brand">
                <img src="${customIconSrc}" class="faliz-logo" alt="FAntigravity" />
                <div class="faliz-brand-texts">
                    <span class="faliz-title">FAntigravity IDE RTL</span>
                    <span class="faliz-subtitle" id="faliz-txt-subtitle">راست‌چین ایجنت (فارسی و عربی)</span>
                </div>
            </div>
            <div class="faliz-header-actions">
                <!-- 3-Language Switcher (FA / AR / EN) -->
                <button id="faliz-lang-btn" type="button" class="faliz-theme-toggle-btn" title="تغییر زبان / تغيير اللغة / Change Language" style="width: auto; padding: 0 7px; gap: 4px;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span id="faliz-lang-code" style="font-size: 10px; font-weight: 800; letter-spacing: 0.5px;">FA</span>
                </button>
                <!-- Theme Switcher -->
                <button id="faliz-theme-btn" type="button" class="faliz-theme-toggle-btn" title="تغییر تم" style="width: 24px;">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="url(#themeStarGrad)" stroke="#34C6BF" stroke-width="1.2">
                        <defs>
                            <linearGradient id="themeStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#0F6FFA"/>
                                <stop offset="35%" stop-color="#0D9DF8"/>
                                <stop offset="70%" stop-color="#34C6BF"/>
                                <stop offset="92%" stop-color="#89DB76"/>
                                <stop offset="100%" stop-color="#FA9138"/>
                            </linearGradient>
                        </defs>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                </button>
            </div>
        </div>

        <div class="faliz-separator"></div>

        <!-- Master Enable Toggle -->
        <div class="faliz-row">
            <div class="faliz-label">
                <span id="faliz-txt-toggle">فعال‌سازی راست‌چین</span>
                <span id="faliz-toggle-badge" class="faliz-badge ${isRTL ? 'faliz-badge-active' : 'faliz-badge-muted'}">${isRTL ? 'روشن' : 'خاموش'}</span>
            </div>
            <label class="faliz-switch">
                <input type="checkbox" id="faliz-toggle-chk" ${isRTL ? 'checked' : ''}>
                <span class="faliz-slider"></span>
            </label>
        </div>

        <!-- Force RTL Toggle -->
        <div class="faliz-row" id="faliz-force-row" style="${isRTL ? '' : 'opacity: 0.4; pointer-events: none;'}">
            <div class="faliz-label">
                <span id="faliz-txt-force">راست‌چین اجباری</span>
                <span id="faliz-force-tooltip" title="اجبار تمام پیام‌ها به حالت راست‌چین حتی اگر با متن انگلیسی شروع شوند" style="color: var(--faliz-text-muted); cursor: help;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </span>
            </div>
            <label class="faliz-switch">
                <input type="checkbox" id="faliz-force-chk" ${forceRTL ? 'checked' : ''}>
                <span class="faliz-slider"></span>
            </label>
        </div>

        <div class="faliz-separator"></div>

        <!-- Font Selectors -->
        <div id="faliz-settings-wrapper" style="${isRTL ? '' : 'opacity: 0.4; pointer-events: none;'}">
            <!-- Persian & Arabic Font -->
            <div class="faliz-row">
                <span class="faliz-label" id="faliz-txt-fafont">فونت فارسی یا عربی:</span>
                <select id="faliz-fafont-sel" class="faliz-input">
                    <option value="Dubai" ${savedFaFont === 'Dubai' ? 'selected' : ''}>دبی (Dubai)</option>
                    <option value="Vazirmatn" ${(!savedFaFont || savedFaFont === 'Vazirmatn') ? 'selected' : ''}>وزیرمتن (Vazirmatn)</option>
                    <option value="System Default" ${savedFaFont === 'System Default' ? 'selected' : ''}>پیش‌فرض سیستم</option>
                    <option value="custom" ${(savedFaFont && savedFaFont !== 'Vazirmatn' && savedFaFont !== 'Dubai' && savedFaFont !== 'System Default') ? 'selected' : ''}>فونت دلخواه از سیستم...</option>
                </select>
            </div>

            <!-- Custom Font Input -->
            <div class="faliz-row" id="faliz-customfont-row" style="display: ${(savedFaFont && savedFaFont !== 'Vazirmatn' && savedFaFont !== 'Dubai' && savedFaFont !== 'System Default') ? 'flex' : 'none'};">
                <span class="faliz-label" id="faliz-txt-customfont">نام فونت سیستم:</span>
                <input type="text" id="faliz-customfont-inp" class="faliz-input" placeholder="مثال: IRANSans" value="${customFont}">
            </div>

            <!-- English Font -->
            <div class="faliz-row">
                <span class="faliz-label" id="faliz-txt-enfont">فونت انگلیسی:</span>
                <input type="text" id="faliz-enfont-inp" class="faliz-input" placeholder="اختیاری (مثال: Inter)" value="${savedEnFont}">
            </div>

            <!-- Code Font -->
            <div class="faliz-row">
                <span class="faliz-label" id="faliz-txt-codefont">فونت کدها:</span>
                <input type="text" id="faliz-codefont-inp" class="faliz-input" placeholder="اختیاری (مثال: Consolas)" value="${savedCodeFont}">
            </div>

            <div class="faliz-separator"></div>

            <!-- Line Height -->
            <div class="faliz-row">
                <div class="faliz-label">
                    <span id="faliz-txt-lh">فاصله خطوط:</span>
                    <span id="faliz-lh-badge" class="faliz-badge faliz-badge-muted">${savedLH}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button id="faliz-lh-reset" type="button" class="faliz-icon-btn" title="بازنشانی">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    <input type="range" id="faliz-lh-rng" class="faliz-range" min="1.2" max="2.5" step="0.05" value="${savedLH}">
                </div>
            </div>

            <!-- Font Size -->
            <div class="faliz-row">
                <div class="faliz-label">
                    <span id="faliz-txt-fs">اندازه قلم:</span>
                    <span id="faliz-fs-badge" class="faliz-badge faliz-badge-muted">${savedFS}px</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button id="faliz-fs-reset" type="button" class="faliz-icon-btn" title="بازنشانی">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    <input type="range" id="faliz-fs-rng" class="faliz-range" min="11" max="22" step="1" value="${savedFS}">
                </div>
            </div>
        </div>

        <div class="faliz-separator"></div>

        <button class="btn-apply" id="faliz-apply-btn">اعمال تغییرات و بارگذاری مجدد (Reload)</button>

        <div class="faliz-footer" id="faliz-txt-footer">
            Developed with ❤️ by <a href="https://github.com/Alizjahan" target="_blank">Aliz</a>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();

        const I18N = {
            fa: {
                subtitle: 'راست‌چین ایجنت (فارسی و عربی)',
                toggle: 'فعال‌سازی راست‌چین',
                on: 'روشن',
                off: 'خاموش',
                force: 'راست‌چین اجباری',
                forceTip: 'اجبار تمام پیام‌ها به حالت راست‌چین حتی اگر با متن انگلیسی شروع شوند',
                faFont: 'فونت فارسی یا عربی:',
                optDubai: 'دبی (Dubai)',
                optVazir: 'وزیرمتن (Vazirmatn)',
                optSys: 'پیش‌فرض سیستم',
                optCustom: 'فونت دلخواه از سیستم...',
                customFont: 'نام فونت سیستم:',
                customPlaceholder: 'مثال: IRANSans, Sahel, Shabnam...',
                enFont: 'فونت انگلیسی:',
                enPlaceholder: 'اختیاری (مثال: Inter, Roboto...)',
                codeFont: 'فونت کدها:',
                codePlaceholder: 'اختیاری (مثال: Fira Code, Consolas...)',
                lh: 'فاصله خطوط:',
                fs: 'اندازه قلم:',
                apply: 'اعمال تغییرات و بارگذاری مجدد (Reload)',
                footer: 'توسعه داده شده با ❤️ توسط Aliz',
                dir: 'rtl'
            },
            ar: {
                subtitle: 'محاذاة وكيل الذكاء الاصطناعي (عربي وفارسي)',
                toggle: 'تفعيل المحاذاة من اليمين (RTL)',
                on: 'مفعل',
                off: 'معطل',
                force: 'فرض الاتجاه من اليمين',
                forceTip: 'فرض اتجاه اليمين لجميع الرسائل حتى لو بدأت بالإنجليزية',
                faFont: 'خط العربي أو الفارسي:',
                optDubai: 'دبي (Dubai)',
                optVazir: 'وزير متن (Vazirmatn)',
                optSys: 'الافتراضي للنظام',
                optCustom: 'خط مخصص من النظام...',
                customFont: 'اسم الخط في النظام:',
                customPlaceholder: 'مثال: Cairo, Amiri, Tahoma...',
                enFont: 'الخط الإنجليزي:',
                enPlaceholder: 'اختياري (مثال: Inter, Roboto...)',
                codeFont: 'خط الأكواد:',
                codePlaceholder: 'اختياري (مثال: Fira Code, Consolas...)',
                lh: 'تباعد الأسطر:',
                fs: 'حجم الخط:',
                apply: 'تطبيق التغييرات وإعادة التحميل (Reload)',
                footer: 'تم التطوير بـ ❤️ بواسطة Aliz',
                dir: 'rtl'
            },
            en: {
                subtitle: 'AI Agent RTL Engine (Persian & Arabic)',
                toggle: 'Enable RTL Engine',
                on: 'ON',
                off: 'OFF',
                force: 'Force RTL Mode',
                forceTip: 'Force all messages to RTL even if starting with English characters',
                faFont: 'Persian or Arabic Font:',
                optDubai: 'Dubai',
                optVazir: 'Vazirmatn',
                optSys: 'System Default',
                optCustom: 'Custom System Font...',
                customFont: 'System Font Name:',
                customPlaceholder: 'e.g. IRANSans, Cairo, Tahoma...',
                enFont: 'English Font:',
                enPlaceholder: 'Optional (e.g. Inter, Roboto...)',
                codeFont: 'Code Font:',
                codePlaceholder: 'Optional (e.g. Fira Code, Consolas...)',
                lh: 'Line Spacing:',
                fs: 'Font Size:',
                apply: 'Apply & Reload Window',
                footer: 'Developed with ❤️ by Aliz',
                dir: 'ltr'
            }
        };

        const languages = ['fa', 'ar', 'en'];
        let currentLang = 'fa';
        try {
            const savedL = localStorage.getItem('fantigravity-ide-lang');
            if (savedL && languages.indexOf(savedL) !== -1) {
                currentLang = savedL;
            }
        } catch (_) {}

        // DOM Elements
        const txtSubtitle = document.getElementById('faliz-txt-subtitle');
        const txtToggle = document.getElementById('faliz-txt-toggle');
        const txtForce = document.getElementById('faliz-txt-force');
        const forceTooltip = document.getElementById('faliz-force-tooltip');
        const txtFaFont = document.getElementById('faliz-txt-fafont');
        const txtCustomFont = document.getElementById('faliz-txt-customfont');
        const txtEnFont = document.getElementById('faliz-txt-enfont');
        const txtCodeFont = document.getElementById('faliz-txt-codefont');
        const txtLH = document.getElementById('faliz-txt-lh');
        const txtFS = document.getElementById('faliz-txt-fs');
        const txtFooter = document.getElementById('faliz-txt-footer');
        const langBtn = document.getElementById('faliz-lang-btn');
        const langCode = document.getElementById('faliz-lang-code');
        const chkToggle = document.getElementById('faliz-toggle-chk');
        const badgeToggle = document.getElementById('faliz-toggle-badge');
        const chkForce = document.getElementById('faliz-force-chk');
        const forceRow = document.getElementById('faliz-force-row');
        const settingsWrapper = document.getElementById('faliz-settings-wrapper');
        const selFaFont = document.getElementById('faliz-fafont-sel');
        const rowCustomFont = document.getElementById('faliz-customfont-row');
        const inpCustomFont = document.getElementById('faliz-customfont-inp');
        const inpEnFont = document.getElementById('faliz-enfont-inp');
        const inpCodeFont = document.getElementById('faliz-codefont-inp');
        const rngLH = document.getElementById('faliz-lh-rng');
        const badgeLH = document.getElementById('faliz-lh-badge');
        const btnResetLH = document.getElementById('faliz-lh-reset');
        const rngFS = document.getElementById('faliz-fs-rng');
        const badgeFS = document.getElementById('faliz-fs-badge');
        const btnResetFS = document.getElementById('faliz-fs-reset');
        const btnApply = document.getElementById('faliz-apply-btn');
        const btnTheme = document.getElementById('faliz-theme-btn');

        function setLanguage(lang) {
            currentLang = lang;
            const t = I18N[lang];
            try { localStorage.setItem('fantigravity-ide-lang', lang); } catch (_) {}

            langCode.textContent = lang.toUpperCase();
            document.documentElement.dir = t.dir;
            document.documentElement.lang = lang;

            if (t.dir === 'ltr') {
                document.body.classList.add('faliz-ltr');
            } else {
                document.body.classList.remove('faliz-ltr');
            }

            txtSubtitle.textContent = t.subtitle;
            txtToggle.textContent = t.toggle;
            txtForce.textContent = t.force;
            forceTooltip.title = t.forceTip;
            txtFaFont.textContent = t.faFont;
            txtCustomFont.textContent = t.customFont;
            txtEnFont.textContent = t.enFont;
            txtCodeFont.textContent = t.codeFont;
            txtLH.textContent = t.lh;
            txtFS.textContent = t.fs;
            btnApply.textContent = t.apply;

            // Select options text
            selFaFont.options[0].textContent = t.optDubai;
            selFaFont.options[1].textContent = t.optVazir;
            selFaFont.options[2].textContent = t.optSys;
            selFaFont.options[3].textContent = t.optCustom;

            // Placeholders
            inpCustomFont.placeholder = t.customPlaceholder;
            inpEnFont.placeholder = t.enPlaceholder;
            inpCodeFont.placeholder = t.codePlaceholder;

            // Toggle badge
            badgeToggle.textContent = chkToggle.checked ? t.on : t.off;
        }

        langBtn.addEventListener('click', () => {
            const nextIdx = (languages.indexOf(currentLang) + 1) % languages.length;
            setLanguage(languages[nextIdx]);
        });

        const themes = ['antigravity', 'dark', 'light'];
        let currentThemeIdx = themes.indexOf(document.body.getAttribute('data-theme')) !== -1
            ? themes.indexOf(document.body.getAttribute('data-theme'))
            : 0;

        btnTheme.addEventListener('click', () => {
            currentThemeIdx = (currentThemeIdx + 1) % themes.length;
            const newTheme = themes[currentThemeIdx];
            document.body.setAttribute('data-theme', newTheme);
            sendUpdate(false);
        });

        chkToggle.addEventListener('change', () => {
            const on = chkToggle.checked;
            const t = I18N[currentLang];
            badgeToggle.textContent = on ? t.on : t.off;
            badgeToggle.className = 'faliz-badge ' + (on ? 'faliz-badge-active' : 'faliz-badge-muted');
            forceRow.style.opacity = on ? '1' : '0.4';
            forceRow.style.pointerEvents = on ? 'auto' : 'none';
            settingsWrapper.style.opacity = on ? '1' : '0.4';
            settingsWrapper.style.pointerEvents = on ? 'auto' : 'none';
            sendUpdate(false);
        });

        chkForce.addEventListener('change', () => sendUpdate(false));

        selFaFont.addEventListener('change', () => {
            rowCustomFont.style.display = selFaFont.value === 'custom' ? 'flex' : 'none';
            sendUpdate(false);
        });

        // Debounced text inputs to prevent focus loss and excess traffic
        let inputDebounceTimer = null;
        function onDebouncedInput() {
            if (inputDebounceTimer) clearTimeout(inputDebounceTimer);
            inputDebounceTimer = setTimeout(() => {
                sendUpdate(false);
            }, 300);
        }

        inpCustomFont.addEventListener('input', onDebouncedInput);
        inpEnFont.addEventListener('input', onDebouncedInput);
        inpCodeFont.addEventListener('input', onDebouncedInput);

        rngLH.addEventListener('input', () => {
            badgeLH.textContent = rngLH.value;
            sendUpdate(false);
        });

        btnResetLH.addEventListener('click', () => {
            rngLH.value = 1.7;
            badgeLH.textContent = '1.7';
            sendUpdate(false);
        });

        rngFS.addEventListener('input', () => {
            badgeFS.textContent = rngFS.value + 'px';
            sendUpdate(false);
        });

        btnResetFS.addEventListener('click', () => {
            rngFS.value = 13;
            badgeFS.textContent = '13px';
            sendUpdate(false);
        });

        function getFormData() {
            return {
                enabled: chkToggle.checked,
                forceRTL: chkForce.checked,
                theme: themes[currentThemeIdx],
                fontFamily: selFaFont.value,
                customFontFamily: inpCustomFont.value.trim(),
                enFontFamily: inpEnFont.value.trim(),
                codeFontFamily: inpCodeFont.value.trim(),
                lineHeight: parseFloat(rngLH.value) || 1.7,
                fontSize: parseInt(rngFS.value, 10) || 13
            };
        }

        function sendUpdate(reload) {
            vscode.postMessage({
                command: 'saveConfig',
                config: getFormData(),
                reload: Boolean(reload)
            });
        }

        btnApply.addEventListener('click', () => {
            sendUpdate(true);
        });

        // Initialize language
        setLanguage(currentLang);
    </script>
</body>
</html>`;
}
