'use strict';

import { window, workspace, TextEditorDecorationType } from 'vscode';
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

export function setupConfiguration(): TextEditorDecorationType {
    const conf: any = workspace.getConfiguration().get('php.import.highlight');

    if (conf && conf.color) {
        try {
            const color = conf.color;

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