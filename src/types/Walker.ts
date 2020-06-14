import { Node } from 'php-parser';

export interface Walker {
    methods: Node[];
    namespaces: Node[];
    expressions: Node[];
}