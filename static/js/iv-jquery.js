Date.prototype.format = function () {
    let add0 = function (m) {
        return m < 10 ? `0${m}` : m
    };
    let time = this;
    let y = time.getFullYear();
    let m = time.getMonth() + 1;
    let d = time.getDate();
    let h = time.getHours();
    let mm = time.getMinutes();
    let s = time.getSeconds();
    return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
};

const log = function () {
    let t = new Date().format();
    console.log.apply(console, [t, arguments])
};

// api API
const api = {
    data: {}
};

api.ajax = function (url, method, form, success, error) {
    var request = {
        url: url,
        type: method,
        contentType: 'application/json',
        success: function (r) {
            var r = JSON.parse(r);
            log('api post success', url, r);
            success(r);
        },
        error: function (err) {
            var r = {
                success: false,
                data: err
            };
            log('api post err', url, err, error);
            error(r);
        }
    };
    if (method === 'post') {
        var data = JSON.stringify(form);
        request.data = data;
    }
    $.ajax(request);
};

api.get = function (url, responseCallback) {
    let method = 'get';
    let form = {};
    this.ajax(url, method, form, responseCallback, responseCallback);
};

api.post = function (url, form, responseCallback) {
    let method = 'post';
    this.ajax(url, method, form, responseCallback, responseCallback);
};
