import { PhpImportCheckerConfiguration } from './configuration';
import { Builder } from './parser/Builder';
import { PhpUseItem } from './parser/types/Nodes';

function newExtractor(text: string) {
  let matches = [];

  try {
    const builder = new Builder(text);
    const ast:PhpUseItem[] = builder.build().namespaces.normalizeUseStatements();

    const allUsedClasses = ast.map(node => node.name).join(',');

    for (const use of ast) {
      let found = 0;
      let splitNameSpace = use.name.split('\\');
      let className = splitNameSpace[splitNameSpace.length - 1];

      const reg = new RegExp('\\b' + className + '\\b', 'g');

      const test = text.match(reg);

      found = (test || []).length;
      const classesInNamespace = allUsedClasses.match(new RegExp('\\b' + className + '\\b', 'g')) || [];

      if (found <= classesInNamespace.length) {
        matches.push({
          classname: className,
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

export function extractUnusedImports(text: string, configuration: PhpImportCheckerConfiguration) {
  if (configuration.use_next_version) {
    return newExtractor(text);
  }

  const regEx = /^\ {0,3}use (?:(?:function|const) )?(.*);/mg;
  let match;
  let matches = [];
  let isAlias = false;

  while (match = regEx.exec(text)) {
    let found = 0;
    let splitNameSpace = match[1].split('\\');
    let className = splitNameSpace[splitNameSpace.length - 1];

    if (className.search(/ as /) > -1) {
      isAlias = true;
      let splitAlias = className.split(' as ');
      className = splitAlias[splitAlias.length - 1].trim();
    }

    const reg = new RegExp('\\b' + className + '\\b', 'g');

    const test = text.match(reg);

    found = (test || []).length;

    if (match[0].length && found < 2) {
      matches.push({
        isAlias: isAlias,
        classname: className,
        found: found,
        match,
      });
    }

    isAlias = false;
  }

  return matches;
}
