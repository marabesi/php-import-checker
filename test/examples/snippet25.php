<?php

/**
 * should not highlight if the class is used inside callback
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
        return array_map(function($a) {
            return new ClassB();
        }, $this->a);
    }
}
