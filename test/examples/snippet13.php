<?php

/**
 * Should highlight the class TestClass as it is not being used by php code,
 * also as the class usage is commented the extension should hightlight.
 * 
 * Previous version of this extension would not highlight the class, as it was
 * using a regex, it was not possible to analyze the code properly as
 * pointed out in this issue https://github.com/marabesi/php-import-checker/issues/10
 */

use TestClass;

class Yolo {
    /** TestClass; **/
} 