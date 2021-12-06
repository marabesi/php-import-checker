<?php

/**
 * Should not highlight interface from the same namespace if implements
 * the interface.
 */

namespace Modules\Api\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\AnotherInterface;

class Step implements Model, AnotherInterface
{
}