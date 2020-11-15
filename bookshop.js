webpackJsonp([102,113],{1161:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=图书销售系统--书窝><a href=#%E5%9B%BE%E4%B9%A6%E9%94%80%E5%94%AE%E7%B3%BB%E7%BB%9F--%E4%B9%A6%E7%AA%9D aria-hidden=true><span class="icon icon-link"></span></a>图书销售系统 —— 书窝</h1><p><a href=http://bookshop.moyuyc.xyz><strong>书窝线上地址</strong></a> <a href=https://github.com/moyuyc/book-shopping><strong>GitHub地址</strong></a> 由于时间有限，事务较重，系统实现只好从简。</p><hr><h2 id=需求分析><a href=#%E9%9C%80%E6%B1%82%E5%88%86%E6%9E%90 aria-hidden=true><span class="icon icon-link"></span></a>需求分析</h2><blockquote><p>需交课程设计报告和软件（源代码）。课程设计报告将存档。报告内容包括：需求分析、算法思想描述、数据流图、E-R图、数据字典、程序结构、收获与体会等。 功能要求：实现一个基于web的网上图书的销售管理系统，能提供多种条件的查询，还应具有会员管理、意见反馈、销售分析等功能。将留言板、图表分析、文件上传等思想纳入其中。</p></blockquote><!--more--><h3 id=用户系统><a href=#%E7%94%A8%E6%88%B7%E7%B3%BB%E7%BB%9F aria-hidden=true><span class="icon icon-link"></span></a>用户系统</h3><p>需要用户系统，用户是系统的根源，是数据的源头，该系统的用户就是要求中所说的会员，所以需要提供如下功能：</p><ul><li>用户注册</li><li>用户登录</li><li>用户信息查看</li><li>用户既可以是卖家，亦可以是买家</li></ul><h3 id=用户留言信息反馈><a href=#%E7%94%A8%E6%88%B7%E7%95%99%E8%A8%80%E4%BF%A1%E6%81%AF%E5%8F%8D%E9%A6%88 aria-hidden=true><span class="icon icon-link"></span></a>用户留言(信息反馈)</h3><p>为了逐渐完善系统，提供用户与建站者的交流通道，并且该通道不仅限于用户与建站者，用户与用户之间也能够互相交流，提高趣味性。具体功能如下：</p><ul><li>用户留言</li><li>留言查看</li></ul><h3 id=卖家买家系统><a href=#%E5%8D%96%E5%AE%B6%E4%B9%B0%E5%AE%B6%E7%B3%BB%E7%BB%9F aria-hidden=true><span class="icon icon-link"></span></a>卖家买家系统</h3><p>买卖离不开卖家买家，该系统亦是如此，需要如下功能列表：</p><ul><li>卖家</li><li>图书上架</li><li>图书修改</li><li>图书查看</li><li>销售情况图表</li><li>买家</li><li>图书查看购买</li><li>买书记录查看</li><li>图书评论与删除</li></ul><hr><h2 id=设计文档><a href=#%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3 aria-hidden=true><span class="icon icon-link"></span></a>设计文档</h2><p>该部分将涉及整个系统从无到有的设计思路，自底向上有 1. 数据库选择和设计 2. 服务器框架选择和设计 3. 前端框架选择和设计</p><p>并且将针对具体细节给出相关表示，如数据字典，ER图，数据流图，算法设计等。</p><h3 id=数据库选择和设计><a href=#%E6%95%B0%E6%8D%AE%E5%BA%93%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%BE%E8%AE%A1 aria-hidden=true><span class="icon icon-link"></span></a>数据库选择和设计</h3><h4 id=选择与原因><a href=#%E9%80%89%E6%8B%A9%E4%B8%8E%E5%8E%9F%E5%9B%A0 aria-hidden=true><span class="icon icon-link"></span></a>选择与原因</h4><p>该系统我选择了<code>MySQL</code>数据库，具体原因如下： 1. <code>MySQL</code>十分轻量，相比课堂上讲的<code>SQL Server</code>数据库，一个安装包2GB，MySQL的500MB简直小巫见大巫（最近看到属于<code>NoSQL</code>的<code>MongoDB</code>居然只有100MB）。 2. 短时间需要完成该系统，同时对于<code>MySQL</code>十分熟悉，之前做在线订票系统，在线考试系统等都是建立在MySQL上。 3. 具有<code>SQLYog</code>这种强大方便的图形操作软件，轻松导入导出数据，轻松连接远程服务器传递数据。</p><p>基于以上原因，因此选择了<code>MySQL</code>。</p><h4 id=数据字典><a href=#%E6%95%B0%E6%8D%AE%E5%AD%97%E5%85%B8 aria-hidden=true><span class="icon icon-link"></span></a>数据字典</h4><p>用户</p><table><thead><tr><th>字段</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>username</td><td>varchar(12)</td><td>用户名,唯一, 6-12位</td></tr><tr><td>email</td><td>varchar(20)</td><td>电子邮箱,唯一</td></tr><tr><td>password</td><td>varchar(12)</td><td>密码,6-12位</td></tr><tr><td>registerDate</td><td>date</td><td>注册日期</td></tr></tbody></table><p>留言</p><table><thead><tr><th>字段</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>username</td><td>varchar(12)</td><td>留言者用户名</td></tr><tr><td>content</td><td>text</td><td>留言内容</td></tr><tr><td>datetime</td><td>datetime</td><td>留言时间</td></tr></tbody></table><p>图书</p><table><thead><tr><th>字段</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>bookID</td><td>char(8)</td><td>图书ID,唯一,如BK123456</td></tr><tr><td>title</td><td>varchar(25)</td><td>书名</td></tr><tr><td>author</td><td>varchar(25)</td><td>作者</td></tr><tr><td>press</td><td>varchar(25)</td><td>出版社</td></tr><tr><td>price</td><td>decimal(10,1)</td><td>价格,保留小数点后一位</td></tr><tr><td>quantity</td><td>int(11)</td><td>库存量(本)</td></tr><tr><td>image</td><td>mediumblob</td><td>封面图片</td></tr><tr><td>seller</td><td>varchar(12)</td><td>卖家用户名</td></tr><tr><td>importDate</td><td>date</td><td>上架日期</td></tr></tbody></table><p>图书评论</p><table><thead><tr><th>字段</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>username</td><td>varchar(12)</td><td>评论人用户名</td></tr><tr><td>bookID</td><td>char(8)</td><td>被评论图书</td></tr><tr><td>datetime</td><td>datetime</td><td>评论时间</td></tr><tr><td>content</td><td>text</td><td>评论内容</td></tr></tbody></table><p>交易 <strong>因为交易完成后，卖家仍然可以对图书进行修改，所以我将买进时图书信息都存放在此表中，表示买进时图书的信息。</strong></p><table><thead><tr><th>字段</th><th>类型</th><th>备注</th></tr></thead><tbody><tr><td>tradeID</td><td>char(10)</td><td>交易记录ID,唯一,如TD12345678</td></tr><tr><td>tradeDate</td><td>date</td><td>交易日期</td></tr><tr><td>buyer</td><td>varchar(12)</td><td>买家用户名</td></tr><tr><td>bookID</td><td>char(8)</td><td>书本ID</td></tr><tr><td>title</td><td>varchar(25)</td><td>书名</td></tr><tr><td>author</td><td>varchar(25)</td><td>作者</td></tr><tr><td>press</td><td>varchar(25)</td><td>出版社</td></tr><tr><td>price</td><td>decimal(10,1)</td><td>买进价格</td></tr><tr><td>quantity</td><td>int(11)</td><td>库存</td></tr><tr><td>image</td><td>mediumblob</td><td>封面</td></tr><tr><td>seller</td><td>varchar(12)</td><td>卖家</td></tr></tbody></table><h4 id=e-r图><a href=#e-r%E5%9B%BE aria-hidden=true><span class="icon icon-link"></span></a>E-R图</h4><img src=false alt=ClipboardImage width=1111 height=704 data-src=http://obu9je6ng.bkt.clouddn.com/FoxMZIrETvPN4uTkpBQL31CtwJ0T?imageslim><h3 id=服务器框架选择和设计><a href=#%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%A1%86%E6%9E%B6%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%BE%E8%AE%A1 aria-hidden=true><span class="icon icon-link"></span></a>服务器框架选择和设计</h3><h4 id=选择与原因-1><a href=#%E9%80%89%E6%8B%A9%E4%B8%8E%E5%8E%9F%E5%9B%A0-1 aria-hidden=true><span class="icon icon-link"></span></a>选择与原因</h4><p>作为<code>JS</code>动态语言的受益者，我服务器肯定就选择<code>nodejs</code>了。 1. 未使用过<code>nodejs</code>开发一个相对完整的系统，打算就将该系统作为入门了。 2. <code>nodejs</code>非常适合IO密集型的应用，采用的是异步事件队列的机制。 3. <code>JS</code>语言简洁灵活有趣。</p><h4 id=nodejs与express><a href=#nodejs%E4%B8%8Eexpress aria-hidden=true><span class="icon icon-link"></span></a><code>nodejs</code>与<code>express</code></h4><ul><li><code>nodejs</code> 基于ChromeV8引擎，以<code>JS</code>作为宿主语言的一个虚拟环境，<code>JS</code>于<code>NodeJs</code>可以看做是<code>Java</code>于<code>JVM</code>，<code>NodeJs</code>现在正在不断发展中，目标是与<code>Java</code>一样，能够形成一套十分完备的库，目前<code>NodeJs</code>的生态环境非常好，第三方模块层出不穷，而且由于<code>npm</code>，这些包是否方便管理与下载。</li><li><code>express</code> 介绍完<code>nodejs</code>，那么<code>express</code>是什么呢？<code>express</code>是<code>nodejs</code>的一个第三方Web框架，开发者可以用该框架非常方便有效的建立<code>HTTP</code>服务。</li></ul><h4 id=结构设计><a href=#%E7%BB%93%E6%9E%84%E8%AE%BE%E8%AE%A1 aria-hidden=true><span class="icon icon-link"></span></a>结构设计</h4><h5 id=文件结构><a href=#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84 aria-hidden=true><span class="icon icon-link"></span></a>文件结构</h5><img src=false alt=ClipboardImage width=465 height=676 data-src=http://obu9je6ng.bkt.clouddn.com/Ftoj335Z5Z0P3M_QKuXcg3qXn0ee?imageslim> `db/` 所有数据库操作代码 `public/` 静态资源库，如js,css `routes/` 路由操作diam，对应url `utils/` 工具包代码 `views/` Jade模板文件 `app.js` 系统入口 `mysql.sql` mysql数据文件，可导入<h5 id=部分数据流图><a href=#%E9%83%A8%E5%88%86%E6%95%B0%E6%8D%AE%E6%B5%81%E5%9B%BE aria-hidden=true><span class="icon icon-link"></span></a>部分数据流图</h5><ul><li>用户留言 <img src=false alt=ClipboardImage width=818 height=149 data-src=http://obu9je6ng.bkt.clouddn.com/Fhi1zedL3Ba8-JoHaxvQkan4Lg1Y?imageslim></li><li>卖家添加图书 <img src=false alt=ClipboardImage width=628 height=183 data-src=http://obu9je6ng.bkt.clouddn.com/Fpl8ZZopdctwR0y-kpy4It_iScNL?imageslim></li><li>买家购书 <img src=false alt=ClipboardImage width=773 height=158 data-src=http://obu9je6ng.bkt.clouddn.com/FmTVXNcaMdFiI0awxq_zzpS67an7?imageslim></li></ul><h5 id=部分算法设计><a href=#%E9%83%A8%E5%88%86%E7%AE%97%E6%B3%95%E8%AE%BE%E8%AE%A1 aria-hidden=true><span class="icon icon-link"></span></a>部分算法设计</h5><p>首先对于留言评论，防止恶意用户刷留言评论，设置了定时销毁器。 算法设计如下：</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-keyword>var</span> _timer = {};\n\n<span class=hljs-keyword>var</span> Timer = {\n    <span class=hljs-attr>set</span> : <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>key,mill</span>) </span>{ <span class=hljs-comment>//设置定时器的关键字与销毁时间</span>\n        <span class=hljs-keyword>this</span>.remove(key);\n        _timer[key] ={<span class=hljs-attr>mill</span>:mill};\n        _timer[key].code = setTimeout(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n            <span class=hljs-keyword>delete</span> _timer[key];\n        },mill);\n    },\n    <span class=hljs-attr>isExist</span> : <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>key</span>)</span>{\n        <span class=hljs-keyword>return</span> !!_timer[key];\n    },\n    <span class=hljs-attr>remove</span> : <span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>key</span>)</span>{\n        <span class=hljs-keyword>if</span>(<span class=hljs-keyword>this</span>.isExist(key)){\n            clearTimeout(_timer[key].code);\n            <span class=hljs-keyword>delete</span> _timer[key];\n            <span class=hljs-keyword>return</span> <span class=hljs-literal>true</span>;\n        }\n        <span class=hljs-keyword>return</span> <span class=hljs-literal>false</span>;\n    }\n}</code></pre><p>该系统具有销售分析，如某卖家所有销售情况的折线图，x轴表示日期，y轴表示该日售出书籍数目。 算法设计如下：</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-comment>// all 表示所有卖家销售记录，0-N 时间从现在到以前</span>\n<span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-title>makeLineChart</span>(<span class=hljs-params>all</span>) </span>{\n    <span class=hljs-keyword>if</span>(all==<span class=hljs-literal>null</span> || all.length==<span class=hljs-number>0</span>)\n        <span class=hljs-keyword>return</span>;\n    <span class=hljs-comment>//返回数据中 keys表示日期数组，data表示对应keys日期的销售量</span>\n    <span class=hljs-keyword>return</span> all.reduceRight(<span class=hljs-function>(<span class=hljs-params>p,n</span>)=></span>{ <span class=hljs-comment>// 从右向左归并</span>\n        <span class=hljs-keyword>var</span> date = n.tradeDate;\n        <span class=hljs-keyword>if</span>(p.keys[p.keys.length<span class=hljs-number>-1</span>]!=date){\n            p.keys.push(date);\n            p.data.push(<span class=hljs-number>1</span>);\n        }<span class=hljs-keyword>else</span>{\n            p.data[p.data.length<span class=hljs-number>-1</span>]++;\n        }\n        <span class=hljs-keyword>return</span> p;         \t\n    },{<span class=hljs-attr>keys</span>:[],<span class=hljs-attr>data</span>:[]});\n}</code></pre><p>销售分析中还具有周最受欢迎图书饼图，表示一周内各个图书销售情况。 算法设计如下：</p><pre><code class="hljs language-javascript"data-query={} data-lang=javascript><span class=hljs-comment>// all 表示所有卖家销售记录，0-N 时间从现在到以前</span>\n<span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-title>makePieChart</span>(<span class=hljs-params>all</span>) </span>{\n    <span class=hljs-keyword>if</span>(all==<span class=hljs-literal>null</span> || all.length==<span class=hljs-number>0</span>)\n        <span class=hljs-keyword>return</span>;\n    <span class=hljs-keyword>var</span> pivot = all[all.length<span class=hljs-number>-1</span>];  <span class=hljs-comment>// 取出最后一个交易记录，也就是最近的</span>\n    <span class=hljs-keyword>var</span> end = <span class=hljs-keyword>new</span> <span class=hljs-built_in>Date</span>(pivot.tradeDate).setHours(<span class=hljs-number>24</span>); <span class=hljs-comment>// 根据最近时间的时间得到第二天0点时间</span>\n    <span class=hljs-keyword>var</span> start = <span class=hljs-keyword>new</span> <span class=hljs-built_in>Date</span>(end - <span class=hljs-number>1000</span>*<span class=hljs-number>60</span>*<span class=hljs-number>60</span>*<span class=hljs-number>24</span>*<span class=hljs-number>7</span>); <span class=hljs-comment>// 减去7天毫秒数，得到七天前时间</span>\n    <span class=hljs-keyword>var</span> data = {<span class=hljs-attr>keys</span>:[pivot.title],<span class=hljs-attr>data</span>:[<span class=hljs-number>1</span>]},titleMap = {};\n    titleMap[pivot.title]=<span class=hljs-number>0</span>; <span class=hljs-comment>//初始化参数</span>\n    <span class=hljs-keyword>for</span>(<span class=hljs-keyword>var</span> i=all.length<span class=hljs-number>-2</span>;i>=<span class=hljs-number>0</span>;i--){\n        <span class=hljs-keyword>if</span>(<span class=hljs-keyword>new</span> <span class=hljs-built_in>Date</span>(all[i].tradeDate)&lt;start) <span class=hljs-comment>// 如果时间再七天之前，跳出循环</span>\n            <span class=hljs-keyword>break</span>;\n        <span class=hljs-keyword>var</span> title = all[i].title;\n        <span class=hljs-keyword>if</span>(titleMap[title]==<span class=hljs-literal>null</span>){\n            titleMap[title] = data.keys.length;\n            data.keys.push(title);\n            data.data.push(<span class=hljs-number>1</span>);\n        }<span class=hljs-keyword>else</span>\n            data.data[titleMap[title]]++;\n    }\n    <span class=hljs-keyword>return</span> data;\n}</code></pre><h3 id=前端框架选择和设计><a href=#%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6%E9%80%89%E6%8B%A9%E5%92%8C%E8%AE%BE%E8%AE%A1 aria-hidden=true><span class="icon icon-link"></span></a>前端框架选择和设计</h3><h4 id=选择与原因-2><a href=#%E9%80%89%E6%8B%A9%E4%B8%8E%E5%8E%9F%E5%9B%A0-2 aria-hidden=true><span class="icon icon-link"></span></a>选择与原因</h4><p>针对于用户之间接触的前端界面，我选择了<code>Bootstrap3.0 UI</code>，<code>jQuery</code>，<code>marked.js</code>，<code>highlight.js</code>，<code>pace.js</code>，下面做出相关介绍与说明：</p><ul><li><code>BootStrap3.0</code> 一套完备的UI框架，包括美观的css样式和一些基于jQuery的组件。可以让开发者用最少的时间建立一个美观的界面。</li><li><code>jQuery</code> 因为<code>BootStrap</code>组件需要，而且能够方便进行DOM操作，强大的选择器与链式调用。</li><li><code>marked.js</code> 一个将<code>markdown</code>文本翻译为HTML的库，api简单。</li><li><code>highlight.js</code> 与<code>marked.js</code>配套使用，能够将代码段解析为具有样式类的库。</li><li><code>pace.js</code> 通过检查浏览器加载的状态，判断文档加载进度，并且提供了一系列的css样式，能够在页面加载的时候显示页面加载进度。</li></ul><h4 id=文件结构-1><a href=#%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84-1 aria-hidden=true><span class="icon icon-link"></span></a>文件结构</h4><pre><code data-query={} data-lang>public/\n├── javascripts/\n│   ├── addbook.js\n│   ├── Ajaxdelete.js\n│   ├── indexjs.js\n│   ├── msgAnimate.js\n│   ├── msgjs.js\n│   ├── popImage.js\n│   ├── search.js\n│   ├── selljs.js\n│   ├── utils.js\n└── stylesheets/\n    ├── bootstrap/\n    ├── style.less\n    ├── style.css\n    ├── hljs-github-min.css\n    └── markdown.less\n</code></pre><p><code>stylesheets/</code>文件夹放的是样式文件，其中的<code>style.less</code>是入口，<code>style.css</code>是利用node模块压缩后真正传送的样式文件</p><h4 id=特殊功能说明><a href=#%E7%89%B9%E6%AE%8A%E5%8A%9F%E8%83%BD%E8%AF%B4%E6%98%8E aria-hidden=true><span class="icon icon-link"></span></a>特殊功能说明</h4><ol><li>提示框动态固定显示 <img src=false alt=ClipboardImage width=500 height=199 data-src=http://obu9je6ng.bkt.clouddn.com/FrTSgOxaYM2B4s9dWmstn0ZDAoHs?imageslim> 方法一：（固定width）</li></ol><pre><code class="hljs language-less"data-query={} data-lang=less><span class=hljs-selector-class>.messages</span>{\n  <span class=hljs-selector-class>.box-shadow</span>(<span class=hljs-number>0px</span> <span class=hljs-number>0px</span> <span class=hljs-number>8px</span> <span class=hljs-number>3px</span> <span class=hljs-number>#bbb</span>);\n  <span class=hljs-attribute>z-index</span>: <span class=hljs-number>10000</span>;\n  <span class=hljs-attribute>position</span>: fixed;\n  <span class=hljs-attribute>width</span>: <span class=hljs-number>340px</span>;\n  <span class=hljs-attribute>height</span>: <span class=hljs-number>50px</span>;\n  <span class=hljs-attribute>left</span>: <span class=hljs-number>50%</span>;\n  <span class=hljs-attribute>top </span>: -<span class=hljs-number>50px</span>;\n  <span class=hljs-attribute>margin-left</span>: -<span class=hljs-number>170px</span>;\n\n  <span class=hljs-attribute>-webkit-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-moz-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-ms-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-o-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>opacity</span>:<span class=hljs-number>0</span>;\n}</code></pre><pre><code class="hljs language-js"data-query={} data-lang=js><span class=hljs-built_in>window</span>.onload = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n    $(<span class=hljs-string>\'.messages\'</span>)\n        .css({<span class=hljs-string>\'transform\'</span>:<span class=hljs-string>\'translate(0,120px)\'</span>,<span class=hljs-attr>opacity</span>:<span class=hljs-number>1</span>})\n}</code></pre><p>方法二：width自适应</p><pre><code class="hljs language-less"data-query={} data-lang=less><span class=hljs-selector-class>.messages</span>{\n  <span class=hljs-selector-class>.box-shadow</span>(<span class=hljs-number>0px</span> <span class=hljs-number>0px</span> <span class=hljs-number>8px</span> <span class=hljs-number>3px</span> <span class=hljs-number>#bbb</span>);\n  <span class=hljs-attribute>z-index</span>: <span class=hljs-number>10000</span>;\n  <span class=hljs-attribute>position</span>: fixed;\n  <span class=hljs-attribute>left</span>: <span class=hljs-number>50%</span>;\n  <span class=hljs-attribute>top </span>: <span class=hljs-number>0px</span>;\n  <span class=hljs-attribute>-webkit-transform</span>: translate(-<span class=hljs-number>50%</span>,-<span class=hljs-number>50%</span>);\n  <span class=hljs-attribute>-moz-transform</span>: translate(-<span class=hljs-number>50%</span>,-<span class=hljs-number>50%</span>);\n  <span class=hljs-attribute>-ms-transform</span>: translate(-<span class=hljs-number>50%</span>,-<span class=hljs-number>50%</span>);\n  <span class=hljs-attribute>-o-transform</span>: translate(-<span class=hljs-number>50%</span>,-<span class=hljs-number>50%</span>);\n  <span class=hljs-attribute>transform</span>: translate(-<span class=hljs-number>50%</span>,-<span class=hljs-number>50%</span>);\n\n  <span class=hljs-attribute>-webkit-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-moz-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-ms-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>-o-transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>transition</span>: all <span class=hljs-number>2s</span>;\n  <span class=hljs-attribute>opacity</span>:<span class=hljs-number>0</span>;\n}</code></pre><pre><code class="hljs language-js"data-query={} data-lang=js><span class=hljs-built_in>window</span>.onload = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n    $(<span class=hljs-string>\'.messages\'</span>)\n        <span class=hljs-comment>// .css({\'transform\':\'translate(0,120px)\',opacity:1})</span>\n        .css({<span class=hljs-string>\'margin-top\'</span>:<span class=hljs-string>\'140px\'</span>,<span class=hljs-attr>opacity</span>:<span class=hljs-number>1</span>})\n}</code></pre><ol start=2><li>跳至评论，评论区高亮 <img src=false alt=ClipboardImage width=594 height=621 data-src=http://obu9je6ng.bkt.clouddn.com/FrPkTfIt8U2R0Cvr-lpcPfbqfUED?imageslim></li></ol><pre><code class="hljs language-less"data-query={} data-lang=less><span class=hljs-keyword>@keyframes</span> blinking {\n    <span class=hljs-selector-tag>0%</span> {\n        <span class=hljs-comment>//opacity: 0;</span>\n    }\n    <span class=hljs-selector-tag>30%</span>{\n        <span class=hljs-attribute>background-color</span>: <span class=hljs-number>#fcf8e3</span>;\n    }\n    <span class=hljs-selector-tag>100%</span> {\n        <span class=hljs-attribute>background-color</span>: <span class=hljs-number>#fcf8e3</span>;\n        <span class=hljs-comment>//opacity: 1;</span>\n    }\n}\n<span class=hljs-selector-class>.blink</span>{\n    <span class=hljs-selector-class>.animation</span>(blinking <span class=hljs-number>2.8s</span>)\n}</code></pre><pre><code class="hljs language-js"data-query={} data-lang=js>$(<span class=hljs-string>\'[role=link-msg]\'</span>).click(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>e</span>) </span>{\n        <span class=hljs-keyword>var</span> x = $(<span class=hljs-keyword>this</span>.hash).next().children().removeClass(<span class=hljs-string>\'blink\'</span>)\n        setTimeout(<span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n            x.addClass(<span class=hljs-string>\'blink\'</span>).children(<span class=hljs-string>\'textarea\'</span>).focus();\n        },<span class=hljs-number>0</span>)\n    });</code></pre><ol start=3><li>markdown编辑区可粘贴网络图片</li></ol><pre><code class="hljs language-js"data-query={} data-lang=js>input.onpaste = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>e</span>) </span>{\n        <span class=hljs-keyword>var</span> clipboardData, pastedData;\n\n        <span class=hljs-comment>// Get pasted data via clipboard API</span>\n        clipboardData = e.clipboardData || <span class=hljs-built_in>window</span>.clipboardData;\n        <span class=hljs-keyword>var</span> text = clipboardData.getData(<span class=hljs-string>\'text/plain\'</span>);\n        <span class=hljs-keyword>if</span>(!text){\n            <span class=hljs-keyword>var</span> img = clipboardData.getData(<span class=hljs-string>\'text/html\'</span>);\n            img.replace(<span class=hljs-regexp>/&lt;img.+src="(.+?)"/g</span>,(m,c)=>{\n                e.preventDefault();\n                <span class=hljs-comment>// 调用</span>\n                <span class=hljs-built_in>document</span>.execCommand(<span class=hljs-string>\'insertText\'</span>, <span class=hljs-literal>false</span>, <span class=hljs-string>"![ClipboardImage]("</span>+c+<span class=hljs-string>")"</span>);\n            })\n        }\n    };</code></pre><ol start=4><li>代码段右上角显示语言 <img src=false alt=ClipboardImage width=928 height=734 data-src=http://obu9je6ng.bkt.clouddn.com/FsEQEWGTxxkj6McnadZdnfk9NPjP?imageslim></li></ol><hr><h2 id=系统截图><a href=#%E7%B3%BB%E7%BB%9F%E6%88%AA%E5%9B%BE aria-hidden=true><span class="icon icon-link"></span></a>系统截图</h2><img src=false alt=ClipboardImage width=1194 height=792 data-src=http://obu9je6ng.bkt.clouddn.com/Fm7BX0YWaliIY1WBkmUDTNfh7ZOv?imageslim> <img src=false alt=ClipboardImage width=1185 height=435 data-src=http://obu9je6ng.bkt.clouddn.com/Fk-q4DgGxi38zkNuYrsjIUj1tbKr?imageslim> <img src=false alt=ClipboardImage width=1170 height=973 data-src=http://obu9je6ng.bkt.clouddn.com/FkQTiUEHfw-ngnXOdoTXebY5doQ7?imageslim> <img src=false alt=ClipboardImage width=1199 height=904 data-src=http://obu9je6ng.bkt.clouddn.com/FlTGXCPrYvVER7aW7X-JoNmJIhmh?imageslim> <img src=false alt=ClipboardImage width=1168 height=506 data-src=http://obu9je6ng.bkt.clouddn.com/FnS9RKLBBoJ5o35D7s5PqiQXOQA9?imageslim> <img src=false alt=ClipboardImage width=1161 height=730 data-src=http://obu9je6ng.bkt.clouddn.com/FuAKYxsc1Z3trMhrmzHb-u6kPldZ?imageslim> <img src=false alt=ClipboardImage width=1240 height=959 data-src=http://obu9je6ng.bkt.clouddn.com/Fo0bkjy5iYh0JzWfIbkPLpklxhbR?imageslim> <img src=false alt=ClipboardImage width=1185 height=726 data-src=http://obu9je6ng.bkt.clouddn.com/FgROOlb4_LlW5cLV9dDD4A6_bAIh?imageslim> <img src=false alt=ClipboardImage width=1173 height=581 data-src=http://obu9je6ng.bkt.clouddn.com/Fhaqdcpm0qP0-MO6Jk_eglLD0eXR?imageslim> <img src=false alt=ClipboardImage width=1191 height=747 data-src=http://obu9je6ng.bkt.clouddn.com/FifYYeoniR5rxoFXFgH6wEjI5Aw0?imageslim><hr><h2 id=收获与体会><a href=#%E6%94%B6%E8%8E%B7%E4%B8%8E%E4%BD%93%E4%BC%9A aria-hidden=true><span class="icon icon-link"></span></a>收获与体会</h2><ul><li>感受到了<code>nodejs</code>与<code>express</code>的魅力</li><li>增强了系统的整体把控架构能力</li><li>掌握了一些常见具体问题的处理方式</li><li>不足在于后端异步结构代码比较冗杂，难于管理</li></ul><h2 id=参考资料><a href=#%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99 aria-hidden=true><span class="icon icon-link"></span></a>参考资料</h2><ul><li><a href=http://www.cnblogs.com/kongxianghai/archive/2015/02/15/4293139.html>nodejs express4.x 文件上传</a></li><li><a href=http://jade-lang.com/reference/attributes/>Jade 完整教程</a></li><li><a href=http://www.jiawin.com/pace-js-automatic-page-load-progress-bar>page.js</a></li><li><a href=http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser>javascript-get-clipboard-data-on-paste-event-cross-browser</a></li><li><a href=http://www.haorooms.com/post/jq_js_xxjdt>www.haorooms.com/post/jq_js_xxjdt</a></li></ul>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=bookshop.js.map