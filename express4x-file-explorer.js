webpackJsonp([69,90],{994:function(s,a){s.exports={content:'<h1 id="问题暴露"><a href="#%E9%97%AE%E9%A2%98%E6%9A%B4%E9%9C%B2" aria-hidden="true"><span class="icon icon-link"></span></a>问题暴露</h1>\n<p>之前做的<a href="http://moyuyc.github.io/2016/05/28/node-express-jade%E5%AE%9E%E7%8E%B0HTTP%E6%96%87%E4%BB%B6%E6%B5%8F%E8%A7%88%E5%99%A8/">HTTP浏览</a>是使用express2.x版本做的...，因为参考书比较旧了。\n1. <code>express2.x</code>中没有<code>express4.x</code>中的<code>res.sendFile()</code>方法，之前发送文件是使用的<code>stream.pipe()</code>方法，导致不支持继续下载，而且用户不能知道下载进度，在线音乐视频播放也不能选择时间跳跃欣赏。<code>res.sendFile()</code>方法可以将本地文件以静态资源发送给用户，所有问题迎刃而解。\n2. 旧版本不支持<code>java/c/cpp/js/css/html</code>等代码文件和<code>md/markdown</code>文件在线查看，所以进行改进。\n3. 利用<code>Bootstrap responsive utils</code>和<code>Bootstrap grid system</code>进行响应式布局。\n4. 监控<code>root.txt</code>文件，改变root后无需重启服务器。\n5. 去除对<code>q.js</code>依赖，使用原生<code>Promise</code></p>\n<!--more-->\n<h1 id="效果预览"><a href="#%E6%95%88%E6%9E%9C%E9%A2%84%E8%A7%88" aria-hidden="true"><span class="icon icon-link"></span></a>效果预览</h1>\n<ul>\n<li><code>json</code>文件查看\n<img src="http://obu9je6ng.bkt.clouddn.com/FnOfRikfqt_hiOB-pvRJkRglHOrG?imageslim" alt="ClipboardImage" width="989" height="597" /></li>\n<li><code>md</code>文件查看\n<img src="http://obu9je6ng.bkt.clouddn.com/Fm8FxD4yT4EN6cWR2PcGhzJRKA6s?imageslim" alt="ClipboardImage" width="1420" height="675" /></li>\n<li><code>html</code>文件查看\n<img src="http://obu9je6ng.bkt.clouddn.com/Fn4xKf6bLySUZs2uNfQr6yo1GtOu?imageslim" alt="ClipboardImage" width="1601" height="673" /></li>\n</ul>\n<h1 id="代码改进"><a href="#%E4%BB%A3%E7%A0%81%E6%94%B9%E8%BF%9B" aria-hidden="true"><span class="icon icon-link"></span></a>代码改进</h1>\n<h2 id="roottxt文件监控"><a href="#roottxt%E6%96%87%E4%BB%B6%E7%9B%91%E6%8E%A7" aria-hidden="true"><span class="icon icon-link"></span></a><code>root.txt</code>文件监控</h2>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-comment">//全局对象</span>\nglobal.root = fs.readFileSync(<span class="hljs-string">\'./root.txt\'</span>).toString().split(<span class="hljs-regexp">/\\s+/</span>)[<span class="hljs-number">0</span>];\nfs.watchFile(<span class="hljs-string">\'./root.txt\'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{\n  <span class="hljs-comment">//root.txt 文件修改后触发</span>\n  global.root = fs.readFileSync(<span class="hljs-string">\'./root.txt\'</span>).toString().split(<span class="hljs-regexp">/\\s+/</span>)[<span class="hljs-number">0</span>];\n});</code></pre>\n<h2 id="原生promise"><a href="#%E5%8E%9F%E7%94%9Fpromise" aria-hidden="true"><span class="icon icon-link"></span></a>原生<code>Promise</code></h2>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-keyword">var</span> statP = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">root,file</span>)</span>{\n\t<span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>)</span>{\n\t  fs.stat(root+<span class="hljs-string">\'/\'</span>+file,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, stats</span>) </span>{\n\t\t<span class="hljs-keyword">var</span> t = {};\n\t\t<span class="hljs-keyword">if</span>(err){\n\t\t\tt.reason=err;\n\t\t\tresolve(t);\n\t\t}\n\t\t<span class="hljs-keyword">else</span> {\n\t\t   t.state=<span class="hljs-string">\'ok\'</span>;\n\t       stats.name = file;\n\t       stats.type = stats.isDirectory()?<span class="hljs-string">\'文件夹\'</span>:<span class="hljs-string">\'文件\'</span>;\n\t\t   t.value=stats;\n\t       resolve(t);\n\t    }\n\t  });\n\t})\n};\n<span class="hljs-built_in">Promise</span>.all(files.map(<span class="hljs-function">(<span class="hljs-params">x,i,a</span>)=></span>{<span class="hljs-keyword">return</span> statP(r,x);}))\n    .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">results</span>) </span>{\n        <span class="hljs-keyword">var</span> values = [];\n        results.forEach(<span class="hljs-function"><span class="hljs-params">x</span>=></span>{\n            <span class="hljs-keyword">if</span>(x.state===<span class="hljs-string">\'ok\'</span>){\n                values.push(x.value);\n            }<span class="hljs-keyword">else</span>\n                <span class="hljs-built_in">console</span>.error(x.reason);\n        });\n        <span class="hljs-comment">//...render</span>\n    },<span class="hljs-built_in">console</span>.error);</code></pre>\n<h2 id="sendfile方法使用"><a href="#sendfile%E6%96%B9%E6%B3%95%E4%BD%BF%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a><code>sendFile</code>方法使用</h2>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript"><span class="hljs-comment">// noraw为url上的noraw参数值</span>\n<span class="hljs-keyword">if</span>(!!noraw){\n    <span class="hljs-comment">// f为文件名</span>\n    <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(avi|mp4|mkv|rmvb|mpg|rm|wma)$/i</span>)){\n        res.render(<span class="hljs-string">\'video\'</span>,o);\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(jpg|png|bmp|jpeg|gif)$/i</span>)){\n        res.render(<span class="hljs-string">\'img\'</span>,o);\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(mp3|wma|aac)$/i</span>)){\n        res.render(<span class="hljs-string">\'audio\'</span>,o);\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(md|markdown)$/i</span>)){\n        fs.readFile(file,(error,data) => {\n            <span class="hljs-keyword">if</span>(error) <span class="hljs-keyword">throw</span> error;\n            o.content = data.toString();\n            res.render(<span class="hljs-string">\'md\'</span>,o);\n        });\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(java|c|cpp|js|css|jsp|php|json|txt)$/i</span>)){\n        fs.readFile(file,(error,data) => {\n            <span class="hljs-keyword">if</span>(error) <span class="hljs-keyword">throw</span> error;\n            <span class="hljs-comment">// 在服务器渲染高亮代码方法被淘汰，因为对大文件调用下面方法十分耗时间，</span>\n            <span class="hljs-comment">// 而node为单线程，所以其他用户请求也会被阻塞，而且本用户也要等待很久。</span>\n            <span class="hljs-comment">// 所以选择在浏览器端解析。</span>\n            <span class="hljs-comment">// console.time(\'hl\');</span>\n            <span class="hljs-comment">// o.content=hl.highlightAuto(data.toString()).value;</span>\n            <span class="hljs-comment">// console.timeEnd(\'hl\');</span>\n            o.content = data.toString();\n            res.render(<span class="hljs-string">\'code\'</span>,o);\n        });\n    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(f.match(<span class="hljs-regexp">/\\.(html|htm)$/i</span>)){\n        fs.readFile(file,(error,data) => {\n            <span class="hljs-keyword">if</span>(error) <span class="hljs-keyword">throw</span> error;\n            o.content = data.toString();\n            res.render(<span class="hljs-string">\'html\'</span>,o);\n        });\n    }<span class="hljs-keyword">else</span>{\n        <span class="hljs-comment">// rela 为相对路径，root 为文件根目录</span>\n        res.sendFile(rela,{<span class="hljs-attr">root</span>:global.root});\n    }\n}<span class="hljs-keyword">else</span>{\n    res.sendFile(rela,{<span class="hljs-attr">root</span>:global.root});\n}</code></pre>\n<h2 id="layoutjade"><a href="#layoutjade" aria-hidden="true"><span class="icon icon-link"></span></a><code>layout.jade</code></h2>\n<pre><code class="hljs language-jade" data-query="{}" data-lang="jade">doctype\nhtml(<span class="hljs-attribute">lang</span>=<span class="hljs-string">"zh"</span>)\n  head\n    title= title\n    meta(<span class="hljs-attribute">name</span>=<span class="hljs-string">"renderer"</span>,content="webkit")\n    meta(<span class="hljs-attribute">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span>,content="IE=edge")\n    meta(<span class="hljs-attribute">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attribute">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>)\n    link(<span class="hljs-attribute">rel</span>=<span class="hljs-string">\'stylesheet\'</span>, <span class="hljs-attribute">href</span>=<span class="hljs-string">\'/stylesheets/bootstrap.min.css\'</span>)\n    link(<span class="hljs-attribute">rel</span>=<span class="hljs-string">\'stylesheet\'</span>, <span class="hljs-attribute">href</span>=<span class="hljs-string">\'/stylesheets/style.css\'</span>)\n    link(<span class="hljs-attribute">rel</span>=<span class="hljs-string">\'stylesheet\'</span>, <span class="hljs-attribute">href</span>=<span class="hljs-string">\'/stylesheets/hljs-github.min.css\'</span>)\n    link(<span class="hljs-attribute">rel</span>=<span class="hljs-string">\'stylesheet\'</span>, <span class="hljs-attribute">href</span>=<span class="hljs-string">\'/stylesheets/pilcrow.css\'</span>)\n    link(<span class="hljs-attribute">rel</span>=<span class="hljs-string">\'stylesheet\'</span>, <span class="hljs-attribute">href</span>=<span class="hljs-string">\'/stylesheets/github-markdown.css\'</span>)\n  body\n    block content</code></pre>\n<h2 id="codejade"><a href="#codejade" aria-hidden="true"><span class="icon icon-link"></span></a><code>code.jade</code></h2>\n<pre><code class="hljs language-jade" data-query="{}" data-lang="jade"><span class="hljs-keyword">extends </span>layout\n\n<span class="hljs-keyword">block </span>content\n    <span class="hljs-keyword">script(src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js")\n</span>    <span class="hljs-keyword">div.container-fluid\n</span>        h1=title\n        include <span class="hljs-keyword">btns\n</span>        <span class="hljs-keyword">div.markdown-body\n</span>            pre\n                code!=content\n        <span class="hljs-keyword">script </span>hljs.initHighlightingOnLoad()<span class="hljs-comment">;//自动寻找&#x3C;pre>&#x3C;code>&#x3C;/code>&#x3C;/pre>进行解析</span>\n        footer\n            p<span class="hljs-meta">.text</span>-center<span class="hljs-meta">.text</span>-info Running on node with Express, <span class="hljs-keyword">Jade. </span><span class="hljs-keyword">By </span>Moyu.</code></pre>\n<h2 id="mdjade"><a href="#mdjade" aria-hidden="true"><span class="icon icon-link"></span></a><code>md.jade</code></h2>\n<pre><code class="hljs language-jade" data-query="{}" data-lang="jade"><span class="hljs-comment">//</span>\n   Created by Yc on <span class="hljs-number">2016</span><span class="hljs-regexp">/6/</span><span class="hljs-number">9</span>.\n<span class="hljs-keyword">extends</span> layout\n\nblock content\n    script(src=<span class="hljs-string">"http://cdn.bootcss.com/marked/0.3.5/marked.min.js"</span>)\n    script(src=<span class="hljs-string">"http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"</span>)\n    <span class="hljs-keyword">div</span>.container-fluid\n        h1=title\n        <span class="hljs-keyword">include</span> btns\n        <span class="hljs-keyword">div</span>.row\n            <span class="hljs-keyword">div</span>.col-lg-<span class="hljs-number">6</span>.visible-lg\n                h2 解析前\n                <span class="hljs-keyword">div</span>.markdown-body\n                    pre\n                        code(id=<span class="hljs-string">\'markdown-raw\'</span>)=content <span class="hljs-comment">//"="会被转义(如 &#x3C; : &#x26;lt;),"!="不会</span>\n            <span class="hljs-keyword">div</span>.col-lg-<span class="hljs-number">6</span>\n                h2 解析后\n                <span class="hljs-keyword">div</span>.markdown-body(id=<span class="hljs-string">\'markdown-show\'</span>)\n        script(src=<span class="hljs-string">"/javascripts/md.js"</span>)\n        <span class="hljs-comment">//renderer 来自md.js</span>\n        script document.getElementById(<span class="hljs-string">\'markdown-show\'</span>).innerHTML = marked(document.getElementById(<span class="hljs-string">\'markdown-raw\'</span>).innerText,{renderer:renderer});\n        footer\n            p.text-center.text-info Running on node with Express, Jade. By Moyu.</code></pre>\n<h2 id="mdjs"><a href="#mdjs" aria-hidden="true"><span class="icon icon-link"></span></a><code>md.js</code></h2>\n<pre><code class="hljs language-javascript" data-query="{}" data-lang="javascript">~<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{\n    marked.setOptions({\n        <span class="hljs-attr">highlight</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">code</span>) </span>{\n            <span class="hljs-keyword">return</span> hljs.highlightAuto(code).value;\n        }\n    });\n    renderer = <span class="hljs-keyword">new</span> marked.Renderer();\n    <span class="hljs-keyword">var</span> map = {};\n    <span class="hljs-comment">//重写默认\'#\',\'##\'... 格式的转换方法</span>\n    renderer.heading = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">text, level</span>) </span>{<span class="hljs-comment">//level 表示层级，如#为1，##为2</span>\n        <span class="hljs-keyword">var</span> escapedText = text.toLowerCase();\n        <span class="hljs-comment">// 防止出现重复的锚点</span>\n        <span class="hljs-keyword">if</span>(!!map[text])\n            escapedText+=<span class="hljs-string">\'-\'</span>+map[text]++;\n        <span class="hljs-keyword">else</span>\n            map[text]=<span class="hljs-number">1</span>;\n        <span class="hljs-keyword">return</span> <span class="hljs-string">\'&#x3C;h\'</span> + level + <span class="hljs-string">\'>&#x3C;a name="\'</span> +\n            escapedText +\n            <span class="hljs-string">\'" class="anchor" href="#\'</span> +\n            escapedText +\n            <span class="hljs-string">\'">&#x3C;span class="header-link">&#x3C;/span>&#x3C;/a>\'</span> +\n            text + <span class="hljs-string">\'&#x3C;/h\'</span> + level + <span class="hljs-string">\'>\'</span>;\n    };\n}();</code></pre>\n<h1 id="问题归纳"><a href="#%E9%97%AE%E9%A2%98%E5%BD%92%E7%BA%B3" aria-hidden="true"><span class="icon icon-link"></span></a>问题归纳</h1>\n<p><strong>通过url的noraw控制展示方式，对SEO不友好</strong>\nGitHub的解决方法是，在raw文件提供独立的三级域名<code>raw.githubusercontent.com/{username}/{repo}/{branch}/{file}</code></p>\n<p>后期希望更加完善这个web应用吧，比如在线查看压缩文件等功能。</p>\n<h1 id="代码地址"><a href="#%E4%BB%A3%E7%A0%81%E5%9C%B0%E5%9D%80" aria-hidden="true"><span class="icon icon-link"></span></a>代码地址</h1>\n<p><a href="https://github.com/moyuyc/http-file-explorer-express4.x">http-file-explorer-express4.x</a></p>\n<h1 id="参考资料"><a href="#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99" aria-hidden="true"><span class="icon icon-link"></span></a>参考资料</h1>\n<ul>\n<li><a href="https://github.com/mixu/markdown-styles">markdown-styles</a>: 提供高大上的CSS样式。</li>\n<li><a href="https://github.com/chjj/marked">marked</a>: 提供强大的markdown格式转化API。</li>\n<li><a href="https://github.com/isagalaev/highlight.js">highlight.js</a>:  提供强大的code格式转化为具有class样式的标签，方便用户自定义样式。</li>\n<li><a href="http://www.expressjs.com.cn/4x/api.html#res.sendFile">express4.x</a>:  express4.x详细API文档。</li>\n</ul>\n',extra:{}}}});