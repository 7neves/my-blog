## 1. @umijs/plugin-request
[umi-request配置说明](https://github.com/umijs/umi-request/blob/master/README_zh-CN.md)
### 1. 设置token
在Vue工程中通常使用 `vuex` 和 `axios` 来进行数据管理和数据请求，在设置token时，通常在 axios 中配置文件中借助 `store` 获取到具体的 token 值，然后设定即可。在 Umi 中使用 dva 来进行数据管理，在组件之外使用 dva 中的数据不那么方便，所以在 UmiJS 中对请求统一设定 `token`，由H5中的 `sessionStorage` 或 `localStorage` 来传递。
1. 获取到服务端返回的 `token` ，然后使用H5做存储
2. 在请求配置文件中获取到H5的存储值，进行设定
   - 这里要注意一点，最好是在请求拦截器中进行 token 的设定，这样每次请求都能拿到最新的 token 
```js {3,4}
// 请求拦截器
request.interceptors.request.use((url, options) => {
  const token = sessionStorage.getItem('token');
  options.headers.Authorization = token || '';
  return { url, options };
});
```
### 2. 在配置响应拦截器中，如何获取到后台返回的具体数据
在响应拦截器中，如果未做任何配置，输出内容只有 Response 对象:
<img-show :img-info="{src:'https://i.loli.net/2020/12/02/JvEiph8lXCNw7PL.png',description:'Response'}"/>
观察会发现这里面是不包含返回的具体数据的，如果要统一在拦截器里对返回的数据进行处理，就要进行配置:
>  克隆响应对象做解析处理

```js
  request.interceptors.response.use(async response => {
    const data = await response.clone().json();
    console.log(data); // 这里就能输出具体的返回数据
    return response;
  });
```
这里就能获取到具体的返回数据：
<img-show :img-info="{src:'https://i.loli.net/2020/12/02/4FgA7w1CZntS3Jq.png',description:'Response'}"/>

