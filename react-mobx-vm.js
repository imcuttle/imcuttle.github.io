webpackJsonp([46,113],{1219:function(s,a){s.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h2 id=react-mobx-vm><a href=#react-mobx-vm aria-hidden=true><span class="icon icon-link"></span></a><a href=https://github.com/be-fe/react-mobx-vm>React-Mobx-VM</a></h2><p>纵观主流的react状态管理库，Redux、mobx-state-tree 大致的开发app的流程是：先创建一个全局的唯一的store，全局store的数据包括一些子页面的page store 和一些全局的context（如user information），其中page store内的数据又包括页面内的数据，ui方面（isLoading/isFetching）和逻辑方面（list 列表数据）。在页面中又将一些统一的视图独立成一个个component，数据通过react props按需传递下去。所以我们需要在构建一个 st（state tree），如下图 <img src=false width=406 height=538 data-src=https://i.loli.net/2018/03/02/5a9967bc17b90.jpg></p><p>但是这仅仅是数据层面的事情儿，需要将数据和视图关联起来，还需要维护一个vt（view tree）结构与st基本一致，通过react props传递机制去关联 st 与 vt。</p><p>上面介绍的仅仅为从上至下的传递，如果一个component想要去修改全局store或page store的数据呢？ 我们需要去传递callback(redux) 或者是父亲的reference（通过props或是react context接收，mobx）进而去改变数据。</p><img src=false width=536 height=415 data-src=https://i.loli.net/2018/03/02/5a9967d5e324d.jpg><p>以上便是以前我们的开发模式的概况。 我们需要维护两份tree（st和vt）</p><hr><p>下面介绍的view model模式，则只需要维护一份tree（view和state捆绑在一起成为一个节点），不需要我们额外考虑在view中的数据分发。</p><ol><li>view model 提供 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#bindview>bindView</a> 修饰器，传入参数 React Component Class ，修饰model class，那么被修饰的model 就会与view绑定起来成为 view model。同时传入的view会被mobx observe修饰，除外还同步了view层的componentDidMount/componentWillReceiveProps/componentWillUnmount 几个生命周期至model中</li></ol><pre><code class="hljs language-js"data-query={} data-lang=js><span class=hljs-keyword>import</span> { Root, bindView, observable } <span class=hljs-keyword>from</span>  <span class=hljs-string>\'react-mobx-vm\'</span>\n<span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>View</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>React</span>.<span class=hljs-title>Component</span> </span>{\n    render() {\n        <span class=hljs-keyword>return</span> <span class=xml><span class=hljs-tag>&lt;<span class=hljs-name>div</span>></span>{this.local.val}<span class=hljs-tag>&lt;/<span class=hljs-name>div</span>></span></span>\n    }\n}\n@bindView\n<span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>Model</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>Root</span> </span>{\n    @observable val = <span class=hljs-string>\'123\'</span>\n}</code></pre><ol start=2><li>React.createElement 是不能够用来渲染vm实例的，因此我们还提供了<a href=https://be-fe.github.io/react-mobx-vm/api/others#h>h</a>方法 用于渲染vm实例。</li><li>应用中难免会出现一些子页面、组件需要修改父页面或全局的状态。vm针对这类情景提供了类mobx inject的修饰器，直接调用 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#inject>inject</a> 即可注入 this.app 在view中，也就是全局store的引用。<a href=https://be-fe.github.io/react-mobx-vm/examples/inject-collect>栗子</a></li></ol><pre><code class="hljs language-js"data-query={} data-lang=js>@inject\n<span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>View</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>React</span>.<span class=hljs-title>Component</span> </span>{\n    render() {\n     <span class=hljs-comment>// this.app</span>\n    }\n}</code></pre><ol start=4><li>除外还提供了 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#binding>binding</a> 修饰器，用于修饰view，可以使用简洁的方式来实现双向绑定。于此相关的还有 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#bindable>bindable</a>，用来实现自定义的双向绑定规则（降低组件调用代码书写的开销）；与之对应的是unBindable方法。<a href=https://be-fe.github.io/react-mobx-vm/examples/binding>binding 栗子</a></li></ol><pre><code class="hljs language-js"data-query={} data-lang=js>@bindView(View)\n<span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>Model</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>Root</span> </span>{\n   @observable abc = <span class=hljs-string>\'123\'</span>\n}\n<span class=hljs-comment>// 一劳永逸的用法</span>\n@binding\n<span class=hljs-class><span class=hljs-keyword>class</span> <span class=hljs-title>View</span> <span class=hljs-keyword>extends</span> <span class=hljs-title>React</span>.<span class=hljs-title>Component</span> </span>{\n   render() {\n     <span class=hljs-keyword>return</span> (\n       <span class=xml><span class=hljs-tag>&lt;<span class=hljs-name>div</span>></span>\n         </span>&lt;input data-bind="abc" />\n       &lt;/div><span class=xml>\n     )\n   }\n}\n\nclass View extends React.Component {\n   // 在成员方法里面修饰\n   @binding\n   renderSomething() {\n     // return ...\n   }\n   // 在getter方法里面修饰\n   @binding\n   get Something() {\n     // return ...\n   }\n   render() {\n     // 或者绑定指定的 react-element\n     return (\n       </span>&lt;div>\n         {binding(this.local)(\n           &lt;input data-bind="abc" />\n         )}\n         // 或者直接传入 element\n         // 注意：需要绑定 `data-scope` 作用域\n         {binding(&lt;input data-bind="abc" data-scope={this.local} />)}\n       &lt;/div>\n     )\n   }\n}</code></pre><ol start=5><li>提供 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#stateless>stateless</a> 来书写简单的组件（Function Component）</li></ol><pre><code class="hljs language-js"data-query={} data-lang=js><span class=hljs-keyword>export</span> <span class=hljs-keyword>default</span> stateless(<span class=hljs-function>(<span class=hljs-params>local, props</span>) =></span>\n  &lt;div><span class=xml><span class=hljs-tag>&lt;/<span class=hljs-name>div</span>></span></span>\n)</code></pre><ol start=6><li><strong>提供非常优雅的深链同步（数据同步至url）修饰器，不需要书写多余的代码。<a href=https://be-fe.github.io/react-mobx-vm/examples/url-sync#/?abc=hi>在线栗子</a></strong></li><li>reaction 基于mobx reaction和model生命周期实现的reaction，监控到数据改变就会触发该方法</li><li>autorun 类似于reaction，不同的是初始化时会惩罚该方法，更多介绍请查阅mobx文档</li></ol><p>在react router 3中，接收的route中的component 为 react component class，所以我们提供了一个针对react router 3的router 用法与官方的一致，但它支持vm节点的渲染。</p><p>view model的开发模式给我们带来更多便捷，但同时也产生了一个<strong>新问题 代码分割</strong></p><p>我们可以在全局app store中挂载异步加载每个页面的vm实例，然后在 routes 中对应 getComponent（需要使用提供的 <a href=https://be-fe.github.io/react-mobx-vm/api/others#/router>Router 组件</a>），这样便可以实现vm的代码分割。 但是这样实现后，如何才能进行子操控父或跨页面数据操控呢？于是提供 <a href=https://be-fe.github.io/react-mobx-vm/api/decorator#/collect>collect</a> API来收集那些异步的 vm 实例。</p>',extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=react-mobx-vm.js.map