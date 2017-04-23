$(document).ready(function() {
    __main()
});

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
    $d = $('#id-editor-content');
    $d.on('keyup', function() {
        let s = $d.val();
        let t = htmlFromMarkdown(s);
        $('#id-editor-show').html(t)
    })
};

const bindEventClickSubmit = function () {
    $('#id-btn-submit').on('click', function() {
        let overview = $('#id-editor-overview').val();
        let content = $('#id-editor-content').val();
        let title = $('#id-input-title').val();
        let form = {
            overview: overview,
            content: content,
            title: title
        };
        api.createArticle(form, function (r) {
            if(r.success) {
                alert('success');
                location.href = r.data.article.href
            }
        })
    })
};
