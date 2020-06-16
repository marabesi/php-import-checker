import { Namespace } from '../parser/Namespace';
import { Method } from '../parser/Method';
import { Expression } from '../parser/Expression';

export interface ParsedPhpContent {
    namespaces: Namespace;
    methods: Method;
    expressions: Expression
};