Date.prototype.Format = function () {
    var add0 = function (m) {
        return m < 10 ? `0${m}` : m
    };
    var time = this;
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
};

const e = function (selector) {
    return document.querySelector(selector)
};

const es = function (selector) {
    return document.querySelectorAll(selector)
};

Element.prototype.e = function (selector) {
    return this.querySelector(selector)
};

Element.prototype.es = function (selector) {
    return this.querySelectorAll(selector)
};

Element.prototype.on = Element.prototype.addEventListener;


const log = function () {
    var t = new Date().Format();
    console.log.apply(console, [t, arguments])
};

// 内部 api
const api = {};

//  封装ajax， 函数接受 request 参数
api.ajax = function (request) {
    // request 是一个 object, 有如下属性
    //     method, 请求的方法, string
    //     url, 请求的路径, string
    //     data, 请求发送的数据, 如果是 GET 方法则没这个值, string
    //     callback, 响应回调, function
    var r = new XMLHttpRequest();
    r.open(request.method, request.url, true);
    if (request.XCSRFToken !== undefined) {
        r.setRequestHeader('X-CSRFToken', request.XCSRFToken)
    }
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function (event) {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    };
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
};

//  封装 get Ajax 请求
api.get = function (url, response) {
    var r = {
        method: 'GET',
        url: url,
        data: '',
        callback: response,
    };
    api.ajax(r)
};

// 封装 post Ajax 请求
api.post = function (url, form, response) {
    var r = {
        method: 'POST',
        url: url,
        // XCSRFToken: Cookies.get('csrftoken'),
        contentType: 'application/json',
        data: JSON.stringify(form),
        callback: response,
    };
    api.ajax(r)
};

