const path = require('path');

module.exports = {
  title: 'Seven\'s Blog',
  description: '专注前端，不止于前端',
  palette: path.resolve(__dirname, 'palette.styl'), // 设置主题样式
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {
      rel: 'icon',
      href: '/logo.jpg',
    }], // 增加一个自定义的 favicon(网页标签的图标)
    ['script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js'
    }],
    ['script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.js'
    }],
    ['link', {
      rel: 'stylesheet',
      type: 'text/css',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css'
    }]
  ],
  base: '/', // 部署站点的基础路径
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // 主题配置
  themeConfig: {
    // 侧边栏配置
    // sidebar: 'auto', // 自动生成侧边栏
    sidebar: [{
      title: '总结',
      children: [
        ['/summary/JS-ES5', 'JS-ES5'],
        ['/summary/JS-ES6', 'JS-ES6'],
        ['/summary/vue-cli3', 'vue-cli3'],
        ['/summary/vue-router', 'vue-router'],
        ['/summary/element', 'Element-UI'],
        ['/summary/http', 'http'],
        ['/summary/VuePress', 'VuePress']
      ]
    }, {
      title: '学习',
      children: [
        // ['/learn/RegEx', '正则表达式']
      ]
    }, {
      title: '收集',
      children: [
        ['/gather/JavaScript', 'JavaScript'],
        ['/gather/tool', '工具'],
        ['/gather/VuePress', 'VuePress'],
        ['/gather/VueCli', 'VueCli']
      ]
    }],
    sidebarDepth: 2, // 侧边栏显示2级
    search: true, // 启用搜索
    searchMaxSuggestions: 10, // 搜索显示的条目数量
    lastUpdated: '更新时间', // string | boolean
  }
};