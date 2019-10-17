## 1. VuePress搭建的博客部署在coding
因为**墙**的原因（网页打开慢，甚至打不开；搜索不够友好），将之前部署在GitHub上的博客转移到了国内代码托管工具[coding](https://coding.net) pages上，coding也具有自动部署和绑定域名的功能。简单说一下配置过程。
1. 首先在coding上新建项目  
<img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011150954.jpeg',description:'新建项目'}"/>
2. 之后点击左侧菜单栏：静态部署 -> 静态网站 -> 新建静态网站
<img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011150954.jpeg',description:'新建静态网站'}"/>
默认推送到master分支时自动部署（后续可以自行设置），点击立即部署，即可完成。
3. 静态网站的设置  
在静态网站页面，点击右上角设置按钮，可对静态网页进行设置，包括自定义域名的绑定和删除网站的功能，同时可以强制开启HTTPS模式。  
这里注意绑定自定义域名的操作：
    > 绑定前请在域名 DNS 设置中添加 CNAME 记录指向 nz60mt.coding-pages.com

    我个人注册的域名是使用腾讯的，[添加CNAME的方法](https://cloud.tencent.com/document/product/302/3450)，其他应该类似，按照步骤操作即可。
4. 部署配置`deploy.sh`文件的配置  
同配置GitHub一样，添加如下命令即可

    ```js
    git push -f git@e.coding.net:suitmobs/MyBlog.git master
    ```
5. 部署操作  
在博客目录执行下列命令，即可完成部署：  
    1. `npm run build`
    2. `npm run deploy`
## 2. VuePress搭建博客使用自定义组件实现图片缩放
自己挖的坑：当初没仔细看官方文档，还去搜索了下VuePress如何进行图片缩放，不过还真有解决方案，是用jQuery插件来解决了（此方案还可以在日常开发中使用），详见[VuePress支持图片放大功能](https://segmentfault.com/a/1190000016928859)；虽然也能解决问题，但是作为一个强迫症患者表示不甘心，重读文档发现[原生是支持图片缩放](https://vuepress.vuejs.org/zh/plugin/official/plugin-medium-zoom.html)的😂，借助VuePress自带的[在Markdown中使用Vue](https://vuepress.vuejs.org/zh/guide/using-vue.html#使用组件)功能自定义一个缩放组件，在`.md`文件中无感知使用，美滋滋😝  
还是坑：按照官文中的配置，缩放功能一直无法使用，鼠标悬浮图片没有放大手势，后来调整了下配置才能用了，目前不知道是官文写错了，还是自己仍然没看透官文🤣  
**解决方案：**
```js
// config.js

module.exports = {
    plugins: {
        '@vuepress/plugin-medium-zoom': { // 注意：此处不是官网提到的@vuepress/medium-zoom
            selector: 'img.zoom-img',
            // medium-zoom options here
            // See: https://github.com/francoischalifour/medium-zoom#options
            options: {
                margin: 16
            }
        }
    }
}
```
在`docs/.vuepress/components/`目录下自定义组件：
```js
<template>
  <div class="img-wrapper">
    <img :src="imgInfo.src"
         :alt="imgInfo.description"
         class="zoom-img">
    <p>{{ imgInfo.description }}</p>
  </div>
</template>

export default {
  name: "ImgShow",
  props: {
    imgInfo: {
      required: true,
      type: Object
    }
  }
}
// 为了篇幅此处省略了style，可以按照自己的样式来写
```
使用方法，就是在.md文件中直接像平常一样使用组件即可：
```md
<img-show :img-info="{src:'https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190911112137.png',description:'默认配置'}"/>
```
效果参考博客中的图片缩放效果。