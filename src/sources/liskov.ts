/* リスコフの置換原則 */
/* 派生クラスは派生元クラスと置き換えが可能でなければならない */

interface Human {
    name: string;
    greeding(): void;
}

class Parent implements Human {

    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    greeding(): void {
        console.log("私は親です");
    }

}

class Son extends Parent {

    constructor(name: string) {
        super(name);
    }

    /* 親のメソッドをオーバーライド 返り値の型が元の親のメソッドと同じ(値を返さない)なのでOK */
    greeding(): void {
        console.log(`私は${super.name}の息子です`);
    }

}

class SonInLaw extends Parent {

    constructor(name: string) {
        super(name);
    }

    /* 返り値の型が親と異なるのでダメ */
    greeding(): string {
        return `私は${super.name}義理の息子です`;
    }

    remove(num: number, message: any): string {
        return num.toString() + message;
    }

}