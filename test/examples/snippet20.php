<?php

/**
 * abstract class with use statements being used, the extension
 * should not highlight any statement.
 */

namespace Modules;

use Illuminate\Support\Collection;

abstract class HydratorInterface
{
    public abstract function hydrate(Collection $collection);
}
