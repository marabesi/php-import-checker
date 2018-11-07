<?php

/**
 * Should highlight the class D, as this is imported and is not used.
 *
 * Though, previous version of this ext was making a false positive due variable
 * names that match the class name. Which in this case the variable $D is
 * compatible with the class name D.
 */

namespace MyModule;

use Test\Treta\D;

class Bssss
{
    public function __construct($D) {}
}
