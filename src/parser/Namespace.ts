import { flatMap } from 'lodash';
import { PhpUseItem } from '../types/Nodes';

export class Namespace {

    constructor(private useTree: any) { }

    normalizeUseStatements(): PhpUseItem[] {
        const extractUseItems: PhpUseItem[] = flatMap(
            this.useTree.map((usegroup: PhpUseItem) => usegroup.items)
        );

        return extractUseItems
            .map((use: PhpUseItem) => {
                if (use.alias) {
                    use.name = use.alias.name;
                    use.loc = use.alias.loc;
                    return use;
                }
                return use;
            });
    }
}