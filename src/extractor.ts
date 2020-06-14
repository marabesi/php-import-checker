import { flatMap } from 'lodash';
import { walker } from './ast';
import engine, { Node } from 'php-parser';

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

export function extractUnusedImports(sourceCode: string) {
    const unused = [];

    try {
        const parsedContent = parser.parseCode(sourceCode);

        const { methods, namespaces, expressions } = walker(parsedContent);

        const extractUseItems: Node[] = flatMap(namespaces.map((usegroup: any) => usegroup.items));

        const normalizeUseStatements = extractUseItems
            .map((use: any) => {
                if (use.alias) {
                    use.name = use.alias.name;
                    use.loc = use.alias.loc;
                    return use;
                }
                return use;
            })

        const extractMethods = flatMap(methods.map((body: any) => body));

        const expressionsCalls = expressions.filter((expression: any) => expression.expression.kind === 'call');
        const expressionsAssigments = expressions.filter((expression: any) => expression.expression.kind === 'assign');

        const argumentsFromMethods = flatMap(extractMethods.map((method: any) => method.arguments));
        const argumentsType = argumentsFromMethods.map(argument => argument ? argument.type : []);

        const unusedImports = argumentsType
            .map(argument => argument ? argument.name : null)
            .filter(argument => argument !== null);

        expressionsCalls.forEach((expression: any) => {
            if (expression && expression.expression && expression.expression.what && expression.expression.what.what) {
                unusedImports.push(expression.expression.what.what.name);
            }
        });

        expressionsAssigments.forEach((expression: any) => {
            if (expression && expression.expression && expression.expression.right) {
                unusedImports.push(expression.expression.right.what.name);
            }
        })

        // search through return type from each method in the class
        const returnTypeFromMethod = extractMethods
            .map((method: any) => method && method.type ? method.type.name : null)
            .filter(returnType => returnType !== null);

        returnTypeFromMethod.forEach(returnType => unusedImports.push(returnType));

        // search through method body - any invokation call that
        // might pass in as an argument 
        const calls = flatMap(extractMethods.map((body: any) => (body && body.body ? body.body.children : [])))
            .filter(invokation => invokation && invokation.expression ? invokation.expression.kind === 'call' : null)
            .filter(invokation => invokation !== null);

        const bodyMethods = flatMap(extractMethods.map((body: any) => (body && body.body ? body.body.children : [])))

        const callInsideMethods = bodyMethods
            .map(item => item && item.expr ? item.expr.arguments : [])

        bodyMethods
            .map(item => item && item.expr && item.expr.what ? item.expr.what.name : [])
            .forEach((item: any) => unusedImports.push(item))

        for (const ops of callInsideMethods) {
            if (ops) {
                const arg = ops.map((item: any) => item.name)
                    .filter((item: any) => item !== null)
                arg.forEach((item: any) => unusedImports.push(item))
            }
        }

        for (const invokcation of calls) {
            unusedImports.push(invokcation.expression.what.name);
        }

        for (const useStatement of normalizeUseStatements) {
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