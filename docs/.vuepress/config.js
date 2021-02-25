const path = require('path');

module.exports = {
  title: 'Seven\'s Blog',
  description: '积跬步以至千里，积小流以成江海',
  plugins: {
    '@vuepress/plugin-medium-zoom': { // 注意：此处不是@vuepress/plugin-medium-zoom
      selector: 'img.zoom-img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }
  },
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico',
    }]
  ],
  base: '/', // 部署站点的基础路径
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // 主题配置
  themeConfig: {
    // 导航栏配置
    nav: [{
      text: 'web前端',
      link: '/web/'
    }, {
      text: '其他',
      link: '/utils/'
    }
    ],
    // 侧边栏配置
    sidebar: {
      '/web/': [
        {
          title: 'JavaScript',
          collapsable: true,
          sidebarDepth: 5,
          children: [
            ['JavaScript/深入理解JavaScript', '深入理解JavaScript'],
            ['JavaScript/常用工具函数', '常用工具函数'],
            ['JavaScript/日常', '日常记录'],
            ['JavaScript/防抖和截流', '防抖和节流']
          ]
        },
        {
          title: 'Vue',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['Vue/作用域插槽', '作用域插槽'],
            ['Vue/Vue-Router', 'Vue-Router'],
            ['Vue/VuePress', 'VuePress'],
            ['Vue/vue-cli3', 'vue-cli3相关'],
          ],
        },
        {
          title: 'React',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['React/React基础', 'React基础'],
            ['React/如何开发React应用', '如何开发React应用'],
            ['React/Redux基础', 'Redux基础'],
            ['React/Redux进阶', 'Redux进阶'],
            ['React/从零开始实现一个Redux', '从零开始实现一个Redux']
          ],
        },
        {
          title: 'react-router',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['ReactRouter/拦截器配置', '权限控制']
          ]
        },
        {
          title: 'CSS',
          collapsable: true,
          sidebarDepth: 4,
          children: [],
        },
        {
          title: 'UmiJS',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['UmiJS/plugins', '插件相关'],
            ['UmiJS/config', '配置相关'],
          ],
        },
        {
          title: 'Utils',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['Tools/AES', 'AES加密工具']
          ],
        },
        ['Mobile', 'Mobile'],
        ['ElementUI', 'ElementUI'],
        ['FastMock', 'fastmock'],
        {
          title: '面试题',
          collapsable: true,
          sidebarDepth: 4,
          children: [
            ['面试题/Vue', 'Vue相关']
          ],
        },
      ],
      '/utils/': [{
        title: '工具类',
        collapsable: true,
        sidebarDepth: 4,
        children: [
          ['图床', '图床相关']
        ]
      }]
    },
    sidebarDepth: 4, // 侧边栏显示2级
    search: true, // 启用搜索
    searchMaxSuggestions: 10, // 搜索显示的条目数量
    lastUpdated: '更新时间', // string | boolean
    smoothScroll: true
  }
};