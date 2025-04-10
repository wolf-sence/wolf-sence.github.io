import{_ as o,c as i,o as e,ag as l}from"./chunks/framework.DPDPlp3K.js";const p=JSON.parse('{"title":"性能优化","description":"","frontmatter":{},"headers":[],"relativePath":"document/useless/js/render.md","filePath":"document/useless/js/render.md","lastUpdated":1744303628000}'),r={name:"document/useless/js/render.md"};function n(s,t,g,a,c,d){return e(),i("div",null,t[0]||(t[0]=[l('<h1 id="性能优化" tabindex="-1">性能优化 <a class="header-anchor" href="#性能优化" aria-label="Permalink to &quot;性能优化&quot;">​</a></h1><h2 id="如何衡量性能指标" tabindex="-1">如何衡量性能指标 <a class="header-anchor" href="#如何衡量性能指标" aria-label="Permalink to &quot;如何衡量性能指标&quot;">​</a></h2><p>基于chrome可以衡量三个性能指标 <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd74674e4194fe9b9fffb099ac07e11~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><ul><li><strong><a href="https://web.dev/lcp/" target="_blank" rel="noreferrer">Largest Contentful Paint (LCP)</a></strong>  ：最大内容绘制，测量<em>加载</em>性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的<strong>2.5 秒</strong>内发生。</li><li><strong><a href="https://web.dev/fid/" target="_blank" rel="noreferrer">First Input Delay (FID)</a></strong>  ：首次输入延迟，测量<em>交互性</em>。为了提供良好的用户体验，页面的 FID 应为<strong>100 毫秒</strong>或更短。</li><li><strong><a href="https://web.dev/cls/" target="_blank" rel="noreferrer">Cumulative Layout Shift (CLS)</a></strong>  ：累积布局偏移，测量<em>视觉稳定性</em>。为了提供良好的用户体验，页面的 CLS 应保持在  <strong>0.1.</strong>   或更少。</li></ul><hr><h2 id="如何监控性能指标" tabindex="-1">如何监控性能指标 <a class="header-anchor" href="#如何监控性能指标" aria-label="Permalink to &quot;如何监控性能指标&quot;">​</a></h2><p><strong>1. 明确监控目标与核心指标 (What to Monitor):</strong></p><p>这些指标直接关系到用户的实际感受。我会重点关注 Google 的 <strong>Core Web Vitals (核心网页指标)</strong>，因为它们是衡量用户体验的关键：</p><ul><li><strong>LCP (Largest Contentful Paint - 最大内容绘制):</strong> 衡量<strong>加载性能</strong>。我会监控 LCP 时间，目标是保持在 2.5 秒以内。</li><li><strong>FID (First Input Delay - 首次输入延迟) / INP (Interaction to Next Paint - 下次绘制交互):</strong> 衡量<strong>交互性</strong>。我会监控用户首次交互的延迟 (FID) 或更全面的交互延迟 (INP)，目标 FID &lt; 100ms，INP &lt; 200ms。</li><li><strong>CLS (Cumulative Layout Shift - 累积布局偏移):</strong> 衡量<strong>视觉稳定性</strong>。我会监控页面内容的意外移动，目标 CLS &lt; 0.1。</li></ul><p>除了 Core Web Vitals，我还会关注：</p><ul><li><strong>FCP (First Contentful Paint - 首次内容绘制):</strong> 了解页面开始渲染内容的速度。</li><li><strong>TTFB (Time to First Byte - 首字节时间):</strong> 评估网络延迟和服务器响应速度。</li><li><strong>TTI (Time to Interactive - 可交互时间):</strong> 衡量页面何时完全准备好响应用户操作。</li><li><strong>资源加载性能:</strong> 监控关键 JS、CSS、图片等资源的<strong>体积 (Bundle Size)</strong> 和<strong>加载耗时</strong>，特别是首屏和关键路径资源。</li><li><strong>Long Tasks:</strong> 监控主线程上耗时过长的任务 (&gt;50ms)，它们会阻塞渲染和交互。</li><li><strong>内存占用 (Memory Usage):</strong> 检测潜在的内存泄漏。</li><li><strong>JavaScript 错误率:</strong> 错误通常伴随着性能问题或功能异常。</li><li><strong>API 请求性能:</strong> 监控前端发起的接口请求的成功率、耗时。</li></ul><p><strong>2. 选择合适的监控工具与手段 (How to Monitor):</strong></p><p>我会结合使用 <strong>实验室数据 (Synthetic Monitoring)</strong> 和 <strong>真实用户监控 (Real User Monitoring - RUM)</strong> 两种方式：</p><ul><li><p><strong>a) 实验室数据 (Lab Data):</strong></p><ul><li><strong>目的:</strong> 在可控、标准化的环境中进行测试，建立性能基线，方便版本对比，自动化检测性能回退，尤其是在开发和 CI/CD 阶段。</li><li><strong>工具:</strong><ul><li><strong>Chrome DevTools (Lighthouse, Performance, Network tabs):</strong> 开发调试阶段的利器，用于深入分析具体页面的加载和运行时性能。</li><li><strong>Lighthouse CLI / Node Module:</strong> 集成到 CI/CD 流程，自动化运行性能审计，设置性能预算并防止不达标的代码合入。</li><li><strong>WebPageTest:</strong> 进行更细致的分析，模拟不同网络、设备、地理位置，获取详细瀑布图、渲染视频等。</li><li><strong>Performance Budget Tools (e.g., bundlesize):</strong> 在 CI 中检查资源体积是否超标。</li></ul></li></ul></li><li><p><strong>b) 真实用户监控 (RUM - Field Data):</strong></p><ul><li><strong>目的:</strong> 收集实际用户在各种真实网络、设备、浏览器环境下的性能数据，了解用户面临的真实性能瓶颈和体验。这是衡量最终效果的最准确方式。</li><li><strong>实现:</strong><ul><li><strong>利用浏览器标准 API:</strong> 使用 <code>PerformanceObserver</code> 监听 LCP, CLS, FID/INP, FCP, Long Tasks, Resource Timing 等指标。结合 <code>navigator.connection</code> 获取网络信息。</li><li><strong>数据采集与上报:</strong> 编写轻量级脚本采集这些指标数据，并将其聚合后定期上报到后端日志系统或专门的监控平台。需要注意采样率和上报策略，避免影响页面本身性能。</li><li><strong>第三方 RUM 服务/平台:</strong> 可以选择集成成熟的第三方服务，如 Sentry (结合错误监控), Datadog RUM, Dynatrace, ARMS (阿里云) 等。它们提供了完善的数据采集、分析和可视化功能。</li><li>使用 window.onerror, window.onunhandledrejection, Reporting API。监控控制台错误</li></ul></li></ul></li></ul><p><strong>3. 将监控融入开发全流程 (When &amp; Where to Monitor):</strong></p><p>性能监控不是一次性的任务，而是需要贯穿整个开发生命周期：</p><ul><li><strong>开发阶段:</strong> 开发者利用 DevTools 进行自测和性能调试。</li><li><strong>代码提交/CI/CD 阶段:</strong> 自动化运行 Lighthouse 检查，设置性能预算 (Performance Budgets)，防止性能劣化代码合入主分支。检查关键资源（如 JS bundle）的体积。</li><li><strong>测试阶段:</strong> 在测试环境进行更全面的 Synthetic 测试，模拟不同场景。</li><li><strong>生产环境:</strong> 部署 RUM 系统，持续收集真实用户数据。定期进行 Synthetic 测试作为补充和验证。</li></ul><hr><h2 id="前端性能优化的方式-概述" tabindex="-1">前端性能优化的方式（概述） <a class="header-anchor" href="#前端性能优化的方式-概述" aria-label="Permalink to &quot;前端性能优化的方式（概述）&quot;">​</a></h2><p>前端性能优化的方法多种多样，可以从不同维度进行分类。总的来说，可以大致归纳为以下几个方面：</p><ol><li><p><strong>网络层面优化 (Network Optimization)</strong>：减少HTTP请求数量和大小，优化网络传输。</p><ul><li>资源合并与压缩 (Bundling &amp; Compression)</li><li>使用HTTP/2或HTTP/3</li><li>利用浏览器缓存 (Cache Control, ETag)</li><li>使用CDN (Content Delivery Network)</li><li>DNS预解析 (DNS Prefetching)</li><li>TCP预连接 (Preconnect)</li><li>按需加载与预加载 (Lazy Loading &amp; Preloading)</li></ul></li><li><p><strong>资源层面优化 (Resource Optimization)</strong>：优化各种静态资源的大小和加载方式。</p><ul><li><strong>代码优化</strong>： <ul><li>JavaScript: Tree Shaking (移除未使用代码), Code Splitting (代码分割), Minification (代码压缩), Uglification (代码混淆), 避免长任务 (Long Tasks)。</li><li>CSS: Minification, Critical CSS (关键CSS提取), 移除未使用CSS, 优化选择器性能。</li><li>HTML: Minification, 优化DOM结构。</li></ul></li><li><strong>图片优化</strong>： <ul><li>选择合适的格式 (WebP, AVIF, SVG)。</li><li>图片压缩。</li><li>响应式图片 (<code>srcset</code>, <code>&lt;picture&gt;</code>)。</li><li>图片懒加载 (Lazy Loading)。</li><li>使用雪碧图 (CSS Sprites) 或 Icon Fonts/SVG Icons (减少请求)。</li></ul></li><li><strong>字体优化</strong>： <ul><li>字体裁剪/子集化 (Subsetting)。</li><li>使用 <code>font-display</code> 控制加载行为。</li><li>使用 WOFF2 格式。</li><li>预加载关键字体。</li></ul></li></ul></li></ol><blockquote><p>这里提到的响应式图片，可以使用img的srcset&amp;sizes属性做媒体查询选择适合的图片，也可以使用picture&amp;source&amp;img标签来组合做响应式容器</p></blockquote><ol start="3"><li><p><strong>渲染层面优化 (Rendering Optimization)</strong>：优化浏览器渲染页面的过程。</p><ul><li>优化关键渲染路径 (Critical Rendering Path)。</li><li>减少重绘 (Repaint) 和回流 (Reflow)。</li><li>利用 <code>requestAnimationFrame</code> 进行动画。</li><li>使用 <code>will-change</code> 属性进行渲染层提升 (谨慎使用)。</li><li>服务端渲染 (SSR) 或 静态站点生成 (SSG)。</li><li>骨架屏 (Skeleton Screens) / Loading占位。</li></ul></li><li><p><strong>运行时优化 (Runtime Optimization)</strong>：优化页面运行时的JavaScript执行效率和交互响应。</p><ul><li>减少和优化DOM操作。</li><li>使用事件委托 (Event Delegation)。</li><li>函数节流 (Throttling) 和防抖 (Debouncing)。</li><li>Web Workers 处理耗时计算。</li><li>合理使用现代框架 (Vue/React) 的优化特性 (虚拟DOM diff, <code>shouldComponentUpdate</code>, <code>React.memo</code>, <code>useMemo</code>, <code>useCallback</code> 等)。</li></ul></li><li><p><strong>构建与工具链优化 (Build &amp; Tooling Optimization)</strong>：</p><ul><li>利用 Webpack/Vite/Rollup 等构建工具进行优化配置。</li><li>使用性能监控工具 (Lighthouse, WebPageTest, Performance API) 定位瓶颈。</li></ul></li></ol><hr><h2 id="深入讲解-首屏优化技术-first-screen-optimization" tabindex="-1">深入讲解：首屏优化技术 (First Screen Optimization) <a class="header-anchor" href="#深入讲解-首屏优化技术-first-screen-optimization" aria-label="Permalink to &quot;深入讲解：首屏优化技术 (First Screen Optimization)&quot;">​</a></h2><p>&quot;首屏&quot; (Above the fold) 指的是用户在浏览器中打开页面时，无需滚动即可看到的内容区域。<strong>首屏优化</strong> 的核心目标是让用户尽快看到页面的主要内容，提升<strong>感知性能</strong> (Perceived Performance)。关键指标通常关注 <strong>FCP (First Contentful Paint)</strong> 和 <strong>LCP (Largest Contentful Paint)</strong>。</p><p>以下是一些关键的首屏优化技术：</p><ol><li><p><strong>优化关键渲染路径 (Optimize Critical Rendering Path - CRP)</strong></p><ul><li><strong>理解CRP</strong>: 浏览器需要获取HTML、CSS，然后构建DOM树和CSSOM树，合并成Render Tree，再进行布局 (Layout) 和绘制 (Paint)。这个过程中的任何阻塞都会延迟首屏渲染。</li><li><strong>减少关键资源数量</strong>: 尽量减少首屏渲染所必需的HTML, CSS, JavaScript文件数量。</li><li><strong>减少关键资源大小</strong>: 压缩、精简这些必要的资源。</li><li><strong>缩短关键路径长度</strong>: 优化资源加载顺序和依赖关系。</li></ul></li><li><p><strong>内联关键CSS (Inline Critical CSS)</strong></p><ul><li><strong>原理</strong>: 将渲染首屏内容所必需的CSS样式直接嵌入到HTML文档的<code>&lt;head&gt;</code>部分的<code>&lt;style&gt;</code>标签内。</li><li><strong>好处</strong>: 浏览器在收到HTML后，无需等待外部CSS文件下载即可开始渲染首屏内容，极大缩短FCP时间。</li><li><strong>实践</strong>: <ul><li>使用工具 (如 <code>critical</code>, <code>penthouse</code>) 自动提取关键CSS。</li><li>剩余的CSS通过<code>&lt;link rel=&quot;stylesheet&quot;&gt;</code>异步加载（可以使用 <code>rel=&quot;preload&quot; as=&quot;style&quot; onload=&quot;this.rel=&#39;stylesheet&#39;&quot;</code> 或 JavaScript 动态加载）。</li></ul></li><li><strong>权衡</strong>: 会增加HTML文件的大小，需要平衡内联CSS的大小。</li></ul></li><li><p><strong>异步加载非关键CSS (Asynchronously Load Non-Critical CSS)</strong></p><ul><li>对于非首屏或非关键功能的CSS，使用上面提到的 <code>rel=&quot;preload&quot;</code> 方法或者JavaScript动态创建<code>&lt;link&gt;</code>标签添加到<code>&lt;head&gt;</code>中，使其不阻塞初始渲染。</li></ul></li><li><p><strong>JavaScript <code>async</code> 和 <code>defer</code></strong></p><ul><li><strong><code>&lt;script src=&quot;...&quot;&gt;&lt;/script&gt;</code></strong>: 默认情况下，JS会阻塞HTML解析。</li><li><strong><code>&lt;script async src=&quot;...&quot;&gt;&lt;/script&gt;</code></strong>: 异步下载JS文件，下载过程中不阻塞HTML解析，下载完成后立刻执行，但执行时会阻塞HTML解析。多个<code>async</code>脚本执行顺序不确定。适用于无依赖、希望尽快执行的脚本（如统计脚本）。</li><li><strong><code>&lt;script defer src=&quot;...&quot;&gt;&lt;/script&gt;</code></strong>: 异步下载JS文件，下载过程中不阻塞HTML解析，等待HTML解析完成后、DOMContentLoaded事件之前按顺序执行。适用于需要操作DOM或有依赖关系的脚本，且不希望阻塞首屏渲染。</li><li><strong>首屏优化策略</strong>: 对于非首屏必需的JS，优先使用<code>defer</code>，对于完全独立的脚本可考虑<code>async</code>。关键的交互逻辑如果必须在首屏执行，则需优化其大小和执行效率。</li></ul></li><li><p><strong>代码分割 (Code Splitting)</strong></p><ul><li><strong>原理</strong>: 利用现代构建工具 (Webpack, Vite, Rollup) 将庞大的JavaScript包拆分成多个小块 (chunks)。</li><li><strong>首屏优化</strong>: 只加载首屏渲染和交互所必需的JS代码块，其他功能模块的代码按需加载（例如，路由切换时加载对应页面的代码）。</li><li><strong>框架支持</strong>: React (React.lazy, Suspense), Vue (异步组件, 路由懒加载) 都原生支持代码分割。</li></ul></li><li><p><strong>服务端渲染 (Server-Side Rendering - SSR) 或 静态站点生成 (Static Site Generation - SSG)</strong></p><ul><li><strong>CSR (Client-Side Rendering)</strong>: 浏览器下载HTML骨架和JS，然后由JS执行渲染页面。首屏内容出现慢。</li><li><strong>SSR</strong>: 服务器直接生成包含首屏内容的完整HTML返回给浏览器。浏览器收到后能立即渲染，FCP/LCP非常快。适用于动态内容较多、需要SEO的场景。</li><li><strong>SSG</strong>: 在构建时预先生成所有页面的静态HTML文件。请求时直接返回静态HTML，速度极快。适用于内容不经常变动的网站（博客、文档、营销页面）。</li><li><strong>框架支持</strong>: Next.js (React), Nuxt.js (Vue), Gatsby (React), SvelteKit 等都提供了强大的SSR/SSG支持。</li></ul></li><li><p><strong>资源预加载与预解析 (Preload, Prefetch, Preconnect, DNS-Prefetch)</strong></p><ul><li><strong><code>rel=&quot;preload&quot;</code></strong>: 告诉浏览器当前页面稍后肯定会用到某个资源（如关键JS、CSS、字体、图片），让浏览器尽早开始获取，但不执行或应用。常用于加载异步CSS、关键字体、LCP图片。</li><li><strong><code>rel=&quot;prefetch&quot;</code></strong>: 告诉浏览器用户未来可能访问的下一个页面会用到某个资源，浏览器会在空闲时下载。用于优化后续页面的加载。</li><li><strong><code>rel=&quot;preconnect&quot;</code></strong>: 提前完成到某个重要域名的TCP握手、TLS协商。当后续需要从该域名加载资源时能节省连接建立时间。</li><li><strong><code>rel=&quot;dns-prefetch&quot;</code></strong>: 提前对某个域名进行DNS查询。节省后续请求时的DNS查找时间。</li><li><strong>首屏优化</strong>: 使用<code>preload</code>加载首屏关键资源（特别是字体和LCP图片），使用<code>preconnect</code>连接提供关键资源的域名（如API服务器、CDN）。</li></ul></li><li><p><strong>图片优化 (针对首屏)</strong></p><ul><li><strong>关键图片</strong>: 确保用于首屏（尤其是LCP元素）的图片优先加载，不要对其使用懒加载 (Lazy Loading)。可以使用 <code>loading=&quot;eager&quot;</code> (虽然通常是默认值) 或 <code>&lt;link rel=&quot;preload&quot;&gt;</code> 强制优先加载。</li><li><strong>格式与大小</strong>: 使用现代格式 (WebP, AVIF)，进行适当压缩，提供响应式图片 (<code>srcset</code>) 以适配不同屏幕。</li></ul></li><li><p><strong>字体优化</strong></p><ul><li><strong><code>font-display: swap;</code></strong>: 允许浏览器在自定义字体加载期间先使用后备字体显示文本，避免文本空白 (FOIT - Flash of Invisible Text)。等字体加载完成后再切换。这是提升感知性能的常用手段。</li><li><strong>字体子集化</strong>: 只包含页面实际用到的字符，极大减小字体文件大小。</li><li><strong>预加载关键字体</strong>: 如果某个字体对首屏至关重要，使用 <code>&lt;link rel=&quot;preload&quot; href=&quot;font.woff2&quot; as=&quot;font&quot; type=&quot;font/woff2&quot; crossorigin&gt;</code> 提前加载。</li></ul></li><li><p><strong>使用骨架屏 (Skeleton Screens)</strong></p><ul><li><strong>原理</strong>: 在真实内容加载完成前，显示一个页面的大致布局轮廓（通常是灰色块）。</li><li><strong>好处</strong>: 能加快实际加载速度，但能提供即时反馈，让用户感觉页面正在加载，改善了主观等待体验。比空白屏幕或简单的loading指示器效果更好。</li></ul></li></ol><p><strong>核心:</strong></p><p>首屏优化是一个综合性的工程，需要结合多种技术手段。核心思路是：<strong>识别关键资源 -&gt; 减小其体积 -&gt; 优化其传输 -&gt; 调整其加载和执行时机 -&gt; 避免渲染阻塞 -&gt; 提升感知速度</strong>。持续使用性能测量工具（如Lighthouse）来评估优化效果并发现新的瓶颈至关重要。</p><h3 id="ssg" tabindex="-1">ssg <a class="header-anchor" href="#ssg" aria-label="Permalink to &quot;ssg&quot;">​</a></h3><p>生成纯静态的 HTML 文件，用于提升首屏性能和 SEO</p>',32)]))}const S=o(r,[["render",n]]);export{p as __pageData,S as default};
