[[toc]]
## 1. FastMock跨域报错
关键信息-`has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response`  
详细报错信息：
```js
Access to XMLHttpRequest at 'https://www.fastmock.site/mock/3882a1ed652f588dfe1c0281aab0c80d/hadoop/getAPITableData' from origin 'http://localhost:8080' has been blocked by CORS policy: Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.
xhr.js?
Cross-Origin Read Blocking (CORB) blocked cross-origin response https://www.fastmock.site/mock/3882a1ed652f588dfe1c0281aab0c80d/hadoop/getAPITableData with MIME type application/json. See https://www.chromestatus.com/feature/5629709824032768 for more details.
```
- 问题描述  
开发中使用axios进行数据请求，需要用户登录后在请求头中添加token参数，携带token信息；在开发环境使用`FastMock`工具mock数据，执行请求的时候报了上述错误，导致预请求失败
- 原因  
在请求头中加入自定义参数，会导致执行**非简单请求**(详情参考阮一峰老师[跨域资源共享 CORS 详解](http://www.ruanyifeng.com/blog/2016/04/cors.html))，该请求会执行一个预请求(`options`请求)
<div class="img-show">
<a data-fancybox title="" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190805142131.png">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190805142131.png)</a>
<p>options预请求</p>
</div>
- 解决办法
  - 因为`FastMock`只是在开发阶段提供数据模拟服务，且无法对`FastMock`这种在线工具进行配置，所以通过配置axios的拦截选项，在请求发出前判断`baseURL`参数是否包含`FastMock`关键字，决定是否取消请求头中的自定义参数`token`，从而取消`options`请求的发出:
      ```js
      // 2.1 配置请求拦截器---在请求发出前进行拦截
      axios.interceptors.request.use(config => {
        // 因为使用了fastmock服务，由于跨域问题，在请求头中加入自定义字段会导致预请求options请求失败，在此做判断
        // 正常的生产环境服务端可以配置跨域问题：https://www.cnblogs.com/caimuqing/p/6733405.html
        if (configBaseURL.indexOf('fastmock') === -1) {
          if (store.getters.token) { // 如果已经登录，在请求头中携带token信息
            config.headers.Authorization = `${store.getters.token}`;
          }
        }
        // console.log(config); // for debug
        return config;
      }, error => {
        // 当出现请求错误时做一些事
        return Promise.reject(error);
      });
      ```
  - 如果在生产环境，需要在服务端配置CORS的跨域请求，[配置方法](https://www.cnblogs.com/caimuqing/p/6733405.html)