## 1. vue-router参数如何不在URL中显式传递？
使用[编程式导航](https://router.vuejs.org/zh/guide/essentials/navigation.html#编程式的导航)来实现，`router`实例的`push`方法:
```js
const userId = 123
router.push({ name: 'user', params: { userId }})
// 路由设置 path 为：'/user/:userId'
// 跳转路径：'/user/123'

// 路由设置 path 为：'/user'
// 跳转路径：'/user'
// this.$route.params.userId 获取userId
```