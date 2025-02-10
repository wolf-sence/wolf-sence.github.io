import{_ as i,c as a,o as t,ag as l}from"./chunks/framework.BmLMQRXF.js";const c=JSON.parse('{"title":"script标签","description":"","frontmatter":{},"headers":[],"relativePath":"document/useless/dom/script.md","filePath":"document/useless/dom/script.md","lastUpdated":1739204192000}'),e={name:"document/useless/dom/script.md"};function n(p,s,h,r,k,d){return t(),a("div",null,s[0]||(s[0]=[l(`<h1 id="script标签" tabindex="-1">script标签 <a class="header-anchor" href="#script标签" aria-label="Permalink to &quot;script标签&quot;">​</a></h1><p>HTML5规范要求脚本按照它们出现的先后顺序执行，因此第一个延迟脚本会先于第二个执行。在现实中，延迟脚本并不一定会按照顺序执行，因此最好只包含一个延迟脚本。</p><h2 id="记载顺序" tabindex="-1">记载顺序 <a class="header-anchor" href="#记载顺序" aria-label="Permalink to &quot;记载顺序&quot;">​</a></h2><p>总体来说，script标签是并发加载</p><blockquote><p>加载顺序可参考<a href="https://juejin.cn/post/6913156226008711182" target="_blank" rel="noreferrer">script标签加载顺序</a></p></blockquote><p><img src="http://imgcdn.somebodyelse.cn/blog-imgs/origin-js/origin-script/v2-script1.jpg" alt="script标签加载顺序"></p><h3 id="无属性" tabindex="-1">无属性 <a class="header-anchor" href="#无属性" aria-label="Permalink to &quot;无属性&quot;">​</a></h3><ul><li>执行时机: 无论是内联还是外部script，都会同步阻塞渲染</li><li>执行逻辑: 所有资源异步并发获取资源，等待所有资源返回后，从上至下逐一的同步执行，符合evenloop</li></ul><h3 id="defer" tabindex="-1">defer <a class="header-anchor" href="#defer" aria-label="Permalink to &quot;defer&quot;">​</a></h3><blockquote><p>如果是es模块的脚本(type=&quot;module&quot;)，则默认就是defer属性</p></blockquote><ul><li>概念：表示js文件将会延迟执行，直到文档的解析完成为止</li><li>执行时机: 下载完后，在dom解析完之后、触发DOMContentLoaded之前执行。</li><li>执行逻辑: 无需远程获取的script从上至下执行;需要远程获取的资源异步获取，等待所有资源获取完成后从上至下同步执行</li></ul><h3 id="async" tabindex="-1">async <a class="header-anchor" href="#async" aria-label="Permalink to &quot;async&quot;">​</a></h3><ul><li>概念：表示文件将在加载后立即执行，可能是文件在解析过程中后者解析之后执行的，不能保证一部脚本的执行顺序</li><li>执行时机：下载完后，立即执行。</li><li>执行逻辑: 无需远程获取的script从上至下执行;需要远程获取的资源异步获取，谁先获取谁先执行，无特殊顺序</li></ul><h2 id="执行顺序" tabindex="-1">执行顺序 <a class="header-anchor" href="#执行顺序" aria-label="Permalink to &quot;执行顺序&quot;">​</a></h2><p><code>任何情况下js的执行都会阻塞dom的渲染</code></p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;Neo&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a) </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 打印一个未定义的变量a</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>script标签内的报错只会阻塞该script标签内的代码，对另一个script标签内的代码无影响</p>`,17)]))}const E=i(e,[["render",n]]);export{c as __pageData,E as default};
