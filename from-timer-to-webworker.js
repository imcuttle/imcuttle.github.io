webpackJsonp([90,113],{1173:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=前言><a href=#%E5%89%8D%E8%A8%80 aria-hidden=true><span class="icon icon-link"></span></a>前言</h1><p>首先，JavaScript是单线程执行的，也就是同一时间只有你的一份js代码在运行（不论你cpu几核，os是以线程为基本单位分配任务调度的，为了利用多核cpu的优势，HTML5提出Web Worker标准，本文会讲到）， 那么JavaScript中的<code>setInterval</code>和<code>setTimeout</code> api是什么工作原理呢？</p><!--more--><h1 id=javascript事件循环><a href=#javascript%E4%BA%8B%E4%BB%B6%E5%BE%AA%E7%8E%AF aria-hidden=true><span class="icon icon-link"></span></a>JavaScript事件循环</h1><img src=false alt=ClipboardImage width=626 height=252 data-src=http://obu9je6ng.bkt.clouddn.com/Fi6SAvEO2F7QIveMXHvnKJpsDNlu?imageslim> 如图，EventEmitters为事件发起者，比如你点击按钮，异步请求完成触发回调函数，定时器时间到了，事件触发...（这些是由多线程的浏览器来实现的）； Events为事件队列，表示亟待处理的事件，Event Handlers表示从事件队列中取出队首的事件，在堆、栈中的进行函数调用，语句运行。 明白了JavaScript的事件循环后，我们再来看看`setInterval`和`setTimeout`。<h1 id=再探-setinterval-settimeout><a href=#%E5%86%8D%E6%8E%A2-setinterval-settimeout aria-hidden=true><span class="icon icon-link"></span></a>再探 setInterval setTimeout</h1><h2 id=定时器原理><a href=#%E5%AE%9A%E6%97%B6%E5%99%A8%E5%8E%9F%E7%90%86 aria-hidden=true><span class="icon icon-link"></span></a>定时器原理</h2><p>先看下面这段代码</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-built_in>console</span>.log(<span class=hljs-number>1</span>);\nsetInterval(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n\t<span class=hljs-built_in>console</span>.log(<span class=hljs-string>\'interval\'</span>);\n},<span class=hljs-number>1</span>);\n<span class=hljs-keyword>var</span> i = <span class=hljs-number>10</span>;\n<span class=hljs-keyword>while</span>(i--><span class=hljs-number>0</span>);\n<span class=hljs-built_in>console</span>.log(<span class=hljs-number>2</span>);\nsetTimeout(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n\t<span class=hljs-built_in>console</span>.log(<span class=hljs-string>\'timeout\'</span>);\n},<span class=hljs-number>0</span>);\n<span class=hljs-built_in>console</span>.log(<span class=hljs-number>3</span>);</code></pre><p>从事件循环角度解析下这段代码，首先执行<code>console.log(1);</code> 没问题，So Easy，然后继续，执行到<code>setInterval</code>， 时间为 1ms ，于是<strong>在1ms之后将setInterval的处理函数加入到事件队列中</strong>，于此同时，继续执行直到<code>setTimeout</code>， 于是<strong>在0ms之后将setTimeout的处理函数加入到事件队列中</strong>，最后执行完<code>console.log(3);</code>后，再从事件队列中取事件处理。 <strong>也就是说，定时器中的时间指的是过多少时间将处理函数加入到事件队列中，而不是立即执行</strong> 明白了上面的解释后，如果</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> i = <span class=hljs-number>10</span>;\n<span class=hljs-keyword>while</span>(i--><span class=hljs-number>0</span>);\n<span class=hljs-built_in>console</span>.log(<span class=hljs-number>2</span>);</code></pre><p>这段代码执行时间<strong>大于1ms</strong>，则setInterval在setTimeout之前加入事件队列，输出就应该如下</p><pre><code data-query={} data-lang>1\n2\n3\ninterval\ntimeout\n...\n</code></pre><h2 id=重复的定时器><a href=#%E9%87%8D%E5%A4%8D%E7%9A%84%E5%AE%9A%E6%97%B6%E5%99%A8 aria-hidden=true><span class="icon icon-link"></span></a>重复的定时器</h2><h3 id=setinterval问题暴露><a href=#setinterval%E9%97%AE%E9%A2%98%E6%9A%B4%E9%9C%B2 aria-hidden=true><span class="icon icon-link"></span></a>setInterval问题暴露</h3><ul><li>场景重现 某个click事件处理程序使用<code>setInterval</code>设置了一个200ms时间间隔的重复定时器，click处理程序花了300ms时间，定时器代码花了400ms时间。</li><li>问题存在</li></ul><table><thead><tr><th>时刻</th><th>描述</th></tr></thead><tbody><tr><td>0ms</td><td>进入click事件处理程序</td></tr><tr><td>5ms</td><td>创建setInterval定时器</td></tr><tr><td>205ms</td><td>定时器事件添加至事件队列</td></tr><tr><td>300ms</td><td>click处理完成，取出定时器事件，进入定时器代码</td></tr><tr><td>405ms</td><td>事件队列中不存在定时器代码，添加定时器事件至队列</td></tr><tr><td>605ms</td><td>事件队列中存在定时器代码，定时器事件未至队列</td></tr><tr><td>700ms</td><td>定时器代码执行完毕，取出下一个事件队列中事件（定时器代码）</td></tr></tbody></table><p><strong>可以看到，300ms-700ms执行完定时器代码后，紧接着下一个事件依旧是定时器事件，而不是预想的200ms</strong></p><h3 id=问题解决><a href=#%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3 aria-hidden=true><span class="icon icon-link"></span></a>问题解决</h3><p>可以用下列链式setTimeout解决该问题</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript>setTimeout(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n\t<span class=hljs-comment>//do something</span>\n\tsetTimeout(<span class=hljs-built_in>arguments</span>.callee,interval);\n},interval);</code></pre><h3 id=举一反三><a href=#%E4%B8%BE%E4%B8%80%E5%8F%8D%E4%B8%89 aria-hidden=true><span class="icon icon-link"></span></a>举一反三</h3><p>html5新增的api <code>requestAnimationFrame</code>，原理与<code>setTimeout</code>一致，详细参考<a href=/2016/04/23/requestAnimationFrame_Vs_setInterval/>requestAnimationFrame Vs setInterval</a> <strong><code>setTimeout</code>,<code>requestAnimationFrame</code>注意放处理函数最后。</strong></p><h1 id=javascript优劣><a href=#javascript%E4%BC%98%E5%8A%A3 aria-hidden=true><span class="icon icon-link"></span></a>JavaScript优劣</h1><ul><li><p>优点 单线程简单，通过事件循环实现并发。而不是传统的请求-等待-响应模式。</p></li><li><p>缺点 单线程，不能充分利用多核CPU性能。</p></li></ul><h1 id=web-workers><a href=#web-workers aria-hidden=true><span class="icon icon-link"></span></a>Web Workers</h1><p>为了解决JavaScript单线程带来的不便，HTML5引入了Web Workers规范。 能够解决长时间运行的JavaScript脚本导致页面"冻结"的问题。 效果对比可以查看<a href=http://moyuyc.xyz/painter>KMenus图像算法优化前</a> 和 <a href=/htm/painter>KMenus图像算法优化后</a> 选择Image Choose，选择图片，点击画板放置图片后，点击K-Menus后，你会发现好像没发生什么事情一样。 其实在后台已经创建了一个Worker，处理冗长的K-Menus图像聚类算法了，而你能继续享受流畅的用户体验。 耐心等待一段时间，处理的结果才会返回回来，显示在界面上。 <img src=false alt=ClipboardImage width=1544 height=868 data-src=http://obu9je6ng.bkt.clouddn.com/FsZ_zH_gMSjd_JdVPTx_rUo2jHB0?imageslim></p><p>代码如下</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> worker = <span class=hljs-keyword>new</span> Worker(<span class=hljs-string>"js/algorithm.js"</span>);\n<span class=hljs-comment>//发送data至worker中</span>\nworker.postMessage(data);\n<span class=hljs-comment>//worker处理完数据后的回调函数</span>\nworker.onmessage = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>ext</span>) </span>{\n\t<span class=hljs-keyword>var</span> data = ext.data;  <span class=hljs-comment>//worker处理后返回的数据</span>\n}</code></pre><p><code>js/algorithm.js</code></p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript>onmessage = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>evt</span>) </span>{\n\t<span class=hljs-keyword>var</span> data = evt.data;<span class=hljs-comment>//worker接受到的数据</span>\n\t<span class=hljs-comment>//do something about data</span>\n\tpostMessage(data);<span class=hljs-comment>//发送处理后的数据</span>\n}</code></pre>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=from-timer-to-webworker.js.map