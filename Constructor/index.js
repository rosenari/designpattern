(function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
        this.sayName = function () {
            console.log(this.name);
        };
    }

    //인스턴스 타입을 쉽게 식별할 수 있다.
    //허나 인스턴스마다 동일한 메소드가 생성돼 메모리가 낭비된다.
    let person1 = new Person("kim", 30);
    let person2 = new Person("park", 27);
    let person3 = new Person("lee", 25);

    person1.sayName();
    person2.sayName();
    person3.sayName();
})();

//위 메모리 낭비의 문제점을 프로토타입 패턴을 조합해 해결할 수 있다.
(function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    //프로토타입의 프로퍼티와 메소드는 객체 인스턴스 전체에서 공유된다.
    Person.prototype = {
        constructor: Person,
        sayName: function () {
            console.log(this.name);
        }
    }

    let person1 = new Person("kim", 30);
    let person2 = new Person("park", 27);
    let person3 = new Person("lee", 25);

    person1.sayName();
    person2.sayName();
    person3.sayName();
})();