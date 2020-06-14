import { Node, Block } from 'php-parser';
import { Walker } from './types/Walker';

export function walker(nodes: Block): Walker {
    const methods: any = [];
    const namespaces: any = [];
    const expressions: any = [];

    function walk(nodes: any) {
        if (nodes.kind === 'expressionstatement') {
            expressions.push(nodes);
        }

        if (nodes.kind === 'method' && nodes.body) {
            nodes.body.children.forEach((node: Node) => walk(node))
        }

        if (nodes.kind === 'usegroup') {
            namespaces.push(nodes);
        }

        if ((nodes.kind === 'class' || nodes.kind === 'trait') && nodes.body) {
            methods.push(nodes.body);
            nodes.body.forEach((node: Node) => walk(node))
        }

        if (nodes.kind === 'interface') {
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