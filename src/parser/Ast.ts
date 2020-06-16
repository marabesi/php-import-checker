import { Node, Block } from 'php-parser';
import { Walker } from '../types/Walker';
import { PhpUseItem, PhpClassMethod, PhpExpression, PhpTypes } from '../types/Nodes';

export function walker(nodes: Block): Walker {
    const methods: PhpClassMethod[] = [];
    const namespaces: PhpUseItem[] = [];
    const expressions: PhpExpression[] = [];

    function walk(nodes: any) {
        if (nodes.kind === PhpTypes.PHP_EXPRESSION) {
            expressions.push(nodes);
        }

        if (nodes.kind === PhpTypes.PHP_METHOD && nodes.body) {
            nodes.body.children.forEach((node: Node) => walk(node))
        }

        if (nodes && nodes.kind === PhpTypes.PHP_USE) {
            namespaces.push(nodes);
        }

        if (nodes.body && (nodes.kind === PhpTypes.PHP_CLASS || nodes.kind === PhpTypes.PHP_TRAIT)) {
            methods.push(nodes.body);
            nodes.body.forEach((node: Node) => walk(node))
        }

        if (nodes.kind === PhpTypes.PHP_INTERFACE) {
            methods.push(nodes.body);
        }

        if (nodes.children) {
            nodes.children.forEach((node: Node) => walk(node));
        }
    }

    walk(nodes);

    return {
        methods,
        namespaces,
        expressions,
    }
}