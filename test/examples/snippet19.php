<?php

/**
 * should highlight as there is no imported class being used.
 */

namespace Modules\Api\Services\Hydrator;

use Illuminate\Support\Collection;

interface HydratorInterface
{
    public function hydrate($collection);
}
