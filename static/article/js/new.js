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

var htmlFromMarkdown = function(string) {
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
        var overview = $('#id-editor-overview').val();
        var content = $('#id-editor-content').val();
        var title = $('#id-input-title').val();
        var form = {
            overview: overview,
            content: content,
            title: title
        };
        api.createArticle(form, function (r) {
            if(r.success) {
                alert('success');
                location.href = r.data.href
            }
        })
    })
};
