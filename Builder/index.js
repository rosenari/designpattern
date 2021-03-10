(function () {
    class Request {
        constructor(url, method, data) {
            this.url = url;
            this.method = method;
            this.data = data;
        }
    }

    let getRequest = new Request('https://rosenari.com', 'GET', null);
    let postRequest = new Request('https://rosenari.com', 'POST', {
        id: 'rosenari',
        password: '1234'
    });
})();

//위 코드의 문제점
//1.데이터가 없을경우에도 null을 명시적으로 넣어야한다.
//2.생성자 인수 위치에 어떤 데이터가 들어가야하는지 명시적이지않아, 실수할 염려가큼
//3.생성자 함수에 불필요 로직이 포함될 가능성이 크다.(생성자 함수에서 대부분 초기화).

(function () {
    class Request {
        constructor() {
            this.url = '';
            this.method = '';
            this.data = null;
        }
    }

    class RequestBuilder {
        constructor() {
            this.request = new Request();
        }
        //setter 메서드는 this를 리턴하여 메서드 체이닝이 가능하도록한다.
        //this는 builder 객체를 가르키므로 리턴된 this를 통해 메서드 호출이 가능
        forUrl(url) {
            this.request.url = url;
            return this;
        }

        useMethod(method) {
            this.request.method = method;
            return this;
        }

        setData(data) {
            this.request.data = data;
            return this;
        }

        //마지막 build 메서드를 호출하여 초기화가 완료된 request 객체를 리턴한다. 
        build() {
            return this.request;
        }
    }

    let getRequest = new RequestBuilder()
        .forUrl('https://rosenari.com')
        .useMethod('GET')
        .build();

    let postRequest = new RequestBuilder()
        .forUrl('https://rosenari.com')
        .useMethod('POST')
        .setData({
            id: 'rosenari',
            password: '1234'
        })
        .build();

    console.log(getRequest);
    console.log(postRequest);
})();