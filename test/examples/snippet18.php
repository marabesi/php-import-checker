<?php

/**
 * should not highlight interfaces as well that uses import statements
 * and the class is being used in the method signature.
 */

namespace Modules\Api\Services\Hydrator;

use Illuminate\Support\Collection;

interface HydratorInterface
{
    public function hydrate(Collection $collection);
}
