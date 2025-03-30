# 性能优化
## 如何衡量性能指标
基于chrome可以衡量三个性能指标
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd74674e4194fe9b9fffb099ac07e11~tplv-k3u1fbpfcp-watermark.image?)

- **[Largest Contentful Paint (LCP)](https://web.dev/lcp/)**  ：最大内容绘制，测量*加载*性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的**2.5 秒**内发生。
- **[First Input Delay (FID)](https://web.dev/fid/)**  ：首次输入延迟，测量*交互性*。为了提供良好的用户体验，页面的 FID 应为**100 毫秒**或更短。
- **[Cumulative Layout Shift (CLS)](https://web.dev/cls/)**  ：累积布局偏移，测量*视觉稳定性*。为了提供良好的用户体验，页面的 CLS 应保持在  **0.1.**   或更少。

## 如何监控性能指标

## 渲染优化
> 可以看这里[前端优化](https://juejin.cn/post/7214026775142760505)
* 减少重绘/回流
* 使用gpu渲染，如css transform、filter、position：fixed
* 上下移动使用translate代替top
* 创建多个dom时可以使用DocumentFragment一次性创建
* 图片压缩、精灵图
* 图片/路由懒加载
* 打包优化
* gzip压缩