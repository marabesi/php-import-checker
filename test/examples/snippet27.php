<?php

/**
 * should not highlight if the class is used inside callback and
 * is statically called
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
            ClassA::foo();
            ClassC::bar();
            return new ClassB();
        }, $this->a);
    }
}

(new RandomClass())->test();