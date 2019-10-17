const path = require('path');

module.exports = {
  title: 'Seven\'s Blog',
  description: '专注前端，不止于前端',
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
    // 侧边栏配置
    // sidebar: 'auto', // 自动生成侧边栏
    // sidebar: [{
    //   title: '总结',
    //   children: [
    //     ['/summary/JS-ES5', 'JS-ES5'],
    //     ['/summary/JS-ES6', 'JS-ES6'],
    //     ['/summary/vue-cli3', 'vue-cli3'],
    //     ['/summary/vue-router', 'vue-router'],
    //     ['/summary/element', 'Element-UI'],
    //     ['/summary/http', 'http'],
    //     ['/summary/VuePress', 'VuePress']
    //   ]
    // }, {
    //   title: '学习',
    //   children: [
    //     // ['/learn/RegEx', '正则表达式']
    //   ]
    // }, {
    //   title: '收集',
    //   children: [
    //     ['/gather/JavaScript', 'JavaScript'],
    //     ['/gather/tool', '工具'],
    //     ['/gather/VuePress', 'VuePress'],
    //     ['/gather/VueCli', 'VueCli']
    //   ]
    // }],
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
      text: '其它',
      link: '/Other/'
    }],
    sidebar: {
      '/JavaScript/': [{
          title: 'ES6',
          collapsable: false,
          sidebarDepth: 3,
          children: [
            ['ES6/Promise', 'Promise']
          ],
        },
        {
          title: 'JavaScript',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            ['JavaScript/JS-ES5', '日常收集'],
            ['JavaScript/ECMAScript', 'ECMAScript']
          ]
        },
        ['Reprint/Reprint', '优文转载']
      ],
      '/CSS/': [{
          title: 'CSS',
          collapsable: true,
          sidebarDepth: 3,
          children: [
            ['element', 'element']
          ]
        },
        ['Reprint/Reprint', '优文转载']
      ],
      '/HTML/': [{
          title: 'HTML',
          collapsable: true,
          sidebarDepth: 3,
          children: [
            ['element', 'element']
          ]
        },
        ['Reprint/Reprint', '优文转载']
      ],
      '/Frame/': [
        ['ElementUI', 'ElementUI'],
        ['FastMock', 'FastMock'],
        ['Vue-Cli3', 'Vue-Cli3'],
        ['Vue-Router', 'Vue-Router']
      ]
    },
    sidebarDepth: 3, // 侧边栏显示2级
    search: true, // 启用搜索
    searchMaxSuggestions: 10, // 搜索显示的条目数量
    lastUpdated: '更新时间', // string | boolean
  }
};