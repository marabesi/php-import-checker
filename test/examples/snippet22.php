<?php

/**
 * Static call to imported class D in a grouped namespace, as it is being used
 * it should not highlight any use statement.
 */

namespace Test\Treta {
    class D {
        public static function mac() {
            echo "D\n";
        }
    }
}


namespace MyModule {

use Test\Treta\D;

class Bssss
{
    public function exec() {
        D::mac();
    }
}
};
