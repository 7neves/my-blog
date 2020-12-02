## 1. 移动端适配方案
### 1. 插件介绍
主要是使用了 [`postcss` 插件](https://github.com/postcss/postcss/blob/main/docs/plugins.md)来实现的适配。
1. 借助 [`postcss-px-to-viewport` 插件](https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md)来实现移动端的适配  
该插件能将 `px` 单位自动转为 `viewport` 单位，兼容性如下，目前大部分浏览器已兼容，推荐使用。
<img-show :img-info="{src:'https://i.loli.net/2020/12/02/48TSgFUOf9qZChz.png',description:'viewport 兼容性'}" />

2. 借助 [`postcss-pxtorem` 插件](https://github.com/cuth/postcss-pxtorem)来实现移动端的适配  
该插件能将 `px` 单位自动转为 `rem` 单位，兼容性如下，兼容性要优于 viewport，老的项目可以采用这种方案。
<img-show :img-info="{src:'https://i.loli.net/2020/12/02/y3fgdJzcxpl1esh.png',description:'rem 兼容性'}" />

因为 `rem` 是一个相对单位，所以使用该方案时还需要借助 `amfe-flexible` 插件来设置 `rem` 基准值。  
### 2. 配置方法
1. 首先是先必须都安装
   ```bash
   yarn add postcss-px-to-viewport --dev
   ```
   如果是 `postcss-pxtorem` ，则还需要安装 `amfe-flexible`
   ```bash
   yarn add postcss-pxtorem amfe-flexible --dev
   ```
2. 在 UmiJS 中使用
   1. 配置 `extraPostCSSPlugins` 选项即可：
   ```js
   // postcss-pxtorem 配置
    ...
    extraPostCSSPlugins: [
      require('postcss-pxtorem')({
        rootValue: 16,
        unitPrecision: 5,
        propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
        selectorBlackList: [],
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
        exclude: /node_modules/i
      }),
    ],
   ```
   - **注意：** 使用 `postcss-pxtorem` 还需要在 src/app.js 中引入 `amfe-flexible`。
   ```js
   // postcss-px-to-viewport 配置
   ...
   extraPostCSSPlugins: [
     require('postcss-px-to-viewport')({
       viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
       unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
       viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
       selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
       minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
       mediaQuery: false, // 允许在媒体查询中转换`px`
     }),
   ],
   ```
3. 在Vue-cli3工程中使用  
   使用 `postcss.config.js` 文件来配置 postcss
   ```js
   // postcss.config.js
   module.exports = ({ file }) => {
     // 这里可以对文件进行过滤配置
     let isVant = file && file.dirname && file.dirname.indexOf("vant") > -1;
     let rootValue = isVant ? 37.5 : 75; // 
     return {
       plugins: {
         'autoprefixer': {
           overrideBrowserslist: [
             "Android 4.1",
             "iOS 7.1",
             "Chrome > 31",
             "ff > 31",
             "ie >= 8"
           ]
         },
         // postcss-pxtorem 配置
         'postcss-pxtorem': {
           rootValue: rootValue,
           propList: ["*", "!border"]
         }
         // postcss-px-to-viewport 配置
         'postcss-px-to-viewport': {
           viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
           unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
           viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
           selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
           minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
           mediaQuery: false, // 允许在媒体查询中转换`px`
         }
       }
     }
   }
   ```
  - **注意：** 使用 `postcss-pxtorem` 还需要在 src/app.js 中引入 `amfe-flexible`。

