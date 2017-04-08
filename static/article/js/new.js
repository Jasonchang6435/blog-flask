$(document).ready(function() {
    __main()
})

const __main = function() {
    bindEvents()
}

const bindEvents = function() {
    bindEventShow()
}

var htmlFromMarkdown = function(string) {
    let md = new Remarkable();
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
