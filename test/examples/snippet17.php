<?php

/**
 * invalid php syntax, it should not highlight as the
 * parser will throw an exception
 */

namespace MyModule;

use Test\Treta\D;

class Bssss
{
    public function exec() {
        D::;
    }
}