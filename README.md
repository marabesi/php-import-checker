# php-import-checker

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6369463772924ee984769c9eddde0cf4)](https://www.codacy.com/app/matheus-marabesi/php-import-checker?utm_source=github.com&utm_medium=referral&utm_content=marabesi/php-import-checker&utm_campaign=badger)

php-import-checker helps you know when a given class is imported but not used, providing a easy way to keep your code clean and organized.

## Features

- Highlight every unused class that is imported with `use`

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

Visual Code 1.14 +

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

- Ability to see unused imports in the PHP class
