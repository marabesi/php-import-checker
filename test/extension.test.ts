import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

const testFolderLocation = '/../../test/examples/'

suite('php-import-checker extension behavior', () => {

    const dataProvider = [
        { snippet: 'snippet1.php', unused: 4 },
        { snippet: 'snippet2.php', unused: 1 },
        { snippet: 'snippet3.php', unused: 0 },
        { snippet: 'snippet4.php', unused: 4 },
    ];

    dataProvider.forEach((testCase) => {
        test('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, async () => {
            const uri = vscode.Uri.file(
                path.join(__dirname + testFolderLocation + testCase.snippet)
            );
    
            const document = await vscode.workspace.openTextDocument(uri);
            const editor = await vscode.window.showTextDocument(document);
            
            const found = myExtension.findMatch(editor, editor.document.getText());
    
            assert.equal(testCase.unused, found.length);
        });
    })
});