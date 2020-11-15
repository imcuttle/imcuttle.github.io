webpackJsonp([91,113],{1172:function(e,i){e.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p><strong>Hexo</strong> 是一个基于NodeJs平台实现的一个快速生成自己Blog的程序，据说作者是一位来自台湾的大学生，666.<br><a href=https://hexo.io/>Hexo官方网站</a></p><h2 id=首先，安装hexo><a href=#%E9%A6%96%E5%85%88%EF%BC%8C%E5%AE%89%E8%A3%85hexo aria-hidden=true><span class="icon icon-link"></span></a>首先，安装Hexo</h2><h3 id=先得有nodejs><a href=#%E5%85%88%E5%BE%97%E6%9C%89nodejs aria-hidden=true><span class="icon icon-link"></span></a>先得有Nodejs</h3><p><a href=https://nodejs.org/>Nodejs官网</a></p><h3 id=安装hexo><a href=#%E5%AE%89%E8%A3%85hexo aria-hidden=true><span class="icon icon-link"></span></a>安装Hexo</h3><ul><li>全局安装Hexo<br><code>npm install -g hexo</code></li><li>创建你的Blog/Hexo文件夹<br><code>hexo init blog</code></li><li>进入blog文件夹<br><code>cd blog</code></li><li>安装Hexo依赖包，根据blog文件夹中的package.json配置下载<br><code>npm install</code></li><li><p>运行服务器（默认地址为 localhost:4000）<br><code>hexo server</code><br><strong><em>注意：这里不需要运行</em></strong> <code>hexo g</code> <strong><em>指令，所以我们访问的页面是根据nodejs动态生成的。</em></strong></p><!--more--></li></ul><h3 id=选择你喜欢的hexo-theme><a href=#%E9%80%89%E6%8B%A9%E4%BD%A0%E5%96%9C%E6%AC%A2%E7%9A%84hexo-theme aria-hidden=true><span class="icon icon-link"></span></a>选择你喜欢的Hexo Theme</h3><p><a href=https://hexo.io/themes/>Hexo主题选择</a><br>鄙人选择的是这位仁兄的 <a href=https://github.com>https://github.com/yscoder</a><br>上面有相关的配置的说明。</p><h2 id=创建你的githubio项目><a href=#%E5%88%9B%E5%BB%BA%E4%BD%A0%E7%9A%84githubio%E9%A1%B9%E7%9B%AE aria-hidden=true><span class="icon icon-link"></span></a>创建你的github.io项目</h2><h3 id=新建repository><a href=#%E6%96%B0%E5%BB%BArepository aria-hidden=true><span class="icon icon-link"></span></a>新建repository</h3><p>新建一个以{username}.github.io 命名的repository。</p><h3 id=得到你的ssh地址><a href=#%E5%BE%97%E5%88%B0%E4%BD%A0%E7%9A%84ssh%E5%9C%B0%E5%9D%80 aria-hidden=true><span class="icon icon-link"></span></a>得到你的SSH地址</h3><p>在blog文件夹中的<code>_config.yml</code>文件中配置</p><pre><code data-query={} data-lang>deploy:\n  type: git\n  repo: {ssh地址}\n  branch: \n</code></pre><h3 id=在github中设置中创建你的page><a href=#%E5%9C%A8github%E4%B8%AD%E8%AE%BE%E7%BD%AE%E4%B8%AD%E5%88%9B%E5%BB%BA%E4%BD%A0%E7%9A%84page aria-hidden=true><span class="icon icon-link"></span></a><em>在GitHub中设置中创建你的page</em></h3><h3 id=添加ssh-key-（允许写操作）><a href=#%E6%B7%BB%E5%8A%A0ssh-key-%EF%BC%88%E5%85%81%E8%AE%B8%E5%86%99%E6%93%8D%E4%BD%9C%EF%BC%89 aria-hidden=true><span class="icon icon-link"></span></a>添加ssh key <em>（允许写操作）</em></h3><ul><li>在Git Bash输入以下指令（任意位置点击鼠标右键），检查是否已经存在了SSH keys。<br><code>ls -al ~/.ssh</code></li><li>如果不存在就没有关系，如果存在的话，直接删除<code>c:/用户/你的用户名/.ssh</code>文件夹里面所有文件</li><li>输入以下指令（邮箱就是你注册Github时候的邮箱）后，回车<br><code>ssh-keygen -t rsa -C "your email"</code></li><li>然后它会提示要你输入passphrase（如上图，我没有输入直接回车，如果你输入的话，要记得，到时候会用到）。</li><li>然后键入以下指令：<br><code>eval \'ssh-agent -s\'</code> <code>ssh-add</code></li><li>继续输入指令： <code>ssh-add ~/.ssh/id_rsa</code></li><li>到了这一步，就可以添加SSH key到你的Github账户了。键入以下指令，拷贝Key（先拷贝了，等一下可以直接粘贴）：<br><code>clip &lt; ~/.ssh/id_rsa.pub</code></li><li>在GitHub设置添加ssh keys，将上面复制的内容粘贴至key中，生成</li><li><p>输入你的Github密码即可完成SSH Key的添加。嗯，最后还是测试一下吧，键入以下命令：<br><code>ssh -T git@github.com #你可能会看到有警告，没事，输入“yes”就好。</code></p><h3 id=发布至github并且部署><a href=#%E5%8F%91%E5%B8%83%E8%87%B3github%E5%B9%B6%E4%B8%94%E9%83%A8%E7%BD%B2 aria-hidden=true><span class="icon icon-link"></span></a>发布至GitHub并且部署</h3></li><li>输入指令<br><code>hexo g #生成blog静态文件，github page只支持静态文件</code></li><li><p>输入指令 <code>hexo d #发布至github中</code></p><h2 id=完成！快去访问你的page吧！><a href=#%E5%AE%8C%E6%88%90%EF%BC%81%E5%BF%AB%E5%8E%BB%E8%AE%BF%E9%97%AE%E4%BD%A0%E7%9A%84page%E5%90%A7%EF%BC%81 aria-hidden=true><span class="icon icon-link"></span></a>完成！快去访问你的page吧！</h2></li></ul>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=feel-hexo-power.js.map