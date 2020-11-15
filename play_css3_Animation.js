webpackJsonp([49,113],{1216:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><iframe src=/htm/css31.html style=width:100%;height:260px></iframe> 将鼠标移动至黑色方格上，或者点击黑色方格。<!--more--><h1 id=关于css3动画><a href=#%E5%85%B3%E4%BA%8Ecss3%E5%8A%A8%E7%94%BB aria-hidden=true><span class="icon icon-link"></span></a>关于CSS3动画</h1><h2 id=transform-translation><a href=#transform-translation aria-hidden=true><span class="icon icon-link"></span></a>transform? translation?</h2><h3 id=转换（transform）><a href=#%E8%BD%AC%E6%8D%A2%EF%BC%88transform%EF%BC%89 aria-hidden=true><span class="icon icon-link"></span></a>转换（transform）</h3><p>顾名思义，就是一些转换动作，如放大缩小( <code>scale</code> )，平移( <code>translate</code> )，旋转( <code>rotate</code> )，翻转( <code>skew</code> )等。 就是关于二维图形与三维模型的转换动作（矩阵变换，图形学中的东西，这里不深究）。 关于，三维空间的基本转换和少许组合转换，我做过类似的<a href=http://moyuyc.xyz/play_3d/play_3d_demo1.html>Demo</a> <strong>(请使用最新版的主流浏览器查看)</strong> <img src=false alt=ClipboardImage width=1911 height=878 data-src=http://obu9je6ng.bkt.clouddn.com/FtNOscEzzmaWRDZSdet7DYNfRDGL?imageslim> 参考资料</p><ul><li><a href=http://www.w3school.com.cn/css3/css3_2dtransform.asp>CSS3 2D 转换</a></li><li><a href=http://www.w3school.com.cn/css3/css3_3dtransform.asp>CSS3 3D 转换</a></li></ul><h3 id=过渡（translation）><a href=#%E8%BF%87%E6%B8%A1%EF%BC%88translation%EF%BC%89 aria-hidden=true><span class="icon icon-link"></span></a>过渡（translation）</h3><p>在CSS中的属性改变后，为了使用户体验更加良好，需要使用到过渡效果，使得属性变换更加平滑。</p><p>参考资料</p><ul><li><a href=http://www.w3school.com.cn/css3/css3_transition.asp>CSS3 过渡</a></li></ul><h2 id=animation><a href=#animation aria-hidden=true><span class="icon icon-link"></span></a>Animation?</h2><h3 id=动画（animation）><a href=#%E5%8A%A8%E7%94%BB%EF%BC%88animation%EF%BC%89 aria-hidden=true><span class="icon icon-link"></span></a>动画（Animation）</h3><p>可以将一系列复杂的css属性变化活动定义为一个动画，并且规定触发动画的次数或其他相关设定。</p><p>参考资料</p><ul><li><a href=http://www.w3school.com.cn/css3/css3_animation.asp>CSS3 动画</a></li></ul><h1 id=关于示例动画><a href=#%E5%85%B3%E4%BA%8E%E7%A4%BA%E4%BE%8B%E5%8A%A8%E7%94%BB aria-hidden=true><span class="icon icon-link"></span></a>关于示例动画</h1><h2 id=第一个「活跃」的蓝色方块><a href=#%E7%AC%AC%E4%B8%80%E4%B8%AA%E3%80%8C%E6%B4%BB%E8%B7%83%E3%80%8D%E7%9A%84%E8%93%9D%E8%89%B2%E6%96%B9%E5%9D%97 aria-hidden=true><span class="icon icon-link"></span></a>第一个「活跃」的蓝色方块</h2><h3 id=首先定义动画><a href=#%E9%A6%96%E5%85%88%E5%AE%9A%E4%B9%89%E5%8A%A8%E7%94%BB aria-hidden=true><span class="icon icon-link"></span></a>首先定义动画</h3><pre><code class="hljs language-css"data-query={} data-lang=css>@<span class=hljs-keyword>keyframes</span> animated_div\n{\n\t0%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(0deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>0px</span>;}\n\t25%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(20deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>0px</span>;}\n\t50%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(0deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>500px</span>;}\n\t55%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(0deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>500px</span>;}\n\t70%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(0deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>500px</span>;<span class=hljs-attribute>background</span>:<span class=hljs-number>#1ec7e6</span>;}\n\t100%\t{<span class=hljs-attribute>transform</span>: <span class=hljs-built_in>rotate</span>(-360deg);<span class=hljs-attribute>left</span>:<span class=hljs-number>0px</span>;}\n}</code></pre><p><code>@keyframes animated_div</code> 定义了一个名为 <code>animated_div</code> 的动画，这样我们就可以直接在后面使用这个动画了。 <code>xx%</code> 表示的是动画的进度，即最开始对应 <code>0%</code> 。 因为各公司浏览器都想自己搞垄断，所以为了兼容主流浏览器不得不重复一段代码了</p><pre><code class="hljs language-css"data-query={} data-lang=css>@-<span class=hljs-keyword>webkit</span>-<span class=hljs-keyword>keyframes</span> animated_div{<span class=hljs-comment>/*同样定义*/</span>}\n@-<span class=hljs-keyword>moz</span>-<span class=hljs-keyword>keyframes</span> animated_div{<span class=hljs-comment>/*同样定义*/</span>}\n@-<span class=hljs-keyword>o</span>-<span class=hljs-keyword>keyframes</span> animated_div{<span class=hljs-comment>/*同样定义*/</span>}</code></pre><h3 id=使用动画><a href=#%E4%BD%BF%E7%94%A8%E5%8A%A8%E7%94%BB aria-hidden=true><span class="icon icon-link"></span></a>使用动画</h3><pre><code class="hljs language-html"data-query={} data-lang=html><span class=hljs-tag>&lt;<span class=hljs-name>div</span> <span class=hljs-attr>style</span>=<span class=hljs-string>\'margin:30px;position:relative;animation: animated_div 2s infinite;padding:10px;display:inline-block;\'</span>></span>\n\tCSS3 Animation\n<span class=hljs-tag>&lt;/<span class=hljs-name>div</span>></span></code></pre><p><code>margin</code> <code>padding</code> 是用来美化距离的， <code>display:inline-block;</code> 将该元素变为行内块，不然 <code>div</code> 默认为块元素，将独占一整行。 <code>position:relative;</code> 是为了让 <code>left</code> <code>right</code> <code>bottom</code> <code>top</code> 凑效。 <code>animation: animated_div 2s infinite;</code> 使用刚刚我们定义的动画，动画的周期为2s，<code>infinite</code> 表示无限制的进行动画！</p><p>这样你就能看到第一个动画啦！</p><h2 id=关于两个小黑块><a href=#%E5%85%B3%E4%BA%8E%E4%B8%A4%E4%B8%AA%E5%B0%8F%E9%BB%91%E5%9D%97 aria-hidden=true><span class="icon icon-link"></span></a>关于两个小黑块</h2><h3 id=首先是定义样式><a href=#%E9%A6%96%E5%85%88%E6%98%AF%E5%AE%9A%E4%B9%89%E6%A0%B7%E5%BC%8F aria-hidden=true><span class="icon icon-link"></span></a>首先是定义样式</h3><ul><li>CSS</li></ul><pre><code class="hljs language-css"data-query={} data-lang=css><span class=hljs-selector-class>.magic-div</span>{\n\t<span class=hljs-attribute>width</span>: <span class=hljs-number>56px</span>;\n\t<span class=hljs-attribute>height</span>: <span class=hljs-number>50px</span>;\n\t<span class=hljs-attribute>padding</span>: <span class=hljs-number>10px</span>;\n\t<span class=hljs-attribute>line-height</span>:<span class=hljs-number>0</span>;<span class=hljs-comment>/* * */</span>\n\t<span class=hljs-attribute>background-color</span>:black;\n\t<span class=hljs-attribute>cursor</span>:pointer;\n}\n<span class=hljs-selector-class>.magic-div</span>><span class=hljs-selector-tag>span</span>{\n\t<span class=hljs-attribute>background-color</span>:white;\n\t<span class=hljs-attribute>margin-top</span>:<span class=hljs-number>20px</span>;\n\t<span class=hljs-attribute>vertical-align</span>: top;\n\t<span class=hljs-attribute>width</span>:<span class=hljs-number>100%</span>;\n\t<span class=hljs-attribute>height</span>:<span class=hljs-number>2px</span>;\n\t<span class=hljs-attribute>display</span>: inline-block;\n\n\t<span class=hljs-attribute>transition</span>:all .<span class=hljs-number>6s</span>; // 所有属性都有过渡效果\n}\n<span class=hljs-selector-class>.magic-div</span>><span class=hljs-selector-tag>span</span><span class=hljs-selector-pseudo>:first-child</span>{\n\t<span class=hljs-attribute>margin-top</span>:<span class=hljs-number>3px</span>;\n}</code></pre><ul><li>HTML</li></ul><pre><code class="hljs language-html"data-query={} data-lang=html><span class=hljs-tag>&lt;<span class=hljs-name>div</span> <span class=hljs-attr>style</span>=<span class=hljs-string>\'display:inline-block;\'</span> <span class=hljs-attr>class</span>=<span class=hljs-string>\'magic-div magic-div-right\'</span>></span>\n  <span class=hljs-tag>&lt;<span class=hljs-name>span</span>></span><span class=hljs-tag>&lt;/<span class=hljs-name>span</span>></span>\n  <span class=hljs-tag>&lt;<span class=hljs-name>span</span>></span><span class=hljs-tag>&lt;/<span class=hljs-name>span</span>></span>\n  <span class=hljs-tag>&lt;<span class=hljs-name>span</span>></span><span class=hljs-tag>&lt;/<span class=hljs-name>span</span>></span>\n<span class=hljs-tag>&lt;/<span class=hljs-name>div</span>></span></code></pre><p>这样你就能看到一个黑块中含有三条水平横线啦</p><h3 id=动画控制><a href=#%E5%8A%A8%E7%94%BB%E6%8E%A7%E5%88%B6 aria-hidden=true><span class="icon icon-link"></span></a><strong>动画控制</strong></h3><ul><li>第一个黑块</li></ul><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> div = <span class=hljs-built_in>document</span>.querySelector(<span class=hljs-string>\'.magic-div-right\'</span>);\n<span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-title>bind</span>(<span class=hljs-params>elem,type,fn</span>)</span>{\n\telem[type]=fn;\n\telem.addEventListener(type,elem[type]);\n}\nbind(div,<span class=hljs-string>\'mouseenter\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>e</span>)</span>{\n\t<span class=hljs-keyword>var</span> first = <span class=hljs-keyword>this</span>.firstElementChild,last = <span class=hljs-keyword>this</span>.lastElementChild, mid = first.nextElementSibling;\n\tfirst.style.transform=<span class=hljs-string>\'scale(.5) translate(35px,25px) rotate(45deg)\'</span>\n\tlast.style.transform=<span class=hljs-string>\'scale(.5) translate(35px,-25px) rotate(-45deg)\'</span>\n\tmid.style.opacity=<span class=hljs-string>\'1\'</span>;\n});\nbind(div,<span class=hljs-string>\'mouseleave\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>e</span>)</span>{\n\t<span class=hljs-keyword>var</span> first = <span class=hljs-keyword>this</span>.firstElementChild,last = <span class=hljs-keyword>this</span>.lastElementChild, mid = first.nextElementSibling;\n\tfirst.style.transform=last.style.transform=<span class=hljs-string>\'\'</span>;\n\tmid.style.opacity=<span class=hljs-string>\'1\'</span>;\n})\nbind(div,<span class=hljs-string>\'click\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>e</span>)</span>{\n\t<span class=hljs-keyword>var</span> first = <span class=hljs-keyword>this</span>.firstElementChild,last = <span class=hljs-keyword>this</span>.lastElementChild, mid = first.nextElementSibling;\n\tfirst.style.transform= <span class=hljs-string>\'rotate(45deg) translate(15px,15px)\'</span>;\n\tmid.style.opacity=<span class=hljs-string>\'0\'</span>;\n\tlast.style.transform = <span class=hljs-string>\'rotate(-45deg) translate(15px,-15px)\'</span>;\n});</code></pre><p>至于为什么需要定义一个 <code>bind</code> 函数，应该聪明的读者已经知道我要干什么了， <code>bind</code> 函数中 <code>elem[type]=fn;</code> 将事件处理函数绑定到元素中了， 在原生js中，元素有 <code>click()</code>,<code>focus()</code>,<code>blur()</code>...，这样的方法，可以直接调用对应的事件函数， 但是却没有类似 <code>jQuery</code> 中的 <code>mouseenter()</code>,<code>mouseleave()</code> 方法。 我这样做，能达到类似 <code>jQuery</code> 中的效果。</p><p>然后是函数中，一大堆的 <code>transform</code>,<code>scale(xx)</code>,<code>translate(xx,xx)</code>,<code>rotate(xx)</code>，也不难理解，只要上过初中平面几何就能明白了。 至于为什么会出现动态的效果，那都是多亏了样式中的 <code>transition:all .6s;</code></p><ul><li>第二个黑块 第二个黑块完全就是第一个黑块的孪生兄弟，可能有人会说了，这还不简单吗？直接copy第一份的代码，然后修改一下元素不就行了吗？ 这样的确可以，但是我是用的是另一种方法，使得代码缩减了许多。</li></ul><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> otherdiv = <span class=hljs-built_in>document</span>.querySelector(<span class=hljs-string>\'.magic-div-copy\'</span>);\nbind(otherdiv,<span class=hljs-string>\'mouseenter\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n\tdiv.mouseenter.call(<span class=hljs-keyword>this</span>);\n})\nbind(otherdiv,<span class=hljs-string>\'mouseleave\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>e</span>)</span>{\n\tdiv.mouseleave.call(<span class=hljs-keyword>this</span>);\n});\nbind(otherdiv,<span class=hljs-string>\'click\'</span>,<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params></span>)</span>{\n\tdiv.click.call(<span class=hljs-keyword>this</span>);\n})</code></pre><p><code>div.mouseenter.call(this);</code> 意思是将<code>div.mouseenter</code>方法调用，但是不是被div调用，而是被 <code>this</code> （即otherdiv）调用。 <code>call</code> 属于 Function原型中的方法，第一个参数是调用该函数的对象，后面还可以跟上函数的参数。 <code>apply</code> 对比 <code>call</code>，也是换汤不换药，不过函数的参数是以数组方式传入的。</p>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=play_css3_Animation.js.map