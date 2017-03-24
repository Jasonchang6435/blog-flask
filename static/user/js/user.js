var _main = function () {
    bindEvents()
};

document.addEventListener("DOMContentLoaded", function () {
    _main()
}, false);

var bindEvents = function () {
    bindEventClickRegister();
    bindEventClickLogin()
};

var bindEventClickLogin = function () {
    var btn = e('#id-btn-login');
    btn.addEventListener('click', function () {
        var u = e('#id-username-login');
        var p = e('#id-password-login');
        var form = {
            name: u.value,
            password: p.value,
        };
        api.login(form, function (response) {
            var r = JSON.parse(response);
            if (r.success) {
                location.href = r.href
            } else {
                alert(r.error)
            }
        })
    })
};

var bindEventClickRegister = function () {
    var btn = e('#id-btn-register');
    btn.addEventListener('click', function () {
        var u = e('#id-username-register');
        var p = e('#id-password-register');
        var form = {
            name: u.value,
            password: p.value,
        };
        api.register(form, function (response) {
            var r = JSON.parse(response);
            if (r.success) {
                location.href = r.href
            } else {
                alert(r.error)
            }
        })
    })
};