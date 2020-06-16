import { walker } from './ast';
import engine from 'php-parser';
import { PhpUseItem } from './types/Nodes';
import { Method } from './parser/Method';
import { Expression } from './parser/Expression';
import { Namespace } from './parser/Namespace';

const parser = new engine({
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

export function extractUnusedImports(sourceCode: string): PhpUseItem[] {
    const unused: PhpUseItem[] = [];

    try {
        const parsedContent = parser.parseCode(sourceCode);

        const { methods, namespaces, expressions } = walker(parsedContent);

        const namespaceAnalyzer = new Namespace(namespaces);
        const methodAnalyzer = new Method(methods);
        const expressionAnalyzer = new Expression(expressions);

        const unusedImports: string[] = [
            ...expressionAnalyzer.normalizeExpressions(),
            ...methodAnalyzer.normalizeReturnTypes(),
            ...methodAnalyzer.normalizeMethodArgumentList(),
            ...methodAnalyzer.normalizeMethodCalls(),
            ...methodAnalyzer.normalizeCallInsideMethods(),
        ];

        const useStatements = namespaceAnalyzer.normalizeUseStatements();

        for (const useStatement of useStatements) {
            const classNameAndNamespace = useStatement.name.split('\\');
            const className = classNameAndNamespace[classNameAndNamespace.length - 1];

            if (!unusedImports.includes(className)) {
                unused.push(useStatement);
            }
        }
    } catch (error) {
        console.error(error);
    }

    return unused;
}