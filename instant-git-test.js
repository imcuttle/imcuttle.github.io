webpackJsonp([74,113],{1190:function(i,e){i.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=git是个啥？><a href=#git%E6%98%AF%E4%B8%AA%E5%95%A5%EF%BC%9F aria-hidden=true><span class="icon icon-link"></span></a>Git是个啥？</h1><blockquote><p>Git 并不像 SVN 那样有个中心服务器。 目前我们使用到的 Git 命令都是在本地执行，如果你想通过 Git 分享你的代码或者与其他开发人员合作。 你就需要将数据放到一台其他开发人员能够连接的服务器上。</p></blockquote><p>这是网上的话，我也就是看看而已，谈谈我自己的认识吧。我觉得，git是一个在本地管理代码版本的东东，有分支，仓库等概念， 而github是基于git的一个远程仓库，通过他能实现代码分享。<strong><em>不通过它也可以进行版本控制</em></strong></p><!--more--><h1 id=我想做什么？><a href=#%E6%88%91%E6%83%B3%E5%81%9A%E4%BB%80%E4%B9%88%EF%BC%9F aria-hidden=true><span class="icon icon-link"></span></a>我想做什么？</h1><p>我想把我博客的文章啊，主题啊，配置啊放到GitHub上，以免以后电脑报销后，写的博文也有个备份。</p><h1 id=那要怎么做？><a href=#%E9%82%A3%E8%A6%81%E6%80%8E%E4%B9%88%E5%81%9A%EF%BC%9F aria-hidden=true><span class="icon icon-link"></span></a>那要怎么做？</h1><h2 id=把本地的git和github联系起来><a href=#%E6%8A%8A%E6%9C%AC%E5%9C%B0%E7%9A%84git%E5%92%8Cgithub%E8%81%94%E7%B3%BB%E8%B5%B7%E6%9D%A5 aria-hidden=true><span class="icon icon-link"></span></a>把本地的Git和GitHub联系起来</h2><blockquote><p>本地Git仓库和GitHub仓库之间的传输是通过SSH加密的，所以我们需要配置验证信息</p></blockquote><ul><li><p>使用下面指令生成SSH Key<br>ssh-keygen -t rsa -C "youremail@example.com" 成功后，会给你一个ssh key路径，找到对应的ssh key文件(后缀*.pub)</p></li><li><p>来到 GitHub 个人首页，在设置中，添加一个SSH Key。title 可以随便取名字，Key 里面添加的内容为 id_rsa.pub 文件内所有的代码。然后点击 Apply 即可。</p></li><li><p>测试与 GitHub 是否连接成功： SSH -v git@github.com <strong><em>这里我遇到了问题</em></strong> 在前面的文章感受Hexo的强大与高效（搭建Blog至GitHub Page教程）中， 我提到了需要为你的username.github.io项目添加SSH Key， 其实吧，这一步可以忽略，直接生成一个访问你github的ssh key即可。 不然你再次添加ssh key时候，因为本地的ssh key文件已经被你的项目使用了，所以会出现错误。</p></li><li><p>连接成功后，在GitHub中新建一个repository</p></li><li><p>在git bash中不断的<code>../</code>,<code>cd</code>后，来到我的blog文件夹。</p></li><li><p>执行下列指令</p></li></ul><pre><code data-query={} data-lang>git init  # 添加本地git仓库，在文件夹中出现`.git`文件夹\ngit remote add origin git@github.com:cong25825933/blogsource.git # 添加远程github服务器\ngit add source # 将博文内容加入缓存  git add 命令来添加当前项目的所有文件。\ngit add themes\ngit add _config.yml # 我只需要备份这三份文件\ngit commit -m \'first commit\' # 将缓存区内容添加到仓库中。\ngit push -u origin master # 发送至Github\n</code></pre><ul><li><p>如果没什么大乱子的话，应该就成功了。</p><h2 id=没啦><a href=#%E6%B2%A1%E5%95%A6 aria-hidden=true><span class="icon icon-link"></span></a>没啦</h2></li></ul>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=instant-git-test.js.map