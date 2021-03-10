class Bread {
    constructor(name) {
        this.name = name;
    }
    prepare() {
        console.log(this.name + "준비");
    }

    bake() {
        console.log(this.name + "굽기");
    }

    colldown() {
        console.log(this.name + "식히기");
    }
}

class Roll extends Bread {
    constructor() {
        super('롤');
    }
}

class Baguette extends Bread {
    constructor() {
        super('바게트');
    }
}

class Bagel extends Bread {
    constructor() {
        super('베이글');
    }
}

class Hotdog extends Bread {
    constructor() {
        super('핫도그');
    }
}

(function () {
    function bakeBread(type) {
        let bread;

        if (type === 'roll') bread = new Roll();
        else if (type === 'baguette') bread = new Baguette();
        else if (type === 'Bagel') bread = new Bagel();
        //else if (type === 'Hotdog') bread = new Hotdog(); 새로운 빵종류 추가

        bread.prepare(); //빵 준비
        bread.bake(); //빵 굽기
        bread.colldown(); //빵 식히기

        return bread;
    }

    bakeBread('roll');
})();
/*
위 코드의 bakeBread함수는 빵 타입을 받아서 해당 빵을 만든후 구워서 완성된 빵를 리턴하는 함수이다.
문제점 : 빵 종류가 추가되는 경우 if문이 계속 추가되며, bakeBread함수가 비대해진다.
또한 변화에 유연하지 않다. 최소한의 수정으로 요구사항이 반영되야하는데 이 코드는 그렇지 않다.
*/

(function () {
    function bakeBread(type) {
        let bread = breadFactory(type);

        bread.prepare(); //빵 준비
        bread.bake(); //빵 굽기
        bread.colldown(); //빵 식히기

        return bread;
    }

    //빵 타입을 넘겨주면 인스턴스를 만들어주는 공장
    function breadFactory(type) {
        let bread;

        if (type === 'roll') bread = new Roll();
        else if (type === 'baguette') bread = new Baguette();
        else if (type === 'Bagel') bread = new Bagel();

        return bread;
    }

    bakeBread('baguette');
})();
/*
    위 코드 처럼하면 bakeBread(메인)함수는 더이상 고칠필요가 없어졌다.
    허나, 새로운 빵이 추가되면 if문이 계속 추가되는 것은 해결되지 않았다.
*/

(function () {
    //인스턴스를 만드는 행위를 추상화한다.
    //추상 팩토리는 인스턴스 생성을 서브클래스에 위임하여 의존성을 낮춘다.
    class BreadFactory {
        static createBread(factory) {
            return factory.createBread();
        }
    }

    class RollFactory {
        static createBread() {
            return new Roll();
        }
    }

    class BaguetteFactory {
        static createBread() {
            return new Baguette();
        }
    }

    class BagelFactory {
        static createBread() {
            return new Bagel();
        }
    }

    function bakeBread(factory) {
        let bread = BreadFactory.createBread(factory);

        bread.prepare(); //빵 준비
        bread.bake(); //빵 굽기
        bread.colldown(); //빵 식히기

        return bread;
    }

    bakeBread(BagelFactory);
})();