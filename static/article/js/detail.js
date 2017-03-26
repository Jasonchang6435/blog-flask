/**
 * Created by xiongchui on 2017/3/25.
 */

// 绑定事件
// var bindEvents = function () {
//
// };

$(document).ready(function () {
        __main()
    });

var __main = function () {
    loadArticle()
};

var htmlFromMarkdown = function (string) {
    var md = new Remarkable()
    s = md.render(string)
    return s
}

var articleContentTemplate = function(m) {
    var c = htmlFromMarkdown(m.content)
    var s = `
    <div id="id-article-title" >
        ${m.title}
    </div>
    <div id="id-article-author" >
        ${m.author_id}
    </div>
    <div id="id-article-content">
        ${c}
    </div>`
    return s
}

var loadArticle = function () {
    const c = $('#id-article-container');
    const id = c.data('id');
    const source = c.data('source');
    log('info id source', id, source);
    api.get(source, function (r) {
        log('article content', r , r.data);
        if(r.success) {
            var t = articleContentTemplate(r.data)
            $('#id-article-container').append(t)
        }
    })
};
