# 监听元素是否在视口

## 前置概念
- 获取视口尺寸：`window.innerHeight/innerWidth`,由于浏览器差异在ie6/7/8内需使用`document.documentElement.clientHeight/clientWidth`
- 获取滚动高度：`document.documentElement.scrollTop`

## 方法一 getBoundingClientRect
> api文档可见[此处](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)


getBoundingClientRect的定位是相对视口定位，即判断相对视口的距离减去视口高度即可获知其是否在视口内

![getBoundingClientRect](http://imgcdn.somebodyelse.cn/blog-imgs/origin-js/element-box-diagram.png)
```javascript
function isInViewPortOfTwo (el) {
    const screenHeight = window.innerHeight || document.documentElement.clientHeight
    	 || document.body.clientHeight;
    const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
    return top  <= screenHeight + 100;
}

```

## 方法二 计算滚动高度

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

## 方法三 IntersectionObserver

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