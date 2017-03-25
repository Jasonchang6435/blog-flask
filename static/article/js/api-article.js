api.retrieveArticle = function (id, responseCallback) {
    var url = `/article/${id}`;
    api.get(url, id, responseCallback)
};
