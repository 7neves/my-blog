同Vue应用程序一样，当Vue应用程序复杂起来的时候，需要使用vuex来进行全局状态管理。而React应用也是如此，Redux是React应用程序中进行状态管理的工具之一。使用他们都是非必要的，当应用足够简单的时候一定不要用，反而会提升项目的维护成本。vuex和redux基本都会在以下场景中会用到：
  - 需要共享某个组件的状态
  - 某个状态需要在任何地方都可以拿到
  - 一个组件需要改变全局的状态
  - 一个组件需要改变另一个组件的状态
## 1. Redux 工作流程
<img-show :img-info="{src:'https://i.loli.net/2020/03/02/9KhtiAxJF2nrY3Z.png',description:'组件层级划分'}"/>

首先，用户发出 Action。
```js
store.dispatch(action);
```
然后，Store 自动调用 Reducer ，并传入两个参数：当前 State 和收到的 Action。Reducer 返回新的 State。
```js
let nextState = todoApp(previousState, action);
```
State 一旦有变化， Store 就会调用监听函数
```js
store.subscribe(listener);
```
`listener` 可以通过 `store.getState()` 得到当前状态。如果使用的是 React，可以出发重新渲染 view。
```js
function listener() {
  let newState = store.getState();
  component.setState();
}
```

## 2. Redux 三大原则
### 1. 单一数据源
**整个应用的 state 被存储在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中。**   
这一原则的优势就是：
- 可以让来自服务端的 state 无需编写更多代码就可以被序列化并注入到视图中。
- 可以让调试更容易。
- 可以把应用的 state 保存在本地，从而加快开发速度。  

例如：
```js
console.log(store.getState());
/* 假设store设定的如下默认值，就能输出：
{
  inputVal: '',
  list: [
    'TODO 1',
    'TODO 2',
    'TODO 3',
  ]
}
*/
```
### 2. state 是只读的
**唯一改变 state 的方法就是触发 action ，而 action 是一个用来描述发生了什么的普通对象**。  
这样就可以确保视图和网络请求等操作都不能直接修改 state，它们只能用来表达想要修改的意图。因为所有的修改都会被集中化处理，并且严格按照一个接一个的顺序执行，因此不用担心 [race condition](https://zh.wikipedia.org/wiki/%E7%AB%B6%E7%88%AD%E5%8D%B1%E5%AE%B3) （也就是并发冲突，导致结果不正确）发生。
### 3. 使用纯函数来执行修改
**reducer 是为了描述 action 如何改变 state tree 的唯一方式。**  
Reducer 只是一些 [**纯函数**]()，它接收旧的 state 和 action，并返回新的 state。纯函数保证了在它内部不会对传入的 state 和 action 做任何修改，只是单纯的描述 action ，对旧的 state 进行计算之后返回新的。  
- reducer 可以有多个，当随着应用不断变大的时候，可以将 reducer 拆分成多个小的 reducer ，分别独立操作应用的不同模块。而且因为 reducer 只是纯函数，所以它们的调用顺序是可控的。
  ```js {1,10,21}
  function reducer1(state, action) {
    switch (action.type) {
      case 'type1':
        return newState;
      default :
        return state
    }
  }

  function reducer2(state, action) {
    switch (action.type) {
      case 'type1':
        return newState;
      default :
        return state
    }
  }

  import {combineReducers, createStore} from 'redux';
  // 将 reducer 进行合并
  let reducer = combineReducers(reducer1, reducer2);
  let store = createStore(Reducer);
  ```
## 3. 基本概念
### 1. [`Action`](https://www.redux.org.cn/docs/basics/Actions.html)
1. 概念  
  **Action 就是消息通知，主要用来描述消息的内容。**    
  `State` 的变化会导致组件的重新渲染，也就是 `View` 的变化。但是用户接触不到 `State`，只能接触到 `View`。所以，`State` 的变化必须是由 `View` 导致的，也就是必须在组件中触发的。`Action` 就是组件发出的通知，表示 `State` 应该要发生变化了。     
  `Action` 是一个对象，**其中 `type` 属性是必须的**，表示要执行的动作。同时可以设置其他属性，类似vuex中的载荷。如：
    ```js {2}
    // 如下 Action 的名称是 `ADD_ITEM`, 携带的载荷信息是 `some info`;
    const action = {
      type: 'ADD_ITEM',
      payload: 'some info'
    }
    ```
    - **注意**：`Action` 是唯一能改变 store 中 `State` 的载荷，它也是 store 数据的唯一来源。
2. Action 创建函数（又叫Action Creator）   
Action 创建函数就是生成 Action 的方法。“action” 和 “action 创建函数”是不同的概念。“action 创建函数”的意义更倾向于逻辑的封装，当然也可以生成 action。
```js
function changeInput(inputVal) {
  return {
    type: CHANGE_INPUT,
    inputVal
  }
}
```
::: warning 注意
Action 只是一个描述消息内容的对象，它并没有描述应用如何更新 state，也不会自己主动发出。
:::
### 2. [`Reducer`](https://www.redux.org.cn/docs/basics/Reducers.html)
1. 概念   
  **`Reducer` 指定了应用状态的变化如何响应 `action` 并发送到 store 的**。   
  `Reducer` 是把 `action` 和 `state` 连接起来的**纯函数**。  
2. Reducer 的来源   
  之所以叫做 `reducer` ，是因为它可以作为数组 [`reduce(reducer[,initialValue])`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法的 `reducer` 参数。  
    > `reduce` 属于一种高阶函数，它将其中的回调函数 `reducer` 递归应用到所有的元素上并返回一个独立的值。达到“缩减”或“折叠”。 ----《[Reducer为什么叫做Reducer](https://zhuanlan.zhihu.com/p/25863768)》
3. **永远保持 `reducer` 的纯净**  
  无论何时都不应在 `reducer` 里做这些操作：
    - 修改传入的参数；
    - 执行有副作用的操作，如 API 请求和路由跳转；
    - 调用非纯函数，如 `Date.now()` 或 `Math.random()`。  

    **在 `reducer` 中，只要传入的参数相同，返回计算得到的下一个 state 就一定相同。没有特殊情况，没有副作用，没有 API 请求，没有变量修改，只有单纯的执行计算。**
4. 编写 reducer   
  以指定 state 的初始状态开始。在 Redux 首次执行时， state 为 `undefined`，是没有任何值的，此时可以借机设置并返回应用的初始 state。
    ```js {9}
    import { VisibilityFilters } from './actions'

    const initialState = {
      visibilityFilter: VisibilityFilters.SHOW_ALL,
      todos: []
    }

    // 使用 ES6 参数默认值语法可以直接设置参数默认值
    function todoApp(state === initialState, action) {
      
      // 这里暂不处理任何 action ，仅返回传入的 state
      return state;
    }
    ```
    处理一个 action: `SET_VISIBILITY_FILTER`。需要做的是指改变 state 中的 `visibilityFilter`。
    ```js {4}
    function todoApp(state === initialState, action) {
      switch (action.type) {
        case SET_VISIBILITY_FILTER:
          return Object.assign({}, state, {
            visibilityFilter: action.filter
          })
        default:
          return state
      }
    }
    ```
    ::: warning 注意
    1. **不要修改 `state`**。使用 [`Object.assign()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 的方式新建一个副本。而不是像这样 `Object.assign(state, {visibilityFilter: false})` ，因为它会改变第一个参数的值。将第一个参数设置为对象，这样可以确保 state 不被修改。
    2. **在 default 情况下返回 state**。这样可以在遇到未知 action 的时候，都确保返回旧的 state。
    :::
5. 拆分 Reducer  
  由于整个应用只有一个 state 对象，包含了所有数据，当应用越来越复杂的时候， state 必然会十分庞大，导致 Reducer 也越来越庞大。这时可以开发一个函数作为主 reducer ，它调用多个子 reducer 分别处理 state 中的一部分数据，然后再把这些数据合成一个大的单一对象。
    ::: warning 拆分 Reducer 原则
    应当以 reducer 处理的 state 进行拆分，当不同的 reducer 处理 state 中的字段有依赖时，需要慎重考虑是否应该拆分。
    :::
    例如：
    ```js
    function TodoListReducer(state = defaultState, action) {
      switch (action.type) {
        case CHANGE_INPUT:
          return Object.assign({}, state, {
            inputVal: action.inputVal
          })
        case ADD_ITEM:
          return Object.assign({}, state, {
            list: [
              ...state.list,
              action.item
            ]
          })
        case REMOVE_ITEM:
          let localList = JSON.parse(JSON.stringify(state.list));
          localList.splice(action.index, 1)
          return Object.assign({}, state, {
            list: localList
          })
        default:
          return state;
      }
    }
    ```
    上例中三个 action 分别改变了 state 的两个属性
      - CHANGE_INPUT：`inputVal` 属性
      - ADD_ITEM：`list` 属性
      - REMOVE_ITEM：`list` 属性
    这两个属性之间没有联系，便可以将 Reducer 函数进行拆分。不同的子 reducer 处理不同的属性。最终把它们合并到主 Reducer 函数中去。
      ```js
      // inputChange reducer
      function inputChange(state = '', action) {
        switch (action.type) {
          case CHANGE_INPUT:
            return action.inputVal;
          default:
            return state;
        }
      }

      // list reducer
      function list(state = [], action) {
        switch (action.type) {
          case ADD_ITEM:
            return [
              ...state,
              action.item
            ]
          case REMOVE_ITEM:
            let localList = JSON.parse(JSON.stringify(state));
            localList.splice(action.index, 1)
            return localList;
          default:
            return state;
        }
      }

      // 主 reducer 函数
      const TodoListReducer = (state = defaultState, action) => {
        return {
          inputChange: inputChange(state = defaultState.inputVal, action),
          list: list(state = defaultState.list, action)
        }
      }
      ```
      - `combineReducers` 合并函数  
        Redux 提供了 `combineReducers` 函数，用于将各个子 reducer 合并成一个主 Reducer 函数。
        ```js
        // 合并 reducer
        const TodoListReducer = combineReducers({
          // 当处理的 state 的属性名与子 reducer 不同名时使用下列写法：
          inputVal: inputChange,
          // 当处理的 state 的属性名与子 reducer 同名时，可以使用下列简写：
          list
        })
        ```
        最后可以将所有子 reducer 放在一个文件里面，然后统一引入：
        ```js
        import { combineReducers } from 'redux'
        import * as reducers from './reducers'

        const reducer = combineReducers(reducers)
        ```
### 3. [`Store`](https://www.redux.org.cn/docs/basics/Store.html)
前面知道了 `action` 是用来描述“发生了什么”，以及使用 `reducer()` 来根据 `action` 更新 state 的用法。   
**Store** 就是将它们联系在一起的对象。 Store 有以下职责：
- 维持应用的 state;
- 提供 `getState()` 方法获取 state;
- 提供 `dispatch(action)` 方法更新 state，**派发 action 的唯一途径**;
- 通过 `subscribe(listener)` 方法注册监听器；
  ```js
  this.storeChange = this.storeChange.bind(this);
  store.subscribe(this.storeChange);
  ...
  storeChange() {
    this.setState(store.getState())
  }
  ```
- 通过 `subscribe(listener)` 返回的函数注销监听器。  
  ```js
  const unsubscribe = store.subscribe(()=>{
    console.log(store.getState())
  })
  unsubscribe();
  ```

再次强调 **Redux 应用只有一个单一的 store**。当需要拆分数据处理逻辑时，应当使用 reducer 组合，而不是创建多个 store。

Redux提供 `createStore()` 函数，来创建 Store。
  ```js {4}
  import { createStore } from 'vuex'
  // 接收一个函数作为参数，返回新生成的store对象
  import reducerFn from './reducer.js';
  const store = createStore(reducerFn);
  export store;
  ```
### 4. `State`
某个时点(组件)的数据集合  
`Store` 对象包含了整个应用的数据。在组件中获得的数据集合，就是 `State`。要获取当前组件的 `State` ，需要通过 `store.getState()` 函数。
  ```js
  // Component.js
  import store from 'store';
  this.state = store.getState();
  ```
## 4. [纯函数](https://zh.wikipedia.org/zh-hans/%E7%BA%AF%E5%87%BD%E6%95%B0)
1. Reducer 最终要的特征就是，它是一个纯函数。所谓纯函数，就是在传如参数一样的情况下，总会得到相同的结果。
    > 如果函数的调用参数相同，则永远返回相同的结果。它不依赖于程序执行期间函数外部任何状态或数据的变化，必须只依赖于其输入参数。

    它必须遵守以下约束:
    - 不能改写参数
    - 不能调用系统 I/O 的API
    - 不能调用如 `Date.now()` 或者 `Math.random()` 等不纯的方法，因为每次调用都会返回不同的结果
2.  为什么Reducer必须是纯函数？  
因为这样就可以保证在同样的 State 情况下，必定得到同样的 View。同时这也就限定了在Reducer中不能改变 State，必须返回一个全新的对象。