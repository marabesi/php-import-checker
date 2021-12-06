import { flatMap } from 'lodash';
import { Identifier } from 'php-parser';
import { PhpClasses } from '../types/Nodes';

export class PhpClass {

    constructor(private useTree: any) { }

    normalizeClasses(): string[] {
        const inheritance: string[] = this.extractExtends()
            .map((item: Identifier) => item ? item.name : '')
            .filter((item: string) => item !== '')

        return inheritance;
    }

    private extractExtends(): Identifier[] {
        const extended = this.useTree.map((phpClass: PhpClasses): Identifier[] => {
            if (phpClass.extends) {
                return [phpClass.extends];
            }
            return [];
        })

        return flatMap(extended);
    }
}