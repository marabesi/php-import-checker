import { flatMap } from 'lodash';
import { PhpUseItem, PhpClasses } from '../types/Nodes';

export class PhpClass {

    constructor(private useTree: any) { }

    normalizeClasses(): string[] {
        const inheritance = this.useTree.map((phpClass: PhpClasses) => {
            if (phpClass.extends) {
                return phpClass.extends;
            }
            return false;
        }).filter((item: PhpClasses | Boolean) => item !== false)
        .map((item: PhpClasses) => item ? item.name : false)
        .filter((item: PhpClasses | Boolean) => item !== false)

        return inheritance;
    }
}