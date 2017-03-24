api.register = function (form, response) {
    var url = '/user/register';
    api.post(url, form, response)
};

api.login = function (form, response) {
    var url = '/user/login';
    api.post(url, form, response)
};