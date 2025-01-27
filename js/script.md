# script标签
HTML5规范要求脚本按照它们出现的先后顺序执行，因此第一个延迟脚本会先于第二个执行。在现实中，延迟脚本并不一定会按照顺序执行，因此最好只包含一个延迟脚本。

## 记载顺序
总体来说，script标签是并发加载

> 加载顺序可参考[script标签加载顺序](https://juejin.cn/post/6913156226008711182)

![script标签加载顺序](http://imgcdn.somebodyelse.cn/blog-imgs/origin-js/origin-script/v2-script1.jpg)


### 无属性
* 执行时机: 无论是内联还是外部script，都会同步阻塞渲染
* 执行逻辑: 所有资源异步并发获取资源，等待所有资源返回后，从上至下逐一的同步执行，符合evenloop

### defer
> 如果是es模块的脚本(type="module")，则默认就是defer属性
* 概念：表示js文件将会延迟执行，直到文档的解析完成为止
* 执行时机: 下载完后，在dom解析完之后、触发DOMContentLoaded之前执行。
* 执行逻辑: 无需远程获取的script从上至下执行;需要远程获取的资源异步获取，等待所有资源获取完成后从上至下同步执行

### async
* 概念：表示文件将在加载后立即执行，可能是文件在解析过程中后者解析之后执行的，不能保证一部脚本的执行顺序
* 执行时机：下载完后，立即执行。
* 执行逻辑: 无需远程获取的script从上至下执行;需要远程获取的资源异步获取，谁先获取谁先执行，无特殊顺序



## 执行顺序
`任何情况下js的执行都会阻塞dom的渲染`

```html
<div>Neo</div>
<script>
    console.log(a) // 打印一个未定义的变量a
    console.log(0)
</script>
<script>
    console.log(1)
</script>

```
script标签内的报错只会阻塞该script标签内的代码，对另一个script标签内的代码无影响
