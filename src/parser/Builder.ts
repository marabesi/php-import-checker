import { Engine, Program } from 'php-parser';
import { Namespace } from './Namespace';

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

  constructor(private sourceCode: string) {
    this.parsedContent = parser.parseCode(this.sourceCode, '');
  }

  build(): any {
    return {
      namespaces: new Namespace(this.parsedContent.children),
    };
  }
}