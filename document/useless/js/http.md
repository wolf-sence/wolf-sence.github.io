## http1.0、1.1、2.0、3.0
### 总览

| 特性 | HTTP/1.0 | HTTP/1.1 | HTTP/2.0 | HTTP/3.0 |
| -----|-----| ----- | ----- | ----- |
| 连接 | 短连接 | 持久连接 | 持久连接 | 持久连接 |
| 多路复用 | 不支持 | 不支持 | 支持 | 支持 |
| 队头阻塞 | 存在 | 存在 | 应用层解决 | 彻底解决 |
| 头部压缩 | 不支持 | 不支持 | 支持 | 支持 |
| 服务器推送 | 不支持 | 不支持 | 支持 | 支持 |
| 协议 | 文本协议 | 文本协议 | 二进制协议 | 二进制协议 |
| 底层协议 | TCP | TCP | TCP | UDP (QUIC) |
| 性能 | 较低 | 较高 | 大幅提升 | 极致性能 |
| 成熟度 | 已淘汰 | 广泛使用 | 广泛使用 | 逐渐普及 |

### http1.0
现在基本已被淘汰，仅在一些非常简单的、对性能要求不高的场景可能存在。
- 特点
    * 无状态连接： 每次请求都建立一个新的 TCP 连接，请求完成后连接关闭。
    * 短连接： 每个 TCP 连接只传输一个 HTTP 请求和响应。
    * 不支持持久连接、管道化等特性。
- 缺点
    * 频繁的三次握手导致性能损耗
    * 无Host头限制，无法实现虚拟主机
### http1.1
目前仍然广泛使用，但逐渐被 HTTP/2 取代。
- 特点
    * 持久连接： 引入了 Connection: keep-alive 头部，允许在一个 TCP 连接上进行多次 HTTP 请求和响应
    * 新增缓存控制： 引入了 Cache-Control、Etag、If-Modified-Since 等头部，增强了缓存机制
    * 支持断点续传： 通过 Range 头部，支持只请求资源的部分内容，方便断点续传和多线程下载。
    * Host 头部： 强制要求请求头中包含 Host 字段，使得服务器可以根据 Host 字段区分不同的域名，实现虚拟主机功能。
- 缺点
    * 队头阻塞（Head-of-Line Blocking）
    * 头部冗余（未压缩）
### http2.0
现代 Web 应用的首选协议，被广泛应用于各种浏览器和服务器。
- 特点
    * 二进制协议： 头部和数据都采用二进制格式传输，替代了 HTTP/1.x 的文本格式，减少了解析的开销，提高了传输效率。
    * 多路复用： 在一个 TCP 连接上可以并行发送多个 HTTP 请求和响应，解决了 HTTP/1.1 的队头阻塞问题。
    * 流： 将每个请求和响应分割成更小的帧（Frame），并为每个帧标记上流 ID，客户端和服务器可以并行发送和接收多个 Stream 的帧，最后再根据流 ID 将帧重新组装成完整的请求和响应。
    * 头部压缩： 使用 HPACK 算法压缩头部信息，减小头部大小，提高了传输效率。
    * 维护一份相同的静态字典： 包含常用的头部名称和值。
    * 维护一份动态字典： 在连接的生命周期内动态更新，记录客户端和服务器之间传输的头部信息。
    * 使用索引和差量编码： 对于重复出现的头部，可以使用索引或差量编码来表示，进一步减小头部大小。
    * 服务器推送（Server Push）： 允许服务器在客户端请求资源之前主动推送资源给客户端，减少了客户端发起请求的次数，提高了页面加载速度。
- 缺点
    * 仍基于TCP，存在TCP队头阻塞
    * 握手延迟问题未彻底解决

### http3.0
对性能要求极高的场景，例如视频流媒体、在线游戏、实时通信等，以及网络环境复杂的移动端应用。
- 特点
    * 基于 UDP 协议： 底层协议从 TCP 替换为 UDP，并使用 QUIC 协议保证可靠传输。
    * QUIC： Google 开发的基于 UDP 的可靠传输协议，HTTP/3 基于 QUIC 协议构建。
    * 0-RTT 连接建立： 支持在首次连接时即发送数据，减少延迟。
    * 连接迁移： 当网络环境发生变化（例如，从 WiFi 切换到移动网络）时，连接可以无缝迁移，保持连接的持久性，提高了用户体验。

## http与https

### https证书加密

## 强缓存与协商缓存
强缓存失效后，浏览器携带协商缓存的标识向服务器发起请求，由服务器根据协商缓存标识决定是否使用缓存
![cache](https://imgcdn.somebodyelse.cn/wolf2gang/http-cache.png)

### 强缓存
适合静态资源缓存，命中会直接返回200

- Expires： http1.0使用，是一个绝对时间，在这个时间以前都有效，以客户端时间为对比(所以如果修改本地时间也会导致缓存失效)
- Cache-Control： http1.1使用
    * no-cache: 可以缓存响应数据，但是每次使用前都需要向服务器验证，服务器返回一个etag允许使用,即使用协商缓存
    * no-store: 任何情况下都不要缓存数据，每次都要从原始服务器上获取，适用于敏感数据
    * max-age: 强缓存周期，在规定时间内直接从缓存取资源，单位是s
    * public： 可以被所有用户缓存，包括中间代理服务器、cdn
    * private： 只能被终端缓存，中继服务器不能缓存


### 协商缓存
适合动态接口做缓存
- http1.0: Last-Modified + If-Modified-Since
    * Last-Modified：第一次访问资源，服务器会返回资源的最后修改时间点
    * If-Modified-Since：第二次访问资源时，检测到缓存文件有Last-Modified，会将值写到请求头到If-Modified-Since中，由服务器对比资源的最后修改时间，如果没有改动就返回304，如果有更新就返回资源和200

- https1.1: ETag（优先级更高） + If-None-Match
    * etag：第一次访问时会返回文件的变化标识即etag，就像指纹，资源的变化都会导致etag变化，与时间无关
    * If-None-Match：第二次访问会将上次使用的资源的etag写到请求头的If-None-Match发送给服务器，询问是否有更新，使用缓存则返回304，否则返回200+新的资源

为什么有了Last-Modified之后还需要ETag？
因为资源文件可能会周期性的修改，但是仅仅改变创建时间而没有改变内容，这时候并不需要去更新缓存

### 缓存位置
上面提到的缓存，具体会存储在如下场景中
- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

## 跨域问题
浏览器将请求分为两种：简单请求、非简单请求，对于两种请求的跨域有不同的处理
### 简单请求
满足以下两个条件则是简单请求
- 请求方法是head/get/post
- 请求头仅包含
    * Accept
    * Accept-Language
    * Content-Language
    * Last-Event-ID
    * Content-Typ(仅限值：application/x-www-form-urlencoded、multipart/form-data、text/plain)

对于简单请求，浏览器会自动加上Origin头，如果服务端校验通过，会在responseHeader中加入如下字段来标识跨域校验通过
- Access-Control-Allow-Origin：表明校验通过的域名或者是*，`必须返回`
- Access-Control-Allow-Credentials: 是否允许发送Cookie(除此之外还需要xhr配置withCredentials=true),可选
- Access-Control-Expose-Headers: FooBar，允许xhr识别指定的header值，可选
> 值得注意的是，对于fetch发出的请求，如果配置了credentials：include，则不能返回Access-Control-Allow-Origin: *，必须指明源

### 非简单请求
请求方法是PUT或DELETE，或者Content-Type字段的类型是application/json。
对于这种请求在正式通信前会增加一次预检请求Options,类型是options，其包含
- origin：表示请求来自哪个源
- Access-Control-Request-Method：表明浏览器的cors会用到哪些方法
- Access-Control-Request-Headers：指明CORS请求会额外发送哪些header
- Access-Control-Max-Age： 表明这次预检请求的有效期，有效期内对同一源的请求不再需要预检，默认值5s
如果服务器同意了此次cors请求，则会对预检请求返回包含Access-Control-Allow-Origin的响应头，反之如果不同意则返回的responseHeader不包含这个头，
浏览器就会认定，服务器不同意预检请求，因此触发一个错误，被XMLHttpRequest对象的onerror回调函数捕获

> 值得注意的是，对于预检请求发送的requestHeader包含的预设A-C-R-header和A-C-R-method并不要求写完，主要是由responseHeader中的methods和header定义了完整需要
的方法和自定义头，浏览器最终还是以responseHeader的返回为标准