module.exports = {
  title: 'Seven\'s Blog',
  description: '专注前端，不止于前端',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', {
      rel: 'icon',
      href: '/logo.jpg'
    }], // 增加一个自定义的 favicon(网页标签的图标)
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
      // collapsable: false,
      children: [
        ['/web/JS-ES5', 'JS-ES5总结'],
        ['/web/JS-ES6', 'JS-ES6总结']
      ]
    }, ],
    sidebarDepth: 2, // 侧边栏显示2级
    search: true, // 启用搜索
    searchMaxSuggestions: 10, // 搜索显示的条目数量
    lastUpdated: '更新时间', // string | boolean
  }
};