import { Class, Node } from 'php-parser';

export interface Walker {
    classes: Class[];
    methods: Node[];
    namespaces: Node[];
    expressions: Node[];
}