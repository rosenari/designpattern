(function () {
    let observer = {
        handlers: {},
        //옵저버에 특정 이벤트에 대한 핸들러를 등록하는 메서드
        register: function (eventName, handler, context) { //이벤트 이름,핸들러함수,컨텍스트를 받는다.
            let handlerArray = this.handlers[eventName]; //이벤트이름으로 등록된 핸들러 배열을 받아온다.
            if (handlerArray === undefined) {//만약 아무것도 등록된 적이 없다면
                handlerArray = this.handlers[eventName] = []; //배열로 초기화
            }
            handlerArray.push({ handler, context });//핸들러와 컨텍스트를 등록
        },
        //옵저버에 특정 이벤트에 등록된 핸들러를 해제하는 메서드
        unregister: function (eventName, handler, context) {//이벤트이름,핸들러함수,컨텍스트를 받는다.
            let handlerArray = this.handlers[eventName]; //이벤트이름으로 등록된 핸들러 배열을 받아온다.
            if (handlerArray === undefined) return; //만약 아무것도 등록된 적이 없다면 그냥 끝

            for (let idx = 0; idx < handlerArray.length; idx++) { //
                let currentHandler = handlerArray[idx];
                //해당 이벤트에 등록된 핸들러중 해당되는 핸들러와 컨텍스트로 등록된 객체를 찾는다.
                if (handler === currentHandler['handler']
                    && context === currentHandler['context']) {
                    handlerArray.splice(idx, 1);//찾는다면 배열에서 삭제
                    return;
                }
            }
        },
        //특정 이벤트에 등록된 핸들러들을 실행하는 함수
        notify: function (eventName, data) {
            let handlerArray = this.handlers[eventName]; //이벤트이름으로 등록된 핸들러 배열을 받아온다.
            if (handlerArray === undefined) return; //없다면 끝

            for (let idx = 0; idx < handlerArray.length; idx++) {
                let currentHandler = handlerArray[idx];
                currentHandler['handler'].call(currentHandler['context'], data);
                //등록된 핸들러를 호출한다. this는 등록된 context로 바인딩, data는 매개변수로 전달
            }
        }
    }

    global.observer = observer;
})();

(function () {
    let Person = function () {

    };

    let boss = new Person();
    let manager = new Person();
    let programmer = new Person();

    //보스객체에 말하기 메서드를 만든다.
    boss.speak = function (comment) {
        console.log(comment);//말하고
        observer.notify("bossSpeak", comment);//옵저버 객체들을 통해 등록된 핸들러 실행
    }

    manager.listen = function (comment) {
        console.log("manager listen..");
        this.bossComment = comment;
    }

    observer.register("bossSpeak", manager.listen, manager);

    programmer.drop = function (comment) {
        console.log("programmer drop..");
        return comment;
    }

    observer.register("bossSpeak", programmer.drop, programmer);

    boss.speak("사장: 잘하자 얘들아");

    console.log("사장: 매니저 내가 뭐라고 했나 ?")
    console.log(manager.bossComment + "라고 하셨습니다.");
    console.log("사장: 개발자 내가 뭐라고 했나 ?")
    console.log(programmer.bossComment + "라고 하셨습니다.");
})();