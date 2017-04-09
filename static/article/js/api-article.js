api.createArticle = function (form, responseCallback) {
    var url = '/api/article/new';
    api.post(url, form, responseCallback, responseCallback)
};
