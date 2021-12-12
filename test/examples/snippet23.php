<?php

/**
 * Should highlight the 3 unused classes in a grouped namespace.
 */

namespace Test\Treta {
    class D {
        public static function mac() {
            echo "D\n";
        }
    }
}


namespace MyModule {

use Test\Treta\A;
use Test\Treta\D;
use Test\Treta\C;

    class Bssss
    {
    }
};
