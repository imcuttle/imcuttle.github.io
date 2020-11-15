webpackJsonp([34,113],{1231:function(s,n){s.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><p>上传文件，基本上是每一个网站应用都会具备的一个功能。对于一个网络存储应用，对于上传功能要求更是迫切。<br>如今市面上成熟上传插件，如<code>WebUploader</code>，\"体积太大\"，不适合于移动端上传；再加上作为一位程序员的\"操守\"，当然还是更喜欢自己造轮子。</p><p>于是花了一天半时间，<code>MoUploader</code>应运而生。为什么叫<code>MoUploader</code>呢？<br><code>Mo</code>表示<code>Mobile</code>(其实更是因为我的绰号moyu)</p><!--more--><h2 id=关于实现原理><a href=#%E5%85%B3%E4%BA%8E%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86 aria-hidden=true><span class=\"icon icon-link\"></span></a>关于实现原理</h2><ul><li><p>首先需要明确，上传这东西不仅仅是只需要前端就能完成的很好的，需要前端后端统一数据格式，从而实现断点续传。（所以，该文适合于全栈工程师，至少是想成为）</p></li><li><p>还有，为什么需要分片，不分片能实现断点续传吗？分片是为了充分利用网络带宽，加快上传速度；不分片也是能够实现断点续传的。详细参考 <a href=http://fex.baidu.com/blog/2014/04/html5-uploader/>HTML5文件上传组件深度剖析</a>.<br>分片上传与断点续传之间没有很直接的关系.</p><p>好了，进入正题 - 实现断点续传的前提是需要服务器记录某文件的上传进度，那么根据什么判断是不是同一个文件呢？可以利用文件内容求md5码，如果文件过大，求取md5码也是一个很长的过程，所以对于大文件，只能针对某一段数据进行计算，加上服务器对cookie用户信息的判断，得到相对唯一的key</p><pre><code data-query={} data-lang>- 在前端页面，需要将文件按照一定大小进行分片，一次请求只发送这一小片数据，所以我们可以同时发起多个请求。但一次同时请求的连接数不宜过多，服务器负载过重\n\n对于文件分片操作，H5具有十分强大的File API，直接利用File对象的slice方法即可得到Blob对象.  \n至于同时传输数据的连接数控制逻辑，就需要花点脑子思考了\n\n- 前端把数据顺利得传给服务器了，服务器只需要按照数据中给的开始字节位置，与读取到的文件片段数据，写入文件即可\n</code></pre><p>更多信息就看源码吧！<a href=https://github.com/moyuyc/moUploader>MoUploader</a></p></li></ul><h2 id=功能实现><a href=#%E5%8A%9F%E8%83%BD%E5%AE%9E%E7%8E%B0 aria-hidden=true><span class=\"icon icon-link\"></span></a>功能实现</h2><ul><li>文件结构</li></ul><pre><code data-query={} data-lang>file-upload/\n├── bower_components/ # bower包\n├── db.js   # 数据操作接口\n├── demo.html\n├── md5.json # 数据\n├── mouploader.js # 源码\n├── README.md \n└── server.js # demo.html服务, 建立在3000端口\n\n1 directories, 8 files.\n</code></pre><p>(打印文件目录树使用的是自己写的<a href=https://github.com/moyuyc/directory-tree>print-dir</a>)</p><ul><li><p>怎么使用</p><ol><li><p>引入script，amd/cmd/...，</p></li><li><p>使用MoUploader</p><pre><code class=\"hljs language-js\"data-query={} data-lang=js>input.onchange = <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>e</span>) </span>{\n    <span class=hljs-keyword>var</span> self = <span class=hljs-keyword>this</span>;\n    <span class=hljs-keyword>var</span> moUploader = MoUploader({ \n        <span class=hljs-attr>files</span>: <span class=hljs-keyword>this</span>.files,\n        <span class=hljs-attr>uploadUrl</span>: <span class=hljs-string>'/upload'</span>,\n        <span class=hljs-attr>request</span>: <span class=hljs-literal>false</span>,\n        <span class=hljs-attr>onBeforeUpload</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>index</span>) </span>{\n            <span class=hljs-keyword>if</span>(index>=<span class=hljs-number>0</span>) {\n                self.files[index].progress = appendUploading(self.files[index], index)\n            }\n        },\n        <span class=hljs-attr>onOverAllProgress</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>index, loaded, total</span>) </span>{\n            <span class=hljs-built_in>console</span>.log(loaded / total)\n            <span class=hljs-comment>//setProgress(loaded / total, self.files[index].progress)</span>\n        },\n        <span class=hljs-attr>onLoad</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>index, chunkIndex, chunksNum</span>) </span>{\n            <span class=hljs-built_in>console</span>.log(<span class=hljs-string>'onLoad'</span>, <span class=hljs-keyword>this</span>, <span class=hljs-built_in>arguments</span>)\n        },\n        <span class=hljs-attr>onAbort</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>index, chunkIndex, chunksNum</span>) </span>{\n            <span class=hljs-built_in>console</span>.log(<span class=hljs-string>'onAbort'</span>, <span class=hljs-keyword>this</span>, <span class=hljs-built_in>arguments</span>)\n        },\n        <span class=hljs-attr>onError</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>index, chunkIndex, chunksNum</span>) </span>{\n            <span class=hljs-built_in>console</span>.log(<span class=hljs-string>'onError'</span>, <span class=hljs-keyword>this</span>, <span class=hljs-built_in>arguments</span>)\n        },\n        <span class=hljs-attr>onContinue</span>: <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params>file, md5, index</span>) </span>{\n            <span class=hljs-keyword>return</span> <span class=hljs-keyword>new</span> <span class=hljs-built_in>Promise</span>(<span class=hljs-function><span class=hljs-keyword>function</span>(<span class=hljs-params>reslove, reject</span>) </span>{\n                <span class=hljs-keyword>var</span> xhr = <span class=hljs-keyword>new</span> XMLHttpRequest()\n                xhr.open(<span class=hljs-string>'GET'</span>, <span class=hljs-string>'/getFile?md5='</span>+md5, <span class=hljs-literal>true</span>);\n                xhr.send(<span class=hljs-literal>null</span>);\n                xhr.addEventListener(<span class=hljs-string>'readystatechange'</span>, <span class=hljs-function><span class=hljs-keyword>function</span> (<span class=hljs-params></span>) </span>{\n                    <span class=hljs-keyword>if</span>(xhr.readyState === <span class=hljs-number>4</span> &amp&amp xhr.status === <span class=hljs-number>200</span>) {\n                        <span class=hljs-keyword>var</span> json = <span class=hljs-built_in>JSON</span>.parse(xhr.responseText);\n                        log(json)\n                        reslove(json.pos)\n                    }\n                })\n            })\n        }\n    })\n    \n    <span class=hljs-comment>// pause or continue upload</span>\n    <span class=hljs-comment>// if index &lt; 0, will run for all files</span>\n    <span class=hljs-comment>// moUploader.pause(index);</span>\n    <span class=hljs-comment>// moUploader.continue(index);    </span>\n}</code></pre></li><li><p>配置选项</p><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-keyword>var</span> default_ops = {\n    <span class=hljs-comment>// chunk Size: byte</span>\n    chunkSize: (<span class=hljs-number>1</span>&lt;&lt;<span class=hljs-number>20</span>) * <span class=hljs-number>5</span>,\n    <span class=hljs-comment>// Number: request Number.</span>\n    <span class=hljs-comment>// Array: files requests.</span>\n    <span class=hljs-comment>// Boolean: open or close Slice, if false, chunkSize don't work.</span>\n    request: <span class=hljs-number>3</span>,\n    <span class=hljs-attr>files</span>: [],\n    <span class=hljs-attr>uploadUrl</span>: <span class=hljs-string>'/'</span>,\n    <span class=hljs-comment>// function: get uploaded pos.</span>\n    <span class=hljs-comment>// arguments: file, md5, index.</span>\n    <span class=hljs-comment>// need return a promise object which will return uploaded pos.</span>\n    onContinue: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// if false, md5 will be setted by filename.</span>\n    md5: <span class=hljs-literal>true</span>,\n    <span class=hljs-comment>// md5Size: slice file 0 - md5Size for calculate md5</span>\n    md5Size: (<span class=hljs-number>1</span>&lt;&lt;<span class=hljs-number>20</span>) * <span class=hljs-number>50</span>,\n    <span class=hljs-comment>// called when before upload.</span>\n    <span class=hljs-comment>// arguments: file index or -1 (will begin upload)</span>\n    onBeforeUpload: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// function: uploading progress listener.</span>\n    <span class=hljs-comment>// *only listen one request.*</span>\n    <span class=hljs-comment>// arguments: index, chunkIndex, chunksNum, loaded, total.</span>\n    onProgress: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// function: overall uploading progress listener.</span>\n    <span class=hljs-comment>// arguments: index, loaded, total</span>\n    onOverAllProgress: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// function: called when one request is ended.</span>\n    <span class=hljs-comment>// arguments: index, chunkIndex, chunksNum</span>\n    onLoad: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// function: called when one request is aborted.</span>\n    <span class=hljs-comment>// arguments: index, chunkIndex, chunksNum</span>\n    onAbort: <span class=hljs-literal>null</span>,\n    <span class=hljs-comment>// function: called when one request happens error.</span>\n    <span class=hljs-comment>// arguments: index, chunkIndex, chunksNum</span>\n    onError: <span class=hljs-literal>null</span>\n}</code></pre></li><li><p>服务器数据处理 (Node.js)</p><p>数据分段写入文件</p><pre><code class=\"hljs language-js\"data-query={} data-lang=js><span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-title>writeBuffer</span>(<span class=hljs-params>bf, path, pos</span>) </span>{\n    <span class=hljs-keyword>var</span> fd = fs.openSync(path, <span class=hljs-string>'a+'</span>);\n    fs.writeSync(fd, bf, <span class=hljs-number>0</span>, bf.length, <span class=hljs-built_in>Number</span>(pos) || <span class=hljs-number>0</span>)\n    <span class=hljs-built_in>console</span>.log(<span class=hljs-string>`write buffer, pos: <span class=hljs-subst>${pos}</span>, path: <span class=hljs-subst>${path}</span>, length: <span class=hljs-subst>${bf.length}</span>`</span>)\n}\n\n<span class=hljs-function><span class=hljs-keyword>function</span> <span class=hljs-title>store</span>(<span class=hljs-params>param, chunks</span>) </span>{\n    param.chunks = param.chunks || <span class=hljs-number>1</span>\n    param.chunk = param.chunk || <span class=hljs-number>0</span>\n    <span class=hljs-keyword>var</span> p = path.join(<span class=hljs-string>'./upload'</span>, param.name)\n    <span class=hljs-keyword>var</span> bf = Buffer.concat(chunks);\n\n    <span class=hljs-keyword>var</span> json = db.get(param.md5);\n    <span class=hljs-keyword>if</span>(json) {\n        json.pos = <span class=hljs-built_in>parseInt</span>(json.pos!=<span class=hljs-literal>null</span>?json.pos : <span class=hljs-number>0</span>)\n        json.size = <span class=hljs-built_in>parseInt</span>(json.size!=<span class=hljs-literal>null</span>?json.size : <span class=hljs-number>0</span>)\n    }\n    <span class=hljs-keyword>if</span>(!json || (json.pos+json.size) &lt;= param.pos) {\n        <span class=hljs-comment>// 新的数据pos比数据库中大，更新数据</span>\n        param.size = bf.length\n        db.set(param.md5, param)\n        db.save();\n        writeBuffer(bf, p, param.pos || <span class=hljs-number>0</span>)\n    }\n}\n\n<span class=hljs-keyword>var</span> multiparty = <span class=hljs-built_in>require</span>(<span class=hljs-string>'multiparty'</span>)\n<span class=hljs-keyword>var</span> form = <span class=hljs-keyword>new</span> multiparty.Form({\n    <span class=hljs-attr>autoFields</span>: <span class=hljs-literal>true</span>,\n    <span class=hljs-attr>autoFiles</span>: <span class=hljs-literal>false</span>,\n});\n\nform.on(<span class=hljs-string>'part'</span>, (part) => {\n    form.on(<span class=hljs-string>'aborted'</span>, () => {\n        <span class=hljs-comment>//意外退出或者暂停都会保存数据</span>\n        <span class=hljs-built_in>console</span>.log(<span class=hljs-string>'aborted'</span>);\n        store(param, chunks)\n    })\n\n    <span class=hljs-keyword>var</span> chunks = []\n    part.on(<span class=hljs-string>'data'</span>, (data) => {\n        <span class=hljs-keyword>if</span>(part.filename) {\n            chunks.push(data)\n        }\n    }).on(<span class=hljs-string>'end'</span>, () => {\n        <span class=hljs-built_in>console</span>.log(<span class=hljs-string>'end'</span>)\n        store(param, chunks)\n    })\n\n});\nform.on(<span class=hljs-string>'field'</span>, (name, value) => {\n    param[name] = value;\n});</code></pre></li></ol></li></ul>",extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=slice-and-breakpoint-up-down.js.map