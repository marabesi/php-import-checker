import { PhpImportCheckerConfiguration } from '../configuration';
import { newExtractor } from './nextVersionExtractUnusedImports';
import { oldExtractor } from './oldExtractor';

export function extractUnusedImports(text: string, configuration: PhpImportCheckerConfiguration) {
  // if (configuration.use_next_version) {
    return newExtractor(text, configuration);
  // }

  // return oldExtractor(text);
}