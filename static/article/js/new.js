$(document).ready(function() {
    __main()
})

const __main = function() {
    bindEvents()
}

const bindEvents = function() {
    bindEventShow()
    bindEventClickSubmit()
}

var htmlFromMarkdown = function(string) {
    var md = new Remarkable('full', {
        html: false, // Enable HTML tags in source
        xhtmlOut: false, // Use '/' to close single tags (<br />)
        breaks: false, // Convert '\n' in paragraphs into <br>
        langPrefix: 'language-', // CSS language prefix for fenced blocks
        linkify: true, // autoconvert URL-like texts to links
        linkTarget: '', // set target to open link in

        // Enable some language-neutral replacements + quotes beautification
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if input not changed
        highlight: function(str, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(lang, str).value;
                } catch (__) {}
            }

            try {
                return hljs.highlightAuto(str).value;
            } catch (__) {}

            return ''; // use external default escaping
        }
    });
    s = md.render(string);
    return s
}

const bindEventShow = function() {
    $d = $('#id-editor-content')
    $d.on('keyup', function() {
        let s = $d.val()
        let t = htmlFromMarkdown(s)
        $('#id-editor-show').html(t)
    })
}

const bindEventClickSubmit = function () {
    $('#id-btn-submit').on('click', function() {
        var overview = $('#id-editor-overview').val()
        var content = $('#id-editor-content').val()
        var title = $('#id-input-title').val()
        var form = {
            overview: overview,
            content: content,
            title: title
        }
        api.createArticle(form, function (r) {
            if(r.success) {
                alert('success')
                location.href = r.data.href
            }
        })
    })
}
