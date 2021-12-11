import { Node } from 'php-parser';

export interface PhpUseItemAlias extends Node {
  name: string;
}

export interface PhpUseItem extends Node {
  name: string;
  alias?: PhpUseItemAlias;
  items?: Node[];
}
