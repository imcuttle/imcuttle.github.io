webpackJsonp([75,90],{988:function(e,n){e.exports={content:'<h2 id="必要性"><a href="#%E5%BF%85%E8%A6%81%E6%80%A7" aria-hidden="true"><span class="icon icon-link"></span></a>必要性</h2>\n<h3 id="自动化是个好东西"><a href="#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%98%AF%E4%B8%AA%E5%A5%BD%E4%B8%9C%E8%A5%BF" aria-hidden="true"><span class="icon icon-link"></span></a>自动化是个好东西</h3>\n<p>自动化可以帮我们简化一些枯燥（重复）的工作，提高工作效率。</p>\n<h3 id="demo是个好东西"><a href="#demo%E6%98%AF%E4%B8%AA%E5%A5%BD%E4%B8%9C%E8%A5%BF" aria-hidden="true"><span class="icon icon-link"></span></a>Demo是个好东西</h3>\n<p>Demo可以帮助我们更快捷地了解某组件的用法。</p>\n<h2 id="自动化流程"><a href="#%E8%87%AA%E5%8A%A8%E5%8C%96%E6%B5%81%E7%A8%8B" aria-hidden="true"><span class="icon icon-link"></span></a>自动化流程</h2>\n<ol>\n<li>Dev Local: git push origin release/demo</li>\n<li>Git Remote: origin(remote git server) received the commit</li>\n<li>Git Remote: trigger <em>push</em> web hook</li>\n</ol>\n<h3 id="what-should-push-web-hook-to-do"><a href="#what-should-push-web-hook-to-do" aria-hidden="true"><span class="icon icon-link"></span></a>What should <em>push</em> web hook to do?</h3>\n<p>Release Server: </p>\n<ol>\n<li>check whether the push event is from branch named <code>release/demo</code></li>\n<li>(sudo) git pull -f origin theme/react-mobx-v2</li>\n<li>some initial works</li>\n<li>webpack build</li>\n<li>response \'ok\' or \'fail\'</li>\n</ol>\n<p><strong>Need to be considered</strong></p>\n<ul>\n<li>concurrent (Lock Symbol)</li>\n<li>Content-Type: \'text/event-stream\'</li>\n</ul>\n<h2 id="使用说明书"><a href="#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E4%B9%A6" aria-hidden="true"><span class="icon icon-link"></span></a>使用说明书</h2>\n<ol>\n<li>已经在 react-mobx-v2 种子工程中加入 <code>deploy</code> 指令</li>\n<li>当需要发布demo page时，执行 <code>matriks2 deploy</code> 即可</li>\n</ol>\n<ul>\n<li>\n<p>相关repo</p>\n<ol>\n<li><a href="http://gitlab.baidu.com/yucong02/release-scripts/">WebHooks Server</a></li>\n<li><a href="http://gitlab.baidu.com/be-fe/matriks2-seed/">种子工程</a></li>\n</ol>\n</li>\n</ul>\n',extra:{}}}});