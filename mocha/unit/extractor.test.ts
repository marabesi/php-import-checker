const fs = require('fs');
import * as assert from 'assert';
import * as path from 'path';
import { dataProvider } from '../../test/dataProvider';
import { extractUnusedImports } from '../../src/core';

const testFolderLocation = '/../../test/examples/'

describe('extract unused', () => {

    dataProvider.forEach((testCase) => {
        it('Should identify when there is no used class in a text, snippet:::' + testCase.snippet, async () => {
            var phpFile = fs.readFileSync(
                path.join(__dirname + testFolderLocation + testCase.snippet)
            );

            const foundUnused = extractUnusedImports(phpFile);

            assert.equal(testCase.unused, foundUnused.length);
        });
    });
});

