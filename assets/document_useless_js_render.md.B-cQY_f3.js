import{_ as t,c as r,o as a,ag as l}from"./chunks/framework.DPDPlp3K.js";const p=JSON.parse('{"title":"性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"document/useless/js/render.md","filePath":"document/useless/js/render.md","lastUpdated":1743330488000}'),n={name:"document/useless/js/render.md"};function o(i,e,s,d,c,f){return a(),r("div",null,e[0]||(e[0]=[l('<h1 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h1><h2 id="如何衡量性能指标" tabindex="-1">如何衡量性能指标 <a class="header-anchor" href="#如何衡量性能指标" aria-label="Permalink to &quot;如何衡量性能指标&quot;">​</a></h2><p>基于chrome可以衡量三个性能指标 <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd74674e4194fe9b9fffb099ac07e11~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><ul><li><strong><a href="https://web.dev/lcp/" target="_blank" rel="noreferrer">Largest Contentful Paint (LCP)</a></strong>  ：最大内容绘制，测量<em>加载</em>性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的<strong>2.5 秒</strong>内发生。</li><li><strong><a href="https://web.dev/fid/" target="_blank" rel="noreferrer">First Input Delay (FID)</a></strong>  ：首次输入延迟，测量<em>交互性</em>。为了提供良好的用户体验，页面的 FID 应为<strong>100 毫秒</strong>或更短。</li><li><strong><a href="https://web.dev/cls/" target="_blank" rel="noreferrer">Cumulative Layout Shift (CLS)</a></strong>  ：累积布局偏移，测量<em>视觉稳定性</em>。为了提供良好的用户体验，页面的 CLS 应保持在  <strong>0.1.</strong>   或更少。</li></ul><h2 id="如何监控性能指标" tabindex="-1">如何监控性能指标 <a class="header-anchor" href="#如何监控性能指标" aria-label="Permalink to &quot;如何监控性能指标&quot;">​</a></h2><h2 id="渲染优化" tabindex="-1">渲染优化 <a class="header-anchor" href="#渲染优化" aria-label="Permalink to &quot;渲染优化&quot;">​</a></h2><blockquote><p>可以看这里<a href="https://juejin.cn/post/7214026775142760505" target="_blank" rel="noreferrer">前端优化</a></p></blockquote><ul><li>减少重绘/回流</li><li>使用gpu渲染，如css transform、filter、position：fixed</li><li>上下移动使用translate代替top</li><li>创建多个dom时可以使用DocumentFragment一次性创建</li><li>图片压缩、精灵图</li><li>图片/路由懒加载</li><li>打包优化</li><li>gzip压缩</li></ul>',8)]))}const m=t(n,[["render",o]]);export{p as __pageData,m as default};
