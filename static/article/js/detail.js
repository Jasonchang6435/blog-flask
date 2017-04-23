/**
 * Created by xiongchui on 2017/3/25.
 */

$(document).ready(function () {
    __main()
});

const __main = function () {
    loadArticle()
};

const loadArticle = function () {
    const c = $('#id-article-container');
    const id = c.data('id');
    const source = c.data('source');
    api.get(source, function (r) {
        if (r.success) {
            m = r.data.article;
            let t = templateArticleContent(m);
            $('#id-article-container').append(t)
        }
    })
};

const htmlFromMarkdown = function (string) {
    s = md.render(string);
    return s
};

const templateArticleContent = function (m) {
    let c = htmlFromMarkdown(m.content);
    let s = `
    <div id="id-article-title" >
        ${m.title}
    </div>
    <div id="id-article-author" >
        ${m.author_id}
    </div>
    <div id="id-article-content">
        ${c}
    </div>`;
    return s
};
