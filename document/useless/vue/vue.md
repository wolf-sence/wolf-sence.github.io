## 相关工具
[v2的模版编译工具网站](https://v2.template-explorer.vuejs.org/)
[v3的模版编译工具网站](https://play.vuejs.org/)
## v2/v3中对v-for和v-if的优先级处理
v2中v-for优先级高于v-if，v3中v-if的优先级高于v-for

## hash路由和history路由
### hash模式
当 URL 的 hash 部分发生变化时，浏览器会触发 hashchange 事件，路由库会监听这个事件并根据新的 hash 值来渲染相应的组件。

### history模式
使用 History API 中的 pushState 和 replaceState 方法来改变 URL，同时监听 popstate(前进后退) 事件以便在 URL 发生变化时进行相应的路由切换

## nexttick 原理
```js
mounted() {
     this.name = 'front end'
     this.verse = '世间万物都是空，功名利禄似如风'
     Promise.resolve().then(() => {
       this.name = 'study ...'
    })
     setTimeout(() => {
       this.verse = '半身风雨半身寒，一杯浊酒敬流年'
    })
},
updated() {
    this.count++
    console.log('update:',this.count)
    // 1,2,3
}
```