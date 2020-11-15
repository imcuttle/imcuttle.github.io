webpackJsonp([63,113],{1201:function(e,o){e.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p>上一篇文件简单介绍了下<code>Moka Desktop</code>, 那么对于我这位<code>Web前端开发工程师</code>是怎么能够开发一个<code>Pc App</code>的呢？<br>这就不得不说到 <a href=http://electron.atom.io/><code>electron</code></a>. <img src=false alt=electron width=400 height=400 data-src=\"https://avatars3.githubusercontent.com/u/13409222?v=3&#x26s=400\"></p><p><code>Electron</code> 将<code>chrome</code>内核与<code>nodejs</code>融合在一起，分为<code>Main Process</code> 和 <code>Renderer Process</code>, <code>Main Process</code>主要负责app通用的全局设置，如窗口大小等等，<code>Renderer Process</code>则主要在<code>Chrome</code>中，在两个<code>Process</code>中可以使用所有的<code>node packages</code></p><h2 id=所用第三方><a href=#%E6%89%80%E7%94%A8%E7%AC%AC%E4%B8%89%E6%96%B9 aria-hidden=true><span class=\"icon icon-link\"></span></a>所用第三方</h2><ol><li>react</li><li>babel: 由于react使用的是<code>es6</code>语法，所以需要<code>babel</code>翻译</li><li>ace.js: 编辑器</li><li>marked.js</li><li>moka-cli</li><li>未使用webpack，因为在react中会包含文件系统操作，webpack只是充当打包的角色，<code>fs</code>是不能打包成功的</li></ol><h2 id=坑点><a href=#%E5%9D%91%E7%82%B9 aria-hidden=true><span class=\"icon icon-link\"></span></a>坑点</h2><ol><li><p><code>iframe</code>与<code>webview</code><br>由于编辑器是我之前用原生js完成的，所以便想用<code>iframe</code>直接引入。 但如果直接使用<code>iframe</code>，<code>electron</code>可不认，在<code>iframe</code>不能使用<code>node api</code>与<code>electron api</code>，但是可以在父窗口利用<code>contentWindow</code>传入引用，然后在<code>iframe</code>中就可以用api了。 其实在官方文档中，是可以直接用<code>webview</code>标签解决上诉问题</p></li><li><p>mac中使用<code>spawn</code>与<code>fork</code>运行<code>moka-cli</code> 在官方api <a href=https://nodejs.org/api/child_process.html><code>child_process</code></a>中<br><code>child_process.spawn(command[, args][, options])</code> 传入参数是<code>command</code>，也就是shell中的指令 需要依赖于<code>PATH</code>中的<code>moka</code> <code>child_process.fork(modulePath[, args][, options])</code>传入参数是<code>modulePath</code>，也就是<code>javascript</code>文件路径<br><strong>注意： <code>modulePath</code>不需要<code>exports</code>，因为fork只是找到文件，开个进程跑一遍该文件</strong> 所以我在<code>npm i --save moka-cli</code>后, 直接在文件中写下面代码即可</p></li></ol><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-keyword>var</span> moka = <span class=hljs-built_in>require</span>(<span class=hljs-string>'moka-cli/bin'</span>) <span class=hljs-comment>// bin/index.js中放的便是命令行入口</span></code></pre><p>同时需要传入<code>options</code></p><pre><code class=\"hljs language-js\"data-query={} data-lang=js>{\n    <span class=hljs-attr>cwd</span>: cwd, <span class=hljs-comment>// 设置的工作目录(current work directory)</span>\n    stdio: [\n      <span class=hljs-number>0</span>, <span class=hljs-comment>// (stdin) Use parents stdin for child</span>\n      <span class=hljs-string>'pipe'</span>, <span class=hljs-comment>// (stdout) Pipe child's stdout to parent</span>\n      <span class=hljs-string>'pipe'</span>, <span class=hljs-comment>// (stderr) Pipe child's stderr to parent</span>\n      <span class=hljs-string>'ipc'</span> <span class=hljs-comment>// fork 需要`ipc`进行进程通信</span>\n    ]\n}</code></pre><p>传入以上<code>options</code>后才能在<code>fork</code>返回的<code>ChildProcess</code>对象中使用<code>stdout/stderr</code><br>关于具体的进程通信与管道与信号机制，请看<a href=http://akaedu.github.io/book/>Linux C 一站式教程</a>中的相关章节。</p><ol start=3><li>打包过程<br>可以使用<a href=https://github.com/electron-userland/electron-packager><code>electron-packager</code></a>或者<a href=https://www.npmjs.com/package/electron-builder><code>electron-builder</code></a>进行打包 安装<code>electron</code>时，可以设置<code>export ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/</code> 使用国内代理加快下载速度。 我在使用<code>packager</code>时，只能打包成<code>unpacked</code>，<code>builder</code>可以打包成<code>packed</code>,也就是安装器，但是<code>builder</code>产生的安装器的图标不对。所以最后还是使用的<code>packager</code></li></ol>",extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=moka-desktop-program-record.js.map