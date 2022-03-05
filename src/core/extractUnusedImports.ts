import { PhpImportCheckerConfiguration } from '../configuration';
import { newExtractor } from './nextVersionExtractUnusedImports';

export function extractUnusedImports(text: string, configuration: PhpImportCheckerConfiguration) {
    return newExtractor(text, configuration);
}