<?php

namespace App\Helpers;

use Carbon\Carbon\Teste;
use Carbon\Carbon\Other;

class FormHelpers
{
    public static function dateToString(Carbon $date = null, $format, $emptyValue = '')
    {
        if (is_null($date)) {
            return $emptyValue;
        }

        return $date->format($format);
    }
}