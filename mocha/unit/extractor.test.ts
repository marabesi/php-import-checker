const fs = require('fs');
import sinon from 'sinon';
import * as assert from 'assert';
import * as path from 'path';
import { dataProvider, invalidPhpSyntaxDataProvider } from '../../test/dataProvider';
import { extractUnusedImports } from '../../src/core';

const testFolderLocation = '/../../test/examples/'

describe('extract unused', () => {
    let originalConsole: any
    let consoleStub = () => {}

    beforeEach(() => {
        originalConsole = console.error;
        console.error = consoleStub
    })

    afterEach(() => {
        console.error = originalConsole
    })

    dataProvider.forEach((testCase) => {
        it('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, async () => {
            var phpFile = fs.readFileSync(
                path.join(__dirname + testFolderLocation + testCase.snippet)
            );

            const foundUnused = extractUnusedImports(phpFile);

            assert.equal(foundUnused.length, testCase.unused);
        });
    });

    invalidPhpSyntaxDataProvider.forEach((testCase) => {
        it('Should identify when there is syntax error, snippet:::' + testCase.snippet, async () => {
            const spy = sinon.spy(console, 'error');
            var phpFile = fs.readFileSync(
                path.join(__dirname + testFolderLocation + testCase.snippet)
            );

            extractUnusedImports(phpFile);

            sinon.assert.calledOnce(spy);
        });
    });
});

