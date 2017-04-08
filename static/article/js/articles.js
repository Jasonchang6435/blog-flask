/**
 * Created by xiongchui on 2017/3/26.
 */

$(document).ready(function () {
    __main()
});

var __main = function () {
    loadArticles()
};

var templateCellArticle = function () {
    var s = `
        <div id="id-article-{{ t.id }}" class="article-cell">
            <a href="article/{{ t.id }}">{{ t.title }}</a>
            <div>{{ t.ct | formattime }}</div>
            <div>{{ t.overview }}</div>
        </div>`;
    return s
};

var nunjucksEnvironment = function () {
    // setup nunjucks
    var env = new nunjucks.Environment();
    env.addFilter('formattime', function (time) {
        var d = new Date(time * 1000);
        return d.toLocaleString()
    });
    return env
};

// 自动获取数据并生成页面
var loadArticles = function () {
    let env = nunjucksEnvironment();
    const self = $('#id-articles-container');
    const source = self.data('source');
    const template = eval(self.data('template'))();
    log('debug template', template);
    const key = self.data('templateKey');
    log('info source template key', source, template, key);
    api.get(source, function (r) {
        log('question list', r, r.data.length);
        if (r.success) {
            let cells = [];
            for (let i = 0; i < r.data.length; i++) {
                let data = r.data[i];
                let args = {};
                args[key] = data;
                log('debug data', data);
                let s = env.renderString(template, args);
                cells.push(s)
            }
            // log('debug cells', cells);
            let str = cells.join('');
            self.html(str)
        }
    })
};
