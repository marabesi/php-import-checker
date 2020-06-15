import { flatMap } from 'lodash';
import { walker } from './ast';
import engine, { Node } from 'php-parser';
import { PhpUseItem, PhpClassMethod, PhpExpression } from './types/Nodes';

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

function normalizeUseStatements(useTree: any): PhpUseItem[] {
    const extractUseItems: PhpUseItem[] = flatMap(
        useTree.map((usegroup: PhpUseItem) => usegroup.items)
    );

    return extractUseItems
        .map((use: PhpUseItem) => {
            if (use.alias) {
                use.name = use.alias.name;
                use.loc = use.alias.loc;
                return use;
            }
            return use;
        });
}

function normalizeMethods(methods: PhpClassMethod[]) {
    const methodStructure: PhpClassMethod[] = flatMap(methods.map((body: Node) => body));
    return methodStructure;
}

function normalizeMethodArgumentList(methods: PhpClassMethod[]) : string[] {
    const methodStructure: PhpClassMethod[] = flatMap(methods.map((body: Node) => body));
    const argumentsFromMethods = flatMap(methodStructure.map((method: PhpClassMethod) => method.arguments));
    const argumentList: string[] = argumentsFromMethods.map(argument => argument ? argument.type : [])
        .map((argument: any) => argument ? argument.name : null)
        .filter(argument => argument !== null);

    return argumentList;
}

function normalizeExpressions(expressions: PhpExpression[]): string[] {
    const expressionsCalls = expressions.filter((expression: any) => expression.expression.kind === 'call');
    const expressionsAssigments = expressions.filter((expression: any) => expression.expression.kind === 'assign');
    const unusedImports: string[] = [];

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

    return unusedImports;
}

function normalizeReturnTypes(methods: PhpClassMethod[]): string[] {
    return methods
        .map((method: any) => method && method.type ? method.type.name : null)
        .filter(returnType => returnType !== null)
}

function normalizeCallInsideMethods(methods: PhpClassMethod[]): string[] {
    const unusedImports: string[] = [];
    const bodyMethods = flatMap(methods.map((body: any) => (body && body.body ? body.body.children : [])))

    const callInsideMethods = bodyMethods
        .map(item => item && item.expr ? item.expr.arguments : [])

    bodyMethods
        .map(item => item && item.expr && item.expr.what ? item.expr.what.name : [])
        .forEach((item: any) => unusedImports.push(item))

    for (const argumentsCall of callInsideMethods) {
        if (argumentsCall) {
            argumentsCall.map((item: any) => item.name)
                .filter((item: any) => item !== null)
                .forEach((item: any) => unusedImports.push(item))
        }
    }

    return unusedImports;
}

function normalizeMethodCalls(methods: PhpClassMethod[]): string[] {
    return flatMap(methods.map((body: any) => (body && body.body ? body.body.children : [])))
        .filter(invokation => invokation && invokation.expression ? invokation.expression.kind === 'call' : null)
        .filter(invokation => invokation !== null)
        .map(invokation => invokation.expression.what.name);
}

export function extractUnusedImports(sourceCode: string): PhpUseItem[] {
    const unused: PhpUseItem[] = [];

    try {
        const parsedContent = parser.parseCode(sourceCode);

        const { methods, namespaces, expressions } = walker(parsedContent);

        const useStatements = normalizeUseStatements(namespaces);

        const methodStructure = normalizeMethods(methods);

        const unusedImports: string[] = [
            ...normalizeMethodArgumentList(methods),
            ...normalizeExpressions(expressions),
            ...normalizeReturnTypes(methodStructure),
            ...normalizeMethodCalls(methodStructure),
            ...normalizeCallInsideMethods(methodStructure),
        ];

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