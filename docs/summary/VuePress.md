## 1. VuePress搭建的博客部署在coding
因为**墙**的原因（网页打开慢，甚至打不开；搜索不够友好），将之前部署在GitHub上的博客转移到了国内代码托管工具[coding](https://coding.net) pages上，coding也具有自动部署和绑定域名的功能。简单说一下配置过程。
1. 首先在coding上新建项目  
<div class="img-show">
<a data-fancybox title="" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011150954.jpeg">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011150954.jpeg)</a>
</div>
2. 之后点击左侧菜单栏：静态部署 -> 静态网站 -> 新建静态网站
<div class="img-show">
<a data-fancybox title="" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011151108.png">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20191011151108.png)</a>
</div>
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