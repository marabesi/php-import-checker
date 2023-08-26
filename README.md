# php-import-checker

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/219306c872394844a218ea3918042035)](https://www.codacy.com/gh/marabesi/php-import-checker/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marabesi/php-import-checker&amp;utm_campaign=Badge_Grade)
[![Build status](https://github.com/marabesi/php-import-checker/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marabesi/php-import-checker/actions/workflows/nodejs.yml)
[![Coverage Status](https://coveralls.io/repos/github/marabesi/php-import-checker/badge.svg?branch=)](https://coveralls.io/github/marabesi/php-import-checker?branch=) <a href="https://www.buymeacoffee.com/marabesi" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;"></a>

php-import-checker helps you know when a given class is imported but not used, providing a easy way to keep your code clean and organized.

- [OpenVSX](https://open-vsx.org/extension/marabesi/php-import-checker)
- [Microsoft marketplace](https://marketplace.visualstudio.com/items?itemName=marabesi.php-import-checker)

## Features

- Highlight every unused class that is imported with `use`
- Change the color to fit your theme
- opt-in for latest changes and give feedback

## Settings

The settings described in this section go under the json option `php.import.highlight`,
a basic configuration that would change the highlight color, would be something
like:

```json
"php.import.highlight": {
  "color": "#EDF791",
  "use_next_version": false
  "ignore_comments": true
}
```

|Option|Type|Description|
|------|----|-----------|
|color|String| Uses the RGB color defined in this option to highlight the unused imports - helpful to match the color with your preferred theme.|
|use_next_version|Boolean| Opt-in to the latest changes to the extension without breaking current behavior. Note: if you are using this option and find anything wrong, please open an issue.|
|ignore_comments|Boolean|If set to true, does not take into account commented code - this option only works if **use_next_version** is set to true|

## Requirements

Visual Code 1.6 +

## Demos

- Manually invoke the extension checker

![Highlight unused imports](demo.gif)

- Change the color to the one you want to

![Change highlight color](demo-color.gif)

## Publications

- [PHP import checker - VScode extension to support PHP developers](https://marabesi.com/php/2020/04/05/php-import-checker-vscode-extension.html)
