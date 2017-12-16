importScripts(['./hljs.js']);

var list = hljs.listLanguages();
onmessage = function (evt) {
    var data = evt.data
    data = data || {}
    var type = data.type
    var arguments = data.arguments || []
    var code = arguments[0]
    var lang = arguments[1] || ''
    lang = lang.trim()

    if (!list.includes(lang)) {
        lang = ''
    }
    console.log(data);
    var result = (lang ? hljs.highlight(lang, code, true) : hljs.highlightAuto(code)).value
    postMessage(result)
}

