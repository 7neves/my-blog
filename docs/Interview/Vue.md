## 1. Vue的响应式原理
Vue采用的是**数据劫持**结合**发布-订阅模式**；通过[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)来劫持各个属性的`getter`和`setter`，在数据变动时，发布消息给订阅者，触发相应的监听回调。  
具体步骤：  
当创建Vue实例的时候，会遍历递归 `data` 选项中的数据对象，利用 `Object.defineProperty()` 为属性添加 `setter` 和 `getter`，其中`getter`用来收集依赖，`setter`用来派发更新；每个组件实例都有 `watcher` 实例，也就是订阅者，会在组件渲染的过程中记录依赖的所有数据属性，之后在依赖被改动时，就会触发`setter`，通知订阅者，派发更新，从而使关联的组件进行重新渲染。
<img-show :img-info="{src:'https://i.loli.net/2020/02/10/TZaJeNXuPtj72km.png',description:'Vue追踪变化'}"/>

## 2. Vue3.0为什么采用了Proxy,放弃了`Object.defineProperty()`
`Object.defineProperty()`只能劫持对象的属性，因此需要对每个对象的每个属性进行遍历，Vue中通过递归的方式来实现对 data 对象的监控，如果属性值也是对象，那么就需要更深度的遍历；基于性能的问题，Vue放弃了`defineProperty`对数组下标变化监控的能力，而在内部改写了几个方法来监听数组。而[`Proxy`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)对象，可以代理任何对象，包括原生数组、函数，并返回一个新的对象

## 3. Vue内部那几个方法能实现数组的监听
`push()`、`pop()`、`splice()`、`shift()`、`unshift()`、`sort()`、`reverse()`