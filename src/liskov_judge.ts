/* リスコフ置換判定 */
/* 変数の型だけでなく中身も考慮する必要がある? (親のメソッドが月を引数にとり子のメソッドが年を引数に取る => あまりにも値が離れすぎているので置換できない) */

import { types as t } from "@babel/core";
import { parse } from "@babel/parser";
import * as fs from "fs";

var getClassDatas = (nodes, className: string = null, superClassName: string = null) => nodes.flatMap((node: t.Node): ClassData | MethodData | argData | [] => {
    if (node.type === "ClassDeclaration") {
        className = node.id.name;
        superClassName = node.superClass !== null ? node.superClass.name : null;
        return {[className]: {superClassName: superClassName, methodDatas: getClassDatas(node.body.body, node.id.name, superClassName)}};
    } else if (node.type === "ClassMethod") {
        /*引数は複数存在する可能性あり 返り値は1つ(複数の値の場合は１つの配列やオブジェクトに入る)であることが保証されている */
        return {methodName: node.key.name, argDatas: getClassDatas(node.params, className), returnType: node.returnType === undefined ? "TSAnyKeyword": node.returnType.typeAnnotation.type};
        /* クラス外の変数を取ってこないようにクラスのプロパティであることを明示 */
    } else if (node.type == "Identifier" && className !== null) {
        return {argName: node.name, argType: node.typeAnnotation === undefined ? "TSAnyKeyword" : node.typeAnnotation.type};
    } else {
        return [];
    }
});

type ClassData = {
    [className: string]: {
        superClassName: string;
        methodDatas: MethodData[]
    }
}

type MethodData = {
    methodName: string;
    argDatas: argData[];
    returnType: string;
}

type argData = {argName: string, argType: string};

var codeString: string = fs.readFileSync("./sources/liskov.ts").toString();
var classDatas = getClassDatas(parse(codeString, {plugins: ["typescript"]}).program.body);
classDatas.slice(1).forEach((classData: ClassData) => { classDatas[0] = {...classDatas[0], ...classData}});

Object.keys(classDatas[0]).forEach((className: string) => {
    console.log(className);
    if (classDatas[0].superClassName !== null) {
        console.log(classDatas[0][className].methodDatas);
        console.log(classDatas[0][classDatas[0].superClassName].methodDatas)
    }
});

