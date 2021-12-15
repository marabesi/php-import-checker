import { PhpImportCheckerConfiguration } from '../configuration';
import { Builder } from '../parser/Builder';
import { PhpUseItem } from '../parser/types/Nodes';

export const classUsed = (className: string) => new RegExp('\\b' + className + '\\b', 'g');

export function newExtractor(originalText: string, configuration: PhpImportCheckerConfiguration) {
  const matches = [];
  let text: string = originalText;

  try {
    if (configuration.ignore_comments) {
      text = text.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/, '');
    }

    const builder = new Builder(originalText);
    const ast:PhpUseItem[] = builder.build().namespaces.normalizeUseStatements();

    const allUsedClasses = ast.map(node => node.name).join(',');

    for (const use of ast) {
      let found = 0;
      let splitNameSpace = use.name.split('\\');
      let className = splitNameSpace[splitNameSpace.length - 1];

      const test = text.match(classUsed(className));

      found = (test || []).length;
      const classesInNamespace = allUsedClasses.match(classUsed(className)) || [];

      if (found <= classesInNamespace.length) {
        matches.push({
          found: found,
          match: {
            index: use?.loc?.start.offset ?? 0,
            0: {
              length: (use?.loc?.end.column ?? 0) - 2,
            }
          },
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  return matches;
}
