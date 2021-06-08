"use strict";
/* リスコフ置換判定 */
exports.__esModule = true;
exports.classDatas = void 0;
var parser_1 = require("@babel/parser");
var fs = require("fs");
var getClassDatas = function (nodes, className, superClassName) {
    if (className === void 0) { className = null; }
    if (superClassName === void 0) { superClassName = null; }
    return nodes.flatMap(function (node) {
        if (node.type === "ClassDeclaration") {
            return getClassDatas(node.body.body, node.id.name, node.superClass !== null ? node.superClass.name : null);
            //} else if (node.type === "TSInterfaceDeclaration") {
            //console.log(node.body.body.map((node: t.Node) => node.typeAnnotation));
        }
        else if (node.type === "ClassMethod" && node.returnType !== undefined) {
            return { className: className, superClassName: superClassName, methodName: node.key.name, retutnType: node.returnType.typeAnnotation.type };
        }
        else {
            console.log(node);
            return [];
        }
    });
};
var codeString = fs.readFileSync("./sources/liskov.ts").toString();
exports.classDatas = getClassDatas(parser_1.parse(codeString, { plugins: ["typescript"] }).program.body);
//console.log(classDatas);
