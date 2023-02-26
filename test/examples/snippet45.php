<?php

namespace App\Services\Project;

use App\Models\Bar1;
use App\Models\Bar2;
use App\Models\Bar3;

class Foo
{
    public function __construct(?Bar2 $bar = null)
    {
        return json_encode(value: '', flags: 0);
    }
}
