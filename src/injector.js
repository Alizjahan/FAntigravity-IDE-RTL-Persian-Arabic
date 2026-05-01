import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    PATCH_MARKER_START,
    PATCH_MARKER_END,
    CSS_FILENAME,
    JS_FILENAME,
    STATE_FILENAME
} from './constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { generateChatStyles } from './style-generator.js';
import { generateRuntimeJs } from './runtime-generator.js';

const WORKBENCH_DIR_CANDIDATES = [
    ['out', 'vs', 'code', 'electron-sandbox', 'workbench'],
    ['out', 'vs', 'code', 'electron-browser', 'workbench'],
    ['out', 'vs', 'workbench']
];

const HTML_PATTERN = /^workbench(?:-[\w-]+)?\.html$/i;
const PATCH_REGEX = new RegExp(`\\r?\\n?[ \\t]*${escapeRegExp(PATCH_MARKER_START)}[\\s\\S]*?${escapeRegExp(PATCH_MARKER_END)}[ \\t]*\\r?\\n?`, 'g');

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Discover all workbench HTML documents in Antigravity IDE / VS Code
 */
export function findWorkbenchTargets(appRoot) {
    if (!appRoot || typeof appRoot !== 'string' || !fs.existsSync(appRoot)) {
        return [];
    }

    const outDir = path.join(appRoot, 'out');
    const targets = [];

    for (const segments of WORKBENCH_DIR_CANDIDATES) {
        const dir = path.join(appRoot, ...segments);
        if (!fs.existsSync(dir)) continue;

        try {
            const entries = fs.readdirSync(dir);
            for (const name of entries) {
                if (!HTML_PATTERN.test(name) || /-dev\.html$/i.test(name)) continue;
                const htmlPath = path.join(dir, name);
                targets.push({
                    name,
                    htmlPath,
                    dir,
                    checksumKey: path.relative(outDir, htmlPath).split(path.sep).join('/')
                });
            }
        } catch (_) {}
    }

    // Sort to keep main workbench first
    targets.sort((a, b) => {
        if (a.name === 'workbench.html') return -1;
        if (b.name === 'workbench.html') return 1;
        return a.name.localeCompare(b.name);
    });

    return targets;
}

/**
 * Check if FAntigravity patch is applied
 */
export function isPatchApplied(appRoot) {
    const targets = findWorkbenchTargets(appRoot);
    if (targets.length === 0) return false;

    for (const target of targets) {
        try {
            const content = fs.readFileSync(target.htmlPath, 'utf8');
            if (content.includes(PATCH_MARKER_START)) return true;
        } catch (_) {}
    }
    return false;
}

/**
 * Remove checksums from product.json so IDE never reports installation corruption
 */
function stripChecksums(appRoot, checksumKeys) {
    try {
        const productPath = path.join(appRoot, 'product.json');
        if (!fs.existsSync(productPath)) return;

        const content = fs.readFileSync(productPath, 'utf8');
        const product = JSON.parse(content);
        if (!product.checksums) return;

        const backupPath = `${productPath}.bak`;
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(productPath, backupPath);
        }

        let changed = false;
        for (const key of checksumKeys) {
            if (product.checksums[key] !== undefined) {
                delete product.checksums[key];
                changed = true;
            }
        }

        if (changed) {
            fs.writeFileSync(productPath, JSON.stringify(product, null, '\t'), 'utf8');
        }
    } catch (_) {}
}

/**
 * Restore product.json checksums from backup
 */
function restoreChecksums(appRoot, checksumKeys) {
    try {
        const productPath = path.join(appRoot, 'product.json');
        const backupPath = `${productPath}.bak`;
        if (!fs.existsSync(backupPath)) return;

        const backup = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
        const current = JSON.parse(fs.readFileSync(productPath, 'utf8'));

        if (backup.checksums && current.checksums) {
            for (const key of checksumKeys) {
                if (backup.checksums[key] !== undefined) {
                    current.checksums[key] = backup.checksums[key];
                }
            }
            fs.writeFileSync(productPath, JSON.stringify(current, null, '\t'), 'utf8');
        }
    } catch (_) {}
}

/**
 * Inject FAntigravity IDE RTL into all workbench documents
 */
export function injectChatStyles(appRoot, config) {
    const targets = findWorkbenchTargets(appRoot);
    if (targets.length === 0) {
        return {
            success: false,
            modifiedCount: 0,
            error: 'Could not find any workbench HTML documents.'
        };
    }

    const cssContent = generateChatStyles(config);
    const jsContent = generateRuntimeJs(config);
    const stateContent = JSON.stringify(config, null, 2);

    const assetDirs = new Set(targets.map(t => t.dir));
    for (const dir of assetDirs) {
        try {
            fs.writeFileSync(path.join(dir, CSS_FILENAME), cssContent, 'utf8');
            fs.writeFileSync(path.join(dir, JS_FILENAME), jsContent, 'utf8');
            fs.writeFileSync(path.join(dir, STATE_FILENAME), stateContent, 'utf8');

            const fontsSrcDir = path.join(__dirname, '..', 'assets', 'fonts');
            const vazirSrc = path.join(fontsSrcDir, 'Vazirmatn-Variable.woff2');
            const dubaiSrc = path.join(fontsSrcDir, 'Dubai-Regular.ttf');
            if (fs.existsSync(vazirSrc)) {
                fs.copyFileSync(vazirSrc, path.join(dir, 'Vazirmatn-Variable.woff2'));
            }
            if (fs.existsSync(dubaiSrc)) {
                fs.copyFileSync(dubaiSrc, path.join(dir, 'Dubai-Regular.ttf'));
            }
        } catch (err) {
            return {
                success: false,
                modifiedCount: 0,
                error: `Failed to write assets in ${dir}: ${err.message}`
            };
        }
    }

    let modifiedCount = 0;
    const patchedKeys = [];

    for (const target of targets) {
        try {
            let html = fs.readFileSync(target.htmlPath, 'utf8');

            // Strip existing patch
            html = html.replace(PATCH_REGEX, '');

            // Ensure backup exists
            const backupPath = `${target.htmlPath}.bak`;
            if (!fs.existsSync(backupPath)) {
                fs.copyFileSync(target.htmlPath, backupPath);
            }

            const injection = `\n\t${PATCH_MARKER_START}\n\t<link rel="stylesheet" href="./${CSS_FILENAME}">\n\t<script src="./${JS_FILENAME}"></script>\n\t${PATCH_MARKER_END}\n`;

            const headClose = html.indexOf('</head>');
            if (headClose !== -1) {
                html = html.substring(0, headClose) + injection + html.substring(headClose);
            } else {
                const htmlClose = html.lastIndexOf('</html>');
                html = htmlClose !== -1
                    ? html.substring(0, htmlClose) + injection + html.substring(htmlClose)
                    : html + injection;
            }

            fs.writeFileSync(target.htmlPath, html, 'utf8');
            patchedKeys.push(target.checksumKey);
            modifiedCount++;
        } catch (err) {
            return {
                success: false,
                modifiedCount,
                error: `Failed to patch ${target.name}: ${err.message}`
            };
        }
    }

    // Strip checksums to guarantee 0 corrupt alerts
    stripChecksums(appRoot, patchedKeys);

    return {
        success: true,
        modifiedCount
    };
}

/**
 * Remove FAntigravity IDE RTL cleanly and restore all original files
 */
export function removeChatStyles(appRoot) {
    const targets = findWorkbenchTargets(appRoot);
    let removedCount = 0;
    const restoredKeys = [];

    for (const target of targets) {
        try {
            if (!fs.existsSync(target.htmlPath)) continue;
            let html = fs.readFileSync(target.htmlPath, 'utf8');

            if (html.includes(PATCH_MARKER_START)) {
                html = html.replace(PATCH_REGEX, '');
                fs.writeFileSync(target.htmlPath, html, 'utf8');
                restoredKeys.push(target.checksumKey);
                removedCount++;
            }

            // Restore from backup if exists
            const backupPath = `${target.htmlPath}.bak`;
            if (fs.existsSync(backupPath)) {
                fs.copyFileSync(backupPath, target.htmlPath);
                fs.unlinkSync(backupPath);
            }
        } catch (_) {}
    }

    // Clean assets
    const assetDirs = new Set(targets.map(t => t.dir));
    for (const dir of assetDirs) {
        for (const file of [CSS_FILENAME, JS_FILENAME, STATE_FILENAME, 'Vazirmatn-Variable.woff2', 'Dubai-Regular.ttf']) {
            const p = path.join(dir, file);
            if (fs.existsSync(p)) {
                try { fs.unlinkSync(p); } catch (_) {}
            }
        }
    }

    restoreChecksums(appRoot, restoredKeys);

    return {
        success: true,
        removedCount
    };
}
