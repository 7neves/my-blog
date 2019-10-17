vue-cli3中对[webpack的配置](https://cli.vuejs.org/zh/guide/webpack.html#webpack-相关)有两种，所以以下配置基本都会有两种配置方式，自行选择
  - 高级的链式配置[`chainWebpack`](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7)
  - 简单的配置[`configureWebpack`](https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F)
## 1. 配置Gzip压缩
使用插件`compression-webpack-plugin`插件来实现Gzip压缩
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
## 2. 配置打包分析插件`webpack-bundle-analyze`
`webpack-bundle-analyze` 插件可以提供一个可视化的图形界面展示打包后各个文件的依赖关系，以便对各个文件进行分析，进行进一步打包优化。
在vue-cli2中已经内置了该插件的配置，开箱即用，但是在vue-cli3中需要进行手动配置。
- 简单的配置方式：
  ```js  
  configureWebpack: config => {
    // 配置打包概览插件
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        return {
          plugins: [
            new BundleAnalyzer()
          ]
        }
      }
    }
  },
  ```
- 高级的链式操作配置方式：
  ```js
  // 高级的webpack配置
  chainWebpack: config => {
    // 配置打包分析插件，以便使用 npm run build --report 对包进行分析优化
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report) {
        config
          .plugin('webpack-bundle-analyzer')
          .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
      }
    }
  },
  ```
- **出现问题的点**：不用再另行配置 `package.json`文件中的 `scripts`，直接执行命令`npm run build --report`就会输出分析页面，执行`npm run build`将不会输出。
## 3. 静态资源的处理和vue-cli3中的环境变量
本文参考[Vue CLI3搭建的项目中路径相关问题的解决](https://www.jb51.net/article/147558.htm) ，进行了重新排版和总结  
项目中的静态资源通常通过这两种方式进行处理:  
1. 不会被 webpack 处理的，将会直接被拷贝：
    - 放置在 `public/` 目录下，**即使未被使用**。
    - 通过绝对路径被引用的文件，即以 `/` 开头引用的文件资源（如`/images/test.png`），因为绝对路径在打包时会被保留不变，如果文件被处理，将会404。
2. 会被 webpack 处理（URL或静态资源的 `resolve`、`minify`、`uglify`、`转 base64` 等处理方式）：
    - 使用 JavaScript 导入(`require`、`import`等方式)的文件。
    - 在 `template`、`CSS` 中通过相对路径（即以 `.` 开头）被引用。
    - URL 以 `~` 开头，其后的任何内容都会作为一个模块请求被解析。
    - URL 以 `@` 开头，它也会作为一个模块请求被解析（`@` 是在 webpack 设置的 `alias`）。

    应该根据实际情况去选择要引用的资源是否要被处理，然后用对应的、正确的方式去引用它们以达到目的。需要被webpack处理的方式比较容易，直接使用上述方式即可，主要说下在什么情况下不需要webpack处理，以及绝对路径的一些使用方式，其中还涉及到了环境变量的一些使用：    
    不需要 webpack 处理的文件，分两种情况：
      - 先来看看哪些文件需要放在 `public/` 目录下  
        - 项目中会有大量的图片或图片质量很高(单个图片文件很大)时  
          因为webpack会将图片处理为`base64`，而这些base64的编码会被放入js文件中，当渲染页面的时候渲染出来；base64编码的长度([处理原理](https://segmentfault.com/q/1010000000456088))是根据图片大小来定的：  
          图片大小|base64编码长度
          :-:|:-:
          2.5KB|3420个字符
          58KB|12726个字符
          562KB|767644个字符
          再看下打包后文件的大小：
          <img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190919102532.png',description:'打包2.5KB的图片'}"/>
          <img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190919102553.png',description:'打包562KB的图片'}"/>
          可以看到打包文件大小差异非常大，所以图片的处理，图片的大小和数量决定了存放的位置。个人建议图片的处理方式如下，优先级从上往下递减：
            - 小的icon图片，[制作成iconfont](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8d11a391&helptype=code)，以字体图标的方式引入使用
            - 较小(少)的(<=6KB)无法制作成iconfont字体图标的通过webpack来处理 
            - 较大(多)的图片放入`public/`文件中直接拷贝处理(可以考虑CSSSprite的方式，进而减少请求数量)，通过绝对路径来引入
        - 与webpack不兼容，无法通过NPM等包管理工具来管理的第三方库文件，只能通过script标签（绝对路径）的方式引入
      - 再来看看什么情况下需要使用绝对路径，和使用绝对路径需要注意的一些问题  
          - 使用场景：上文说了，绝对路径会被保留，`public/`目录会被直接拷贝；所以通常**引用`public/`目录下的文件时会使用绝对路径**。
          - **注意：使用绝对路径引入文件时一定要确保使用 [`baseUrl`（从 Vue CLI 3.3 起已弃用，请使用 `publicPath` ）](https://cli.vuejs.org/zh/config/#publicpath) 的值作为 URL 的开头**，因为：
            > 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
          - 使用方法：  
            从注意事项中了解到绝对路径的使用其实主要是 `publicPath` 的使用，所以需要重点了解`publicPath`；而该值与[环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量和模式)有很大的关系：
              > BASE_URL - 会和 vue.config.js 中的 publicPath 选项相符，即你的应用会部署到的基础路径。
              
            所以如何使用绝对路径的问题，也就变成了如何使用`BASE_URL`这个环境变量的问题
            - 在.html模板文件中使用  
              借助 lodash template 使用[插值](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#插值)的方式插入这个变量：
              ```js
              <link rel="icon" href="<%= BASE_URL %>favicon.ico">
              ```
            - 在组件中使用  
              首先，来看两个“工具”：[node中的process.env属性](http://nodejs.cn/api/process.html#process_process_env)，它可以获取用户环境的对象；webpack的[`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin/#用法)插件，它可以创建一个在编译时可以配置的全局常量，因此我们可以使用该插件来为`process.env`对象添加一个变量，在不同环境下有不一样的值。通过`vue ui`可视化界面执行inspect任务，可以看到，在vue-cli3的默认配置中，已经通过`DefinePlugin`插件定义了`BASE_URL`环境变量： 
              <img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191014150036.png',description:'开发环境'}"></img-show>
              <img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191014153253.png',description:'生产环境'}"></img-show>
              所以在组件中，可以使用[客户端侧使用环境变量的方式](https://cli.vuejs.org/zh/guide/mode-and-env.html#在客户端侧代码中使用环境变量)获取`BASE_URL`这个全局变量
              ```js
              data(){
                return {
                  baseUrl: process.env.BASE_URL // 局部使用
                }
              }
              // 通常，通过定义全局变量的方式来使用
              Vue.prototype = process.env.BASE_URL;
              ```
              在模板中使用：
              ```html
              <template>
                <div id="app">
                  <img :src="`${baseUrl}imgs/my_image.png`">
                </div>
              </template>
              ```
            - 在样式文件中使用（以Saas为例）
              因为样式文件中无法使用js中定义变量，也无法使用配置的环境变量，因此只能借助webpack配置，将环境变量“引入”样式文件中，作为样式中一个全局变量来使用。sass-loader提供了一个[配置环境变量的data选项](https://webpack.docschina.org/loaders/sass-loader/#-环境变量)，vue-cli3的配置如下:
              ```js
              css: {
                loaderOptions: {
                  sass: {
                    // 定义全局变量$baseUrl，能根据环境不同动态切换基础路径
                    data: `$baseUrl: "${process.env.BASE_URL}";`
                  }
                }
              }
              ```
## 4. 使用`.svg`文件作为背景图片
- **问题**：在项目中将`.svg`的文件存放于 `./src/assets/images` 目录下，使用会被webpack打包处理的引用方式：`background-image: url("~@/assets/images/xxx.svg");`，本地开发环境能正常展示，打包后图片无法正常展示。通过观察打包目录发现，`.svg`文件被单独打包到静态资源下的 `img/` 目录下，而未经过webpack处理。
- **解决问题**：猜想是默认配置问题，通过`vue ui`检查webpack配置，发现vue-cli3对`.svg`文件的处理方式如下：
  <img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190911112137.png',description:'默认配置'}"></img-show>
在vue-cli3默认的配置中，处理`.svg`文件的方式是添加hash值之后直接拷贝的，并不会压缩处理。
  - 将`.svg`文件放在`public/`目录下，进行文件的直接拷贝，使用方式同引用`public/`目录下文件的方式一样