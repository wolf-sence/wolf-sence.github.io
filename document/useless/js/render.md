# 性能优化
## 如何衡量性能指标
基于chrome可以衡量三个性能指标
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ffd74674e4194fe9b9fffb099ac07e11~tplv-k3u1fbpfcp-watermark.image?)

- **[Largest Contentful Paint (LCP)](https://web.dev/lcp/)**  ：最大内容绘制，测量*加载*性能。为了提供良好的用户体验，LCP 应在页面首次开始加载后的**2.5 秒**内发生。
- **[First Input Delay (FID)](https://web.dev/fid/)**  ：首次输入延迟，测量*交互性*。为了提供良好的用户体验，页面的 FID 应为**100 毫秒**或更短。
- **[Cumulative Layout Shift (CLS)](https://web.dev/cls/)**  ：累积布局偏移，测量*视觉稳定性*。为了提供良好的用户体验，页面的 CLS 应保持在  **0.1.**   或更少。
---
## 如何监控性能指标


**1. 明确监控目标与核心指标 (What to Monitor):**

这些指标直接关系到用户的实际感受。我会重点关注 Google 的 **Core Web Vitals (核心网页指标)**，因为它们是衡量用户体验的关键：

*   **LCP (Largest Contentful Paint - 最大内容绘制):** 衡量**加载性能**。我会监控 LCP 时间，目标是保持在 2.5 秒以内。
*   **FID (First Input Delay - 首次输入延迟) / INP (Interaction to Next Paint - 下次绘制交互):** 衡量**交互性**。我会监控用户首次交互的延迟 (FID) 或更全面的交互延迟 (INP)，目标 FID < 100ms，INP < 200ms。
*   **CLS (Cumulative Layout Shift - 累积布局偏移):** 衡量**视觉稳定性**。我会监控页面内容的意外移动，目标 CLS < 0.1。

除了 Core Web Vitals，我还会关注：

*   **FCP (First Contentful Paint - 首次内容绘制):** 了解页面开始渲染内容的速度。
*   **TTFB (Time to First Byte - 首字节时间):** 评估网络延迟和服务器响应速度。
*   **TTI (Time to Interactive - 可交互时间):** 衡量页面何时完全准备好响应用户操作。
*   **资源加载性能:** 监控关键 JS、CSS、图片等资源的**体积 (Bundle Size)** 和**加载耗时**，特别是首屏和关键路径资源。
*   **Long Tasks:** 监控主线程上耗时过长的任务 (>50ms)，它们会阻塞渲染和交互。
*   **内存占用 (Memory Usage):** 检测潜在的内存泄漏。
*   **JavaScript 错误率:** 错误通常伴随着性能问题或功能异常。
*   **API 请求性能:** 监控前端发起的接口请求的成功率、耗时。

**2. 选择合适的监控工具与手段 (How to Monitor):**

我会结合使用 **实验室数据 (Synthetic Monitoring)** 和 **真实用户监控 (Real User Monitoring - RUM)** 两种方式：

*   **a) 实验室数据 (Lab Data):**
    *   **目的:** 在可控、标准化的环境中进行测试，建立性能基线，方便版本对比，自动化检测性能回退，尤其是在开发和 CI/CD 阶段。
    *   **工具:**
        *   **Chrome DevTools (Lighthouse, Performance, Network tabs):** 开发调试阶段的利器，用于深入分析具体页面的加载和运行时性能。
        *   **Lighthouse CLI / Node Module:** 集成到 CI/CD 流程，自动化运行性能审计，设置性能预算并防止不达标的代码合入。
        *   **WebPageTest:** 进行更细致的分析，模拟不同网络、设备、地理位置，获取详细瀑布图、渲染视频等。
        *   **Performance Budget Tools (e.g., bundlesize):** 在 CI 中检查资源体积是否超标。

*   **b) 真实用户监控 (RUM - Field Data):**
    *   **目的:** 收集实际用户在各种真实网络、设备、浏览器环境下的性能数据，了解用户面临的真实性能瓶颈和体验。这是衡量最终效果的最准确方式。
    *   **实现:**
        *   **利用浏览器标准 API:** 使用 `PerformanceObserver` 监听 LCP, CLS, FID/INP, FCP, Long Tasks, Resource Timing 等指标。结合 `navigator.connection` 获取网络信息。
        *   **数据采集与上报:** 编写轻量级脚本采集这些指标数据，并将其聚合后定期上报到后端日志系统或专门的监控平台。需要注意采样率和上报策略，避免影响页面本身性能。
        *   **第三方 RUM 服务/平台:** 可以选择集成成熟的第三方服务，如 Sentry (结合错误监控), Datadog RUM, Dynatrace, ARMS (阿里云) 等。它们提供了完善的数据采集、分析和可视化功能。
        *  使用 window.onerror, window.onunhandledrejection, Reporting API。监控控制台错误

**3. 将监控融入开发全流程 (When & Where to Monitor):**

性能监控不是一次性的任务，而是需要贯穿整个开发生命周期：

*   **开发阶段:** 开发者利用 DevTools 进行自测和性能调试。
*   **代码提交/CI/CD 阶段:** 自动化运行 Lighthouse 检查，设置性能预算 (Performance Budgets)，防止性能劣化代码合入主分支。检查关键资源（如 JS bundle）的体积。
*   **测试阶段:** 在测试环境进行更全面的 Synthetic 测试，模拟不同场景。
*   **生产环境:** 部署 RUM 系统，持续收集真实用户数据。定期进行 Synthetic 测试作为补充和验证。


---
## 前端性能优化的方式（概述）

前端性能优化的方法多种多样，可以从不同维度进行分类。总的来说，可以大致归纳为以下几个方面：

1.  **网络层面优化 (Network Optimization)**：减少HTTP请求数量和大小，优化网络传输。
    *   资源合并与压缩 (Bundling & Compression)
    *   使用HTTP/2或HTTP/3
    *   利用浏览器缓存 (Cache Control, ETag)
    *   使用CDN (Content Delivery Network)
    *   DNS预解析 (DNS Prefetching)
    *   TCP预连接 (Preconnect)
    *   按需加载与预加载 (Lazy Loading & Preloading)

2.  **资源层面优化 (Resource Optimization)**：优化各种静态资源的大小和加载方式。
    *   **代码优化**：
        *   JavaScript: Tree Shaking (移除未使用代码), Code Splitting (代码分割), Minification (代码压缩), Uglification (代码混淆), 避免长任务 (Long Tasks)。
        *   CSS: Minification, Critical CSS (关键CSS提取), 移除未使用CSS, 优化选择器性能。
        *   HTML: Minification, 优化DOM结构。
    *   **图片优化**：
        *   选择合适的格式 (WebP, AVIF, SVG)。
        *   图片压缩。
        *   响应式图片 (`srcset`, `<picture>`)。
        *   图片懒加载 (Lazy Loading)。
        *   使用雪碧图 (CSS Sprites) 或 Icon Fonts/SVG Icons (减少请求)。
    *   **字体优化**：
        *   字体裁剪/子集化 (Subsetting)。
        *   使用 `font-display` 控制加载行为。
        *   使用 WOFF2 格式。
        *   预加载关键字体。

> 这里提到的响应式图片，可以使用img的srcset&sizes属性做媒体查询选择适合的图片，也可以使用picture&source&img标签来组合做响应式容器

3.  **渲染层面优化 (Rendering Optimization)**：优化浏览器渲染页面的过程。
    *   优化关键渲染路径 (Critical Rendering Path)。
    *   减少重绘 (Repaint) 和回流 (Reflow)。
    *   利用 `requestAnimationFrame` 进行动画。
    *   使用 `will-change` 属性进行渲染层提升 (谨慎使用)。
    *   服务端渲染 (SSR) 或 静态站点生成 (SSG)。
    *   骨架屏 (Skeleton Screens) / Loading占位。

4.  **运行时优化 (Runtime Optimization)**：优化页面运行时的JavaScript执行效率和交互响应。
    *   减少和优化DOM操作。
    *   使用事件委托 (Event Delegation)。
    *   函数节流 (Throttling) 和防抖 (Debouncing)。
    *   Web Workers 处理耗时计算。
    *   合理使用现代框架 (Vue/React) 的优化特性 (虚拟DOM diff, `shouldComponentUpdate`, `React.memo`, `useMemo`, `useCallback` 等)。

5.  **构建与工具链优化 (Build & Tooling Optimization)**：
    *   利用 Webpack/Vite/Rollup 等构建工具进行优化配置。
    *   使用性能监控工具 (Lighthouse, WebPageTest, Performance API) 定位瓶颈。

---

## 深入讲解：首屏优化技术 (First Screen Optimization)

"首屏" (Above the fold) 指的是用户在浏览器中打开页面时，无需滚动即可看到的内容区域。**首屏优化** 的核心目标是让用户尽快看到页面的主要内容，提升**感知性能** (Perceived Performance)。关键指标通常关注 **FCP (First Contentful Paint)** 和 **LCP (Largest Contentful Paint)**。

以下是一些关键的首屏优化技术：

1.  **优化关键渲染路径 (Optimize Critical Rendering Path - CRP)**
    *   **理解CRP**: 浏览器需要获取HTML、CSS，然后构建DOM树和CSSOM树，合并成Render Tree，再进行布局 (Layout) 和绘制 (Paint)。这个过程中的任何阻塞都会延迟首屏渲染。
    *   **减少关键资源数量**: 尽量减少首屏渲染所必需的HTML, CSS, JavaScript文件数量。
    *   **减少关键资源大小**: 压缩、精简这些必要的资源。
    *   **缩短关键路径长度**: 优化资源加载顺序和依赖关系。

2.  **内联关键CSS (Inline Critical CSS)**
    *   **原理**: 将渲染首屏内容所必需的CSS样式直接嵌入到HTML文档的`<head>`部分的`<style>`标签内。
    *   **好处**: 浏览器在收到HTML后，无需等待外部CSS文件下载即可开始渲染首屏内容，极大缩短FCP时间。
    *   **实践**:
        *   使用工具 (如 `critical`, `penthouse`) 自动提取关键CSS。
        *   剩余的CSS通过`<link rel="stylesheet">`异步加载（可以使用 `rel="preload" as="style" onload="this.rel='stylesheet'"` 或 JavaScript 动态加载）。
    *   **权衡**: 会增加HTML文件的大小，需要平衡内联CSS的大小。

3.  **异步加载非关键CSS (Asynchronously Load Non-Critical CSS)**
    *   对于非首屏或非关键功能的CSS，使用上面提到的 `rel="preload"` 方法或者JavaScript动态创建`<link>`标签添加到`<head>`中，使其不阻塞初始渲染。

4.  **JavaScript `async` 和 `defer`**
    *   **`<script src="..."></script>`**: 默认情况下，JS会阻塞HTML解析。
    *   **`<script async src="..."></script>`**: 异步下载JS文件，下载过程中不阻塞HTML解析，下载完成后立刻执行，但执行时会阻塞HTML解析。多个`async`脚本执行顺序不确定。适用于无依赖、希望尽快执行的脚本（如统计脚本）。
    *   **`<script defer src="..."></script>`**: 异步下载JS文件，下载过程中不阻塞HTML解析，等待HTML解析完成后、DOMContentLoaded事件之前按顺序执行。适用于需要操作DOM或有依赖关系的脚本，且不希望阻塞首屏渲染。
    *   **首屏优化策略**: 对于非首屏必需的JS，优先使用`defer`，对于完全独立的脚本可考虑`async`。关键的交互逻辑如果必须在首屏执行，则需优化其大小和执行效率。

5.  **代码分割 (Code Splitting)**
    *   **原理**: 利用现代构建工具 (Webpack, Vite, Rollup) 将庞大的JavaScript包拆分成多个小块 (chunks)。
    *   **首屏优化**: 只加载首屏渲染和交互所必需的JS代码块，其他功能模块的代码按需加载（例如，路由切换时加载对应页面的代码）。
    *   **框架支持**: React (React.lazy, Suspense), Vue (异步组件, 路由懒加载) 都原生支持代码分割。

6.  **服务端渲染 (Server-Side Rendering - SSR) 或 静态站点生成 (Static Site Generation - SSG)**
    *   **CSR (Client-Side Rendering)**: 浏览器下载HTML骨架和JS，然后由JS执行渲染页面。首屏内容出现慢。
    *   **SSR**: 服务器直接生成包含首屏内容的完整HTML返回给浏览器。浏览器收到后能立即渲染，FCP/LCP非常快。适用于动态内容较多、需要SEO的场景。
    *   **SSG**: 在构建时预先生成所有页面的静态HTML文件。请求时直接返回静态HTML，速度极快。适用于内容不经常变动的网站（博客、文档、营销页面）。
    *   **框架支持**: Next.js (React), Nuxt.js (Vue), Gatsby (React), SvelteKit 等都提供了强大的SSR/SSG支持。

7.  **资源预加载与预解析 (Preload, Prefetch, Preconnect, DNS-Prefetch)**
    *   **`rel="preload"`**: 告诉浏览器当前页面稍后肯定会用到某个资源（如关键JS、CSS、字体、图片），让浏览器尽早开始获取，但不执行或应用。常用于加载异步CSS、关键字体、LCP图片。
    *   **`rel="prefetch"`**: 告诉浏览器用户未来可能访问的下一个页面会用到某个资源，浏览器会在空闲时下载。用于优化后续页面的加载。
    *   **`rel="preconnect"`**: 提前完成到某个重要域名的TCP握手、TLS协商。当后续需要从该域名加载资源时能节省连接建立时间。
    *   **`rel="dns-prefetch"`**: 提前对某个域名进行DNS查询。节省后续请求时的DNS查找时间。
    *   **首屏优化**: 使用`preload`加载首屏关键资源（特别是字体和LCP图片），使用`preconnect`连接提供关键资源的域名（如API服务器、CDN）。

8.  **图片优化 (针对首屏)**
    *   **关键图片**: 确保用于首屏（尤其是LCP元素）的图片优先加载，不要对其使用懒加载 (Lazy Loading)。可以使用 `loading="eager"` (虽然通常是默认值) 或 `<link rel="preload">` 强制优先加载。
    *   **格式与大小**: 使用现代格式 (WebP, AVIF)，进行适当压缩，提供响应式图片 (`srcset`) 以适配不同屏幕。

9.  **字体优化**
    *   **`font-display: swap;`**: 允许浏览器在自定义字体加载期间先使用后备字体显示文本，避免文本空白 (FOIT - Flash of Invisible Text)。等字体加载完成后再切换。这是提升感知性能的常用手段。
    *   **字体子集化**: 只包含页面实际用到的字符，极大减小字体文件大小。
    *   **预加载关键字体**: 如果某个字体对首屏至关重要，使用 `<link rel="preload" href="font.woff2" as="font" type="font/woff2" crossorigin>` 提前加载。

10. **使用骨架屏 (Skeleton Screens)**
    *   **原理**: 在真实内容加载完成前，显示一个页面的大致布局轮廓（通常是灰色块）。
    *   **好处**: 能加快实际加载速度，但能提供即时反馈，让用户感觉页面正在加载，改善了主观等待体验。比空白屏幕或简单的loading指示器效果更好。

**核心:**

首屏优化是一个综合性的工程，需要结合多种技术手段。核心思路是：**识别关键资源 -> 减小其体积 -> 优化其传输 -> 调整其加载和执行时机 -> 避免渲染阻塞 -> 提升感知速度**。持续使用性能测量工具（如Lighthouse）来评估优化效果并发现新的瓶颈至关重要。

### ssg
生成纯静态的 HTML 文件，用于提升首屏性能和 SEO


