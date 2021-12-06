<?php

/**
 * should highlight if trait is not being used by the class.
 */

namespace Test\Examples {
    trait AnotherTrait
    {}
};

namespace Modules\Api\Models {
    use Test\Examples\AnotherTrait;
    
    class Step 
    {
    }
}
