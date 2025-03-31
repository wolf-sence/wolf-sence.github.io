## 监听元素是否在视口

### 前置概念
- 获取视口尺寸：`window.innerHeight/innerWidth`,由于浏览器差异在ie6/7/8内需使用`document.documentElement.clientHeight/clientWidth`
- 获取滚动高度：`document.documentElement.scrollTop`

### 方法一 getBoundingClientRect
> api文档可见[此处](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)


getBoundingClientRect的定位是相对视口定位，即判断相对视口的距离减去视口高度即可获知其是否在视口内

![getBoundingClientRect](https://imgcdn.somebodyelse.cn/blog-imgs/origin-js/element-box-diagram.png)
```javascript
function isInViewPortOfTwo (el) {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight
    	 || document.body.clientHeight;
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
    return top  <= screenHeight + 100;
}

```

### 方法二 计算滚动高度

```javascript
function isInViewPortOfOne (element) {
  // 获取可视窗口的高度。兼容所有浏览器
  const screenHeight = window.innerHeight || document.documentElement.clientHeight
  	 || document.body.clientHeight;
  // 获取滚动条滚动的高度
  const scrollTop = document.documentElement.scrollTop;
  // 获取元素偏移的高度。就是距离可视窗口的偏移量。
  const offsetTop = element.offsetTop;
  // 加100是为了提前加载
  return offsetTop - scrollTop <= screenHeight + 100;
}

```

### 方法三 IntersectionObserver

```typescript
// entries 为 IntersectionObserverEntry对象数组
 var io = new IntersectionObserver((entries) => { 
   entries.forEach((item) => {
     // isIntersecting是一个Boolean值，判断目标元素当前是否可见
     if (item.isIntersecting) {
       // div 可见时 进行相关操作
       console.log(item.target.innerText);
       io.unobserve(item.target); //停止监听该div DOM节点
     }
   });
 }); // 不传options参数，默认根元素为浏览器视口
const divArr = [...document.querySelectorAll(".item")];
divArr.forEach((div) => io.observe(div)); // 遍历监听所有div DOM节点
```

## tx经典题型：hardman/lazyman
```javascript
hardman('tom')
// 输出 i am tom

hardman('tom').rest(10).learn('ch')
// 先输出i am tom，等10s后输出wait 10s，然后紧接着输出learn ch

hardman('tom').restFirst(5).learn('ch')
// 先等5s后输出i am tom，然后输出wait 5s，然后紧接着输出learn ch
```

解答
```js
class _HardMan {
    name
    stack = [];
    constructor(name) {
        this.stack.push({ output: `I am ${name}` });
        // 两种方法都可以，只要打入下一个任务栈就行了
        // setTimeout(() => {
        //     this.trigger()
        // })
        Promise.resolve().then(() => {
            this.trigger()
        })
    }
    rest(time) {
        this.stack.push({ output: `wait ${time}s`, time });
        return this;
    }
    restFirst(time) {
        this.stack.unshift({ output: `wait ${time}s`, time });
        return this;
    }
    learn(txt) {
        this.stack.push({ output: `learn ${txt}` });
        return this;
    }
    trigger(index = 0) {
        for(let i = index; i < this.stack.length; i++) {
            const { output, time } = this.stack[i];
            if (time) {
                setTimeout(() => {
                    console.log(output);
                    this.trigger(i + 1);
                }, time * 1000)
                return;
            } else {
                console.log(output);
            }
        }
    }
}

function HardMan(name) {
    return new _HardMan(name);
}
```
> 主要考察点是时间循环，微任务能够在所有宏任务之后再执行


## 变量提升问题
```js
for( var i =0;i<4; i++) {
    setTimeout(function() {
        console.log(i)
    }, 300)
}
// 运行结果4444
```
- var提升i的变量声明至全局作用域，所以整个循环体和setTimeout都共享了一个i
### 如何改成输出0123
- 使用let来声明i，制造块级作用域，每次循环都会创建一个新的i
```js
for (let i = 0; i < 4; i++) {
    setTimeout(function() {
        console.log(i);
    }, 300);
}
```
- 使用IIFE创建闭包
```js
for (var i = 0; i < 4; i++) {
    (function(j) { // 使用 IIFE，并传入 i 值作为参数 j
        setTimeout(function() {
            console.log(j); // 闭包捕获的是 IIFE 参数 j，而不是外部的 i
        }, 300);
    })(i); // 立即执行 IIFE，并将当前的 i 值传入
}
```
- 使用setTimeout的第三个参数
```js
for (var i = 0; i < 4; i++) {
    setTimeout(function(j) { // 回调函数接收参数 j
        console.log(j); // 打印参数 j
    }, 300, i); // 第三个参数 i 会作为回调函数的第一个参数 j 传入
}
```

## 数组打平
### flat
```javascript
const arr = ["1", ["2", "3"], ["4", ["5", ["6"]], "7"]];
arr.flat(); // ["1", "2", "3", "4", ["5", ["6"]], "7"]
```
不传参数时默认拉平一层，可以传入Infinity，可以拉平无数层
> 有空位元素会被消除

### toString
```javascript
const arr = [1, [2, 3], [4, [5, [6]], 7]];
arr.toString().split(',').map(item) => Number(item);
```
仅支持单数字元素
### concat
```javascript
const flatten = (list) => [].concat(...list);
```
基于concat特性，只能拍平一层
### reduce+concat
```javascript
const flatten = (list) =>
  list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
```
深层拍平
