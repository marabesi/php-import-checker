const fs = require('fs');
const os = require('os');
const path = require('path');
const { downloadAndUnzipVSCode, runTests } = require('vscode-test');

async function run() {
    const downloadedExecutable = await downloadAndUnzipVSCode('1.136.1');
    const currentExecutable = downloadedExecutable.replace(/\/Electron$/, '/Code');
    const vscodeExecutablePath = fs.existsSync(currentExecutable)
        ? currentExecutable
        : downloadedExecutable;
    const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'php-import-checker-vscode-'));

    await runTests({
        vscodeExecutablePath,
        extensionDevelopmentPath: path.resolve(__dirname, '..'),
        extensionTestsPath: path.resolve(__dirname, '../out/test/index.js'),
        launchArgs: [
            '--disable-extensions',
            `--user-data-dir=${userDataDir}`
        ]
    });
}

run().catch((error) => {
    console.error('Failed to run integration tests:', error);
    process.exitCode = 1;
});