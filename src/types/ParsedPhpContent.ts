import { Namespace } from '../parser/Namespace';
import { Method } from '../parser/Method';
import { Expression } from '../parser/Expression';
import { PhpClass } from '../parser/PhpClass';

export interface ParsedPhpContent {
    namespaces: Namespace;
    classes: PhpClass;
    methods: Method;
    expressions: Expression
};