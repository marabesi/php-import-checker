<?php

/**
 * should not highlight if trait is being used by the class.
 */

namespace Test\Examples {
    trait AnotherTrait
    {}
};

namespace Modules\Api\Models {
    use Test\Examples\AnotherTrait;
    
    class Step 
    {
        use AnotherTrait;
    }
}
