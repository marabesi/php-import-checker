import { PhpUseItem } from './types/Nodes';
import { ParsedPhpContent } from './types/ParsedPhpContent';
import { Builder } from './parser/Builder';

export function extractUnusedImports(sourceCode: string): PhpUseItem[] {
    const unused: PhpUseItem[] = [];
    try {
        const parsedContent : ParsedPhpContent = new Builder(sourceCode).build()

        const unusedImports: string[] = [
            ...parsedContent.expressions.normalizeExpressions(),
            ...parsedContent.methods.normalizeReturnTypes(),
            ...parsedContent.methods.normalizeMethodArgumentList(),
            ...parsedContent.methods.normalizeMethodCalls(),
            ...parsedContent.methods.normalizeCallInsideMethods(),
        ];

        const useStatements = parsedContent.namespaces.normalizeUseStatements();

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