# JavaScript 事件循环 (Event Loop)

## 什么是事件循环？

事件循环是 JavaScript 实现异步编程的核心机制。JavaScript 是单线程的语言，但通过事件循环机制可以实现非阻塞的异步执行。

## 事件循环的核心组成部分

1. **调用栈 (Call Stack)**
   - 用于存储正在执行的代码
   - 遵循后进先出(LIFO)原则
   - 同步代码直接在这里执行

2. **任务队列 (Task Queue)**
   - 宏任务(Macrotask)队列
   - 微任务(Microtask)队列
   
3. **Web APIs**
   - 由浏览器提供的 API
   - 包括定时器、DOM 事件、AJAX 等

## 事件循环的执行顺序

1. 先执行一个宏任务，执行过程中如果产出新的宏/微任务，就将他们推入相应的任务队列，
2.之后在执行一队微任务，
3.之后再执行宏任务，如此循环。
以上不断重复的过程就叫做 Event Loop(事件循环)。

## 宏任务和微任务

如何区分两者？宿主运行环境发起的就是`宏任务`，如由node/浏览器发起的的setTimeout/setInterval; 由语言标准内api发起的就是`微任务`，如：Promise.then/catch/finally;

### 宏任务 (Macrotask)
- script内的整体代码
- setTimeout/setInterval
- setImmediate (Node.js)
- requestAnimationFrame
- I/O
- UI 渲染

### 微任务 (Microtask)
- Promise.then/catch/finally
- process.nextTick (Node.js)
- MutationObserver
- queueMicrotask()

## 代码示例

```javascript
console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

Promise.resolve()
  .then(function () {
    console.log("promise1");
  })
  .then(function () {
    console.log("promise2");
  });

console.log("script end");

// script start, script end, promise1, promise2, setTimeout
```
> 在一次宏任务执行完成后，会先执行微任务队列，直至清空所有微任务队列，然后执行宏任务