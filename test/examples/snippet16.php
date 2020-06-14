<?php

/**
 * Static call to imported class D, as it is being used
 * it should not hightlight any use statement.
 */

namespace MyModule;

use Test\Treta\D;

class Bssss
{
    public function exec() {
        D::mac();
    }
}