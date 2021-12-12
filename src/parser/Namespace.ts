import { flatMap } from 'lodash';
import { Block, Node } from 'php-parser';
import { PhpUseItem } from './types/Nodes';

function walker(nodes: Block): any[] {
    const namespaces: PhpUseItem[] = [];

    function walk(nodes: any) {
        if (nodes && nodes.kind === 'usegroup') {
            namespaces.push(nodes);
        }

        if (nodes.children) {
            nodes.children.forEach((node: Node) => walk(node));
        }

        if (nodes.length) {
            nodes.forEach((node: Node) => walk(node));
        }
    }

    walk(nodes);

    return namespaces;
}

export class Namespace {
    private useTree: any;

    constructor(private ast: any) {
        this.useTree = walker(this.ast);
     }

    normalizeUseStatements(): PhpUseItem[] {
        const extractUseItems: PhpUseItem[] = flatMap(
            this.useTree.map((usegroup: PhpUseItem) => usegroup.items)
        );

        return extractUseItems
            .map((use: PhpUseItem) => {
                if (use.alias) {
                    use.name = `${use.name}\\${use.alias.name}`;
                    use.loc = use.alias.loc;
                    return use;
                }
                return use;
            });
    }
}