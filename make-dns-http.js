webpackJsonp([50,90],{1013:function(t,n){t.exports={content:'<h1 id="引言"><a href="#%E5%BC%95%E8%A8%80" aria-hidden="true"><span class="icon icon-link"></span></a>引言</h1>\n<p>之前，我介绍了使用思科构建VLAN服务，下面我将介绍利用思科建立DNS/HTTP服务。</p>\n<!--more-->\n<h1 id="操作流程"><a href="#%E6%93%8D%E4%BD%9C%E6%B5%81%E7%A8%8B" aria-hidden="true"><span class="icon icon-link"></span></a>操作流程</h1>\n<h2 id="dns服务搭建"><a href="#dns%E6%9C%8D%E5%8A%A1%E6%90%AD%E5%BB%BA" aria-hidden="true"><span class="icon icon-link"></span></a>DNS服务搭建</h2>\n<h3 id="网络布局"><a href="#%E7%BD%91%E7%BB%9C%E5%B8%83%E5%B1%80" aria-hidden="true"><span class="icon icon-link"></span></a>网络布局</h3>\n<img src="http://obu9je6ng.bkt.clouddn.com/FsaV6jseX-B4HeJkauxXcB7S-r8p?imageslim" alt="ClipboardImage" width="646" height="372" />\n如图，构建网络\n<h3 id="ip设置"><a href="#ip%E8%AE%BE%E7%BD%AE" aria-hidden="true"><span class="icon icon-link"></span></a>IP设置</h3>\n<p>其中各结点ip如下表所示</p>\n<table>\n<thead>\n<tr>\n<th>#</th>\n<th>IP</th>\n<th>默认网关</th>\n<th>DNS服务器</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Client</td>\n<td>10.0.0.2</td>\n<td>10.0.0.1</td>\n<td>10.0.0.3</td>\n</tr>\n<tr>\n<td>Local DNS Server</td>\n<td>10.0.0.3</td>\n<td>10.0.0.1</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Company Router Left</td>\n<td>10.0.0.1</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Company Router Right</td>\n<td>10.1.0.1</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Internet Router Left</td>\n<td>10.1.0.2</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Internet Router Right</td>\n<td>10.3.0.1</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Internet Router Down</td>\n<td>10.2.0.1</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Root DNS Server</td>\n<td>10.2.0.2</td>\n<td>10.2.0.1</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Example Router Left</td>\n<td>10.3.0.2</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Example Router Right</td>\n<td>10.4.0.1</td>\n<td>-</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Other Server</td>\n<td>10.4.0.2</td>\n<td>10.4.0.1</td>\n<td>-</td>\n</tr>\n<tr>\n<td>Yucong DNS Server</td>\n<td>10.4.0.3</td>\n<td>10.4.0.1</td>\n<td>-</td>\n</tr>\n</tbody>\n</table>\n<h3 id="dns解析表填写"><a href="#dns%E8%A7%A3%E6%9E%90%E8%A1%A8%E5%A1%AB%E5%86%99" aria-hidden="true"><span class="icon icon-link"></span></a>DNS解析表填写</h3>\n<p>Local DNS Server\n<img src="http://obu9je6ng.bkt.clouddn.com/Fkt-jQADVkr4MA-lEivvCRYSwvn0?imageslim" alt="ClipboardImage" width="653" height="576" /></p>\n<p>Root DNS Server\n<img src="http://obu9je6ng.bkt.clouddn.com/Fj0mOj4rXLbkGuhdW7ZJfc13beK3?imageslim" alt="ClipboardImage" width="653" height="576" /></p>\n<p>Yucong DNS Server\n<img src="http://obu9je6ng.bkt.clouddn.com/FpaM9412EqeSpp6_ew83Jr2ryyus?imageslim" alt="ClipboardImage" width="653" height="576" /></p>\n<h3 id="域名解析测试"><a href="#%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E6%B5%8B%E8%AF%95" aria-hidden="true"><span class="icon icon-link"></span></a>域名解析测试</h3>\n<p>对Client进行Ping指令测试，结果如下图\n<img src="http://obu9je6ng.bkt.clouddn.com/FhHlF8CHB9qwi3Wl3sL8GnuIkVHr?imageslim" alt="ClipboardImage" width="653" height="576" />\n说明成功搭建DNS服务！</p>\n<h3 id="dns-cache查看"><a href="#dns-cache%E6%9F%A5%E7%9C%8B" aria-hidden="true"><span class="icon icon-link"></span></a>DNS Cache查看</h3>\n<img src="http://obu9je6ng.bkt.clouddn.com/Fjf4BFssoqrsGnpjBbiR3Lnw5JJO?imageslim" alt="ClipboardImage" width="653" height="576" />\n<img src="http://obu9je6ng.bkt.clouddn.com/FpEuzGbDG-N99Ef9fd5QeKPSDCRh?imageslim" alt="ClipboardImage" width="653" height="576" />\n如上图，为Local DNS Server的DNS缓存，下次访问相同域名时，直接取出即可。\n<h2 id="http服务搭建"><a href="#http%E6%9C%8D%E5%8A%A1%E6%90%AD%E5%BB%BA" aria-hidden="true"><span class="icon icon-link"></span></a>HTTP服务搭建</h2>\n<p>在上面的基础上，完成HTTP服务器搭建</p>\n<h3 id="开启服务"><a href="#%E5%BC%80%E5%90%AF%E6%9C%8D%E5%8A%A1" aria-hidden="true"><span class="icon icon-link"></span></a>开启服务</h3>\n<p>若我想以Other Server作为HTTP服务器，进行如下设置即可\n<img src="http://obu9je6ng.bkt.clouddn.com/Fo44xaj3oT0z4aZWUsH4PgXumHyS?imageslim" alt="ClipboardImage" width="653" height="576" />\n<img src="http://obu9je6ng.bkt.clouddn.com/FgjhfKiup0GXYNu2yigRg-adpg8D?imageslim" alt="ClipboardImage" width="653" height="576" /></p>\n<h3 id="网页测试"><a href="#%E7%BD%91%E9%A1%B5%E6%B5%8B%E8%AF%95" aria-hidden="true"><span class="icon icon-link"></span></a>网页测试</h3>\n<p>对Client打开Web Browser，输入<code>other.yucong.com</code>\n<img src="http://obu9je6ng.bkt.clouddn.com/Fm1K6NQGtDXHe6fiHdP3qmxOsXSd?imageslim" alt="ClipboardImage" width="653" height="576" />\n如图，正常访问！</p>\n',extra:{}}}});