import { PhpExpression } from '../types/Nodes';

export class Expression {

    constructor(private expressions: PhpExpression[]) { }

    normalizeExpressions(): string[] {
        const exceptions = this.expressions.filter((expression: any) => expression && expression.kind && expression.kind === 'throw');
        const expressionsCalls = this.expressions.filter((expression: any) => expression && expression.expression ? expression.expression.kind === 'call' : false);
        const expressionsAssigments = this.expressions.filter((expression: any) => expression && expression.expression ? expression.expression.kind === 'assign' : false);
        const unusedImports: string[] = [];

        exceptions.forEach((expression: any) => {
            if (expression && expression.what && expression.what.what) {
                unusedImports.push(expression.what.what.name);
            }
        });

        expressionsCalls.forEach((expression: any) => {
            if (expression && expression.expression && expression.expression.what && expression.expression.what.what) {
                unusedImports.push(expression.expression.what.what.name);
            }
        });

        expressionsAssigments.forEach((expression: any) => {
            if (expression && expression.expression && expression.expression.right && expression.expression.right.what) {
                unusedImports.push(expression.expression.right.what.name);
            }
        })

        return unusedImports;
    }
}