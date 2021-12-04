# php-import-checker

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/219306c872394844a218ea3918042035)](https://www.codacy.com/gh/marabesi/php-import-checker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/php-import-checker&amp;utm_campaign=Badge_Grade)
[![Build status](https://github.com/marabesi/php-import-checker/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marabesi/php-import-checker/actions/workflows/nodejs.yml)
[![ Vscode installs](https://vsmarketplacebadge.apphb.com/installs-short/marabesi.php-import-checker.svg)](https://vsmarketplacebadge.apphb.com/installs-short/marabesi.php-import-checker.svg)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/php-import-checker/badge.svg?branch=)](https://coveralls.io/github/marabesi/php-import-checker?branch=)

php-import-checker helps you know when a given class is imported but not used, providing a easy way to keep your code clean and organized.

## Features

- Highlight every unused class that is imported with `use`

For example if there is an image subfolder under your extension project workspace:

![Highlight unused imports](demo.gif)

- Change the color to the one you want to

![Change highlight color](demo-color.gif)

<a href="https://www.buymeacoffee.com/marabesi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;"></a>

## Known Issues

- If the imported class with `use` is inside a comment block, the extension is
not going to highlight as a unused class. ([#10](https://github.com/marabesi/php-import-checker/issues/10))

## Requirements

Visual Code 1.14 +

## Changelog

### 0.6.0

- Security fixes (via dependabot)
- Extension rewrite to use [php-parser](https://www.npmjs.com/package/php-parser) instead of regex

### 0.5.0

- Updated project dependencies (npm audit fixes)

### 0.4.0

- Updated project dependencies

### 0.3.0

- Support added to "use const" statement ([#18](https://github.com/marabesi/php-import-checker/pull/18))

### 0.2.9

- Support added to "use function" statement ([#15](https://github.com/marabesi/php-import-checker/issues/15))

### 0.2.8

- Change regex to only match "use" at the start of a line ([#12](https://github.com/marabesi/php-import-checker/issues/12))
- Fix: wrong hightlight when using Trait ([#12](https://github.com/marabesi/php-import-checker/issues/12))
- Fix: typo in the configuration property ([#c0f65f9](https://github.com/marabesi/php-import-checker/commit/c0f65f987aee7473911db341862b3515828e0588))

### 0.2.7

- Feature to change the highlight color based on the user configuration file
(`php.import.highlight`)

### 0.1.7

- Fix highlight on/off when there is only one `use` statement. Previously
for this to work the user would have to change the tab

### 0.1.6

- Automatically run the ext when change the active file or opening it in the editor

### 0.1.5

- The extension add and removes the highlight from a file once the imported class is used in the code ([#9](https://github.com/marabesi/php-import-checker/issues/9)). Previously the user would have to close the file and open again so the extension would highlight the correct imports.

### 0.1.4

- Trigger import check after saving files ([#8](https://github.com/marabesi/php-import-checker/pull/8))

### 0.1.3

- Alias detection implemented ([#4](https://github.com/marabesi/php-import-checker/pull/4))

### 0.0.3

- Changed the project icon

### 0.0.2

- Added better support with a demo gif in the README

### 0.0.1

- Ability to see unused imports in the PHP class
