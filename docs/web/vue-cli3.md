## 1. 配置Gzip压缩
使用插件`compression-webpack-plugin`插件来实现Gzip压缩，vue-cli3中配置插件有两种方式，一种是高级的链式配置[`chainWebpack`](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)，一种是简单的配置[`configureWebpack`](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)
1. 安装插件
```js
cnpm i -D compression-webpack-plugin
```
2.1 使用高级链式配置`chainWebpack`实现方法：
```js
module.export = {
  ...
  // 链式配置
  chainWebpack = {
    if (process.env.NODE_ENV === 'production') {
      // gzip压缩，如果本地不开启，则需要在Nginx端开启
      config
        .plugin('compression-webpack-plugin')
        .use(compressionPlugin, [{
          test: /\.js$|\.html$|\.css$|\.png/, // 需要压缩的文件
        }, {
          threshold: 10240 // 阈值，大于此值的文件都会被压缩
        }, {
          deleteOriginalAssets: false // 是否删除原未压缩文件(经测设置为true并未删除)
        }])
    }
  }
}
```
2.2 使用简单的配置`configureWebpack`来实现，[参考](https://www.cnblogs.com/yangshifu/p/9724709.html)
