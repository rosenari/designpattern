/*
iterable : [Symbol.iterator]를 키로하는 프로퍼티에 Iterator를 반환하는 함수가 있는 값
iterator : {value: any, done:boolean}객체를 리턴하는 next() 메서드를 가진 객체 
Array,Set,Map과 같은 리스트 데이터들은 기본적으로 Iterable이다.

iterable은 기본적으로 for...of 나 spread 연산같은 순회작업이 가능하다.
 */

//Array
(function () {
    const arr = [1, 2, 3];

    for (const item of arr) {
        console.log(item);
    }

    const Iterator = arr[Symbol.iterator]();
    console.log(Iterator.next());
    console.log(Iterator.next());
    console.log(Iterator.next());
    console.log(Iterator.next());
})();

//Map
(function () {
    const map = new Map([[0, 1], [1, 2], [2, 3]]);
    const Iterator = map[Symbol.iterator]();
    Iterator.next();

    for (const item of Iterator) {
        console.log(item);
    }

    console.log(Iterator.next());
})();

//Set
(function () {
    const set = new Set([1, 2, 3]);

    const Iterator = set[Symbol.iterator]();
    for (const item of Iterator) {
        console.log(item);
    }
})();


//Custom

(function () {
    const iterable = {
        [Symbol.iterator]() {
            let i = 3;
            return {
                next() {
                    return i === 0 ? { done: true } : { value: i--, done: false };
                },
                [Symbol.iterator]() {
                    //자기 자신반환 즉, iterator를 반환
                    //iterator이자, iterable이됨.
                    return this;
                }
            }
        }
    }

    for (const item of iterable) {
        console.log(item);
    }

    const iterator = iterable[Symbol.iterator]();
    console.log(iterator.next());

    for (const item of iterator) {
        //여기서 iterator는 iterator({value:..}+next())이면서, Iterable이다.
        console.log(item);
    }
})();

(function () {
    //Generator : iterator이면서 iterable한 값을 반환하는 함수 !
    //함수명 앞에 *를 붙여 선언하며 arrow function 에서는 사용 못한다.
    //yield 명령어를 이용해서 순회시킬 데이터를 결정합니다 !

    function* gen() {
        yield 1;
        if (false) yield 2;
        yield 3;
    }

    const iter = gen();

    console.log(iter[Symbol.iterator]() === iter); //true

    for (const a of gen()) {
        console.log(a); // 1,3
    }
})();

(function () {
    function* infinity(i = 0) {
        while (true) yield i++;
    }

    function* limit(l, iter) {
        for (const a of iter) {
            yield a;
            if (a === l) return;
        }
    }

    function* odds(l) {
        for (const a of limit(l, infinity(1))) {
            if (a % 2) yield a;
        }
    }

    for (const a of odds(10)) {
        console.log(a); //1 3 5 7 9
    }

    console.log([...odds(10), ...odds(20)]);
})();