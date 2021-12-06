import { Node, Class } from 'php-parser';

export enum PhpTypes {
    PHP_EXPRESSION = 'expressionstatement',
    PHP_METHOD = 'method',
    PHP_USE = 'usegroup',
    PHP_CLASS = 'class',
    PHP_TRAIT = 'trait',
    PHP_INTERFACE = 'interface',
}

export interface PhpUseItemAlias extends Node {
    name: string;
}

export interface PhpUseItem extends Node {
    name: string;
    alias?: PhpUseItemAlias;
    items?: Node[];
}

export interface PhpClassMethod extends Node {
    body?: Node[];
    arguments?: PhpClassMethodArguments[];
}

export interface PhpClasses extends Class {

}

export interface PhpExpression extends Node {
}

export interface PhpClassMethodArguments extends Node {
    type?: any[];
    name?: string;
}