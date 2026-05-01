/**
 * FAntigravity IDE RTL (Persian & Arabic) - Constants
 */

export const CONFIG_SECTION = 'fantigravity.chat';

export const COMMANDS = {
    OPEN_PANEL: 'fantigravity.chat.openPanel',
    TOGGLE: 'fantigravity.chat.toggle',
    ENABLE: 'fantigravity.chat.enable',
    DISABLE: 'fantigravity.chat.disable',
    INSERT_AT: 'fantigravity.chat.insertAtSymbol'
};

export const PATCH_MARKER_START = '<!-- FANTIGRAVITY-IDE-RTL-START -->';
export const PATCH_MARKER_END = '<!-- FANTIGRAVITY-IDE-RTL-END -->';

export const CSS_FILENAME = 'fantigravity-ide.css';
export const JS_FILENAME = 'fantigravity-ide.js';
export const STATE_FILENAME = 'fantigravity-ide-state.json';
export const STORAGE_KEY = 'fantigravity-ide-state';
export const BRIDGE_PORT = 41718;

export const ARABIC_PERSIAN_RE = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

export const FONTS = {
    VAZIRMATN: 'Vazirmatn',
    DUBAI: 'Dubai',
    SYSTEM_DEFAULT: 'System Default',
    CUSTOM: 'custom'
};

export const DEFAULT_CONFIG = {
    enabled: true,
    forceRTL: false,
    fontFamily: FONTS.VAZIRMATN,
    customFontFamily: '',
    enFontFamily: '',
    codeFontFamily: '',
    fontSize: 13,
    lineHeight: 1.75,
    theme: 'antigravity'
};
