<?php

/**
 * Should not highlight as the imported class is being used with the keyword
 * implements.
 */

namespace Modules\Api\Models;

use Illuminate\Database\Eloquent\Model;

class Step implements Model
{
}