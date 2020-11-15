webpackJsonp([2,113],{1214:function(a,e,i){a.exports={content:'<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h2 id=抛出问题><a href=#%E6%8A%9B%E5%87%BA%E9%97%AE%E9%A2%98 aria-hidden=true><span class="icon icon-link"></span></a>抛出问题</h2><ul><li>情景A 小明在网上查找资料时（如百度百科、wiki），觉得网页上的一些话（错误或是重点）需要记录下来，于是使用截图的方式记录下来。</li></ul><p>截图虽然比较方便，但是不方便还原及随后的查阅。</p><ul><li>情景B 小红和小蓝想对网上的一篇文章一起讨论学习。于是他们事先各自完成自己的任务，最后把总结文章互相分享出来。</li></ul><p>上面的情景有统一问题是：需要共享自己在同一个网页上的数据。 其实类似的问题情景还有许多；比如我们前端工程师做的UI还原，UE图的共享等等。</p><p>针对上面类似的问题，做了一版产物雏形（还有很多需要完善的地方）- <a href=https://github.com/big-wheel/iioo/blob/master/packages/markme/Readme.md>markme</a></p><h2 id=markme><a href=#markme aria-hidden=true><span class="icon icon-link"></span></a>Markme</h2><p><img src=https://github.com/big-wheel/iioo/raw/master/packages/markme/snapshot.gif alt="markme snapshot"></p><p>如图是 markme 在 wiki 页面上的效果，可以使用鼠标左键选中的方式来对页面文本进行标注，书写备注。</p><h3 id=markme-leancloud><a href=#markme-leancloud aria-hidden=true><span class="icon icon-link"></span></a>Markme leancloud</h3><p>leancloud 是一个国内的云存储服务平台，利用该平台的数据存储能力，可以把我们在页面上的标注数据存储。</p><p><a href=https://github.com/big-wheel/iioo/tree/master/packages/markme-leancloud>markme-leancloud</a> 便是对 markme 和 leancloud 功能的整合。</p><p>同时搭配<a href=https://chrome.google.com/webstore/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag?hl=zh-CN>暴力猴</a>(使用暴力猴可以在指定的页面注入额外的js代码)，可以对任意网页进行页面标注。<a href=https://gist.github.com/imcuttle/c345279c6b7a690a5722a8506ba8f1a9>脚本点这</a></p><h2 id=产物实现原理><a href=#%E4%BA%A7%E7%89%A9%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86 aria-hidden=true><span class="icon icon-link"></span></a>产物实现原理</h2><p><img src=./Markme.svg data-image-loader=0></p><h2 id=问题><a href=#%E9%97%AE%E9%A2%98 aria-hidden=true><span class="icon icon-link"></span></a>问题</h2><ul><li>页面数据更新后，页面标注？</li></ul><p>添加 <code>content</code> 属性，定位成功后，对比 <code>content</code> 是否一致？</p><ul><li>交互：click 触发可能会触发其他操作，应该如何优化？(hover like title)</li></ul><h2 id=提升><a href=#%E6%8F%90%E5%8D%87 aria-hidden=true><span class="icon icon-link"></span></a>提升</h2><p>当然还是有可以提升的地方，如：</p><ul><li>书写 Chrome 插件</li><li>协同编辑（使用leancloud API）</li><li>更多样的交互</li></ul>',extra:{"_image-loader_":[i(1262)],_progressive_:[]}}},1262:function(a,e,i){a.exports=i.p+"4458f225f743897aaaa51b613e7e38f0.svg"}});
//# sourceMappingURL=page-mark.js.map