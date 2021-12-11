import { flatMap } from 'lodash';
import { PhpUseItem } from './types/Nodes';

export class Namespace {

    constructor(private useTree: any) { }

    normalizeUseStatements(): PhpUseItem[] {
        const namespace = flatMap(
          this.useTree
            .map((item: any) => item.children))
            .filter((item: any) => item && item.kind === 'usegroup');

        const extractUseItems: any[] = flatMap(
            namespace.map((usegroup: any) => usegroup.items)
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