import { PhpExpression } from '../types/Nodes';

export class Expression {

    constructor(private expressions: PhpExpression[]) { }

    normalizeExpressions(): string[] {
        const expressionsCalls = this.expressions.filter((expression: any) => expression && expression.expression ? expression.expression.kind === 'call' : false);
        const expressionsAssigments = this.expressions.filter((expression: any) => expression && expression.expression ? expression.expression.kind === 'assign' : false);
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
}