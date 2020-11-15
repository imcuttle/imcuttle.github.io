webpackJsonp([112,113],{1149:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p>如今,单页应用"横行霸道", 而且新时代知识信息海量,我们更需要自己的Blog来沉淀知识。 综上,<code>Moka</code>走入了我们的实现。</p><!--more--><h2 id=usage><a href=#usage aria-hidden=true><span class="icon icon-link"></span></a>Usage</h2><img src=false alt width=800 height=432 data-src=https://segmentfault.com/img/bVEjtX><p>为了第一眼能看到效果, 我先把如何安装使用说一下。 1. 一切从<code>npm</code>开始</p><pre><code data-query={} data-lang>    $ npm i -g moka-cli\n</code></pre><ol start=2><li>安装完成后</li></ol><pre><code data-query={} data-lang>```sh    \n$ moka -h # 帮助\n$ moka -V # 版本\n\n$ mkdir myBlog\n$ cd myBlog\n$ moka i  # 开启自己的spa Blog\n$ moka g  # generate static pages\n$ moka s  # 开启本地服务，动态更新_articles\n$ moka ss  # 开启本地静态服务，需要先generate\n$ moka n abc # 新建一个article\n\n$ moka d  # 根据 moka.config.json deploy 发布 需要设置sshkey \n$ moka b  # 根据 moka.config.json bak 发布 需要设置sshkey \n``` \n</code></pre><ol start=3><li><p>线上效果</p><p><a href=https://moyuyc.github.io/>moyuyc.github.io</a></p></li><li><p>详细解释</p><p>在当前目录下产生一套文件目录结构。如下：</p><pre><code data-query={} data-lang>moka-blog/\n├── moka.config.json # moka配置，包括全局配置，如deploy，bak信息，主题选择\n├── package.json     # 可以无视\n├── source/          # moka g 会将该目录下非`_articles`文件夹放入static\n│   ├── _articles/   # moka g 将`_articles`下的markdown文件解析到static中\n│   └── ...\n├── static/          # moka g 产生的最终发布的目录，deploy便是发布该目录\n│   └── ...   \n├── template/\n│   └── article.md   # moka n 命令产生新文章的模板\n└── themes/          # moka g 将配置中选中对应的主题 `themeBuild`目录 拷贝到static\n     └── moka/        # 主题文件夹，其中包含theme.config.json, 根据主题要求自行配置\n</code></pre><p>关于<code>moka deploy &amp moka bak</code>需要设置<code>github key</code>，这里给出<a href=http://jingyan.baidu.com/article/a65957f4e91ccf24e77f9b11.html>Windows平台的设置教程</a>，其他平台大同小异<br>设置ssh key完成后，修改<code>moka.config.json</code> deploy与bak url字段即可，改成对应repo的url.</p></li></ol><h2 id=document><a href=#document aria-hidden=true><span class="icon icon-link"></span></a>Document</h2><p><code>Moka</code>, 认为前端UI与数据应该完全分离开来, 而不是像<code>hexo</code>那样传统的blog。 这样做的好处不言而喻, 可能第一次加载数据较多, 但是后续操作更加畅快, 网站体验更加优化了。</p><p>既然如此, 那么<code>Moka</code>产生的数据是什么样子的呢?</p><h3 id=数据格式><a href=#%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F aria-hidden=true><span class="icon icon-link"></span></a>数据格式</h3><p><code>Moka</code> 采用主流的<code>json</code>字符串</p><p><code>$ moka generate</code> 后产生的json如下</p><pre><code class="hljs language-json"data-query={} data-lang=json>{\n    <span class=hljs-attr>"main"</span>: {\n        <span class=hljs-attr>"filename"</span>: {\n            <span class=hljs-attr>"content"</span>: <span class=hljs-string>"..."</span>,\n            <span class=hljs-attr>"head"</span>: {\n                <span class=hljs-attr>"date"</span>: <span class=hljs-string>""</span>,\n                <span class=hljs-attr>"title"</span>: <span class=hljs-string>""</span>,\n                <span class=hljs-attr>"tags"</span>: [tagnames...] or <span class=hljs-string>"tagname"</span>\n            }\n        }\n    },\n    <span class=hljs-attr>"index"</span>: {\n        <span class=hljs-attr>"sorted"</span>: [filenames...],\n        <span class=hljs-attr>"tagMap"</span>: {\n            <span class=hljs-attr>"tagname"</span>: [filenames...]\n        }\n    }\n}</code></pre><p>说明</p><ul><li><code>"content"</code>可以通过配置控制, 返回<code>markdown</code>或者<code>html</code>(请看下文配置<code>returnRaw</code>说明)</li><li><code>"head"</code>表示在文章中头部<code>---...---</code>中解析出来的数据, tags 可以是Array(多个)或String(单个)</li><li><code>"sorted"</code>为按照时间倒序的filenames数组</li><li><code>"tagMap"</code>为所有tag的映射, 即哪些文章包含<code>"tagname"</code></li></ul><h3 id=配置说明><a href=#%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E aria-hidden=true><span class="icon icon-link"></span></a>配置说明</h3><p>主要包含 <code>default config</code>, <code>moka.config.json</code>, <code>theme.config.json</code>, <code>theme.config.js</code></p><ul><li><p><code>default config</code> 为<code>Moka</code>初始配置, 不推荐修改</p><pre><code class="hljs language-js"data-query={} data-lang=js>{\n <span class=hljs-attr>theme</span>: <span class=hljs-string>"moka"</span>, <span class=hljs-comment>// 当前主题</span>\n apiRoot: <span class=hljs-string>"moka_api"</span>, <span class=hljs-comment>// moka generate 数据和配置 所存放的文件夹</span>\n \n skipRegExp: <span class=hljs-string>"/[^\\.(md|markdown)]$/"</span>, <span class=hljs-comment>// 在 _articles 中渲染忽略的文件名正则表达式</span>\n \n timeFormat: <span class=hljs-string>"YYYY/MM/DD HH:mm:ss"</span>, <span class=hljs-comment>// 默认产生的时间格式 (参看moment.js)</span>\n\n <span class=hljs-comment>// marked 配置参看(marked.js: https://github.com/chjj/marked)</span>\n marked: {\n     <span class=hljs-attr>options</span>: {\n         <span class=hljs-attr>gfm</span>: <span class=hljs-literal>true</span>,\n         <span class=hljs-attr>tables</span>: <span class=hljs-literal>true</span>,\n         <span class=hljs-attr>breaks</span>: <span class=hljs-literal>false</span>,\n         <span class=hljs-attr>pedantic</span>: <span class=hljs-literal>false</span>,\n         <span class=hljs-attr>sanitize</span>: <span class=hljs-literal>false</span>,\n         <span class=hljs-attr>smartLists</span>: <span class=hljs-literal>true</span>,\n         <span class=hljs-attr>smartypants</span>: <span class=hljs-literal>false</span>,\n         <span class=hljs-attr>highlight</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>code</span>) </span>{\n             <span class=hljs-keyword>return</span> <span class=hljs-built_in>require</span>(<span class=hljs-string>\'highlight.js\'</span>).highlightAuto(code).value;\n         }\n     },\n     <span class=hljs-attr>setup</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>renderer</span>) </span>{\n         renderer.heading = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>text, level</span>) </span>{\n             <span class=hljs-keyword>var</span> escapedText = text.toLowerCase().replace(<span class=hljs-regexp>/[^\\w]+/g</span>, <span class=hljs-string>\'-\'</span>);\n\n             <span class=hljs-keyword>return</span> <span class=hljs-string>\'&lt;h\'</span> + level + <span class=hljs-string>\'>&lt;a name="\'</span> +\n                 escapedText +\n                 <span class=hljs-string>\'" class="anchor" href="#\'</span> +\n                 escapedText +\n                 <span class=hljs-string>\'">&lt;span class="header-link">&lt;/span>&lt;/a>\'</span> +\n                 text + <span class=hljs-string>\'&lt;/h\'</span> + level + <span class=hljs-string>\'>\'</span>;\n         }\n     }\n },\n\n <span class=hljs-attr>returnRaw</span>: <span class=hljs-literal>false</span>,  <span class=hljs-comment>// * 是否返回markdown字符串, 那么需要主题自己转换markdown</span>\n title: <span class=hljs-string>\'Blog\'</span>,\n <span class=hljs-attr>favicon</span>: <span class=hljs-string>"favicon.ico"</span>, <span class=hljs-comment>// 网站图标</span>\n injectScript: <span class=hljs-literal>true</span>,  <span class=hljs-comment>// 是否注入`moka.inject.js`</span>\n themeBuild: <span class=hljs-string>"build"</span> <span class=hljs-comment>// 将会取 themes/moka/build 中文件放到 static 中, 认为build为生产环境代码</span>\n}</code></pre></li><li><p><code>moka.config.json</code> 为全局站点配置, 在<code>apiRoot</code>中可以得到</p><pre><code class="hljs language-js"data-query={} data-lang=js>{\n    <span class=hljs-string>"theme"</span>: <span class=hljs-string>"moka"</span>,\n    <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Blog"</span>,\n    <span class=hljs-string>"favicon"</span>: <span class=hljs-string>"favicon.ico"</span>,\n    <span class=hljs-string>"author"</span>: <span class=hljs-string>"moyu"</span>,\n    <span class=hljs-string>"description"</span>: <span class=hljs-string>"moyu Blog"</span>,\n    <span class=hljs-string>"siteName"</span>: <span class=hljs-string>"site"</span>,\n    \n    <span class=hljs-comment>// moka generate 配置</span>\n    <span class=hljs-string>"deploy"</span>: {\n        <span class=hljs-string>"type"</span>: <span class=hljs-string>"git"</span>,\n        <span class=hljs-string>"url"</span>: <span class=hljs-string>"https://github.com/moyuyc/moyuyc.github.io.git"</span>,\n        <span class=hljs-string>"branch"</span>: <span class=hljs-string>"master"</span>\n    }\n}</code></pre></li><li><p><code>theme.config.json</code> 为主题配置, 在<code>apiRoot</code>中可以得到, 完全为主题开发者自定义</p><p>关于默认主题配置说明, 请看<a href=THEME_README.md>theme readme</a></p></li><li><p><code>theme.config.js</code> 为了主题开放者也能够控制<code>Moka</code>产生数据, 可以修改该文件, 从而覆盖默认配置</p><pre><code data-query={} data-lang>module.exports = {\n    apiRoot: "moka_api",\n    skipRegExp: "/[^\\.(md|markdown)]$/",\n    //http://momentjs.com/\n    timeFormat: \'YYYY-MM-DD HH:mm\', // 返回的时间格式\n\n    marked: {\n        options: {\n            gfm: true,\n            tables: true,\n            breaks: false,\n            pedantic: false,\n            sanitize: false,\n            smartLists: true,\n            smartypants: false\n        },\n        setup: function (renderer) {\n            // 在这里控制renderer规则, 详细请看 marked\n        }\n    },\n    \n    returnRaw: false,\n    themeBuild: "build",\n}\n</code></pre></li></ul><h3 id=闲话><a href=#%E9%97%B2%E8%AF%9D aria-hidden=true><span class="icon icon-link"></span></a>闲话</h3><p>开发者可以通过<code>ajax/fetch/...</code>异步获取 <code>apiRoot</code>配置下的<code>db.json/moka.config.json/theme.config.json</code></p><p>然后尽情用<code>react/vue/webpack/...</code>开发自己喜欢的主题吧。</p><p>还有默认主题是用<code>react/webpack</code>开发的, 但...不幸的是, 本人误操作把源码都删了..., 但万幸的是...留下了build, 生产环境的代码...</p><p><a href=https://github.com/moyuyc/moka>star</a></p><h2 id=moka主题配置><a href=#moka%E4%B8%BB%E9%A2%98%E9%85%8D%E7%BD%AE aria-hidden=true><span class="icon icon-link"></span></a>Moka主题配置</h2><p>默认主题是用<code>react/webpack</code>开发的, 但...不幸的是, 本人误操作把源码都删了..., 但万幸的是...留下了build, 生产环境的代码...</p><pre><code class="hljs language-js"data-query={} data-lang=js>{\n  <span class=hljs-string>"avatar"</span>: <span class=hljs-string>"/head.jpg"</span>, <span class=hljs-comment>// 头像</span>\n  <span class=hljs-string>"title"</span>: <span class=hljs-string>" Moyu Dev Blog "</span>, <span class=hljs-comment>// 网站title</span>\n  <span class=hljs-string>"description"</span>: <span class=hljs-string>" Web, Node C/C++ Dev "</span>,\n\n  <span class=hljs-string>"mainInfoColor"</span>: <span class=hljs-string>""</span>, <span class=hljs-comment>// 首页信息的文字颜色, 默认白色</span>\n  <span class=hljs-string>"canvasColor"</span>: <span class=hljs-string>""</span>,   <span class=hljs-comment>// 首页飘散的雪花颜色</span>\n\n  <span class=hljs-string>"leftPercentage"</span>: <span class=hljs-number>50</span>,<span class=hljs-comment>// 左侧百分比, 右侧将会自动为100-leftPercentage, &lt;=0 将会在非首页页面隐藏left</span>\n\n  <span class=hljs-string>"pageSize"</span>: <span class=hljs-number>6</span>, <span class=hljs-comment>// 每页文章数目, &lt;=0 一页展示所有</span>\n  <span class=hljs-string>"summaryNum"</span>: <span class=hljs-number>50</span>, <span class=hljs-comment>// 摘要的文字截断字数</span>\n\n  <span class=hljs-string>"postTarget"</span>: <span class=hljs-string>"_blank"</span>, <span class=hljs-comment>// 文章中link的跳转方式</span>\n  <span class=hljs-string>"iconTarget"</span>: <span class=hljs-string>"_blank"</span>, <span class=hljs-comment>// 左侧icon的link的跳转方式</span>\n  <span class=hljs-string>"projectTarget"</span>: <span class=hljs-string>"_blank"</span>, <span class=hljs-comment>// project中link的跳转方式</span>\n\n  <span class=hljs-string>"home"</span>: { <span class=hljs-comment>// 首页中右侧文字内容</span>\n    <span class=hljs-string>"title"</span>: <span class=hljs-string>"About Me"</span>,\n    <span class=hljs-string>"contentHtml"</span>: <span class=hljs-string>"&lt;p>I’m a Javascript enthusiast. I organise Baidu BEFE Meetup and try my best to help out with the team. I’m also a member of the core dev team.&lt;/p>&lt;p>&lt;img class=\'emoji\' src=\'http://emojipedia-us.s3.amazonaws.com/cache/08/84/088419f4d97c19762c29008c4a89bbf4.png\'/>&lt;/p>"</span>\n  },\n  <span class=hljs-comment>// projects</span>\n  <span class=hljs-string>"projects"</span>: [\n    {\n      <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Theme"</span>,\n      <span class=hljs-string>"state"</span>: <span class=hljs-string>"Doing"</span>, <span class=hljs-comment>//可无</span>\n      <span class=hljs-string>"image"</span>: <span class=hljs-string>"https://raw.githubusercontent.com/TaylanTatli/Ramme/master/assets/img/screenshot-post.png"</span>\n      <span class=hljs-string>"link"</span>: <span class=hljs-string>""</span> <span class=hljs-comment>// 点击跳转地址</span>\n    },\n    {\n      <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Theme"</span>,\n      <span class=hljs-string>"state"</span>: <span class=hljs-string>"Doing"</span>,\n      <span class=hljs-string>"image"</span>: <span class=hljs-string>"https://raw.githubusercontent.com/TaylanTatli/Ramme/master/assets/img/screenshot-post.png"</span>\n    },\n    {\n      <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Theme"</span>,\n      <span class=hljs-string>"state"</span>: <span class=hljs-string>"Doing"</span>,\n      <span class=hljs-string>"image"</span>: <span class=hljs-string>"https://raw.githubusercontent.com/TaylanTatli/Ramme/master/assets/img/screenshot-post.png"</span>\n    },\n    {\n      <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Theme"</span>,\n      <span class=hljs-string>"state"</span>: <span class=hljs-string>"Doing"</span>,\n      <span class=hljs-string>"image"</span>: <span class=hljs-string>"https://raw.githubusercontent.com/TaylanTatli/Ramme/master/assets/img/screenshot-post.png"</span>\n    },\n    {\n      <span class=hljs-string>"title"</span>: <span class=hljs-string>"Moyu Theme"</span>,\n      <span class=hljs-string>"state"</span>: <span class=hljs-string>"Doing"</span>,\n      <span class=hljs-string>"image"</span>: <span class=hljs-string>"https://raw.githubusercontent.com/TaylanTatli/Ramme/master/assets/img/screenshot-post.png"</span>\n    }\n  ],\n\n  <span class=hljs-string>"icon"</span>: [ <span class=hljs-comment>// 左侧icons key命名参看font-awesome.css</span>\n    {\n      <span class=hljs-string>"github"</span>: <span class=hljs-string>"https://github.com/moyuyc"</span>\n    }\n  ],\n\n  <span class=hljs-string>"coverImage"</span>: { <span class=hljs-comment>// 左侧封面</span>\n    <span class=hljs-string>"images"</span>: {\n      <span class=hljs-string>"tags"</span>: <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-gallery-image-3.jpg"</span>,\n      <span class=hljs-string>"home"</span>: <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-image-10.jpg"</span>,\n      <span class=hljs-string>"article"</span>: <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-gallery-image-3.jpg"</span>,\n      <span class=hljs-string>"serach"</span>: <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-image-10.jpg"</span>,\n      <span class=hljs-string>"notExist"</span>: <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-gallery-image-3.jpg"</span>,\n      <span class=hljs-string>"posts"</span>: [ <span class=hljs-comment>// posts可为数组(对于每一页), 可为字符串</span>\n        <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-image-10.jpg"</span>,\n        <span class=hljs-string>"http://taylantatli.me/Halve/images/home.png"</span>,\n        <span class=hljs-string>"http://taylantatli.me/Halve/images/unsplash-gallery-image-3.jpg"</span>\n      ]\n    },\n    \n    <span class=hljs-string>"articleCover"</span>: <span class=hljs-literal>true</span>   <span class=hljs-comment>// 是否开启文章封面, 在文章头部配置 `cover: ...` 效果请看默认文章`Linux C学习一周`</span>\n  }\n}</code></pre>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=Moka-birth.js.map