webpackJsonp([97,113],{1166:function(s,n){s.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p>在进入主题之前，我们先看一个 React PropTypes 定义的问题。</p><h2 id=问题背景><a href=#%E9%97%AE%E9%A2%98%E8%83%8C%E6%99%AF aria-hidden=true><span class=\"icon icon-link\"></span></a>问题背景</h2><p>在写 React PropTypes 定义的时候，比如如下 Button 组件：</p><pre><code class=\"hljs language-jsx\"data-query={} data-lang=jsx><span class=hljs-keyword>import</span> {ICON_SIZE_LIST} <span class=hljs-keyword>from</span> <span class=hljs-string>'comps/Icon'</span>\n<span class=hljs-keyword>export</span> <span class=hljs-keyword>const</span> BUTTON_TYPE_LIST = [<span class=hljs-string>'default'</span>, <span class=hljs-string>'primary'</span>, <span class=hljs-string>'normal'</span>, <span class=hljs-string>'success'</span>, <span class=hljs-string>'danger'</span>, <span class=hljs-string>'pale'</span>, <span class=hljs-string>'bare'</span>, <span class=hljs-string>'link'</span>]\n<span class=hljs-keyword>export</span> <span class=hljs-keyword>const</span> BUTTON_SIZE_LIST = [<span class=hljs-string>'default'</span>, <span class=hljs-string>'small'</span>, <span class=hljs-string>'large'</span>, <span class=hljs-string>'x-small'</span>]\n\n<span class=hljs-keyword>export</span> <span class=hljs-keyword>default</span> <span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>Button</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>React</span>.<span class=hljs-title>Component</span> </span>{\n    <span class=hljs-keyword>static</span> propTypes = {\n        <span class=hljs-comment>/**\n         * 按钮类型类型 'default' | 'primary' | 'success' | 'danger' | 'normal' | 'pale'\n         */</span>\n        type: PropTypes.oneOf(BUTTON_TYPE_LIST),\n\n        <span class=hljs-comment>/**\n         * 尺寸 'default' | 'small' | 'x-small' | 'large'\n         * 实际没有large，因为规范上没有定义\n         */</span>\n        size: PropTypes.oneOf(BUTTON_SIZE_LIST),\n\n        <span class=hljs-comment>/**\n         * 图标前缀，仅限于已经收录于 Icon 的 font 类型图标\n         */</span>\n        icon: PropTypes.string,\n\n        <span class=hljs-comment>/**\n         * 指定前缀图标的尺寸，即 Icon 的 prop.size\n         */</span>\n        iconSize: PropTypes.oneOf(ICON_SIZE_LIST),\n        <span class=hljs-comment>// ...</span>\n    }\n}</code></pre><p>定义 Button 的 propTypes 包括一些需要计算的参数，如 <code>ICON_SIZE_LIST</code> 来自外部。 这时候如果使用 <a href=https://github.com/reactjs/react-docgen>react-docgen</a> 来静态分析代码，对于 <code>ICON_SIZE_LIST</code> 将不能解析出其真实值。也就是说使用静态代码分析对于 computed value 不能很好的处理。</p><p>那么对于上述的问题有什么比较优雅的解决方式呢？</p><h2 id=问题解决思路><a href=#%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3%E6%80%9D%E8%B7%AF aria-hidden=true><span class=\"icon icon-link\"></span></a>问题解决思路</h2><p>对于 computed value，需要执行脚本才能正确地获取值。那么如何才能在 Node.js 中执行上述 React 代码？ 有过 SSR（服务端渲染）开发经验的同学，对于这个问题应该不陌生，一般的解决方式是：在 Node.js 环境中 <code>require('babel-register')</code>，然后直接 <code>require</code> 前端模块代码，然后在书写前端代码时候，需要注意判断是 Node.js 环境还是 Browser 环境，如</p><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-keyword>if</span> (<span class=hljs-keyword>typeof</span> <span class=hljs-built_in>document</span> !== <span class=hljs-string>'undefined'</span>) {\n  <span class=hljs-comment>// Browser</span>\n} <span class=hljs-keyword>else</span> {\n  <span class=hljs-comment>// Node.js</span>\n}</code></pre><p>这种解决方式有可能带来问题，如在前端代码中执行 node.js 端 api，如 <code>require('fs').writeFileSync(...)</code>，正常在 Webpack 环境（target 为 web）下执行是不被允许的，但这时候在 Node.js 环境下执行却被运行，所以可能带来一些危险操作。</p><p>所以考虑模拟实现一个 CommonJS 环境，如 Webpack，可以用来自定义 global 和 require 的规则，甚至进行代码转化。同时避免污染 Node.js 的 CommonJS 环境</p><h3 id=commonjs-环境实现思路><a href=#commonjs-%E7%8E%AF%E5%A2%83%E5%AE%9E%E7%8E%B0%E6%80%9D%E8%B7%AF aria-hidden=true><span class=\"icon icon-link\"></span></a>CommonJS 环境实现思路</h3><p>在实现 CommonJS 环境前，先需要了解一下 <a href=https://javascript.ruanyifeng.com/nodejs/module.html>CommonJS 是什么</a></p><p>CommonJS 最为核心的为 Module 类</p><pre><code class=\"hljs language-ts\"data-query={} data-lang=ts><span class=hljs-keyword>class</span> Module {\n  <span class=hljs-comment>// 是否加载完成</span>\n  loaded: <span class=hljs-built_in>boolean</span>\n  <span class=hljs-comment>// 缓存的 exports </span>\n  exports: <span class=hljs-built_in>any</span>\n  <span class=hljs-comment>// Module 直接依赖的 Module</span>\n  children: Module[]\n  <span class=hljs-comment>// Module 的父亲</span>\n  parent: Module\n}</code></pre><p>其中 CommonJS 环境有如下参数变量</p><pre><code class=\"hljs language-ts\"data-query={} data-lang=ts><span class=hljs-keyword>namespace</span> CommonJS&lt;T> {\n   <span class=hljs-built_in>require</span>: <span class=hljs-function>(<span class=hljs-params>id</span>) =></span> <span class=hljs-built_in>any</span> &amp {cache: <span class=hljs-built_in>Object</span>&lt;<span class=hljs-built_in>string</span>, Module>, main: Module, resolve: <span class=hljs-built_in>Function</span>, extensions: {}}\n   <span class=hljs-comment>// 当前 Module 对象</span>\n   <span class=hljs-keyword>module</span>: Module\n   // 文件名\n   __filename: string\n   // 文件目录\n   __dirname: string\n   // 全局环境变量\n   global: T\n} &amp T</code></pre><p>所以 CommonJS 需要实现的重点对象为：<code>require</code> / <code>module</code> / <code>global</code>，以及模块加载的机制实现。在这里使用 <a href=https://nodejs.org/api/vm.html>vm</a> 模块创建沙盒环境。</p><h4 id=vm-使用实例><a href=#vm-%E4%BD%BF%E7%94%A8%E5%AE%9E%E4%BE%8B aria-hidden=true><span class=\"icon icon-link\"></span></a>vm 使用实例</h4><ol><li>使用 vm.Script 创建执行脚本 script</li><li>执行 script.runInContext(context)</li></ol><pre><code data-query={} data-lang>const vm = require('vm');\n\nconst sandbox = {\n  animal: 'cat',\n  count: 2\n};\n\nconst script = new vm.Script('count += 1; name = \"kitty\";');\n\nconst context = vm.createContext(sandbox);\nfor (let i = 0; i &lt; 10; ++i) {\n  script.runInContext(context);\n}\n\nconsole.log(sandbox);\n// { animal: 'cat', count: 12, name: 'kitty' }\n</code></pre><h4 id=require-模块加载流程><a href=#require-%E6%A8%A1%E5%9D%97%E5%8A%A0%E8%BD%BD%E6%B5%81%E7%A8%8B aria-hidden=true><span class=\"icon icon-link\"></span></a>require 模块加载流程</h4><pre><code data-query={} data-lang>输入 moduleName\n     |\n     |\nid = require.resolve(moduleName)\n     |\n     |\n判断加载模块是否存在在 require.cache  —————————————>  return require.cache[id]\n     |                                  存在\n     | 不存在\n     |\n创建 newModule，写入 require.cache\n     |\n     |\n在沙盒环境执行，注入 `require/module/global/...`\n     |\n     |\nnewModule.exports = module.exports\nnewModule.loaded = true\n     |\n     |\nreturn module.exports\n</code></pre><h4 id=环形依赖的特殊性><a href=#%E7%8E%AF%E5%BD%A2%E4%BE%9D%E8%B5%96%E7%9A%84%E7%89%B9%E6%AE%8A%E6%80%A7 aria-hidden=true><span class=\"icon icon-link\"></span></a>环形依赖的特殊性</h4><p>我们来看一个环形依赖具体的例子</p><ul><li><code>a.js</code></li></ul><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-built_in>console</span>.log(<span class=hljs-string>'a.js exports entry'</span>, <span class=hljs-built_in>module</span>.exports)\n<span class=hljs-built_in>module</span>.exports = {\n  <span class=hljs-attr>b</span>: <span class=hljs-built_in>require</span>(<span class=hljs-string>'./b'</span>),\n  <span class=hljs-attr>a</span>: <span class=hljs-string>'a'</span>\n}\n<span class=hljs-built_in>console</span>.log(<span class=hljs-string>'a.js exports'</span>, <span class=hljs-built_in>module</span>.exports)</code></pre><ul><li><code>b.js</code></li></ul><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-built_in>console</span>.log(<span class=hljs-string>'b.js exports entry'</span>, <span class=hljs-built_in>module</span>.exports)\n<span class=hljs-built_in>module</span>.exports = {\n  <span class=hljs-attr>a</span>: <span class=hljs-built_in>require</span>(<span class=hljs-string>'./a'</span>),\n  <span class=hljs-attr>b</span>: <span class=hljs-string>'b'</span>\n}\n<span class=hljs-built_in>console</span>.log(<span class=hljs-string>'b.js exports'</span>, <span class=hljs-built_in>module</span>.exports)</code></pre><p>执行 <code>node a.js</code> 和 <code>node b.js</code> 分别 log 如何呢？</p><ul><li><code>node a.js</code></li></ul><pre><code data-query={} data-lang>a.js exports entry {}\nb.js exports entry {}\nb.js exports { a: {}, b: 'b' }\na.js exports { b: { a: {}, b: 'b' }, a: 'a' }\n</code></pre><ul><li><code>node b.js</code></li></ul><pre><code data-query={} data-lang>b.js exports entry {}\na.js exports entry {}\na.js exports { b: {}, a: 'a' }\nb.js exports { a: { b: {}, a: 'a' }, b: 'b' }\n</code></pre><p>可以看到，对于环形依赖，可能导致某固定 Module exports 数据不同。</p><p>具体代码实现参看 <a href=https://github.com/imcuttle/my-runner>my-runner</a><br>它具有类似 <a href=https://jestjs.io/docs/en/configuration>Jest</a> 的配置，可见 Jest 的原理其实也是使用 vm 模拟了 CommonJS 环境。</p><h2 id=应用场景><a href=#%E5%BA%94%E7%94%A8%E5%9C%BA%E6%99%AF aria-hidden=true><span class=\"icon icon-link\"></span></a>应用场景</h2><p>自定义 CommonJS 环境除了解决上述说明的背景问题以外，还有很多的应用场景，如： 1. SSR（Node.js 端执行前端代码，得到 View，使用 transform 转换代码，不需要载入 <code>babel-register</code>） 2. 测试（自定义 Module Name，进而 Mock Module） 3. 前端内容骨架生成 （Node.js 端执行前端代码，得到 View）</p><h2 id=相关资料><a href=#%E7%9B%B8%E5%85%B3%E8%B5%84%E6%96%99 aria-hidden=true><span class=\"icon icon-link\"></span></a>相关资料</h2><ul><li><a href=https://github.com/imcuttle/my-runner>my-runner</a> - CommonJS 模拟环境</li><li><a href=https://www.npmjs.com/package/resolve>resolve</a> - implements the node <code>require.resolve()</code> algorithm</li></ul>",extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=diy-一个-commonjs-运行环境吧.js.map