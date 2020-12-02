## 1. 多环境变量配置
1. 构建配置文件 `.umirc.XXXEnvName.js`
2. 在 `define` 配置中定义变量名称
3. 指定 `UMI_ENV=envName` 不同的 `envName` 能获取到不同的值
4. 在组件中直接使用变量名即可： `<div>{变量名}</div>`  
如：
```js
// .umirc.cloud.js 文件配置
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    TEST: 'Cloud'
  },
});
```
`UMI_ENV=cloud umi dev` 启动服务，拿到的 `TEST` 变量的值为 `Cloud`  
```js
// .umirc.js 文件配置
import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    TEST: 'default'
  },
});
```
`umi dev` 启动服务，拿到的 `TEST` 变量的值为 `default`
## 2. 关于mock
关闭本地mock服务，在 Umi 配置文件中，配置 `mock: false` 即可
- **注意：** 这里要注意，启用 mock 服务时，不能设置 `mock: true` ，而是直接删除 `mock` 配置，在 `mock/`目录进行mock配置；或者对 `mock: {}` 选项进行其他[配置](https://umijs.org/zh-CN/config#mock)，因为mock服务开启时，`mock` 配置必须是对象