//클로저를 이용한 모듈 패턴

//독립된 모듈을 사용하는 것을 모듈 패턴이라한다.
//독립된 모듈은 내부 변수 및 내부 함수를 모두 갖고 있어야하며,
//내부 멤버에 접근하지 못하게 클로저를 이용합니다.
let m = (function () {
    //은닉 멤버 정의
    let privateVal = 0;

    function privateMethod() {
        return ++privateVal;
    }

    return {
        publicVal: privateVal,
        publicMethod: function () {
            return privateMethod();
        }
    }
})();

console.log(m.publicMethod()); //1
console.log(m.publicMethod()); //2
console.log(m.publicVal);// 노출 접근가능
console.log(m.privateVal);// 내부멤버 접근 불가