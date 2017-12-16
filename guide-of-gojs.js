webpackJsonp([62,90],{1001:function(n,e){n.exports={content:'<h2 id="是什么"><a href="#%E6%98%AF%E4%BB%80%E4%B9%88" aria-hidden="true"><span class="icon icon-link"></span></a>是什么</h2>\n<p>首先，此gojs非彼gojs(图表库)</p>\n<p>\b该工具将 webpack v1 "内嵌"，\b\b可以很方便快捷的"搭建"一个commonjs前端执行环境。</p>\n<h2 id="概念"><a href="#%E6%A6%82%E5%BF%B5" aria-hidden="true"><span class="icon icon-link"></span></a>概念</h2>\n<p><code>gojs</code> 认为一个js文件就是一个入口(entry)</p>\n<h2 id="特征"><a href="#%E7%89%B9%E5%BE%81" aria-hidden="true"><span class="icon icon-link"></span></a>特征</h2>\n<ol>\n<li>\n<p>程序运行时，自动下载依赖包，包括：</p>\n<ul>\n<li>webpack中的loader</li>\n<li>gojs当前工作目录中的<code>.babelrc</code>\b配置</li>\n<li>js文件中静态<code>import/require</code>的依赖</li>\n</ul>\n<p>来自 <a href="https://github.com/webpack-contrib/npm-install-webpack-plugin">npm install webpack plugin</a>  </p>\n</li>\n<li>\n<p>入口动态添加，如：</p>\n<p>文件目录结构如下：</p>\n<pre><code data-query="{}" data-lang="">go-js-test/\n├── a/\n│   ├── a/\n│   ├── jq.html\n│   ├── jq.js\n│   ├── style.css\n│   └── style.less\n├── jq.js\n└── react.js\n</code></pre>\n<ol>\n<li>在 <code>go-js-test/</code> 下执行 <code>gojs .</code></li>\n<li>请求 <code>/jq.js</code></li>\n<li>添加 <code>jq.js</code> 至入口中, webpack building....</li>\n<li>请求 <code>a/jq.js</code></li>\n<li>添加 <code>a/jq.js</code> 至入口中, webpack building....</li>\n</ol>\n</li>\n<li>\n<p>颗粒化 webpack compiler 和 \bHMR 的处理  </p>\n<p>在第二点(入口动态添加)中，对于<code>jq.js</code>和<code>a/jq.js</code>两个入口，分别<strong>各自对应webpack compiler 和 \bHMR 单元</strong>。\n也就是说，<code>jq.js</code>和<code>a/jq.js</code>是两个相互独立的webpack处理单元。\n那么这样给我们带来什么便利呢？</p>\n<ol>\n<li>如果<code>jq.js</code>中出错，在<code>a/jq.js</code>中是不被察觉的。</li>\n<li>后面加入的<code>a/jq.js</code>入口，不影响<code>jq.js</code>入口，所以之前对<code>jq.js</code>的webpack bundle cache是依然生效的。（对比与 一股脑将2个入口重新用一个webpack单元处理）</li>\n</ol>\n</li>\n</ol>\n<h2 id="适用于"><a href="#%E9%80%82%E7%94%A8%E4%BA%8E" aria-hidden="true"><span class="icon icon-link"></span></a>适用于</h2>\n<p>适用于一些小型项目或者demo的快速搭建开发。\n如，<code>package.json</code>中</p>\n<pre><code data-query="{}" data-lang="">{\n    ...\n    "scripts": {\n        "start": "gojs -i demo.js"\n    },\n    ...\n    "devDependencies": {\n        "go-js": "^1.2.4"\n    }\n}\n</code></pre>\n<p>用户只需要执行</p>\n<pre><code data-query="{}" data-lang="">npm install &#x26;&#x26; npm start\n</code></pre>\n<p>就可以直接看到demo.js了！</p>\n<h2 id="预览"><a href="#%E9%A2%84%E8%A7%88" aria-hidden="true"><span class="icon icon-link"></span></a>预览</h2>\n<iframe width="500" height="300" src="https://www.youtube.com/embed/VDfcNhSxbQY" frameborder="0" allowfullscreen></iframe>\n<h2 id="使用"><a href="#%E4%BD%BF%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a>使用</h2>\n<ul>\n<li>cli</li>\n</ul>\n<pre><code data-query="{}" data-lang="">npm install -g go-js\ngojs -h  # 查看帮助\n</code></pre>\n<ul>\n<li>package</li>\n</ul>\n<pre><code data-query="{}" data-lang="">const GoJS = require(\'go-js\')\nconst gojs = new GoJS({\n    verbose: true,\n    path: \'.\',\n    type: \'js\',\n    port: null\n})\n\ngojs.start(function(error, port) {\n    console.log(\'server listening on \'+port)\n    \n    // gojs.stop()\n})\n\ngojs.on(\'error\', error => {})\ngojs.on(\'server\', port => {})\ngojs.on(\'request\', (req, res, start) => {})\ngojs.on(\'addEntry\', entry => {})\ngojs.on(\'rmEntry\', entry => {})\ngojs.on(\'watch\', (type, filePath) => {})\n</code></pre>\n',extra:{}}}});