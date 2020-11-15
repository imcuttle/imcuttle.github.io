webpackJsonp([38,113],{1227:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=search-spider-blog><a href=#search-spider-blog aria-hidden=true><span class="icon icon-link"></span></a>Search-Spider-Blog</h1><p>提供个人博客文章搜索服务, 只需要配置个人博客地址, 载入博客数据, 开启Server服务, 即可开启文章搜索服务。 对<code>blogconfig.json</code>配置文件监控, 修改后服务及时地更新博客数据</p><!--more--><p><strong>本人用的为Hexo Blog, 所以Hexo用户体验更佳</strong></p><p><a href=https://github.com/moyuyc/search-spider-blog>代码地址</a></p><h2 id=使用说明><a href=#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E aria-hidden=true><span class="icon icon-link"></span></a>使用说明</h2><ul><li><p>环境配置</p><pre><code class="hljs language-sh"data-query={} data-lang=sh><span class=hljs-comment># after clone &amp&amp cd</span>\nnpm i </code></pre></li><li><p>对 <code>blogconfig.json</code> 进行配置（以我<a href=http://moyuyc.github.io/>个人博客</a>为例）</p><pre><code class="hljs language-text"data-query={} data-lang=text>\n{\n    <span class=hljs-string>"url"</span>: <span class=hljs-string>"http://moyuyc.github.io/"</span>,   <span class=hljs-regexp>//</span>blog url\n    <span class=hljs-string>"mainPagePath"</span>: <span class=hljs-string>"/archives/"</span>,        <span class=hljs-regexp>//</span> 所有文章页面（也就是第一页）\n    <span class=hljs-string>"spiderConfig"</span>: {\n        <span class=hljs-string>"ArticleLinkEl"</span>: <span class=hljs-string>".post-title-link"</span>, <span class=hljs-regexp>//</span> 在<span class=hljs-string>"mainPagePath"</span>中进入文章页面的超链接jQuery选择器\n        <span class=hljs-string>"splitPagePath"</span>: <span class=hljs-string>"/archives/page/${page}/"</span>, <span class=hljs-regexp>//</span> 所有文章分页的规则, <span class=hljs-variable>${page}</span>表示页码\n        <span class=hljs-string>"ArticleDateEl"</span>: <span class=hljs-string>"time"</span>,         <span class=hljs-regexp>//</span> 在文章页面中日期的Jquery选择器\n        <span class=hljs-string>"ArticleTitleEl"</span>: <span class=hljs-string>".post-title"</span>, <span class=hljs-regexp>//</span> 在文章页面中标题的Jquery选择器\n        <span class=hljs-string>"ArticleContentEl"</span>: <span class=hljs-string>".post-body"</span> <span class=hljs-regexp>//</span> 在文章页面中内容的Jquery选择器\n    }\n}</code></pre></li><li><p>脚本指令说明</p><pre><code class="hljs language-sh"data-query={} data-lang=sh>    \nnpm start <span class=hljs-comment># 开启Server服务(默认端口7899, 可在scripts中修改), 开启后会自动更新一次数据</span>\nnpm load  <span class=hljs-comment># 更新博客数据</span></code></pre></li><li><p>Server接口说明</p><ol><li><p><code>/load</code> : 重新加载博客数据</p></li><li><p><code>/api/search/(:type)</code> : type可选值为<code>date/content/title/all</code>, 根据什么来搜索, 参数格式为<code>?q=想搜什么&ampn=数目(可选)</code></p></li><li><p><code>/api/search/all</code> : 当未传<code>q</code>时, 返回所有文章</p></li><li><p>2 3点中的返回数据说明 :</p><pre><code class="hljs language-text"data-query={} data-lang=text>{\n    <span class=hljs-attribute>type</span>: <span class=hljs-string>\'title/date/content\'</span>,\n    <span class=hljs-attribute>articles</span>: [ <span class=hljs-comment>// 一般length为1</span>\n        {\n            <span class=hljs-attribute>title</span>: <span class=hljs-string>\'title\'</span>,\n            <span class=hljs-attribute>datetime</span>: <span class=hljs-string>\'date\'</span>,\n            <span class=hljs-attribute>content</span>: <span class=hljs-string>\'content\'</span>,\n            <span class=hljs-attribute>path</span>: <span class=hljs-string>\'/url\'</span>   <span class=hljs-comment>// 文章链接地址 相对的</span>\n        }\n    ],\n    <span class=hljs-attribute>indexs</span>: [] <span class=hljs-comment>// 搜索到内容的索引位置</span>\n}</code></pre></li><li><p>注意: 提供了多关键词的搜索, 如<code>keyword1+keyword2</code> 或者 <code>keyword1 keyword2</code></p></li><li><p>可以根据自己的需求, 直接使用 <code>/api/search/all</code> 所有数据做为静态数据进行本地搜索, 或者使用search服务都可</p></li></ol></li></ul><h2 id=工作流程><a href=#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B aria-hidden=true><span class="icon icon-link"></span></a>工作流程</h2><ol><li>爬取博客文章数据, 保存至<code>db.json</code>中, 未使用数据库, 是为了轻量与方便移植, 而且只是提供个人服务</li><li>为了更好的拓展性, 使用<code>cheerio</code>, 使用<code>jQuery选择器</code> 配置即可</li><li>获取数据后, 便是搭建<code>http服务</code>, 提供搜索接口, 为了方便用户展示, 还提供了搜索到内容的索引位置</li></ol><h2 id=效果查看><a href=#%E6%95%88%E6%9E%9C%E6%9F%A5%E7%9C%8B aria-hidden=true><span class="icon icon-link"></span></a>效果查看</h2><img src=false alt=ClipboardImage width=864 height=688 data-src=http://obu9je6ng.bkt.clouddn.com/FiR3acOCoX2AYv7FSSnpEPfYXEOs?imageslim> <img src=false alt=ClipboardImage width=733 height=613 data-src=http://obu9je6ng.bkt.clouddn.com/FoiPMH0e2DGk06Uw1olsMxeRBWfk?imageslim>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=search-function-for-blog.js.map