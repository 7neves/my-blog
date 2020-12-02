## AES加密工具的使用方法
1. 安装 `crypto-js`
```bash
npm i -S crypto-js
```
2. 配置
```js
import CryptoJS from 'crypto-js';

// 默认的 KEY 与后台一致，十六位十六进制数作为密钥
const KEY = CryptoJS.enc.Utf8.parse('与后台一直的密钥');

export default {
  // 加密
  EncryptData: data => {
    let srcs = CryptoJS.enc.Utf8.parse(data);
    let encrypted = CryptoJS.AES.encrypt(srcs, KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  },
  // 解密
  DecryptData: data => {
    let decrypt = CryptoJS.AES.decrypt(data, KEY, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString());
  },
};
```
3. 使用
在Vue工程或React工程中，通常是在请求工具(axios,umi-request或其他请求工具)中全局配置，以下已 `umi-request` 为例：
   1. 在请求拦截器中对请求的数据体进行加密
   ```js
   request.interceptors.request.use((url, options) => {
     if (process.env.NODE_ENV !== 'development') {
       if (options.method === 'post' && !url.includes('generatorToken')) {
         // 数据加密
         options.data = AESUtil.EncryptData(JSON.stringify(options.data));
       }
     }
     return { url, options };
   });
   ```
   2. 在响应拦截器中对返回的数据体进行解密
   ```js
   request.interceptors.response.use(async res => {
     const resData = await res.clone().json();
     const response = res.clone();
     response.data = resData;
     if (process.env.NODE_ENV !== 'development') {
       if (response.data.data) {
         // 数据解密
         response.data.data = AESUtil.DecryptData(response.data.data);
       }
     }
     return response.data;
   });
   ```