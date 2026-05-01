import * as vscode from 'vscode';
import http from 'http';
import {
    COMMANDS,
    CONFIG_SECTION,
    DEFAULT_CONFIG,
    BRIDGE_PORT
} from './constants.js';
import {
    injectChatStyles,
    removeChatStyles,
    isPatchApplied
} from './injector.js';
import { getSidebarHtml } from './webview-ui.js';

let sidebarProvider;
let bridgeServer = null;
let activeConfig = null;
let isSavingFromWebview = false;

function getExtensionConfig() {
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    return {
        enabled: config.get('enabled', DEFAULT_CONFIG.enabled),
        forceRTL: config.get('forceRTL', false),
        theme: config.get('theme', 'antigravity'),
        fontFamily: config.get('fontFamily', DEFAULT_CONFIG.fontFamily),
        customFontFamily: config.get('customFontFamily', ''),
        enFontFamily: config.get('enFontFamily', ''),
        codeFontFamily: config.get('codeFontFamily', ''),
        fontSize: config.get('fontSize', 13),
        lineHeight: config.get('lineHeight', 1.7),
        fixPersianAt: config.get('fixPersianAt', true)
    };
}

async function saveExtensionConfig(cfg) {
    const config = vscode.workspace.getConfiguration(CONFIG_SECTION);
    await config.update('enabled', cfg.enabled, vscode.ConfigurationTarget.Global);
    await config.update('forceRTL', cfg.forceRTL, vscode.ConfigurationTarget.Global);
    await config.update('theme', cfg.theme, vscode.ConfigurationTarget.Global);
    await config.update('fontFamily', cfg.fontFamily, vscode.ConfigurationTarget.Global);
    await config.update('customFontFamily', cfg.customFontFamily, vscode.ConfigurationTarget.Global);
    await config.update('enFontFamily', cfg.enFontFamily, vscode.ConfigurationTarget.Global);
    await config.update('codeFontFamily', cfg.codeFontFamily, vscode.ConfigurationTarget.Global);
    await config.update('fontSize', cfg.fontSize, vscode.ConfigurationTarget.Global);
    await config.update('lineHeight', cfg.lineHeight, vscode.ConfigurationTarget.Global);
}

function startBridgeServer() {
    if (bridgeServer) return;

    try {
        bridgeServer = http.createServer((req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

            if (req.method === 'OPTIONS') {
                res.writeHead(200);
                res.end();
                return;
            }

            if (req.url && req.url.startsWith('/config')) {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                });
                res.end(JSON.stringify(activeConfig || getExtensionConfig()));
                return;
            }

            res.writeHead(404);
            res.end();
        });

        bridgeServer.listen(BRIDGE_PORT, '127.0.0.1', () => {
            console.log(`FAntigravity HTTP Bridge active on 127.0.0.1:${BRIDGE_PORT}`);
        });

        bridgeServer.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.warn(`Bridge port ${BRIDGE_PORT} already in use, reusing instance.`);
            } else {
                console.warn('Bridge server error:', err.message);
            }
        });
    } catch (e) {
        console.warn('Failed to start bridge server:', e);
    }
}

class FAntigravityViewProvider {
    constructor(extensionUri) {
        this._extensionUri = extensionUri;
        this._view = null;
    }

    resolveWebviewView(webviewView) {
        this._view = webviewView;

        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this._extensionUri]
        };

        const config = getExtensionConfig();
        activeConfig = { ...config, version: Date.now() };
        webviewView.webview.html = getSidebarHtml(webviewView.webview, this._extensionUri, config);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            if (data.command === 'saveConfig') {
                const newCfg = data.config;
                activeConfig = { ...newCfg, version: Date.now() };
                isSavingFromWebview = true;
                await saveExtensionConfig(newCfg);
                setTimeout(() => { isSavingFromWebview = false; }, 800);

                const appRoot = vscode.env.appRoot;

                if (newCfg.enabled) {
                    injectChatStyles(appRoot, newCfg);
                } else {
                    removeChatStyles(appRoot);
                }

                if (data.reload) {
                    await vscode.commands.executeCommand('workbench.action.reloadWindow');
                }
            }
        });
    }

    refresh() {
        if (this._view) {
            const config = getExtensionConfig();
            this._view.webview.html = getSidebarHtml(this._view.webview, this._extensionUri, config);
        }
    }
}

/**
 * Extension entrypoint
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
    const appRoot = vscode.env.appRoot;

    activeConfig = { ...getExtensionConfig(), version: Date.now() };
    startBridgeServer();

    context.subscriptions.push({
        dispose: () => {
            if (bridgeServer) {
                try { bridgeServer.close(); } catch (_) {}
                bridgeServer = null;
            }
        }
    });

    // 1. Register Webview Provider for Left Activity Bar Sidebar
    sidebarProvider = new FAntigravityViewProvider(context.extensionUri);
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'fantigravity.chatSettingsView',
            sidebarProvider,
            { webviewOptions: { retainContextWhenHidden: true } }
        )
    );

    // Initial check & auto-apply
    const currentConfig = getExtensionConfig();
    const isApplied = isPatchApplied(appRoot);

    if (currentConfig.enabled && !isApplied) {
        injectChatStyles(appRoot, currentConfig);
    }

    // 2. Register Commands
    const openPanelCmd = vscode.commands.registerCommand('fantigravity.chat.openPanel', async () => {
        await vscode.commands.executeCommand('fantigravity.chatSettingsView.focus');
    });

    const enableCmd = vscode.commands.registerCommand(COMMANDS.ENABLE, async () => {
        const cfg = getExtensionConfig();
        cfg.enabled = true;
        activeConfig = { ...cfg, version: Date.now() };
        await vscode.workspace.getConfiguration(CONFIG_SECTION).update('enabled', true, vscode.ConfigurationTarget.Global);
        injectChatStyles(appRoot, cfg);
        if (sidebarProvider) sidebarProvider.refresh();
        await vscode.commands.executeCommand('workbench.action.reloadWindow');
    });

    const disableCmd = vscode.commands.registerCommand(COMMANDS.DISABLE, async () => {
        const cfg = getExtensionConfig();
        cfg.enabled = false;
        activeConfig = { ...cfg, version: Date.now() };
        await vscode.workspace.getConfiguration(CONFIG_SECTION).update('enabled', false, vscode.ConfigurationTarget.Global);
        removeChatStyles(appRoot);
        if (sidebarProvider) sidebarProvider.refresh();
        await vscode.commands.executeCommand('workbench.action.reloadWindow');
    });

    const toggleCmd = vscode.commands.registerCommand(COMMANDS.TOGGLE, async () => {
        await vscode.commands.executeCommand('fantigravity.chatSettingsView.focus');
    });

    const insertAtCmd = vscode.commands.registerCommand(COMMANDS.INSERT_AT, async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editor.selections.forEach(sel => {
                    editBuilder.replace(sel, '@');
                });
            });
        }
    });

    context.subscriptions.push(
        openPanelCmd,
        enableCmd,
        disableCmd,
        toggleCmd,
        insertAtCmd
    );

    // 3. Listen to configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(async (e) => {
            if (e.affectsConfiguration(CONFIG_SECTION)) {
                if (isSavingFromWebview) {
                    return; // Prevent focus loss when typing in custom font box
                }
                const newCfg = getExtensionConfig();
                activeConfig = { ...newCfg, version: Date.now() };
                if (newCfg.enabled) {
                    injectChatStyles(appRoot, newCfg);
                } else {
                    removeChatStyles(appRoot);
                }
                if (sidebarProvider) sidebarProvider.refresh();
            }
        })
    );
}

/**
 * Extension deactivation
 */
export function deactivate() {
    if (bridgeServer) {
        try { bridgeServer.close(); } catch (_) {}
        bridgeServer = null;
    }
}
