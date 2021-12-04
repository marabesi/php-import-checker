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

Visual Code 1.6 +
