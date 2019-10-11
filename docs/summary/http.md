## 1. fastmock跨域报错-`has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response`
详细报错信息：
```js
Access to XMLHttpRequest at 'https://www.fastmock.site/mock/3882a1ed652f588dfe1c0281aab0c80d/hadoop/getAPITableData' from origin 'http://localhost:8080' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.
xhr.js?
Cross-Origin Read Blocking (CORB) blocked cross-origin response https://www.fastmock.site/mock/3882a1ed652f588dfe1c0281aab0c80d/hadoop/getAPITableData with MIME type application/json. See https://www.chromestatus.com/feature/5629709824032768 for more details.
```
- 问题描述  
开发中使用axios进行数据请求，需要用户登录后在请求头中添加token参数，携带token信息；在开发环境使用`fastmock`工具mock数据，执行请求的时候报了上述错误，导致预请求失败
- 原因  
在请求头中加入自定义参数，会导致执行**非简单请求**(详情参考阮一峰老师[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html))，该请求会执行一个预请求(`options`请求)
<div class="img-show">
<a data-fancybox title="" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190805142131.png">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190805142131.png)</a>
<p>options预请求</p>
</div>
- 解决办法
  - 本地开发的时候，因为无法配置`fastmock`，所以通过判断axios的`baseURL`参数是否包含`fastmock`字段，决定是否取消请求头中的自定义参数`token`
  - 生产环境，在服务端配置CORS的跨域请求，[配置方法](https://www.cnblogs.com/caimuqing/p/6733405.html)