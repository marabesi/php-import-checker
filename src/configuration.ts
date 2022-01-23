'use strict';

import { window, TextEditorDecorationType } from 'vscode';
const hexRgb = require('hex-rgb');

export const unusedNamespaceDecorationType = window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255,0,0, 0.5)',
    light: {
        borderColor: 'darkblue'
    },
    dark: {
        borderColor: 'lightblue'
    }
});

export type PhpImportCheckerConfiguration = {
    color?: string;
    use_next_version?: Boolean;
    ignore_comments?: Boolean;
}

export function setupConfiguration(configuration: PhpImportCheckerConfiguration): TextEditorDecorationType {
    if (configuration && configuration.color) {
        try {
            const color = configuration.color;

            const currentColor = hexRgb(color);

            const newColor = `rgba(${currentColor.red}, ${currentColor.green}, ${currentColor.blue}, 0.5)`;

            console.log('new color highlight: ', newColor);

            return window.createTextEditorDecorationType({
                backgroundColor: newColor,
            });
        } catch (error) {
            console.log(error);
        }
    }

    return unusedNamespaceDecorationType;
}