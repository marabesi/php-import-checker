<?php

/**
 * should highlight 1 out of 3 unused classes under group declaration. 
 */

namespace Test\Treta;

use Foo\Bar\{
    ClassA, 
    ClassB, 
    ClassC
};

class RandomClass {

    public function test() {
        $b = new ClassB();
        $c = new ClassC();
    }
}
