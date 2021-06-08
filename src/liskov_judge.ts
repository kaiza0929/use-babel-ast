/* リスコフ置換判定 */

import { types as t } from "@babel/core";
import { parse } from "@babel/parser";
import * as fs from "fs";

var getClassDatas = (nodes, className: string = null, superClassName: string = null) => nodes.flatMap((node: t.Node) => {
    if (node.type === "ClassDeclaration") {
        return getClassDatas(node.body.body, node.id.name, node.superClass !== null ? node.superClass.name : null);
    } else if (node.type === "ClassMethod" && node.returnType !== undefined) {
        return {className: className, superClassName: superClassName, methodName: node.key.name, retutnType: node.returnType.typeAnnotation.type};
    } else {
        console.log(node);
        return [];
    }
});

type ClassData = {
    className: string;
    superClassName: string;
    methodName: string;
    returnType: string;
}

var codeString: string = fs.readFileSync("./sources/liskov.ts").toString();
export var classDatas: ClassData[] = getClassDatas(parse(codeString, {plugins: ["typescript"]}).program.body);
//console.log(classDatas);


