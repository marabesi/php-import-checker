<?php

/**
 * should not highlight ClassB, as the class is used inside an arrow function,
 * but ClassA and ClassC should be highlighted.
 */

namespace Test\Treta;

use Foo\Bar\{
    ClassA, 
    ClassB, 
    ClassC
};

class RandomClass {

    private $a = [1, 2, 3];

    public function test() {
        array_map(fn($a) => [new ClassB()], $this->a);
    }
}

(new RandomClass())->test();