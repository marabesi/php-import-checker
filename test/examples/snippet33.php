<?php

/**
 * Should highlight interface from the same namespace if it
 * implements one of the interface.
 */

namespace Modules\Api\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\AnotherInterface;

class Step implements AnotherInterface
{
}