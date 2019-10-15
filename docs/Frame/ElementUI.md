[[toc]]
## 1. 标签页中嵌套表格/图形，切换tab页时表格/图形显示错乱的问题
使用`lazy`方式加载`tab-content`，在进行tab切换的时候包含按钮列的表格渲染错乱，如下：
    <div class="img-show">
    <a data-fancybox title="xx" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190829140359.png">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190829140359.png)</a>
    </div>
其实官方给的有[解决方案](https://element.eleme.cn/#/zh-CN/component/table#table-methods)，使用表格的`doLayout()`方法，即可：
> 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法

关键是触发的时机，`tab`标签页组件提供了一个`tab-click`的事件，可以在此事件中触发重置的方法，而`tab`的切换方式是元素`display:none/block`的控制，所以使用重置方法的时候，一定要在`$nextTick`的回调函数中执行，如下：
```js
changeTab(tab) {
  this.$nextTick(() => {
    // 内容组件重置
    this.$bus.$emit("tableDoLayout");
  });
}
```