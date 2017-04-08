api.retrieveArticle = function (id, responseCallback) {
    let url = `/article/${id}`;
    api.get(url, id, responseCallback)
};
