webpackJsonp([4,113],{486:function(s,a,n){s.exports=n.p+"img.png"},1151:function(s,a,n){s.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><img src=../../img.png data-image-loader=0> <img src=../../img.png data-image-loader=1><h1 id=介绍><a href=#%E4%BB%8B%E7%BB%8D aria-hidden=true><span class=\"icon icon-link\"></span></a>介绍</h1><p>看了网上许多介绍 <code>Promise</code> 的文章，终于知道 <code>Promise</code> 是什么，干什么的了。 首先需要指出的是，<strong>promise是es6提出的新标准之一</strong>，那么提出这个标准是用来做什么的呢？</p><!--more--><p>写过js代码的童鞋一定知道，异步回调函数是js的一大特点，那么异步回调函数带来的问题是什么呢？会造成函数嵌套过多，不宜于后期代码的维护，许多的<code>({})</code>也容易把我们搞得晕头转向。那么promise便是用来解决该问题。 那么es6提出这个标准，那么就得有人按照这个标准来实现吧，于是百家争鸣，出现许多库(以便在非浏览器环境下使用)，在这我介绍 <code>q.js</code>. <a href=https://github.com/kriskowal/q><code>q.js</code> github地址</a></p><h1 id=使用><a href=#%E4%BD%BF%E7%94%A8 aria-hidden=true><span class=\"icon icon-link\"></span></a>使用</h1><ul><li>安装<code>q.js</code> npm install q</li><li>使用</li></ul><ol><li>使用<code>Q.nfcall</code></li></ol><pre><code class=\"hljs language-javascript\"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> fs = <span class=hljs-built_in>require</span>(<span class=hljs-string>'fs'</span>),\n    Q   = <span class=hljs-built_in>require</span>(<span class=hljs-string>'q'</span>);\n<span class=hljs-keyword>var</span> promise = Q.nfcall(fs.readFile,<span class=hljs-string>'run.js'</span>);\npromise.then(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>data</span>)</span>{\n        <span class=hljs-built_in>console</span>.log(data);\n    },<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>err</span>)</span>{\n        <span class=hljs-built_in>console</span>.err(err);\n    });</code></pre><pre><code data-query={} data-lang>或者可以简写为下面\n    promise.then(console.log,console.err);\n</code></pre><ol start=2><li>使用<code>Q.deferd</code></li></ol><pre><code class=\"hljs language-javascript\"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> preadFile = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>file</span>)</span>{\n    <span class=hljs-keyword>var</span> deferred = Q.defer();\n    fs.readFile(file,  <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>error, text</span>) </span>{\n        <span class=hljs-keyword>if</span> (error) {\n            deferred.reject(<span class=hljs-keyword>new</span> <span class=hljs-built_in>Error</span>(error));\n        } <span class=hljs-keyword>else</span> {\n            deferred.resolve(text);\n        }\n    });\n    <span class=hljs-keyword>return</span> deferred.promise;\n};\npreadFile(<span class=hljs-string>'run.js'</span>).then(<span class=hljs-built_in>console</span>.log,<span class=hljs-built_in>console</span>.err);</code></pre><ol start=3><li>还可以用<code>Q.all</code>实现<strong>同步方式</strong></li></ol><pre><code class=\"hljs language-javascript\"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> promise = Q.all([Q.nfcall(fs.readFile,<span class=hljs-string>'run.js'</span>),preadFile(<span class=hljs-string>'event.js'</span>),preadFile(<span class=hljs-string>'nofound.js'</span>)]);\npromise.then(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>data</span>)</span>{<span class=hljs-built_in>console</span>.log(data.toString())},<span class=hljs-built_in>console</span>.error);</code></pre><pre><code data-query={} data-lang>因为`nofound.js`不存在所以会抛出异常，其他文件即使存在也不会正确执行.\n</code></pre><ol start=4><li>多层嵌套<strong>异步方式</strong></li></ol><pre><code class=\"hljs language-javascript\"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> preadFile = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>file</span>)</span>{\n    <span class=hljs-keyword>var</span> deferred = Q.defer();\n    fs.readFile(file,  <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>error, text</span>) </span>{\n        <span class=hljs-keyword>if</span> (error) {\n            deferred.reject(<span class=hljs-keyword>new</span> <span class=hljs-built_in>Error</span>(error));\n        } <span class=hljs-keyword>else</span> {\n            deferred.resolve({<span class=hljs-attr>data</span>:text,<span class=hljs-attr>file</span>:file});\n        }\n    });\n    <span class=hljs-keyword>return</span> deferred.promise;\n};\n\npreadFile(<span class=hljs-string>'run.js'</span>)\n    .then(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>d</span>) </span>{\n        <span class=hljs-built_in>console</span>.log(d);\n        <span class=hljs-keyword>return</span> d.file+<span class=hljs-string>'xx'</span>;\n    })\n    .then(preadFile)  <span class=hljs-comment>//上面return d.file 传递到preadFile中</span>\n    .then(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>d</span>) </span>{\n        <span class=hljs-built_in>console</span>.log(d);\n        <span class=hljs-keyword>return</span> d.file;\n    })\n    .catch(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>e</span>) </span>{\n        <span class=hljs-built_in>console</span>.log(e);\n    }).done(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>e</span>) </span>{<span class=hljs-comment>//最后一个then return的参数</span>\n        <span class=hljs-built_in>console</span>.log(e);\n    });</code></pre><pre><code data-query={} data-lang>上面的代码`run.js`将会正确输出，但是因为不存在`run.jsxx`文件所以会捕获错误，但不影响`run.js`的输出。\n</code></pre><h1 id=尾声><a href=#%E5%B0%BE%E5%A3%B0 aria-hidden=true><span class=\"icon icon-link\"></span></a>尾声</h1><p>更多的用法参考<a href=https://github.com/kriskowal/q><code>q.js</code> github地址</a> 原来我以前一直使用的 <code>$.ajax({}).fail().done()</code> 正是promise方式的一种。</p>",extra:{"_image-loader_":[n(486),n(486)],_progressive_:[]}}}});
//# sourceMappingURL=about-promise-and-qjs.js.map