## 1. js将变量/字符串用作属性名
js中如果需要将一个变量，或一个字符串用作对象的key值，需要加上`[]`，将变量名或字符串包裹起来，而不是用`.`
## 2. js创建一个空对象的方式
1. `let obj = {};` 或 `let obj = new Object();` 
    - 这两种方式是一样的，都**会继承Object对象上的属性和方法**:
    <img src="https://app.yinxiang.com/shard/s11/res/dd09b2f2-9673-42f3-af88-5224c7e7ad6f" width="350" align=center title="{}" />
    <img src="https://app.yinxiang.com/shard/s11/res/aff09229-68e2-4240-b7ea-d7b8b2bcfed7" width="350" align=center title="Object()" />
2. `let obj = Object.create(null);`
    - 这种方式会创建一个纯净的对象，**不携带任何Object自带的方法和属性**
    <img src="https://app.yinxiang.com/shard/s11/res/fc752d43-003c-474b-a4fe-0e01ac3e2195" width="350" align=center title="Object.create(null)" />
## 3. 如何判断对象是否为空
判断一个对象是否为空对象，常用的三种方法：
1. 使用 `JSON` 对象的 `stringify()` 方法：
```js
let obj = {};
if (JSON.stringify() === "{}") {
    return true;
}
return false;
```
2. 使用 `for...in...` 遍历对象
```js
let obj = {};
for (let key in obj) {
    return true;
}
return false;
```
3. 使用ES6自带的 [`Object.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法  
该方法会返回一个由一个给定对象的自身可枚举属性组成的数组。
```js
let obj = {};
Object.keys(obj); // []
// 所以判断该方法返回的长度，可以获知对象是否为空对象
if (Object.keys(obj).length === 0) {
    return true;
}
return false;
```
## 4. 千分位格式化数字
使用[`toLocaleString`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)进行数字千分位格式化
```js
Number.prototype.Formate = function(locales = 'en-US'){
	return Number.prototype.toLocaleString.call(this,locales);
}
let number = 123456.789;
console.log(number.Formate()); // 123,456.789
```
## 5. `mouseout`和`mouseleave`的区别
[demo](http://www.w3school.com.cn/tiy/t.asp?f=jquery_event_mouseleave_mouseout)
- `mouseout`：不论鼠标离开所选元素还是任何子元素，都会触发
- `mouseleave`：只有鼠标离开所选元素的时候，才会触发