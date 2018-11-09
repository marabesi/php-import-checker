<?php

/**
 * Should not highlight using return type
 */

namespace App;

use Example;

class Test
{
    public function foo() : Example
    {
         // ...
    }
}
