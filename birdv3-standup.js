webpackJsonp([104,113],{1159:function(e,r){e.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h2 id=头痛><a href=#%E5%A4%B4%E7%97%9B aria-hidden=true><span class=\"icon icon-link\"></span></a>头痛</h2><p>erp这边rd用的编译型语言Java，每次发版代码都需要重新编译一下，然后才能生效。 但就是这个编译重新载入的时间，经常会影响我们FE开发！ 破坏我们创作代码的热情！</p><p>于是为了解决该问题，基于birdV3的standup应运而生</p><h2 id=原理><a href=#%E5%8E%9F%E7%90%86 aria-hidden=true><span class=\"icon icon-link\"></span></a>原理</h2><p>首先了解一下BirdV3的基本原理</p><pre><code data-query={} data-lang>Client(Browser)  -------->    Bird    --------->   Remote Server \n              1. client request     2. bird request\n              4. bird response      3. remote response\n                 &lt;--------            &lt;---------\n</code></pre><p>nodejs实现转发的代码 <a href=https://github.com/imcuttle/simple-hot-reload-server/blob/master/src/helpers/forward-request.js>forward-request.js</a></p><p>如上面的简单示意，通过Bird可以实现跨域的请求转发 然后我们需要在 3 -> 4 之间，加上一个拦截器(interceptor)的东西</p><p>通过拦截器，可以解决上面让我们头疼的问题，思路如下 1. 如果这个请求（url）对应的响应是我们需要cache的，进入2，否则不进行拦截 2. 如果对于remote response，我们认为它是服务器错误，则进入3，否则进入4 3. 如果在cache中找到该请求（url）对应缓存的响应，则进行拦截！并且bird response响应缓存中的数据。否则不进行拦截 4. 将remote response写入缓存中</p><p>这样当服务器出错时候，默认认为是 <code>statusCode >= 400</code>，会把最新成功的数据给返回，这样本地就感受不到远端的崩溃了</p><h2 id=使用><a href=#%E4%BD%BF%E7%94%A8 aria-hidden=true><span class=\"icon icon-link\"></span></a>使用</h2><p>配置bird远程服务器配置</p><pre><code data-query={} data-lang>module.exports = {\n    server: 'http://sit-offer-web.dev.weiyun.baidu.com',\n    plugin: 'uuap2',\n\n    useUser: 'tangrui',\n\n    users: {\n        tangrui: 'tangrui7700',\n    },\n\n    intercept: {\n        name: 'standup',\n        option: {\n            matcher: function (url) {\n                return url !== '/favicon.ico';\n            },\n            checkIsBroken: function (res) {\n                return parseInt(res.statusCode, 10) >= 400;\n            },\n            // 是否在程序结束时保存缓存\n            saveLastCache: true\n        }\n    },\n\n    reloginSeq: 35\n}\n</code></pre>",extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=birdv3-standup.js.map