/**
 * Created by xiongchui on 2017/3/25.
 */

document.addEventListener("DOMContentLoaded",function(){
    __main()
},false);

const __main = function () {
    loadArticle()
};

const loadArticle = function () {
    const c = e('#id-article-container');
    const id = c.dataset.id;
    const source = c.dataset.source;
    api.get(source, function (r) {
        var d = JSON.parse(r);
        if (d.success) {
            m = d.data.article;
            let t = templateArticleContent(m);
            var container = e('#id-article-container');
            container.innerHTML = t
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
