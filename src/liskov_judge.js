"use strict";
/* リスコフ置換判定 */
/* 変数の型だけでなく中身も考慮する必要がある? (親のメソッドが月を引数にとり子のメソッドが年を引数に取る => あまりにも値が離れすぎているので置換できない) */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var parser_1 = require("@babel/parser");
var fs = require("fs");
var getClassDatas = function (nodes, className, superClassName) {
    if (className === void 0) { className = null; }
    if (superClassName === void 0) { superClassName = null; }
    return nodes.flatMap(function (node) {
        var _a;
        if (node.type === "ClassDeclaration") {
            className = node.id.name;
            superClassName = node.superClass !== null ? node.superClass.name : null;
            return _a = {}, _a[className] = { superClassName: superClassName, methodDatas: getClassDatas(node.body.body, node.id.name, superClassName) }, _a;
        }
        else if (node.type === "ClassMethod") {
            /*引数は複数存在する可能性あり 返り値は1つ(複数の値の場合は１つの配列やオブジェクトに入る)であることが保証されている */
            return { methodName: node.key.name, argDatas: getClassDatas(node.params, className), returnType: node.returnType === undefined ? "TSAnyKeyword" : node.returnType.typeAnnotation.type };
            /* クラス外の変数を取ってこないようにクラスのプロパティであることを明示 */
        }
        else if (node.type == "Identifier" && className !== null) {
            return { argName: node.name, argType: node.typeAnnotation === undefined ? "TSAnyKeyword" : node.typeAnnotation.type };
        }
        else {
            return [];
        }
    });
};
var codeString = fs.readFileSync("./sources/liskov.ts").toString();
var classDatas = getClassDatas(parser_1.parse(codeString, { plugins: ["typescript"] }).program.body);
classDatas.slice(1).forEach(function (classData) { classDatas[0] = __assign(__assign({}, classDatas[0]), classData); });
Object.keys(classDatas[0]).forEach(function (className) {
    console.log(className);
    if (classDatas[0].superClassName !== null) {
        console.log(classDatas[0][className].methodDatas);
        console.log(classDatas[0][classDatas[0].superClassName].methodDatas);
    }
});
