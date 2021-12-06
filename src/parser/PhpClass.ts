import { flatMap, pull } from 'lodash';
import { Identifier } from 'php-parser';
import { PhpClasses } from '../types/Nodes';

export class PhpClass {

    constructor(private useTree: any) { }

    normalizeClasses(): string[] {
        const classFeatures: Identifier[] = [
            ...this.extractExtends(),
            ...this.extractImplements(),
            ...this.extractTraitUse(),
        ];

        const inheritance: string[] = classFeatures
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

    private extractImplements(): Identifier[] {
        const extended = this.useTree.map((phpClass: PhpClasses): Identifier[] => {
            if (phpClass.implements) {
                return phpClass.implements;
            }
            return [];
        })

        return flatMap(extended);
    }

    private extractTraitUse(): Identifier[] {
        if (this.useTree && this.useTree.length > 0) {
            const traits = this.useTree.map((children: any): Identifier[] => {
                if (children) {
                    return children.body.filter((bodyItem: any) => bodyItem.kind === 'traituse');
                }
                return []
            })
            .filter((usedTraits: Identifier[]) => usedTraits.length > 0)
            .map((traitUse: Identifier[]): Identifier[] => {
                const pullTraits: Identifier[] = [];
                traitUse.forEach((trait: any) => {
                    trait.traits.forEach((traitName: any) => {
                        pullTraits.push(traitName);
                    })
                })
                return pullTraits;
            })

            return flatMap(traits);
        }
        return []
    }
}