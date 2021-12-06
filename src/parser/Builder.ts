import { Engine, Program } from 'php-parser';
import { walker } from './Ast';
import { Namespace } from './Namespace';
import { Method } from './Method';
import { Expression } from './Expression';
import { Walker } from '../types/Walker';
import { ParsedPhpContent } from '../types/ParsedPhpContent';
import { PhpClass } from './PhpClass';

const parser = new Engine({
    parser: {
        extractDoc: false,
    },
    ast: {
        withPositions: true
    },
    lexer: {
        comment_tokens: false
    }
});

export class Builder {

    private parsedContent: Program;
    private walker: Walker;

    constructor(private sourceCode: string) {
        this.parsedContent = parser.parseCode(this.sourceCode, '');
        this.walker = walker(this.parsedContent);
    }

    build() : ParsedPhpContent {
        return {
            namespaces: new Namespace(this.walker.namespaces),
            classes: new PhpClass(this.walker.classes),
            methods: new Method(this.walker.methods),
            expressions: new Expression(this.walker.expressions),
        };
    }
}