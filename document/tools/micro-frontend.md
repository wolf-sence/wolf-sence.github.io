# 微前端
大型应用拆分会需要使用到微前端架构

微前端是一种类似于微服务的架构，是一种由独立交付的多个前端应用组成整体的架构风格，将前端应用分解成一些更小、更简单的能够独立开发、测试、部署的应用，而在用户看来仍然是内聚的单个产品。

## iframe方案
优点
* 接入容易，无心智负担
* css/js完全隔离

缺点
* 路由状态丢失，外面刷新了里面的状态就会丢失
* dom割裂严重，弹窗只能在iframe内展示
* 白屏太长

## Qiankun: Single-spa
### Single-spa
single-spa是一个目前主流的微前端技术方案，其主要实现思路：

* 预先注册子应用(激活路由、子应用资源、生命周期函数)
* 监听路由的变化，匹配到了激活的路由则加载子应用资源，顺序调用生命周期函数并最终渲染到容器
### qiankun
乾坤微前端架构则进一步对single-spa方案进行完善，主要的完善点：
* 子应用资源由 js 列表修改进为一个url，大大减轻注册子应用的复杂度
* 实现应用隔离，完成js隔离方案 （window工厂） 和css隔离方案 （类vue的scoped）
* 增加资源预加载能力，预先子应用html、js、css资源缓存下来，加快子应用的打开速度
> 使用示例可以看[qiankun](https://qiankun.umijs.org/zh/guide/getting-started)

## Micro-app: WebComponent
Micro-app借用WebComponent的思路，而是借鉴了WebComponent的思想，通过CustomElement结合自定义的ShadowDom，将微前端封装成一个类WebComponent组件，从而实现`微前端的组件化渲染`。

* WC不具有沙箱能力，与文档共享一个执行上下文
* 如果使用shadow dom样式隔离
* 与主页面可以通过属性/事件/暴露方法/插件slot等方式进行通信

### 如何使用
使用customElement自定义组件，可以使用普通的dom，也可以使用shadowDom来创建
```javascript
window.customElements.define(
  "element-details",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById(
        "element-details-template",
      ).content;
      const shadowRoot = this.attachShadow({ mode: "open" }).appendChild(
        template.cloneNode(true),
      );
    }
  },
);
```

### vue3
在vue3中使用defineCustomElement将默认的vue组件转为WebComponent，最后由bundler打包出单独的文件
```javascript
// Vue 组件
import { defineCustomElement } from 'vue';

const MyVueComponent = {
  template: `<div>{{ message }}</div>`,
  props: ['message']
};
// 转换为 Web Component
const MyWebComponent = defineCustomElement(MyVueComponent);
// 注册自定义元素并使用 Shadow DOM
window.customElements.define('my-web-component', class extends MyWebComponent {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // 创建 Shadow DOM
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.appendChild(this.$el); // 将 Vue 组件挂载到 Shadow DOM
  }
});
```



## Module Federation: webpack5
Module Federation是Webpack5提出的概念，用来解决多个应用之间代码共享的问题,一个应用可以动态加载并运行另一个应用的代码，并实现应用之间的依赖共享(share属性)。

```javascript
// 配置webpack.config.js
const { ModuleFederationPlugin } = require("webpack").container;
new ModuleFederationPlugin({
  name: "appA",
  // 如何暴露模块，var挂载变量使用
  library: { type: "var", name: "appA" },
 //出口文件
  filename: "remoteEntry.js",
 //暴露可访问的组件
  exposes: {
    "./input": "./src/input",
  },
  // 如果是消费者，使用此字段导入
  remotes: {
    appB: "appB@http://localhost:3002/remoteEntry.js",
  },
 //共享依赖，其他模块不需要再次下载，便可使用
  shared: ['react', 'react-dom'],
})

```