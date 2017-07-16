'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    console.log('php-import-checker" is now active!');

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
            overviewRulerColor: 'blue',
            overviewRulerLane: vscode.OverviewRulerLane.Right,
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

            const regEx = /use (.*);/g;
            const text = editor.document.getText();
            let smallNumbers: vscode.DecorationOptions[] = [];
            let match = regEx.exec(text);
            
            while (match = regEx.exec(text)) {
                let splitNameSpace = match[1].split('\\');
                let className = splitNameSpace[splitNameSpace.length - 1];
                
                let found = (text.match(new RegExp(className, 'g')) || []).length;
                
                if (found >= 2) {
                    continue;
                }

                const startPos = editor.document.positionAt(match.index);
                const endPos = editor.document.positionAt(match.index + match[0].length);
                const decoration = { range: new vscode.Range(startPos, endPos), hoverMessage: 'Unused class' };

                if (match[0].length) {
                    smallNumbers.push(decoration);
                }
            }
            editor.setDecorations(unusedNamespaceDecorationType, smallNumbers);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {
}