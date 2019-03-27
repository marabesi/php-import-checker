<?php

use function json_encode;

use const JSON_UNESCAPED_SLASHES;
use const PHP_VERSION;

class Test
{
    public function foo()
    {
        return json_encode('', JSON_UNESCAPED_SLASHES);
    }
}
