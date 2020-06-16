import { PhpExpression } from '../types/Nodes';

export class Expression {

    constructor(private expressions: PhpExpression[]) { }

    normalizeExpressions(): string[] {
        const expressionsCalls = this.expressions.filter((expression: any) => expression.expression.kind === 'call');
        const expressionsAssigments = this.expressions.filter((expression: any) => expression.expression.kind === 'assign');
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