document.addEventListener("DOMContentLoaded",function(){
    __main()
},false);

const __main = function() {
    bindEvents()
};

const bindEvents = function() {
    bindEventShow();
    bindEventClickSubmit()
};

const htmlFromMarkdown = function(string) {
    let s = md.render(string);
    return s
};

const bindEventShow = function() {
    d = e('#id-editor-content');
    d.on('keyup', function() {
        let s = d.value;
        let t = htmlFromMarkdown(s);
        e('#id-editor-show').innerHTML = t
    })
};

const bindEventClickSubmit = function () {
    e('#id-btn-submit').on('click', function() {
        let overview = e('#id-editor-overview').value;
        let content = e('#id-editor-content').value;
        let title = e('#id-input-title').value;
        let form = {
            overview: overview,
            content: content,
            title: title
        };
        api.createArticle(form, function (r) {
            var d = JSON.parse(r);
            if(d.success) {
                alert('success');
                location.href = d.data.article.href
            }
        })
    })
};
