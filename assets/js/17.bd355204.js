(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{375:function(t,s,a){"use strict";a.r(s);var e=a(42),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h2",{attrs:{id:"_1-js将变量-字符串用作属性名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-js将变量-字符串用作属性名"}},[t._v("#")]),t._v(" 1. js将变量/字符串用作属性名")]),t._v(" "),a("p",[t._v("js中如果需要将一个变量，或一个字符串用作对象的key值，需要加上"),a("code",[t._v("[]")]),t._v("，将变量名或字符串包裹起来，而不是用"),a("code",[t._v(".")])]),t._v(" "),a("h2",{attrs:{id:"_2-js创建一个空对象的方式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-js创建一个空对象的方式"}},[t._v("#")]),t._v(" 2. js创建一个空对象的方式")]),t._v(" "),a("ol",[a("li",[a("code",[t._v("let obj = {};")]),t._v(" 或 "),a("code",[t._v("let obj = new Object();")]),t._v(" "),a("ul",[a("li",[t._v("这两种方式是一样的，都"),a("strong",[t._v("会继承Object对象上的属性和方法")]),t._v(":\n"),a("img-show",{attrs:{"img-info":{src:"https://i.loli.net/2019/11/05/JyM58QjopPEXSaH.png",description:"let obj = {};"}}}),t._v(" "),a("img-show",{attrs:{"img-info":{src:"https://i.loli.net/2019/11/05/f9l8tqiZSjhu3Uw.png",description:"let obj = new Object();"}}})],1)])]),t._v(" "),a("li",[a("code",[t._v("let obj = Object.create(null);")]),t._v(" "),a("ul",[a("li",[t._v("这种方式会创建一个纯净的对象，"),a("strong",[t._v("不携带任何Object自带的方法和属性")]),t._v(" "),a("img-show",{attrs:{"img-info":{src:"https://i.loli.net/2019/11/05/2HB8szWbUVPNjtx.png",description:"let obj = Object.create(null)"}}})],1)])])]),t._v(" "),a("h2",{attrs:{id:"_3-如何判断对象是否为空"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-如何判断对象是否为空"}},[t._v("#")]),t._v(" 3. 如何判断对象是否为空")]),t._v(" "),a("p",[t._v("判断一个对象是否为空对象，常用的三种方法：")]),t._v(" "),a("ol",[a("li",[t._v("使用 "),a("code",[t._v("JSON")]),t._v(" 对象的 "),a("code",[t._v("stringify()")]),t._v(" 方法：")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("JSON")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("stringify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"{}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",{attrs:{start:"2"}},[a("li",[t._v("使用 "),a("code",[t._v("for...in...")]),t._v(" 遍历对象")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" key "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("ol",{attrs:{start:"3"}},[a("li",[t._v("使用ES6自带的 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("Object.keys()")]),a("OutboundLink")],1),t._v(" 方法"),a("br"),t._v("\n该方法会返回一个由一个给定对象的自身可枚举属性组成的数组。")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" obj "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nObject"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("keys")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// []")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 所以判断该方法返回的长度，可以获知对象是否为空对象")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Object"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("keys")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("obj"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("length "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h2",{attrs:{id:"_5-mouseout和mouseleave的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-mouseout和mouseleave的区别"}},[t._v("#")]),t._v(" 5. "),a("code",[t._v("mouseout")]),t._v("和"),a("code",[t._v("mouseleave")]),t._v("的区别")]),t._v(" "),a("p",[a("a",{attrs:{href:"http://www.w3school.com.cn/tiy/t.asp?f=jquery_event_mouseleave_mouseout",target:"_blank",rel:"noopener noreferrer"}},[t._v("demo"),a("OutboundLink")],1)]),t._v(" "),a("ul",[a("li",[a("code",[t._v("mouseout")]),t._v("：不论鼠标离开所选元素还是任何子元素，都会触发")]),t._v(" "),a("li",[a("code",[t._v("mouseleave")]),t._v("：只有鼠标离开所选元素的时候，才会触发")])]),t._v(" "),a("h2",{attrs:{id:"_6-彻底理解跨域"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-彻底理解跨域"}},[t._v("#")]),t._v(" 6. 彻底理解跨域")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000015597029",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://segmentfault.com/a/1190000015597029"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"_7-深入理解-promise-promise的三种状态与链式调用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-深入理解-promise-promise的三种状态与链式调用"}},[t._v("#")]),t._v(" 7. 深入理解 promise：promise的三种状态与链式调用")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://www.jianshu.com/p/dc61ea153874",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.jianshu.com/p/dc61ea153874"),a("OutboundLink")],1)])])}),[],!1,null,null,null);s.default=n.exports}}]);