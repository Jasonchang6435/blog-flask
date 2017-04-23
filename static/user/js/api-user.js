api.register = function (form, response) {
    let url = '/user/register';
    api.post(url, form, response)
};

api.login = function (form, response) {
    let url = '/user/login';
    api.post(url, form, response)
};