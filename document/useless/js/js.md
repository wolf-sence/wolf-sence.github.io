## apply/call/bind 解析

### 用法
三个方法都用于改变函数运行的this指向
```javascript
const name = 'sam'
const obj = {
    name: 'tom',
    say: function (age) {
        console.log('this.name:', this.name, ', age: ', age)
    },
}
const otherObj = {
    name: 'other'
}
obj.say() // tom
obj.say.apply(otherObj, [13]) // other
obj.say.call(otherObj, 13) // other
obj.say.bind(otherObj)(13) // other
```

### 手动实现apply/bind
```javascript
Function.prototype.apply2 = function(that, args) {
    that.func = this
    if (Array.isArray(args)) {
        that.func(...args)
    } else {
        that.func()
    }
    delete that.func
}
Function.prototype.bind2 = function(that) {
    const func = this
    return function (...args) {
        return func.apply2(that, args)
    }
}
```

## 箭头函数与匿名函数
- 传统函数this取决于`调用`的上下文,当函数作为对象的属性被调用时，默认以对象为this
- 箭头函数没有prototype(原型)，所以箭头函数本身没有this,自身不绑定 this，它的 this 值继承自`定义`时所在的作用域。JavaScript 引擎会沿着作用域链向上查找，直到找到最近一层`非箭头函数的函数或全局作用域`的 this，并将这个 this 值作为箭头函数内部的 this 值。
- 箭头函数没有arguments，也无法被new实例化
```javascript
globalThis.name = 'global'
const obj = {
    name: 'obj',
    say1: () => {
        console.log('this.name:', this.name)
    },
    in: {
        name: 'in',
        say2: function () {
            console.log('this.name:', this.name)
        },
        say3: () => {
            console.log('this.name:', this.name)
        },
        say4: function() {
            const name = 'say4'
            let fn = () => { console.log('this.name:', this.name) }
            fn()
        }
    }
}
const otherObj = {
    name: 'other'
}
obj.say1() // global
obj.in.say2() // in
obj.in.say3() // global
obj.in.say4() // in

```

## WEB安全问题
### xss攻击 跨站脚本攻击
攻击者将脚本嵌入被攻击网站，获取用户cookie等隐私信息。
#### 攻击方式
- 存储形：将用户输入的数据存储至数据库，待用户访问时返回携带攻击的脚本，在用户的浏览器端执行获取cookie等信息
- 反射形：将用户的输入数据通过web服务器直接展示至页面中，这时能够直接在页面运行恶意代码
- 基于DOM的xss攻击：在Web资源传输过程或者在用户使用页面的过程中修改We页面结构或者数据。
#### 防范方式
- cookie设置httpOnly，禁止js访问对应的cookie
- CSP(content security policy)，使用meta标签配置页面的内容安全策略，以控制浏览器可以为该页面获取哪些资源,不同的指令对应不同的安全策略，如下表示允许加载所有图片；仅允许加载media2/media2.com的多媒体资源；仅允许加载制定域的script脚本
```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com;" />
```
- 输入/输出检查，前端/服务端对用户的输入过滤、编码，输出可以转义

### csrf攻击 跨站请求伪造
攻击者诱导已登录用户访问攻击者的第三方网站，攻击网站向被攻击网站发起跨站请求，利用受害者在被攻击网站已经获取的注册凭证（利用浏览器会自动携带cookie），绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的

#### 攻击类型
- 伪造get/post请求：在第三方网站中使用img标签的src请求或者是自动执行代码实现访问被攻击网站的接口，此时会默认携带被攻击网站的cookie凭证，如果被攻击网站的服务端没有校验则会被攻击

#### 防范方式
- cookie设置SameSite禁止第三方网站使用被攻击网站的cookie
> 具体的值有：strict：只有同源网站请求才会带上cookie；Lax仅允许跨站点的get请求携带cookie；None则允许任何请求都携带cookie
- 验证请求的referer头
- 请求中放入token验证，在请求中放入攻击者所不能伪造且不属于cookie的信息