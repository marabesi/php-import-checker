# php-import-checker

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6369463772924ee984769c9eddde0cf4)](https://www.codacy.com/app/matheus-marabesi/php-import-checker?utm_source=github.com&utm_medium=referral&utm_content=marabesi/php-import-checker&utm_campaign=badger)
[![Build Status](https://travis-ci.org/marabesi/php-import-checker.svg?branch=master)](https://travis-ci.org/marabesi/php-import-checker)
[![HitCount](http://hits.dwyl.io/marabesi/php-import-checker.svg)](http://hits.dwyl.io/marabesi/php-import-checker)

php-import-checker helps you know when a given class is imported but not used, providing a easy way to keep your code clean and organized.

## Features

- Highlight every unused class that is imported with `use`

For example if there is an image subfolder under your extension project workspace:

![High light unused imports](demo.gif)

## Requirements

Visual Code 1.14 +

## Changelog

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
