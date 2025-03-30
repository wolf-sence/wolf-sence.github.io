# vue2/3响应式原理介绍

## vue2
Vue 2 的响应式系统基于 ES5 的 Object.defineProperty，通过 getter 和 setter 拦截对象的属性访问和修改。
### 数据劫持
Vue 2 在初始化时，会遍历 data 对象的所有属性，使用 Object.defineProperty 为每个属性定义 getter 和 setter。
```javascript
const data = { msg: "Hello" };
Object.defineProperty(data, "msg", {
  get() {
    console.log("Getter called");
    return this._msg;
  },
  set(newValue) {
    console.log("Setter called");
    this._msg = newValue;
    // 触发更新
  },
});
```
### 依赖收集
* Watcher：每个组件有一个 Watcher 实例，负责更新视图。
* Dep：每个响应式属性都有一个 Dep 对象（依赖管理器），用来存储依赖它的 Watcher。
* 当组件渲染时，访问数据属性会触发 getter，getter 会把当前 Watcher 收集到属性的 Dep 中（称为“订阅”）。
### 派发更新
* 当属性值被修改时，触发 setter，setter 调用 Dep.notify() 通知所有订阅的 Watcher。
* Watcher 收到通知后，重新执行渲染函数，更新视图。
### 优缺点
优点
* 简单直接，基于成熟的 ES5 API。
* 兼容性好，支持旧浏览器。

缺点
* 无法检测对象属性新增/删除：Object.defineProperty只能劫持已有属性，动态添加属性（如 obj.newProp = 1）或删除属性（如 delete obj.prop）不会触发响应式。

-  * 解决办法：Vue 提供了 Vue.set 和 Vue.delete。
* 数组问题：数组的某些方法（如 push、pop）不会触发 setter，
- * Vue 通过重写数组方法解决。
示例：arr.push(1) 调用的是 Vue 改写的 push，内部调用 setter。
* 性能开销：递归遍历所有嵌套对象，初始化时性能消耗较大。
## vue3
Vue 3 引入了 ES6 的 Proxy，完全重写了响应式系统，解决了 Vue 2 的局限性，并提升了性能和灵活性。
### proxy代理
* Vue 3 使用 Proxy 代理整个对象，而不是单独为每个属性定义 getter/setter。
* Proxy 可以拦截对象的各种操作（如属性访问、赋值、删除、添加等）。

```javascript
const data = { msg: "Hello" };
const reactiveData = new Proxy(data, {
  get(target, key) {
    console.log("Get", key);
    return target[key];
  },
  set(target, key, value) {
    console.log("Set", key, value);
    target[key] = value;
    // 触发更新
    return true;
  },
});
```
### 依赖收集Effect
* Vue 3 使用 ReactiveEffect 类代替 Watcher，管理副作用（effect，如渲染函数）。
* 通过 track 函数收集依赖，trigger 函数派发更新。
* 每个属性通过 Map 和 Set 结构存储依赖。

### 懒收集
依赖只在属性被访问时收集，未使用的属性不会触发响应式，提升性能。

### 优缺点
优点
* 支持属性新增/删除：Proxy 能拦截 in、delete 等操作，动态添加或删除属性也能触发响应式。
* 数组完美支持：无需重写数组方法，直接拦截数组操作（如 arr[0] = 1 或 arr.length）。
* 性能优化：只代理顶层对象，不递归遍历所有属性。懒收集依赖，未访问的属性不触发响应式。
* 类型支持：支持 Map、Set 等集合类型（通过 reactive 或 ref）。

局限性
* 兼容性：依赖 ES6 的 Proxy，不支持 IE。
* 复杂性：内部实现更复杂，调试可能稍难。