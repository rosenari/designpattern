let singletone = (function () {
    //비공개 멤버 정의
    let instance;
    let a = 'singleton';

    function init() {
        //클로저를 사용하기에 비공개 멤버를 사용가능
        return {
            a: a,
            b: function () {
                console.log(a);
            }
        }
    }

    return {
        getInstance: function () {
            //인스턴스 초기화가 안됐다면 새로 생성
            if (!instance) {
                instance = init();
            }
            //이미 인스턴스를 초기화한적이 있다면 해당 인스턴스를 리턴
            return instance;
        }
    }
})();

let singletone1 = singleton.getInstance();
let singletone2 = singleton.getInstance();
console.log(singletone1 === singletone2); //true