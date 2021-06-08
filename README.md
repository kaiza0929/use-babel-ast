##クラス
「typeがClassDeclaration」のNodeは「typeがClassBody」のNodeをbodyの要素として持つ<br>
「typeがClassDeclaration」のNode１つに付き「typeがClassBody」のNodeは１つ<br>
同様に「typeがClassBody」のNodeは「typeがClassMethod」のNodeをbodyの要素として持つ<br>
ただし「typeがClassBody」のNodeは「typeがClassMethod」のNodeを複数持てる<br>
ClassMethodはゲッタとコンストラクタも含まれる 派生クラスは基底クラスが持っているメソッドも含まれる<br>
「typeがClassMethod」のNodeや「typeがClassBody」のNodeが「typeがClassDeclaration」のNodeの外に現れることはない<br><br>

##変数
identifierNameで変数名を取得できる クラスやインターフェースのプロパティ宣言は取得できない<br>
=>start endで文字列から変数を切り出すしかない?<br><br>

##インターフェース
```
if (node.type === "TSInterfaceDeclaration") {
    console.log(node.body.body.map((node: t.Node) => node.typeAnnotation));
```
