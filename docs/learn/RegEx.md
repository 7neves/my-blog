
## 1. 前言
原文：[《2W+Star快速学习正则表达式的文章》](https://github.com/ziishaned/learn-regex/blob/master/translations/README-cn.md)  
参考：[正则表达式-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)  
正则在线工具：[https://regex101.com](https://regex101.com)
## 2. 什么是正则表达式？
来自wiki的定义：
> 正则表达式（英语：Regular Expression，常简写为regex、regexp或RE）是一组由字母和符号组成的特殊文本, 通常被用来检索、替换那些符合某个模式的文本。

通常我们用来从一个基础字符串中根据一定的**匹配模式**替换文本中的字符串、验证表单、提取字符串等等，这里的匹配模式就是正则表达式的内容。
## 3. 创建正则表达式
- 字面量形式。正则表达式字面量其由包含在**斜杠`/`之间**的模式组成，如：
  ```JavaScript
  let regex = /abc/;
  ```
- 构造函数形式。调用内置对象`RegExp`的构造函数来创建，如：
  ```JavaScript
  let regex = new RegExp('abc');
  ```
- 二者的区别：
  - 字面量的形式为正则表达式提供了脚本加载后的编译，所以在字面量的方式定义的正则表达式模式保持不变时，能带来更好的性能。
  - 使用构造函数的方式用于在定义的正则表达式模式将会改变或者不知道模式的情况。
## 4. 匹配规则
### 1. 基本（精确）匹配
正则表达式由一些字母和数字组合而成，表示在字符串中执行查找时的格式。例如，想要在如下字符串中查找`the`，直接定义`/the/`即可进行精确的查找，**正则是大小写敏感的**，所以只会匹配`the`而不会匹配`The`:
<div class="img-show">
<a data-fancybox title="" href="https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190902112603.png">![](https://raw.githubusercontent.com/7neves/CloudImg/master/images/20190902112603.png)</a>
<p>基本匹配</p>
</div>

### 2. 特殊字符-元字符
> 元字符就是指那些在正则表达式中具有特殊意义的专用字符，可以用来规定其前导字符（即位于元字符前面的字符）在目标对象中的出现模式。

元字符|描述|举例
:-:|:-:|:-
.|匹配除换行符之外的任何**单个字符**|`/.n/g` 表示匹配任意一个字符后跟着的是`n`的字符。所以会匹配 "nay, an apple is on the tree" 中的an和on，但是不会匹配nay，[在线示例](https://regex101.com/r/xc9GkU/242)
{n}|n为正整数，匹配n个大括号前的字符| `/a{2}/g` 不会匹配“candy”中的'a',但是会匹配“caandy”中所有的 a，以及“caaandy”中的前两个'a'，[在线示例](https://regex101.com/r/xc9GkU/249)
{n,}|n为正整数，匹配至少n个大括号之前的字符|`/a{2,}/g` 会匹配“caaandy”中的所有'a'，[在线示例](https://regex101.com/r/xc9GkU/250)
{n,m}|匹配num个大括号之前的字符 (n <= num <= m).
* |重复匹配，匹配紧挨着*号之前的字符/字符集0次或多次。在全局匹配（标志为`g`）的情况下，相当于匹配所有的该字符|`/0*/g` 会匹配 "ab0123000c" 中的0，[在线示例](https://regex101.com/r/xc9GkU/245)
+|重复匹配，匹配>=1个重复的+号前的字符.
?|标记?之前的字符为可选.
\| |或运算符,匹配符号前或后的字符.
\ |转义字符,用于匹配一些保留的字符 [ ] ( ) { } . * + ? ^ $ \ |
^|从开始行开始匹配.
$|从末端开始匹配.
(xyz)|字符集, 匹配与 xyz 完全相等的字符串.
[ ]|字符集，匹配方括号内的任意字符。**字符集中的内容与顺序无关**。可以使用破折号`-`来指定一个字符范围，可以是多个范围相连|`/[abcd123]/g`和`/[a-d1-3]/g`是一样的，都匹配"brisket43"中的b和3，[在线示例](https://regex101.com/r/xc9GkU/243)
[^ ]|反向字符集，匹配任何没有包含在方括号中的字符。同样可以使用字符集的范围指定方式|`/[^a-d1-3]/g`可以匹配"brisket43"中除了b和3之外的其他所有字符，[在线示例](https://regex101.com/r/xc9GkU/244)