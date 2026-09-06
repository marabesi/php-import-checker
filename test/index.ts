//
// PLEASE DO NOT MODIFY / DELETE UNLESS YOU KNOW WHAT YOU ARE DOING
//
// This file is providing the test runner to use when running extension tests.
// By default the test runner in use is Mocha based.
//
// You can provide your own test runner if you want to override it by exporting
// a function run(testRoot: string, clb: (error:Error) => void) that the extension
// host can call to run the tests. The test runner is expected to use console.log
// to report the results back to the caller. When the tests are finished, return
// a possible error to the callback or null if none.

const Mocha = require('mocha');
const fs = require('fs');
import { Dirent } from 'fs';
const path = require('path');

export function run(testRoot: string, callback: (error?: Error) => void): void {
    const mocha = new Mocha({ ui: 'tdd', color: true });
    const findTestFiles = (directory: string): string[] => fs.readdirSync(directory, { withFileTypes: true })
        .flatMap((entry: Dirent) => entry.isDirectory()
            ? findTestFiles(path.resolve(directory, entry.name))
            : entry.name.endsWith('.test.js')
                ? [path.resolve(directory, entry.name)]
                : []);
    const testFiles = findTestFiles(__dirname);

    testFiles.forEach((file: string) => mocha.addFile(file));
    mocha.run((failures: number) => callback(failures ? new Error(`${failures} test(s) failed`) : undefined));
}

module.exports = { run };
