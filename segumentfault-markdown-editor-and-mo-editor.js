webpackJsonp([37,113],{1228:function(a,t){a.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p><a href=https://segmentfault.com/>SegumentFault</a> 中的Markdown编辑器用户体验不错，比如</p><ol><li>高亮提示并显示你当前正在编辑的文本</li><li>支持剪贴板图片直接粘贴上传，插入图片十分方便</li><li>自动保存</li></ol><p>为了探究sf实现的原理，在sf中我提出了下面的问题 【<a href=https://segmentfault.com/q/1010000006166048>segmentfault的实时markdown编辑修改位置定位是怎么做到的，而且效率还不低</a>】</p><p>根据采纳答案提供的信息，我搜索到了这段谷歌开源代码 <a href=https://code.google.com/p/google-diff-match-patch/>google-diff-match-patch</a></p><p>根据官方的介绍，我们能用这个称为diff-match-path的开源库，进行diff(差异)/match(配对)/patch(补全)， 但我们只需要diff功能即可</p><p>在官方给出的<a href=https://neil.fraser.name/software/diff_match_patch/svn/trunk/demos/demo_diff.html>diff demo</a>中, 通过源码可以很清晰的了解diff的使用</p><!--more--><p>大体就是，对比两个字符串，找到两个字符串的不同，包括多余的，相同的，缺失的。</p><p>算法思想贪心，参考如下<br><a href=http://simplygenius.net/Article/DiffTutorial1>英文原版</a><br><a href=http://yaowhat.com/2014/07/21/entry-version-diff-1.html>翻译</a></p><h2 id=我的工作><a href=#%E6%88%91%E7%9A%84%E5%B7%A5%E4%BD%9C aria-hidden=true><span class="icon icon-link"></span></a>我的工作</h2><p>既然知道了sf的实时编辑高亮是基于diff的，那我也基于这个工具实现个markdown编辑器吧。 用了如下第三方库 1. ace.js (一个漂亮的编辑器) 2. marked.js (一个markdown文本转html库) 3. highlight.js (将code文本高亮展示) 4. diff_match_patch.js</p><p>效果图 <img src=false alt=ClipboardImage width=1438 height=731 data-src=http://obu9je6ng.bkt.clouddn.com/FtLU4iWnXe9aqXR2cYkJ-55l167u?imageslim></p><p>具有如下功能： 1. markdown编辑，实时预览 2. 高亮提示并显示你当前正在编辑的文本 3. 支持剪贴板图片直接粘贴上传，插入图片十分方便 4. 自动保存</p><p>编辑器部分快捷键说明 1. cmd/ctrl + K : 33种编辑器主题供选择 2. cmd/ctrl + B : 编辑器字体放大 3. cmd/ctrl + M : 编辑器字体缩小 4. cmd/ctrl + U : 自动保存功能开关 5. cmd/ctrl + S : 保存</p><p>其他交互说明： 1. 编辑器左下角提示保存信息，右下角提示字数 <img src=false alt=ClipboardImage width=1435 height=730 data-src=http://obu9je6ng.bkt.clouddn.com/FklqPf-mbderllJaGFfBamL_3lle?imageslim> 2. 中部可拖动调节大小 <img src=false alt=ClipboardImage width=1440 height=729 data-src=http://obu9je6ng.bkt.clouddn.com/FroCfvrfeAz_b8oPCyiZrxXGHRmd?imageslim> 3. 预览可直接复制代码 <img src=false alt=ClipboardImage width=1438 height=729 data-src=http://obu9je6ng.bkt.clouddn.com/FtRJ93mBtmKC0_LnGaSyuZfABdXN?imageslim></p><h2 id=怎么安装使用？><a href=#%E6%80%8E%E4%B9%88%E5%AE%89%E8%A3%85%E4%BD%BF%E7%94%A8%EF%BC%9F aria-hidden=true><span class="icon icon-link"></span></a>怎么安装使用？</h2><p>代码地址<br><a href=https://github.com/moyuyc/markdown-editor>markdown-editor</a></p><pre><code class="hljs language-sh"data-query={} data-lang=sh>git <span class=hljs-built_in>clone</span> https://github.com/moyuyc/markdown-editor.git\n<span class=hljs-built_in>cd</span> markdown-editor\nnpm install\nnpm start\nopen http://localhost:9999</code></pre><p>别忘了给个Star！</p>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=segumentfault-markdown-editor-and-mo-editor.js.map