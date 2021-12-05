<?php

/**
 * Should highlight three classes, as just one is being used. Therefore,
 * this code will not work, as you must use a namespace to use the keyword `use`.
 * 
 * The extension will assume this as valid code and highlight it as such.
 */

use App;
use Test\Treta\D;
use Test\Treta\C;
use Maromba\Maaaa;

$app = new App();