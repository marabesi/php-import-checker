## Changelog

### 0.10.0

- Enables web extension

### 0.9.1

- Security fixes via dependabot

### 0.9.0

- Defaults to the new extractor, fixing a few cases related to group declaration [#16](https://github.com/marabesi/php-import-checker/issues/16)

### 0.8.5

- Security fixes via dependabot

### 0.8.4

- Security fixes via dependabot

### 0.8.3

- Security fixes via dependabot

### 0.8.2

- Adds `ignore_comments` to ignore imports inside comments

### 0.8.1

- Removed duplicated code on matching unused imports
- Added new test case for next version extractor

### 0.8.0

- Fix the missing type `PhpImportConfiguration`
- Feature flag for the next generation of the import checker

### 0.7.0

- Minor improvements on the npm commands and test cases

### 0.6.5

- Redeploy version 0.5.0 (stable) after issues found in all versions under 0.6.* [#303](https://github.com/marabesi/php-import-checker/issues/303) . It turns out that the approach of using a real parser has way more edge cases and uncovered use cases for this extension.

### 0.6.4

- Fix for highlight when using classes in throw expression
- Fix for highlight when using classes in catch expression
- Fix walking the source code tree

### 0.6.3

- Fix highlight when imported class is used with the keyword **extends**.
- Fix highlight when imported class is used with the keyword **implements**.
- Fix highlight when imported class is used with the keyword **trait**.

### 0.6.2

- Redeploy version 0.5.0 (stable) after issues found in the version 0.6.0 and 0.6.1 [#303](https://github.com/marabesi/php-import-checker/issues/303)

### 0.6.1

- Fix issue with classes being used inside closures

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
