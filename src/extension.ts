'use strict';

import * as vscode from 'vscode';

let context = 0;

// keeps all the unused classes to highlight
let ranges: vscode.Range[] = [];

const unusedNamespaceDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255,0,0, 0.5)',
    light: {
        borderColor: 'darkblue'
    },
    dark: {
        borderColor: 'lightblue'
    }
});

export function activate(context: vscode.ExtensionContext) {
    console.log('php-import-checker" is now active!');

    vscode.workspace.onDidSaveTextDocument(callback => {
        if (callback.languageId == 'php') {
            generateHighlighting();
        }
    });

    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        generateHighlighting();
    });

    context.subscriptions.push(disposable);
}

function generateHighlighting() {
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    let timeout: any = null;
    function triggerUpdateDecorations() {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(updateDecorations, 500);
    }

    triggerUpdateDecorations();

    function updateDecorations() {
        if (!editor) {
            return;
        }

        // clean up the found matches
        ranges = [];

        const regEx = /use (.*);/g;
        const text = editor.document.getText();
        let match = regEx.exec(text);

        while (match = regEx.exec(text)) {
            let splitNameSpace = match[1].split('\\');
            let className = splitNameSpace[splitNameSpace.length - 1];

            if (className.search(/ as /) > -1 ) {
                let splitAlias = className.split(' as ');
                className = splitAlias[splitAlias.length - 1].trim();
            }

            let found = (text.match(new RegExp(className, 'g')) || []).length;

            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);

            if (match[0].length && found < 2) {
                highlightSelections(editor, [new vscode.Range(startPos, endPos)]);
            }
        }
    }
}

function resetAllDecorations() {
    vscode.window.visibleTextEditors.forEach(textEditor => {
        resetDecorations(textEditor);
    });
}

function resetDecorations(textEditor: vscode.TextEditor) {
    highlightSelections(textEditor, []);
}

function highlightSelections(editor: vscode.TextEditor, selections: vscode.Range[]) {
    selections.forEach(s => {
        if (context < 0) {
            ranges.push(s);
        } else {
            ranges.push(new vscode.Range(
                new vscode.Position(Math.max(s.start.line - context, 0), 0),
                new vscode.Position(s.end.line + context, Number.MAX_VALUE)
            ));
        }
    });

    editor.setDecorations(unusedNamespaceDecorationType, ranges);
}

export function deactivate() {
    resetAllDecorations();
}
