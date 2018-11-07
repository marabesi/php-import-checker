<?php

/**
 * Should not highlight the App class as this is being used, and is the
 * only use statement in the file.
 */

namespace MyModule;

use App;

class Bssss
{
    public function __construct(App $f) {}
}
