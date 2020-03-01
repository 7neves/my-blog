const path = require('path');

module.exports = {
  title: 'Seven\'s Blog',
  description: '沉淀，沉淀，再沉淀',
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
      href: '/logo.jpg',
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
      text: 'JavaScript',
      link: '/JavaScript/',
    }, {
      text: 'CSS',
      link: '/CSS/'
    }, {
      text: 'HTML',
      link: '/HTML/'
    }, {
      text: '框架/工具',
      link: '/Frame/'
    }, {
      text: '面试题',
      link: '/Interview/'
    }
    ],
    // 侧边栏配置
    sidebar: {
      '/JavaScript/': [
        {
          title: 'JavaScript',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            ['JavaScript/JS-ES5', '日常收集'],
            ['JavaScript/深入理解JavaScript', '深入理解JavaScript'],
            ['JavaScript/防抖和截流', '防抖和截流']
          ]
        },
        ['Reprint/Reprint', '优文转载']
      ],
      '/CSS/': [{
        title: 'CSS',
        collapsable: true,
        sidebarDepth: 3
      },
      ['Reprint/Reprint', '优文转载']
      ],
      '/HTML/': [{
        title: 'HTML',
        collapsable: true,
        sidebarDepth: 3
      },
      ['Reprint/Reprint', '优文转载']
      ],
      '/Frame/': [
        {
          title: 'Vue',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            ['Vue/作用域插槽', '作用域插槽'],
          ],
        },
        {
          title: 'React',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            ['React/React基础', 'React基础'],
            ['React/如何开发React应用', '如何开发React应用'],
          ],
        },
        {
          title: 'Vue-Cli3',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            ['Vue-Cli3/配置', '配置相关'],
          ],
        },
        ['Vue-Router', 'Vue-Router'],
        ['VuePress', 'VuePress'],
        ['Reprint', '优文转载'],
        ['ElementUI', 'ElementUI'],
        ['FastMock', 'fastmock'],
        ['Reprint', '优文转载']
      ],
      '/Interview/': [
        ['Vue', 'Vue']
      ]
    },
    sidebarDepth: 3, // 侧边栏显示2级
    search: true, // 启用搜索
    searchMaxSuggestions: 10, // 搜索显示的条目数量
    lastUpdated: '更新时间', // string | boolean
  }
};