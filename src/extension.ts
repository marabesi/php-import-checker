'use strict';

import * as vscode from 'vscode';

let context = 0;

let normalDecoration = vscode.window.createTextEditorDecorationType(<vscode.DecorationRenderOptions> {
    textDecoration: 'none; opacity: 1',
});

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            return;
        }

        triggerUpdateDecorations();

        var timeout = null;
        function triggerUpdateDecorations() {
            if (timeout) {
                clearTimeout(timeout);
            }

            timeout = setTimeout(updateDecorations, 500);
        }

        const unusedNamespaceDecorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255,0,0, 0.5)',
            light: {
                borderColor: 'darkblue'
            },
            dark: {
                borderColor: 'lightblue'
            }
        });

        function updateDecorations() {
            if (!editor) {
                return;
            }

            resetAllDecorations();

            const regEx = /use (.*);/g;

            const classRegEx = /\s*class [a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]* .*/g;

            let line = 0;
            for (; line <= editor.document.lineCount; line++) {
                let tl = editor.document.lineAt(line);
                let match = classRegEx.exec(tl.text);
                if (match) {
                    break;
                }
            }

            const preclass_text = editor.document.getText(new vscode.Range(
                new vscode.Position(0, 0),
                new vscode.Position(line, 0)
            ));

            const text = editor.document.getText(new vscode.Range(
                new vscode.Position(line, 0),
                new vscode.Position(editor.document.lineCount, 0)
            ));

            let smallNumbers: vscode.DecorationOptions[] = [];

            let match;

            while (match = regEx.exec(preclass_text)) {
                let splitNameSpace = match[1].split('\\');
                let className = splitNameSpace[splitNameSpace.length - 1];
                
                let found = (text.match(new RegExp(className, 'g')) || []).length;

                const startPos = editor.document.positionAt(match.index);
                const endPos = editor.document.positionAt(match.index + match[0].length);
                const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Unused class' };

                if (match[0].length && found < 2) {
                    smallNumbers.push(decoration);
                } else {
                    highlightSelections(editor, [new vscode.Range(startPos, endPos)]);
                }
            }

            editor.setDecorations(unusedNamespaceDecorationType, smallNumbers);
        }
    });

    context.subscriptions.push(disposable);
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
    if (!normalDecoration) return;

    let ranges: vscode.Range[] = [];

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

    editor.setDecorations(normalDecoration, ranges);
}

export function deactivate() {
    resetAllDecorations();
}
