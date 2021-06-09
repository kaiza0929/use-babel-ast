###クラス
「typeがClassDeclaration」のNodeは「typeがClassBody」のNodeをbodyの要素として持つ<br>
「typeがClassDeclaration」のNode１つに付き「typeがClassBody」のNodeは１つ<br>
同様に「typeがClassBody」のNodeは「typeがClassMethod」のNodeをbodyの要素として持つ<br>
ただし「typeがClassBody」のNodeは「typeがClassMethod」のNodeを複数持てる<br>
ClassMethodはゲッタとコンストラクタも含まれる 派生クラスは基底クラスが持っているメソッドも含まれる<br>
「typeがClassMethod」のNodeや「typeがClassBody」のNodeが「typeがClassDeclaration」のNodeの外に現れることはない<br><br>

###インターフェース
```
if (node.type === "TSInterfaceDeclaration") {
    console.log(node.body.body.map((node: t.Node) => node.typeAnnotation));
```

###契約プログラミング
事前条件・事後条件 -> 引数・戻り値の制約(n以上の数値, m文字以下の文字列,..) 型チェックは事前・事後条件には当てはまらない<br>