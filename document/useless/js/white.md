# 页面白屏问题

## 白屏检测

### 取样法
于页面中设置多个（17）采样点,基于[elementsFromPoint](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/elementsFromPoint)获取该点的所有元素的数组，元素从视口到最底层排序，判断到底有没有内容
> 可以看看这个库：[web-see](https://github.com/xy-sea/web-see)

这里针对骨架屏也能跟好的判断，根据采样点的元素来判断是否为骨架屏元素

### Mutation Observer监控dom变化
通过Mutation Observer来监控html下根节点内新增dom节点的变化来判断是否进行来正常的渲染

不好完美判断，根节点下有dom也有可能是白屏

### onerror
使用window.onerror, window.onunhandledrejection, 来监听js执行错误

### 检测根节点
在基于spa引用下，可以检测根节点来判断是否加载内容

### 截图检测
使用canvas实现前端截屏，然后将图片与纯白图片对比查看相似度，从而对比是否白屏

性能不高，通用性差，骨架屏不好处理


## 如何排查

### 请求
现在初始化的url请求，返回的html文件是否正常，是否包含符合预期的内容，例如内置的script标签、css标签，
这一步有可能会遇到初始化的url请求就是挂的，html没返回，这里基本可以判断是资源服务挂掉了

而服务挂掉的情况也有多种，
* 有可能是线上路由没有配置导致没有html资源
* 有可能是nginx没有配好导致请求进不来
* 有可能是公司内部配置平台的url转发规则对不上
* 有可能是ssr服务端运行出错导致请求出错

### 资源
查看页面的白屏html中是否有dom元素以及配合查看js资源的请求加载情况，以此判断初步判断出错的阶段，
如只有一个根节点、或者是空节点，即可能是script资源进不来，
可能是cdn资源挂了或者对应的静态资源服务挂了，这里可以配合浏览器的network面板去看资源的请求状态

### 加载速度
如果资源加载正常，则要区分是代码执行报错阻塞了浏览器渲染还是仅仅只是加载太慢

### 控制台报错
如果资源正常返回，但dom依旧为空，可以初步判断为js逻辑错误导致加载中断，可以看看控制台是否有报错信息

生产环境代码被压缩后，可以依靠源代码打包堆栈信息结合sourcemap来定位出错的源代码位置

如果没有提前准备好sourcemap，则需要依靠源码逐步去找代码，比较方便的方式还是找常量