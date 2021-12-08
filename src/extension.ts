/**
 * For further reference, this extension was based on the decorator-sample
 * available at https://github.com/Microsoft/vscode-extension-samples/blob/master/decorator-sample/src/extension.ts
 */

'use strict';

import * as vscode from 'vscode';
import { unusedNamespaceDecorationType, setupConfiguration  } from './configuration';
import { extractUnusedImports } from './extractUnusedImports';

let currentDecoration = unusedNamespaceDecorationType;
let ranges: vscode.Range[] = [];

export function activate(context: vscode.ExtensionContext) {
    console.log('php-import-checker" is now active!');

    vscode.window.onDidChangeActiveTextEditor((editor) => {
        generateHighlighting();
    }, null, context.subscriptions);

    vscode.workspace.onDidSaveTextDocument(callback => {
        generateHighlighting();
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeConfiguration(e => {
        currentDecoration = setupConfiguration();
    }, null, context.subscriptions);

    let disposable = vscode.commands.registerCommand('extension.php-import-checker', () => {
        generateHighlighting();
    });

    context.subscriptions.push(disposable);

    currentDecoration = setupConfiguration();
    generateHighlighting();
}

function generateHighlighting() {
    const editor = vscode.window.activeTextEditor;

    if (!editor || editor.document.languageId != 'php') {
        return;
    }

    console.log('Searching unused classes...');

    if (!editor) {
        return;
    }

    ranges = [];

    const text = editor.document.getText();

    resetDecorations(editor);

    findMatch(editor, text);

    highlightSelections(editor);
}

export function findMatch(editor: vscode.TextEditor, text: string): any {
    const matches: any[] = [];
    extractUnusedImports(text).forEach(element => {
        const {match} = element;
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        ranges.push(new vscode.Range(startPos, endPos));
        matches.push(element.match);
    });

    return matches;
}

function resetAllDecorations() {
    vscode.window.visibleTextEditors.forEach(textEditor => {
        resetDecorations(textEditor);
    });
}

function resetDecorations(textEditor: vscode.TextEditor) {
    highlightSelections(textEditor);
}

function highlightSelections(editor: vscode.TextEditor) {
    editor.setDecorations(currentDecoration, ranges);
}

export function deactivate() {
    resetAllDecorations();
}
