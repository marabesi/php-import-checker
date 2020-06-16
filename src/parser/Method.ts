import { flatMap } from 'lodash';
import { Node } from 'php-parser';
import { PhpClassMethod } from '../types/Nodes';

export class Method {

    private methods: PhpClassMethod[];

    constructor(private parsedMethods: PhpClassMethod[]) {
        this.methods = flatMap(parsedMethods.map((body: Node) => body));
    }

    normalizeReturnTypes(): string[] {
        return this.methods
            .map((method: any) => method && method.type ? method.type.name : null)
            .filter(returnType => returnType !== null)
    }

    normalizeCallInsideMethods(): string[] {
        const unusedImports: string[] = [];
        const bodyMethods = flatMap(this.methods.map((body: any) => (body && body.body ? body.body.children : [])))

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

    normalizeMethodArgumentList(): string[] {
        const methodStructure: PhpClassMethod[] = flatMap(this.methods.map((body: Node) => body));
        const argumentsFromMethods = flatMap(methodStructure.map((method: PhpClassMethod) => method.arguments));
        const argumentList: string[] = argumentsFromMethods.map(argument => argument ? argument.type : [])
            .map((argument: any) => argument ? argument.name : null)
            .filter(argument => argument !== null);

        return argumentList;
    }

    normalizeMethodCalls(): string[] {
        return flatMap(this.methods.map((body: any) => (body && body.body ? body.body.children : [])))
            .filter(invokation => invokation && invokation.expression ? invokation.expression.kind === 'call' : null)
            .filter(invokation => invokation !== null)
            .map(invokation => invokation.expression.what.name);
    }
}