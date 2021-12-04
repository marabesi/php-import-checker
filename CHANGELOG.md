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