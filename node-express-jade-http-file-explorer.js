webpackJsonp([57,113],{1207:function(e,r){e.exports={content:"<style>.transformer-react-render{border:1px dashed #959da5;border-radius:5px;display:block}.transformer-react-render-container>pre{max-height:400px;transition:all .2s ease}.transformer-react-render-container>pre.focused{max-height:none;box-shadow:0 0 6px rgba(0,0,0,.2)}</style><h1 id=前言><a href=#%E5%89%8D%E8%A8%80 aria-hidden=true><span class=\"icon icon-link\"></span></a>前言</h1><p>我们有时候会有一个这样的需求，就是共享本地电脑的文件夹，方便在其他地方查看。 那么，我们可以用现成的FTP协议，但是ftp协议约束太高，界面丑陋，而且功能不能扩展， 所以，借着学习node的契机，我实践动手做了这个http文件浏览器。</p><!--more--><h1 id=预览><a href=#%E9%A2%84%E8%A7%88 aria-hidden=true><span class=\"icon icon-link\"></span></a>预览</h1><img src=false alt=ClipboardImage width=1845 height=419 data-src=http://obu9je6ng.bkt.clouddn.com/Fl8Rrj10iMlOgfPj6gij0qmoiIKd?imageslim> <img src=false alt=ClipboardImage width=1232 height=290 data-src=http://obu9je6ng.bkt.clouddn.com/FjRzFW2Sf8NZmtl6DataBXsCjHnF?imageslim> <img src=false alt=ClipboardImage width=1233 height=872 data-src=http://obu9je6ng.bkt.clouddn.com/Fj9QAb-KZfPuLC-PuEyq6Enn0p3j?imageslim> # 功能 * 支持图片，视频，音乐在线欣赏 * 支持文件夹压缩下载（管道流下载） # 实现<pre><code data-query={} data-lang>1. 安装`express`\n    npm install -g express\n2. 快速创建应用\n    express http_file_explorer\n\n    之后就可以看到快速创建的http_file_explorer应用\n3. 在`app.js`入口文件中\n\n```javascript\n    app.configure(function(){\n      app.set('views', __dirname + '/views');\n      app.set('view engine', 'jade');\n      app.use(express.bodyParser());\n      app.use(express.methodOverride());\n      //* 下面两个的顺序不能错，不然public文件夹中的资源请求也会被routes.index处理\n      app.use(express.static(__dirname + '/public'));\n      app.use(app.router);\n    });\n    ...\n    app.get('/*', routes.index);//对所有url进行处理\n```\n\n4. 关于`routes/index.js`\n\n```javascript\n    var fs = require('fs');\n    // 实现Promise标准的库，使得代码更优雅\n    var Q = require('q');\n    // 解析url信息\n    var url = require('url');\n    // 压缩功能使用的包\n    var archiver = require('archiver');\n    // 读取root，得到需要共享的文件夹路径\n    var root = fs.readFileSync('./root').toString();\n    exports.index = function(req, res){\n        // 解析url，得到参数等信息\n        var arg = url.parse(req.url,true),\n            query = arg.query;\n        // 将url路径解码，不然中文文件名出错\n        var r = decodeURIComponent(arg.pathname);\n        r=r==='/'?'':r;\n        console.info(r,query);\n        if(!query.compress){//是否压缩下载？\n            var state = fs.statSync(root+r);\n            if(state.isDirectory())\n                loadDir(root+r,r, req, res);\n            else\n                loadFile(root+r,r,query.raw,res);\n        }else{\n            loadZip(root+r,r,req,res);\n        }\n    };\n```\n\n5. 使用Promise，实现文件夹的同步读取\n可以参考&lt;a target='_blank' href='http://moyuyc.github.io/2016/05/01/%E3%80%8CECMAScript6%E3%80%8DPromise%E4%BB%8B%E7%BB%8D%E4%B8%8Enodejs%E5%AE%9E%E8%B7%B5%E8%BF%90%E7%94%A8(q.js)' >Promise介绍与nodejs实践运用(q.js)&lt;/a>\n\n```javascript\n    var statPr = function (root,file) {\n      var deferred = Q.defer();\n      fs.stat(root+'/'+file,function (err, stats) {\n        if(err) deferred.reject(err);\n        else {\n            stats.name = file;\n            stats.type = stats.isDirectory()?'文件夹':'文件';\n            deferred.resolve(stats, root);\n        }\n      });\n      return deferred.promise;\n    };\n    function loadDir(root,rela,req,res) {\n      fs.readdir(root,function (err,files) {\n        if(err) throw err;\n        Q.allSettled(files.map((x,i,a)=>{return statPr(r,x);}))\n    　　.then(function (results) {\n    　　var values=[];\n    　　results.forEach(x=>{\n    　　    if(x.state==='fulfilled'){\n        　　values.push(x.value);\n    　　    }else\n　　      　　console.error(x.reason);\n    　　});\n　　  　　res.render('file',Object.extend(o,\n       　　 {\n        　　title:'HTTP文件查看',\n        　　dirname:rela,\n        　　files : values.map(x=> {\n          　　  return {\n            　　type: x.type,\n            　　name: x.name,\n            　　time: x.mtime.format(),\n            　　size: x.size.toSize()\n            　　};\n        　　})\n        　　})\n    　　);\n    　　},console.error)\n      });\n    }\n```\n\n6. 关于`Jade`\n`Jade`是一个html模板，具有简洁的特点。\n关于`Jade`语法，参考[Jade 模板引擎使用](https://cnodejs.org/topic/5368adc5cf738dd6090060f2)\n\n7. 关于压缩实现\n在这我是用了`archiver`模块，其实还有很多的压缩解压缩模块，[参看更多](http://www.tuicool.com/articles/ZrQBjan)\n\n```javascript\n    var archiver = require('archiver');\n    function loadZip(file,rela,req,res) {\n        var state = fs.statSync(file);\n        var filename = rela.substring(rela.lastIndexOf('/')+1);\n        var archive = archiver('zip');\n        archive.on('error', function(err){throw err;});\n        archive.pipe(res);\n        if(state.isDirectory()) archive.directory(file,filename);\n        else archive.file(file,{name:filename});\n        archive.finalize();\n    }\n```\n更多文档资料可以查看[archiver](https://github.com/ctalkington/node-archiver)\n8. 关于管道流\n下载文件传统的方法如下：\n```javascript\nfs.readFile(path,function(err,data){\n    if(err) throw err;\n    res.end(data);\n})\n```\n传统方式将数据全部读取完毕后，才产生响应，第一，服务器需要花费较大内存保存数据，第二，不能及时(相对)响应。\n然后，我们可以改进为以下方法\n```javascript\nvar stream = fs.createReadStream(path);\nstream.on('data',function(data){\n    res.write(data);\n});\nstream.on('end',function(){\n    res.end();\n})\n```\n这种方法，乍一看，好像解决了传统方法的问题，但是！对于本地文件，可读流是快速的，相比于网络传输的数据，可写流的慢速的，\n所以服务器端的缓冲器将会很快被填满，然后继续讲数据写入内存中，还是会出现传统方法的第一个问题。\n就此问题，我们可以采用下面的方法解决\n\n```javascript\n    var stream = fs.createReadStream(path);\n    stream.on('data',function(data){\n        if(!res.write(data)){//无法将数据写入缓冲区\n            stream.pause();//暂停发送数据\n        }\n    });\n    // 缓冲器已经没数据了！\n    stream.on('drain',function(){\n        stream.resume();//恢复\n    })\n    stream.on('end',function(){\n        res.end();\n    })\n```\n\n也就是说，发送方将缓冲区填满后，就停止发送数据了，然后接收方将缓冲区数据完全读取走后，发送方恢复发送数据\n最后，`stream.pipe()`就是基于这种方法实现的，所以我们可以直接使用管道流\n\n```javascript\n    //可读流结束发送数据后，可写流写完数据后自动结束关闭\n    fs.createReadStream(path).pipe(res);\n```\n\n可以将数据流想象成水流，管道流就是一根水管，一端进水，另一端出水，也就是一端为可读数据流，另一端为可写数据流，而缓冲区就是水管的容量。\ngithub上的文件下载就是使用管道流实现的吧？\n</code></pre><h1 id=下载><a href=#%E4%B8%8B%E8%BD%BD aria-hidden=true><span class=\"icon icon-link\"></span></a>下载</h1><p><a href=https://github.com/moyuyc>github地址</a></p>",extra:{"_image-loader_":[],_progressive_:[]}}}});
//# sourceMappingURL=node-express-jade-http-file-explorer.js.map