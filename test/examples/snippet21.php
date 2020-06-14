<?php

namespace Services;

use MyClass;

trait ObjectToArray
{

    public function checkJsonDecode($data)
    {
        if (is_object($data)) {
            return json_decode($data, true);
        }

        return $data;
    }
}
