webpackJsonp([28,113],{1237:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=回忆><a href=#%E5%9B%9E%E5%BF%86 aria-hidden=true><span class="icon icon-link"></span></a>回忆</h1><p>上周百度面试问了我关于数组的 <code>clone</code> 方法的实现，当时没来得及细想，然后口头上说</p><blockquote><p>数组就是一串数据序列，可以遍历然后进行深拷贝即可。</p></blockquote><p>关于细节实现的东西都没想，然后面试官那边好像就无语了... 不过好在我提到了 <code>深拷贝</code> 这个关键字。</p><!--more--><h1 id=再探clone><a href=#%E5%86%8D%E6%8E%A2clone aria-hidden=true><span class="icon icon-link"></span></a>再探clone</h1><h2 id=浅复制><a href=#%E6%B5%85%E5%A4%8D%E5%88%B6 aria-hidden=true><span class="icon icon-link"></span></a>浅复制</h2><p>先看第一段代码</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>Array</span>.prototype.clone = <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n    <span class=hljs-keyword>return</span> <span class=hljs-keyword>this</span>.slice();\n}</code></pre><p>乍看一下，好像挺快捷方便的就完成了。实际上，懂得c++/java中浅拷贝/深拷贝的人一看便知道这只是实现了浅复制。 测试代码如下，</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> arr = [<span class=hljs-number>1</span>,<span class=hljs-keyword>new</span> <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>x</span>)</span>{\n                   <span class=hljs-keyword>this</span>.x=x;\n               }(<span class=hljs-number>3</span>)];\n<span class=hljs-keyword>var</span> clone = arr.clone();\nclone[<span class=hljs-number>1</span>].x=<span class=hljs-number>1</span>;\n<span class=hljs-built_in>console</span>.log(arr[<span class=hljs-number>1</span>].x) <span class=hljs-comment>// 1</span></code></pre><p>可以看到，<code>clone[1].x</code>改变导致<code>arr[1].x</code>改变，图示如下 <img src=false alt=ClipboardImage width=507 height=344 data-src=http://obu9je6ng.bkt.clouddn.com/FqCHIEcVbSalCKIPiUhEDlAcEnR8?imageslim></p><h2 id=深复制><a href=#%E6%B7%B1%E5%A4%8D%E5%88%B6 aria-hidden=true><span class="icon icon-link"></span></a>深复制</h2><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>Object</span>.prototype.clone = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n    <span class=hljs-keyword>var</span> clone = <span class=hljs-keyword>new</span> <span class=hljs-keyword>this</span>.constructor(); <span class=hljs-comment>//开辟新内存空间，保证clone出来的对象也有一个属性能够指向原对象的原型对象。</span>\n    <span class=hljs-keyword>for</span>(<span class=hljs-keyword>var</span> k <span class=hljs-keyword>in</span> <span class=hljs-keyword>this</span>){\n        <span class=hljs-keyword>if</span>(!<span class=hljs-keyword>this</span>.hasOwnProperty(k)) <span class=hljs-keyword>continue</span>;\n        <span class=hljs-keyword>if</span>(<span class=hljs-keyword>typeof</span> <span class=hljs-keyword>this</span>[k] === <span class=hljs-string>\'object\'</span>)\n            clone[k] = <span class=hljs-keyword>this</span>[k].clone();\n        <span class=hljs-keyword>else</span>\n            clone[k] = <span class=hljs-keyword>this</span>[k];\n    }\n    <span class=hljs-keyword>return</span> clone;\n};</code></pre><p>利用递归来实现Object实例的深复制(重新开辟一份内存空间)，如图 <img src=false alt=ClipboardImage width=624 height=327 data-src=http://obu9je6ng.bkt.clouddn.com/FkJZyQCbjx-o38csKs5ky9Bhf1hP?imageslim> 因为Array也属于Object，上面的代码也适用于Array</p><p><strong>不足之处：不能对DOM元素结点进行复制</strong></p>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=talk-about-javascript-object-and-array-deepclone.js.map