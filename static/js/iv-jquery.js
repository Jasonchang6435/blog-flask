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

const log = function () {
    var t = new Date().Format();
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
    var method = 'get';
    var form = {}
    this.ajax(url, method, form, responseCallback, responseCallback);
};

api.post = function (url, form, responseCallback) {
    var method = 'post';
    this.ajax(url, method, form, responseCallback, responseCallback);
};
