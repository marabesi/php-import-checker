import * as assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { dataProvider } from '../dataProvider';
import * as myExtension from '../../src/extension';

const testFolderLocation = '/../../../test/examples/'

suite('php-import-checker extension behavior', () => {

    [
        ...dataProvider,
    ].forEach((testCase) => {
        test('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, async () => {
            const uri = vscode.Uri.file(
                path.join(__dirname + testFolderLocation + testCase.snippet)
            );

            const document = await vscode.workspace.openTextDocument(uri);
            const editor = await vscode.window.showTextDocument(document);

            const found = myExtension.findMatch(editor, editor.document.getText());

            assert.equal(testCase.unused, found.length);
        });
    });
});