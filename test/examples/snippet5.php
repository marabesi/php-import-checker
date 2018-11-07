<?php

/**
 * As the snippet4.php, this snippet has a gotcha. The extension should be able
 * to make a distinct check from classes with almos the same name.
 *
 * The class Maaaa (has 4 a's) and the class Maaa (has 3 a's) are different,
 * and the extension should highlight all the classes listed (as none of
 * them are being used).
 *
 * This snippet exists because previous version didn't make that distinction.
 */

namespace MyModule;

use App;
use Test\Treta\D;
use Test\Treta\C;
use Maromba\Maaaa as Find;
use Maromba\Maaa;

class Bssss
{
    public function __construct($f) {}
}
