webpackJsonp([72,90],{991:function(n,s){n.exports={content:'<h2 id="画个饼"><a href="#%E7%94%BB%E4%B8%AA%E9%A5%BC" aria-hidden="true"><span class="icon icon-link"></span></a>画个饼</h2>\n<ol>\n<li>doc-pipe 是一个本地和服务器两端的一个双向通道，可以从本地推送到服务器(push)，也可以拉取服务器树状文档至本地(pull)</li>\n<li>doc-pipe 可以完成在本地完成对远端文档的同步和管理</li>\n<li>doc-pipe 自动化生成文章索引</li>\n</ol>\n<h2 id="目前定位"><a href="#%E7%9B%AE%E5%89%8D%E5%AE%9A%E4%BD%8D" aria-hidden="true"><span class="icon icon-link"></span></a>目前定位</h2>\n<ol>\n<li>十分适合个人文章(不可协同编辑)的管理和发布，实现本地到远端的同步。</li>\n<li>如：个人standup、分享报告、总结...</li>\n</ol>\n<h2 id="困境"><a href="#%E5%9B%B0%E5%A2%83" aria-hidden="true"><span class="icon icon-link"></span></a>困境</h2>\n<ol>\n<li>doc-pipe 使用原生 markdown 的列表、标题来形成树形结构，因此不会完全兼容树状文档的写法。</li>\n<li>由于不完全兼容树状文档的分层逻辑，所以<code>tree &#x3C;-> md</code>的转化不是互逆的。</li>\n<li>pull实现逻辑的复杂性</li>\n<li>由于1的存在，故不适合于多人协同编辑文章的 远端-本地 同步</li>\n</ol>\n<h2 id="安装使用"><a href="#%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8" aria-hidden="true"><span class="icon icon-link"></span></a>安装使用</h2>\n<pre><code class="hljs language-bash" data-query="{}" data-lang="bash">npm install -g doc-md-import\ndoc-pipe -h\ndocin -h\n\n<span class="hljs-comment"># 首先设置远端用户和密码</span>\ndocin <span class="hljs-built_in">set</span>-username abc\ndocin <span class="hljs-built_in">set</span>-password\n<span class="hljs-comment"># 进入到某文章工作目录</span>\n<span class="hljs-built_in">cd</span> my-doc\n<span class="hljs-comment"># 初始化 doc-pipe</span>\ndoc-pipe init\n<span class="hljs-comment"># 将当前文件夹下所有以`.md` `.markdown`结尾的文件推送到远端</span>\ndoc-pipe push\n<span class="hljs-comment"># push `a/` 下的 md 文件</span>\ndoc-pipe push a/\n<span class="hljs-comment"># push `a/a.md` 文件</span>\n<span class="hljs-comment"># `-f` 表示强制 push</span>\ndoc-pipe push a/a.md -f\n<span class="hljs-comment"># 根据 push 记录生成索引 (./doc-pipe-toc.md) </span>\n<span class="hljs-comment"># `--push` 表示自动将 toc push 至远端</span>\ndoc-pipe toc --push\n<span class="hljs-comment"># 删除所有的 push 记录，同时也会删除远端的数据</span>\ndoc-pipe rm\n<span class="hljs-comment"># 删除之前提交的 `a/a.md` 记录</span>\ndoc-pipe rm a/a.md\n<span class="hljs-comment"># 查看当前的提交记录表</span>\ndoc-pipe view</code></pre>\n<p>同时，可以利用下面的语法来对文章标题进行设置</p>\n<pre><code data-query="{}" data-lang="">---\ntitle: 我是标题\n---\n\n## 我是内容\n</code></pre>\n<h2 id="todo"><a href="#todo" aria-hidden="true"><span class="icon icon-link"></span></a>Todo</h2>\n<ol>\n<li>pull 的实现？</li>\n</ol>\n',extra:{}}}});