<?php

use WorkingClass1;
use WorkingClass2;
use WorkingClass3;
use WorkingClass4;
use WorkingClass5;
use WorkingClass6;
use WorkingClass7;

use BrokenClass1;
use BrokenClass2;
use BrokenClass3;
use BrokenClass4;
use BrokenClass5;
use BrokenClass6;

class FooBar implements WorkingClass1 {
    use WorkingClass2;

    public function foobarMethod(WorkingClass6 $param): WorkingClass7
    {
        WorkingClass3::foobar();
        $foobar = WorkingClass4::foobar;
        $foobar = new WorkingClass5;

        (new BrokenClass1())->foo();
        $foobar = BrokenClass2::foobar();
        foobar(BrokenClass3::class);
        $foobar = [
            'foobar' => new BrokenClass4(),
        ];
        if(BrokenClass5::foobar) {
            doCallback(function(BrokenClass6 $param) {});
        }
    }
}