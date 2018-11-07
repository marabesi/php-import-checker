<?php

/**
 * In this example is where the things start to get a bit tricky, as PHP allow
 * alias to imported classes the extension should be aware of them.
 *
 * The following example demonstrates the same class being imported twice
 * but one using an alias.
 *
 * The extension should highlight all the classes, as any of them are in use
 */

namespace MyModule;

use App;
use Test\Treta\D;
use Test\Treta\C;
use Maromba\Maaaa as Find;
use Maromba\Maaaa;

class Bssss
{
}
