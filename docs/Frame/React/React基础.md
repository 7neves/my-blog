## 1. React和Vue
1. 构成组件的方式不同
    - Vue使用 `.vue` 单文件组件来创建组件，包括了HTML片段，也就是使用HTML模板语法来创建组件
    - React的特点是函数式编程和`JSX`语法，所以可以通过一个函数来构建组件
2. 分离关注点的形式不同
    - Vue使用单文件(`.vue`)组件，其中包含了HTML模板、js逻辑、css样式，将标记和逻辑分离到不同的部分，实现关注点分离
    - React则认为渲染逻辑和其他UI逻辑是有内在耦合的，如UI的事件绑定，UI中展示准备好的数据，所以采用了将标记和逻辑存放在“组件”这种松散的耦合单元中，实现关注点分离。在JSX中可以实现JavaScript中的任何功能
3. 语法的不同
    - Vue提供了大量的语法糖，例如：数据双向绑定`v-model`、事件绑定`v-on`、属性绑定`v-bind`、循环`v-for`、判断`v-if`等等，这样的好处是只用记忆即可，但是不易理解。
    - React则使用了大量JS原生的语法，例如条件渲染和列表渲染以及JSX中事件的定义也更像原生事件，虽然看上去会复杂，但是代码逻辑会更直观明了。
## 2. JSX
### 1. JSX介绍
React并没有像Vue一样提供大量的语法糖，JSX是其中之一，它实际是 `React.createElement(component,props,...children)` 函数的语法糖
1. **JSX就是 React 用来描述页面展示内容的元素**，它是`JavaScript` 和 `XML` 的缩写，将二者进行了融合，可以在HTML中书写JS，也可以在JS逻辑中输出元素。其具有模板简单易用的特点，但是又具有JavaScript强大的功能。它实现了标记和逻辑的“共存”，不用人为的将二者分离到不同的文件或内容中，就能实现关注点分离。它写起来更接近于原生。
2. 使用JSX可以快速的使用HTML标签来生成虚拟DOM，例如：
    ```js
    <div className="content">
      内容
    </div>
    ```
    会被编译为：
    ```js
    React.createElement(
      'div',
      { className: 'content' },
      "内容"
    )
    ```
### 2. JSX基础
- 由于JSX会被编译为 `React.createElement` 函数调用的形式，所以 React 库必须包含在JSX代码作用域内；也就是只要使用JSX语法了，必须先引入 React 库；
- 元素应使用 `<>` 包裹；
- 如果标签中没有内容，可以使用 `/>` 来直接闭合标签（大部分的组件都可以这么做），如：
  ```js
  const imgElement = <img src={path}/>
  ```
- JSX 标签的第一部分指定了 React 元素的类型：  
  - 首字母大写，表示一个自定义组件，如：`<App />`、`<Item />`等；
  - 首字母小写，则表示普通的HTML元素，如：`<div>`、`<ul>`等；
- JSX中定义属性：
  - JSX在语法上更接近JS，而不是HTML，所以JSX中属性的名称，应使用 `camelCase`(小驼峰命名) 来定义，而不要使用 `kebab-case` 的方式，如：`className` 表示 `class`;
- JSX中的属性值：
  - 使用 **引号** 包裹时为一个字符串字面量，如下 `className` 的属性值； 
  - `{}` 中可以使用任意有效的JS[表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators)，类似Vue的属性绑定；
- 多行JSX应使用 `()` 包裹；
  ```js 
  let listArr = ['item1', 'item2'];
  const list = (
    <ul>
      {
        listArr.map((item, index) => {
          return (
            <li key={item + index} 
              className="item"
            >
            {item}
            </li>
          )
        })
      }
    </ul>
  )
  ```
- JSX也是一个表达式，可以将其赋值给一个变量，作为一个返回值等操作，例如在`if` 语句和 `for` 循环语句中使用：
  ```js {3,5}
  function demo(user) {
    if(user) {
      return <h1>Hello, {user.name}</h1>
    }
    return <h1>Hello, React</h1>
  }
  ```
- 在JSX中甚至可以用点( `.` )语法
  ```js {1,4}
  <React.Fragment>
    <Button.Blue>
    <Button.Red>
  <React.Fragment/>
  ```
:::  warning JSX使用注意
1. 对于同一元素中的同一属性，要么使用`{}`表达式，要么使用引号，不能同时使用这两种符号
2. 自定义组件必须以大写字母开头，不论是命名还是引入
3. `if` 语句和 `for` 循环语句不属于JS表达式，因此不能直接在JSX中使用
:::
## 3. 渲染机制
1. React同Vue一样使用了虚拟DOM，所谓虚拟DOM，其实是一个JS对象，React通过 `React.createElement` 将JSX中的元素编译成类DOM的树状结构，在更新发生后，会存在两个virtualDOM，先通过diff算法比较两个对象之间的差异，然后只对有差异的节点进行更新。这里有两点，一是操作一个JS对象远比操作一个真实的DOM要快的多；二是只更新有差异的节点；从而达到提高性能的目的。参考：[如何理解虚拟DOM](https://www.zhihu.com/question/29504639/answer/609290611)
2. React 元素渲染需要有一个根DOM，该节点内的所有内容都由 `React DOM` 管理
3. 需要使用 `ReactDOM.render()` 函数来进行渲染
    ```js {1,2,5}
    import React from 'react';
    import ReactDOM from 'react-dom'

    const ele = <div>Hello React</div>
    ReactDOM.render(ele, document.getElementById('root'));
    ```
::: warning 注意
1. 需要先引入 `React` 和 `ReactDOM` 
2. 可以有多个根DOM
3. 需要使用 `ReactDOM.render()` 函数（通常只使用一次）
:::
## 4. 组件基础
> 组件，从概念上讲类似于 JavaScript 函数。它接收任意的入参（即“props”），并返回用于描述页面展示内容的 React 元素。

### 1. 创建组件：函数组件 和 class组件
1. 函数组件通常用来构建UI组件
    ```js
    function Hello(props) {
      return <div>Hello, {props.name}</div>;
    }
    ```
2. class组件拥有更强大的功能，通常用来构建容器组件  
  它可以拥有局部的 `state`，使用生命周期函数，修改状态等更丰富的功能。本节主要概述React创建组件的方式，详细的 class 组件说明参考:[class组件进阶](#class组件进阶)
    ```js {2,6,12,18}
    class Hello extends Component {
      constructor(props) {
        super(props);

        // 局部状态
        this.state = {
          age: 18
        }
      }

      // 生命周期函数
      componentDidMount() {
        this.setState({
          age:20
        })
      }

      render() {
        return <div>Hello, {this.props.name}，my age is {this.state.age}</div>;
      }
    }
    ```
3. 只能有一个根元素。  
  当 `()` 中有多行元素时，需要在最外层用一个元素包裹（这点同Vue类似）；可以使用内置的组件，来避免真实DOM更多嵌套，它不会渲染出真实DOM，如 `Fragment`；这类似Vue的 `template`、`keep-alive`等内置组件
    ```js {5,8}
    class Hello extends Component {
      render() {
        return (
          {/* 只能有一个根元素 */}
          <React.Fragment>
            <div>Hello, {this.props.name}</div>
            <div>我是小明</div>
          </React.Fragment>
        )
      }
    }
    ```
::: warning 注意
定义组件时，组件名称必须以大写字母开头
:::
### 2. 使用组件：首字母大写
在JSX中使用首字母大写的方式，使用组件
  ```js {7,8}
  import Hello from './Hello';

  class List extends Component {
    render() {
      return (
        <div>
          <Hello name='Seven' />
          <Hello name='React' />
        </div>
      )
    }
  }
  ```
::: warning 注意：组件名称必须以大写字母开头
React 会将以小写字母开头的组件视为原生 DOM 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Hello />` 则代表一个组件，并且需在作用域内使用 Welcome
:::
### 3. 组件嵌套及构建可复用附件
React中的组件是可以嵌套的。在项目中，构建可复用组件库是必要且值得的，React中的组件可以拆分的更细，合理利用函数组件构建纯UI组件，然后结合class组件构建容器组件，能最大化组件的复用性，及项目的健壮性。
### 4. props
当元素为一个组件时，其属性即为 `props` ，可以通过这些 `props` 向子组件传值
1. `props` 也可以使用表达式
    ```js
    <MyComponent number={1 + 2 + 3}>
    ```
2. `props` 使用字符串字面量
    ```js
    // 下面两种都是等价的
    <MyComponent name={'seven'}>
    <MyComponent name='seven'>
    ```
3. 合理使用展开运算符 `...`
    ```js {8}
    function App1() {
      return <MyComponent firstName='Xu' lastName='Seven'/>
    }

    // 上述情况等价于
    function App2()  {
      const props = { firstName: 'Xu', lastName: 'Seven'};
      return <MyComponent {...props} />
    }
    ```
    - **注意：** 属性展开很容易将不必要的 `props` 传递给不相关的组件，例如上例组件可能并不需要 `lastName` 属性；或者将无效的HTML属性传递给DOM。使用时需要谨慎。
4. 进阶- `props` 传递函数  
  可以通过 `{}` 向子组件 `props` 一个函数指针，在子组件中触发。因为 `props` 是只读的，所以可以通过这种方式在子组件中触发父组件的方法，进而修改父组件中的状态，从而改变 `props`
    ```js {43}
    // 子组件
    class Child extends React.Component {
      constructor(props) {
        super(props);

        this.handleChange = this.change.bind(this);
      }

      change() {
        let content = '我是child';
        this.props.changeContent(content);
      }

      render() {
        return (
          <React.Fragment>
            <div>{this.props.content}</div>
            <button onClick={this.handleChange}></button>
          </React.Fragment>
        )
      }
    }

    // 父组件
    class Parent extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          content: '我是Parent'
        }
        this.handleChange = this.change.bind(this);
      }

      change(cont) {
        this.setState({
          content: cont
        })
      }

      render() {
        return (
          <Child content={this.state.content} changeContent={this.handleChange}/>
        )
      }
    }
    ```
::: warning 注意：`props` 永远都是只读的
`props` 永远都是只读的，必须像纯函数一样确保 `props` 不被修改
:::
### 5. 事件处理
与Vue提供了 `v-on` 语法糖来绑定事件不同，React元素的事件处理和DOM元素的原生事件很相似，只是语法上有稍微的不同：
  - 事件名采用小驼峰（camelCase）命名，而不是纯小写
  - 使用 JSX 语法时需要传入一个函数名作为事件要处理的函数（所以一般需要进行`bind`），而不是像Vue中的传入一个字符串；
  - 不用显式的使用 `addEventListener()` 来为元素添加监听器
  ```html {6}
  <!-- 原生的DOM事件 -->
  <button onclick="handleClick()">click</button>
  <!-- Vue中的事件处理 -->
  <button @click="handleClick">click</button>
  <!-- React中的事件处理 -->
  <button onClick={handleClick}>click</button>
  ```
1. 阻止默认事件  
原生DOM事件中可以 `return false` 来阻止事件的触发，与原生不同的是React中阻止默认事件必须显式的使用`preventDefault()` 来阻止默认事件。
2. 事件对象 `event` (通常简写为 `e`)    
  在React中 `event` 是一个合成事件，React已经根据规范定义这些合成事件，所以完全可以当做 DOM 原生事件对象来使用。
    ```html
    <!-- 原生DOM阻止连接跳转 -->
    <a href="#" onclick="return false">link to</a>
    ```
    ```js {3}
    function ActionLink() {
      function handleClick(e) {
        e.preventDefault();
      }
      return (
        <a href="#" onClick={handleClick}>link to</a>
      )
    }
    ```
3. 处理class组件中的函数指针  
  使用 class 来定义组件的时候，通常是将事件处理函数声明为 class 中的方法。
    ```js {6}
    class Button extends React.Component {
      constructor(props) {
        super(props);

        // 为了在回调中使用 this ，则必须进行绑定
        this.handleClick = this.handleClick.bind(this);
      }

      // 定义事件触发的函数
      handleClick() {
        alert('Hello,Seven');
      }

      render() {
        return (
          <button onClick={this.handleClick}>click me</button>
        )
      }
    }
    ```
::: warning 注意：必须谨慎对待JSX回调函数中的 this
在JavaScript中，class的方法默认不会绑定 `this`。如果不进行绑定，则调用这个函数的时候 `this` 为 `undefined`
:::
- class组件中处理函数 `this` 指针的四种方法:
  1. 使用 `bind()` 进行显式的绑定；**推荐**  
      - 在 class 的构造函数，也就是 `constructor()` 函数中使用 `bind` 进行 `this` 绑定，如上；
      - 在事件回调中进行绑定，这种方式还可以额外的进行传参
      ```js {9}
      class Button extends React.Component {
        // 定义事件触发的函数
        handleClick() {
          alert('Hello,Seven');
        }

        render() {
          return (
            <button onClick={this.handleClick.bind(this, id)}>click me</button>
          )
        }
      }
      ```
  2. 箭头函数的特点是 `this` 总是指向其定义时的作用域，所以可以使用箭头函数来绑定 `this`
      - 在声明函数时，直接使用箭头函数；**推荐**
        ```js {3,4,5}
        class Button extends React.Component {
          // 定义事件触发的函数
          handleClick = () => {
            alert('Hello,Seven');
          }

          render() {
            return (
              <button onClick={this.handleClick}>click me</button>
            )
          }
        }
        ```
      - 在事件的回调中使用箭头函数    
        通过该方式作为prop传入子组件时，这些组件可能会进行额外的重新渲染。可能会导致性能问题，所以不推荐，但是该方式也可以传递参数
        ```js {9}
        class Button extends React.Component {
          // 定义事件触发的回调函数
          handleClick() {
            alert('Hello,Seven');
          }

          render() {
            return (
              <button onClick={(e) => {this.handleClick(e)}}>click me</button>
            )
          }
        }
        ```
4. 向事件处理函数中传递参数  
    有两种方式可以在事件触发的函数中传递参数：
    1. 在事件的回调函数中进行显式调用 `bind()` 方法可以额外的传递参数
    2. 在事件的回调函数中使用箭头函数
    ```js
    <button onClick={(e) => {this.deleteRow(id,e)}}></button>
    <button onClick={this.deleteRow.bind(this,id)}></button>
    ```
    这两种情况，React的事件对象 `e` 会被当做第二个参数传递。不同的是，箭头函数的方式事件对象必须显式传递，而 `bind()` 则可以进行隐式传递。
## 5. State
不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是 class 组件。  
所以 **`State` 是组件的局部状态**，它与 `props` 类似，但是 `state` 是私有的，并且完全受控于当前组件，其他组件无权访问。
### 1. class组件的构造函数 是唯一可以初始化 `state` 的地方
  ```js {2,6}
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);

      // 状态初始化
      this.state = {
        name: 'Seven'
      }
    }
  }
  ```
### 2. `setState()` 是唯一修改 `state` 的方法
```js {4}
// 错误 不能直接修改 `state`
this.state.name = 'SSeven';
// 正确
this.setState({
  name: 'SSeven'
})
```
- **注意**：`setState()` 进行的是浅合并
### 3. `setState()` 是异步的
出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。因为 `this.props` 和 `this.state` 可能会异步更新，所以不要依赖他们的值来更新下一个状态。
### 4. 向 `setState()` 传递一个函数解决异步问题
要解决 `setState()` 异步的问题，可以让 `setState()` 接收一个函数而不是一个对象。
```js
this.setState((state, props) => {
  counter: state.counter + props.increment
})
```
### 5. 单向数据流
> 如果你把一个以组件构成的树想象成一个 props 的数据瀑布的话，那么每一个组件的 state 就像是在任意一点上给瀑布增加额外的水源，但是它只能向下流动。

所以任何的 `state` 总是所属于特定的组件，而且从该 `state` 派生的任何数据或 UI 只能影响树中“低于”它们的组件，无法影响处于“上游”的组件（也就是其父组件）。    
## 6. 条件渲染
### 1. 与Vue的差异
Vue中的条件渲染是由 `v-if` 指令来完成的，这种内置的语法糖，使用起来会很方便。  
在React中，条件渲染更像是原生的条件判断。因为[JSX也是一个表达式](https://zh-hans.reactjs.org/docs/introducing-jsx.html#jsx-is-an-expression-too)，这一点就会非常灵活，也就是说可以将一个UI组件赋值给一个变量，可以当做一个参数，也可以作为函数的返回值。这就可以使用JS中的 `if` 语句或者 三目运算 来创建不通的组件表现当前的状态，然后让React根据它们来更新UI。
> 在 React 中，你可以创建不同的组件来封装各种你需要的行为。然后，依据应用的不同状态，你可以只渲染对应状态下的部分内容。
### 2. 使用判断语句进行条件渲染
```js {8,9,10,11}
const Hello = {
  Seven: () => <h1>Hello, Seven</h1>,
  World: () => <h1>Hello, React</h1>
}

function HelloComponent(props) {
  let name = props.name;
  if (name === 'seven') {
    return <Hello.Seven />
  }
  return <Hello.World />
}

ReactDOM.render(<HelloComponent name='seven'/>, document.getElementById('root'));
```
要灵活运用 **JSX也是一个表达式** 这一特点，可以在三目运算和短路操作等JS中常用的判断方法，来实现React组件的动态渲染。例如，用三目运算对上例稍微修改：
```js {3}
function HelloComponent(props) {
  let name = props.name;
  return name === 'seven' ? <h1>Hello, Seven</h1> : <h1>Hello, React</h1>;
}
```
## 7. 列表渲染和key
### 1. 与Vue的差异
Vue中的列表渲染同样是由一个语法糖 `v-for` 指令来完成的。  
React则使用了更为原生的语法，在JS中一般使用 `map()` 函数来完成数组的操作，并返回一个新的数组。在React中，把数组转化为元素列表的过程跟这个很相似。React中的列表渲染也是由 `map()` 函数来完成的。
### 2. 渲染列表组件
```js {3}
function List(props) {
  const numbers = props.numbers;
  const ListItem = numbers.map((number, index) => <li key={number.toString()}>{number}</li>)
  return (
    <ul>{ListItem}</ul>
  )
}

export default List;
```
::: warning 列表渲染注意
React列表的渲染也需要像Vue一样，**在同级元素中使用唯一的 `key` 来当做元素的标识**，因为两者都使用的虚拟DOM，使用 `key` 来进行标记，可以快速的进行diff操作，进行视图更新
:::
### 3. key的就进原则和唯一原则
```js {16}
function Item(props) {
  return (
    // 错误！不需要在这里这里指定 key：
    <li key={props.number.toString()}>{props.number}</li>
  )
}

const numbers = [1, 2, 3, 4, 5];
// React 列表渲染 demo
function List(props) {
  return (
    <ul>
      {
        numbers.map((number) =>
          {/* 正确，应该在这里定义key */ }
          <Item key={number.toString()}
            number={number} />
        )
      }
    </ul>
  )
}
```
::: warning key 使用原则
1. 元素的 key 只有放在就近的数组上下文中才有意义。也就是离循环最近的位置
2. key 只是在兄弟节点之间必须唯一
3. key 不要当做 prop 在组件间传递
:::
## 8. 受控组件（表单）
### 1. 什么是受控组件
在Vue中表单的处理都是通过 `v-model` 指令来完成的，它是一种“数据双向绑定”的模式，其实是将 `v-bind` 和表单的 `change` 事件进行了封装：当表单发生 `change` 事件的时候，调用函数去改变状态，当状态改变的时候，表单的值也会改变。如下例：
```js {5,9,10,11}
<input type="text" :value="value" @change="handleChange">
...
data() {
  return {
    value: "test"
  };
},
methods: {
  handleChange(e) {
    this.value = e.target.value;
  }
}
```
其实React的受控组件也是如此，只是因语法的不同而略有差异，它们都是将HTML原有的表单元素，如 `<input>`、`<textarea>`、`<select>`等，这些元素通常自己维护 `value` 值，并根据用户输入进行更新。在Vue中，这些可变状态会保存在 `data` 中，然后通过`change`事件更新。而React中，这些可变的状态通常保存在组件的 `state` 中，并且只能通过使用 `setState()` 来更新。  
**受控组件：将表单自己维护的可变状态由React来控制的表单元素。**  
构建受控组件是很有必要的，这样React的 `state` 可以成为唯一的数据源，每个 `state` 的突变都有一个相关的处理函数，解耦视图和数据的关系。
### 2. React构建受控组件
分为两步：
1. 将表单的 `value` 交由 `state` 控制
2. 编写 change 事件触发函数，在函数中使用 `setState()` 改变状态
    ```js {6,7,8,14,15,16,17,18,23,24}
    class Input extends React.Component {
      constructor(props) {
        super(props);

        // 第一步，将表单的 value 交由 state 控制
        this.state = {
          value: 'test'
        }

        this.handleChange = this.handleChange.bind(this);
      }

      // 第二步，编写相关函数，通过changes事件处理 state 的突变
      handleChange(e) {
        this.setState({
          value: e.target.value
        })
      }

      render() {
        return (
          <input type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        )
      }
    }
    ```
### 3. 表单的其他受控组件
1. `<textarea>`  
    HTML中的 `<textarea>` 是双标签，内容实在其之间的:
    ```html
    <textarea>Hello World</textarea>
    ```
    在React中，其内容将由 `value` 属性来代替，这样使用 `<textarea>` 和 `<input>` 非常相似（此处忽略了函数的书写，参考input）：
    ```js
    <textarea value={this.state.textareaValue} />
    ```
2. `<select>`  
    HTML中的 `<select>` 标签用来创建下拉选项标签：
    ```html
    <select>
      <option value="grapefruit">葡萄柚</option>
      <option value="lime">酸橙</option>
      <option selected value="coconut">椰子</option>
      <option value="mango">芒果</option>
    </select>
    ```
    使用HTML的 `selected` 来设置选中项。在React中，是在根 `<select>` 标签上使用 `value` 属性，来设置选中项，这在受控组件中更为便捷，只需要跟标签中更新它即可（此处忽略了函数的书写，参考input）：
    ```js
    <select value={this.state.selectedValue}
      onChange={this.handleSelectChange}>
      {
        this.state.selectList.map((item) => {
          return <option key={item.id} value={item.id}>{item.name}</option>
        })
      }
    </select>
    ```
    ::: warning 注意
    React中的 `select` 同样支持多选，需要如下设置：
    ```js
    <select multiple={true} value={['B', 'C']}>
    ```
    :::
3. 使用技巧  
    在定义受控组件时，每个表单元素都要定义 `state` 突变的函数，当处理多个类似突变的时候，可以使用ES6的一些技巧，将相同逻辑的函数写在一个函数中，因为它们最终都是 `setState()` 来改变 `state`，只是改变了不同的 `state`，所以可以为每个表单元素添加 `name` 属性，并让处理函数根据 `e.target.name` 的值选择要改变的 `state`。
    ```js {3,5}
    handleInputChange(e) {
      const target = e.target;
      const name = target.name;
      this.setState({
        [name]: e.target.value
      })
    }
    ```
## 9. 状态提升
[查看状态提升Demo](https://codesandbox.io/s/reactstatepromote-e6dzy?fontsize=14&hidenavigation=1&theme=dark)  
在React中，没有计算属性，也没有数据的双向绑定，因为在React应用中，**任何可变数据应当只有一个相对应的唯一“数据源”**。React应用开发时，通常的做法是：  
  1. 第一步，首先将`state`添加到需要渲染数据的组件中，构建出组件；
  2. 第二步，然后，如果其他组件也需要这个`state`，那么就将它提升至这些组件最近的共同父组件中，如果有 `setState()` 逻辑也提升至该父组件中。使该`state`成为唯一的“数据源”，并形成一种自上而下的数据流；
  3. 第三步，修改构建出的组件中的 `state` 为 `props`，并修改触发 `setState()` 函数的逻辑改由 `props` 来控制。  
  
虽然这种提升 state 的方式相比较Vue中的双向绑定看起来较为复杂，但带来的好处是，更容易的排查问题。由于 **“存在”于组件中的任何 state，仅有组件自己能修改它**。  
::: warning 注意
如果某些数据可以由 props 或 state 推导得出，那么它就不应该存在于 state 中私有化。
:::
## 10. React中的slot-组合
[查看组合Demo](https://codesandbox.io/s/gracious-greider-u3nwe?fontsize=14&hidenavigation=1&theme=dark)  
虽然React官方文档说了，React 中没有“槽”的概念，但是借助Vue中的“插槽”概念来理解React 中的“组合”，确实更易理解一点😃。React中通过 `props` 来实现组合，`props` 的强大之处是可以传递任何东西，所以插槽中也可以插入组件。
### 1. 包含关系（默认插槽）
React使用 `props.children` 来定义默认插槽，使用时直接插入内容即可，同样可以在 `{}` 中使用判断来定义默认内容：
```js {6,15}
function SlotComponent(props) {
  return (
    <div>
      <h1>默认插槽</h1>
      {/* 定义默认插槽，并设定默认内容 */}
      <div>{props.children || "默认内容"}</div>
    </div>
  )
}

// 其他组件中使用
function OtherComponent(props) {
  return (
    <SlotComponent>
      插入的内容，也可以插入其他组件
    <SlotComponent/>
  )
}
```
### 2. 具名插槽
通过 `props.slotName` 的方式定义具名插槽
```js
function SlotComponent(props) {
  return (
    <section>
      {/* props. 的方式定义”插槽“名 */}
      <h1>{props.title}</h1>
      {/* props.children 表示的为默认”插槽“，同样可以设置默认内容 */}
      <div className="content">{props.children || "默认内容"}</div>
      <footer>{props.footer}</footer>
    </section>
  );
}

function OtherComponent(props) {
  return (
      // 往”插槽“中插入内容，包括组件
      <SlotComponent title="标题内容" footer="底部内容">
        {<Content />}
      </SlotComponent>
    );
}
```
## 11. 组件生命周期
### 1. 定义 class 组件<h4 id="class组件进阶"></h4>

- 定义 class 组件，需要继承 `React.Component` ；(关于类 [class](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)和继承(创建子类) [extends](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends))
- 在继承的子类中，必须定义一个 [`render()`](https://zh-hans.reactjs.org/docs/react-component.html#render) 函数，这是 class 组件唯一必须实现的方法。
```js {1,2}
class Welcome extends React.Component {
  render() {
    return <div> Hello, React</div>
  }
}
```
只有在 class 组件中才能使用生命周期函数。
### 2. 生命周期阶段
<img-show :img-info="{src:'https://i.loli.net/2020/03/01/5nwEBkXuTy1deNq.png',description:'React 组件生命周期图'}"/>

[React 组件完整的生命周期](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)。  
加粗标记的为常用的方法。
1. **挂载阶段**  
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下:
    - [**`constructor()`**](https://zh-hans.reactjs.org/docs/react-component.html#constructor)，[构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)
    - `static getDervivedStateFromProps()`
    - [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render)，渲染函数
    - [**`componentDidMount()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidmount)，可以在此进行请求的处理。
2. **更新阶段**  
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：
    - `static getDerivedStateFromProps()`
    - [**`shouldComponentUpdate()`**](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate)，此方法仅作为性能优化的方式而存在
    - [**`render()`**](https://zh-hans.reactjs.org/docs/react-component.html#render)，渲染函数
    - `getSnapshotBeforeUpdate()`
    - [**`componentDidUpdate()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)
3. **卸载阶段**  
当组件从 DOM 中移除时会调用如下方法：
    - [**`componentWillUnMount()`**](https://zh-hans.reactjs.org/docs/react-component.html#componentwillunmount)
4. **错误处理**  
当渲染过程，生命周期，或子组件的构造函数中抛出错误时，会调用如下方法:
    - `static getDerivedStateFromError()`
    - `componentDidCatch()`
## 12. 样式相关
### 1. 为组件添加 class
通过传递一个字符串作为 `className` 的属性即可：
```js {2,11}
render() {
  return <div className='box'></div>
}

// 也可以传入一个表达式，如下这种类名依赖组件的 state 或 props 的情况也很常见
render() {
  let className = "menu";
  if (this.props.isActive) {
    className += " menu-active";
  }
  return <div className={className}>menu</div>
}
```
### 2. 行内样式
**注意**：React 并不推荐使用行内样式，因为从性能角度来讲， CSS 的 class 通常会比行内样式更好。  
`style` 在 React 应用中都用于**在渲染过程中添加动态计算的样式**。  
`style` 定义方式有两种：
1. 接受一个采用小驼峰(camelCase)命名属性的JS对象，而不是 CSS 字符串。这与 DOM 中 `style` 的 JS 属性是一致的(例如：`node.style.backgroundImage`)，同时也会更高效，且能预防跨站脚本（XSS）的安全漏洞。如:
    ```js {10}
    const divStyle = {
      color: 'blue',
      backgroundImage: `url(${imgUrl})`,
      // 注意：样式不会自动补齐前缀。如果需要做兼容性hack
      WebkitTransition: 'all', // 这里的 W 要大写
      msTransition: 'all' // 只有 'ms' 是需要小写的 
    };

    function Welcome() {
      return <div style={divStyle}>Hello React</div>
    }
    ```
2. 直接在表达式中用对象的方式定义行内样式
```js {2,6}
// 可以省略 px 单位
<div style={{ color: 'blue', height: 10 }}>
  Hello React
</div>
// 如果是其他单位则不能省略
<div style={{ height: "10%" }}>
  Hello React
</div>
```