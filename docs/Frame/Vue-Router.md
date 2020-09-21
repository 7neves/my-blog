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

## 2. SPA实现刷新仍停留在当前页面

在SPA应用中刷新页面会显示最初的页面，如果想要停留在当前页面，该如何做呢？在使用vue-router开发的项目中，就遇到了这个需求，记录下大概的思路

1. 首先要保留当前的状态，也就是vuex里的数据，以及路由信息，通过H5的 `localStorage`,` sessionStorage`都可以进行存储，这里使用了vue-router提供的组件内路由钩子：

   ```js
   beforeRouteEnter(to, from, next) {
     next((vm) => {
       let routerInfo = {
         name: vm.$route.name,
         query: vm.$route.query,
       }
       sessionStorage.setItem('router', JSON.stringify(routerInfo));
       sessionStorage.setItem('initStore', JSON.stringify(vm.$store.state));
     })
   }
   ```

2. 刷新后，在App.js中获取存储的路由信息以及状态，进行路由跳转和状态重置，跳转至刷新前的页面，实现刷新

   - 注意：这里要使用`router.replace()`而非`router.push()`，因为`router.replace()`不会向 history 添加新记录，在点击浏览器返回按钮的时候能够回退到之前的页面

   ```js
   mounted() {
     let routerInfo = JSON.parse(sessionStorage.getItem('routerInfo'));
     if (routerInfo) {
       sessionStorage.getItem("initStore") && this.$store.replaceState(JSON.parse(sessionStorage.getItem("initStore")));
       this.$router.replace(routerInfo);
       return;
     }
   }
   ```

   

