## 1. 进阶：[中间件`middleware`](https://www.redux.org.cn/docs/advanced/Middleware.html)
### 1. 中间件的概念
在Redux的执行流程中，如果想要添加一些额外的操作，应该添加在哪里会合适呢？
  - reducer：是纯函数，只承担计算 State 的功能，不适合也承担不了其他功能，因为，纯函数不能进行读写操作。
  - View：与 State 一一对应，可以看做是 State 的视图层，也不适合承担其他功能。
  - Action：存放数据的对象，消息的载体，只能被操作，自身不能进行任何操作。

综上所述，都不太适合进行额外的操作，但是还有一个阶段，在发出 Action 的时候，即 `store.dispatch()` ，是可以额外添加一些操作的。例如一个打印日志的功能，把 Action 和 State 打印出来，可以对 `store.dispatch()` 进行如下改造：
  ```js
  let next = store.dispatch;
  // 改造dispatch方法：
  store.dispatch = (action) => {
    console.log('dispatching', action); // 打印 action
    next(action); // 执行dispatch自身的功能，派发action
    console.log('new state', store.getState()); // 打印新的 state
  }
  ```
上面对 `store.dispatch` 方法进行了改造，在派发 Action 前后额外添加了一些新的功能。这就是中间件的功能。  
**中间件就是一个函数，对 `store.dispatch()` 方法进行改造增强，在发出 Action 和执行 Reducer 之间，添加一些新的功能**。  
![](https://i.loli.net/2020/02/16/2T5PNnk3HJLtDVc.png)
### 2. 中间件的使用
  Redux提供了很多现成的中间件，这里先知道如何使用就行。    
  - Redux提供了 [`applyMiddleware(...middlewares)`](https://www.redux.org.cn/docs/api/applyMiddleware.html) 方法来实现中间件；
  - 而中间件需要在创建 Store 的时候进行注入，以便所有的 `dispatch` 都能使用到。Redux创建 Store 的方法是 `createStore()` ，所以将扩展的功能放入 `applyMiddleware()` 之后再传入 `createStore()` 方法中，就完成了 `store.dispatch()` 功能的增强。  
  如日志扩展中间件：
```js {2,6}
import { applyMiddleware, createStore} from 'redux';
import Logger from 'redux-logger';  // 需要先安装 npm i -D redux-logger

const store = createStore(
  reducer,
  applyMiddleware(Logger)
)
```
- **注意：** 
  - `applyMiddleware(...middlewares)` 中 `middlewares` 参数应该为一个函数。
  - [`createStore(reducer, [preloadedState], enhancer)`](https://www.redux.org.cn/docs/api/createStore.html) 方法接收整个应用的初始状态作为参数，那样的话，`applyMiddleware` 应该为第三个参数
    ```js {3,4}
    const store = createStore(
      reducer,
      initial_state,
      applyMiddleware(Logger)
    )
    ```
  - 中间件是有次序的，使用前需要先查看使用规则，如下 `logger` 插件必须放在最后
    ```js {3}
    const store = createStore({
      reducer,
      applyMiddleware(thunk, promise, logger)
    })
    ```
## 2. 进阶：Redux 中的异步
Redux 的基本工作流程是：用户发出 Action ，Reducer 函数算出新的 State ，View 重新渲染。该过程都是同步的，Action 发出以后，Reducer 立即就能算出State 。  
- vuex 中的异步  
在vuex中，只有mutation可以改变state，而mutation也是无法异步执行的；但是提供的 action 是可以实现异步的，所以一般都在组件中通过 dispatch 触发action，然后 action 再 commit 对应的 mutation 来实现异步操作。
- Redux中的异步  
在Redux中需要借助中间件-`middleware` 来实现异步。
### 1. 通过请求初始化 store 中的 state
在 react 中请求操作基本都是在 `componentDidMount` 阶段完成的，下面以 axios 请求为例实现一个简单的后台请求初始化 store 中的 state 。这个例子不牵涉到中间件以及 action 异步的概念，以助于后面进行区分理解：<span id="AsyncApp"/>
```js
// 1. 构建 action 
export const INIT_LIST = 'INIT_LIST';
export function initList(list) {
  return {
    type: INIT_LIST,
    list
  }
}
// 2. 构建reducer 
function list(state = [], action) {
  switch (action.type) {
    case INIT_LIST:
      // 从后台获取数据初始化list
      return [...action.list];
    default:
      return state;
  }
}
// 3. 在组件中发送请求
class AsyncApp from React.Component {
  componentDidMount() {
    axios.get('https://www.fastmock.site/mock/76aa0120ec70a57f3b8244c0db92149f/test/test')
    .then(res=>{
      const {list} = res.data;
      // 4. 完成初始化操作
      store.dispatch(initList(list));
    })
    .catch(err=>{
      console.log(err);
    })
  }
}
```
这样看来很简单，确实也没什么复杂的，接着往下看。
### 2. `redux-thunk`
1. 异步操作的思路  
  上文说到如果要执行同步操作，直接发出一个 Action 即可。那么异步操作的话，还需要有一个异步操作的结果，所以异步操作至少得发出两个 Action：
    - 即操作时发起的 Action ，表示“正在操作”;
    - 异步操作结束之后发起的 Action（包含两种结果：操作成功和操作失败，立即想到了 Promise），来表示“操作结束”。  

    那么就需要定义三个 action 来表示三种状态，这里可以有两种写法：
    ```js
    // 第一种：不同的 action type
    { type: 'FETCH_POSTS_REQUEST' } // 表示发出请求
    { type: 'FETCH_POSTS_SUCCESS', response: { ... } } // 表示请求成功
    { type: 'FETCH_POSTS_FAILED', error: 'error info' } // 表示请求失败
    // 第二种：相同的 action type（都代表请求），不同的参数，表示不同的状态
    { type: 'FETCH_POST' }
    { type: 'FETCH_POST', status: 'success', response: { ... } }
    { type: 'FETCH_POST', status: 'error', error: 'error info' }
    ```
2. 实现异步操作    
  根据上面描述的异步操作的思路，第一步的同步 action 很简单，直接像正常一样 dispatch 即可；如何在操作结束后，自动触发第二个 action 是关键，奥妙就在 Action Creator （action 创建函数）之中。按照异步思路，应当是如下的一个函数：
    ```js
    function getData() {
      // 这里返回的是一个函数
      return (dispatch) => {
        dispatch(requestAction()); // 请求前触发一个 action 
        axios.get('APIPath')
          .then(res => {
            dispatch(successAction()); // 请求结束成功后触发一个 action 
          })
          .catch(err => {
            dispatch(failedAction()); // 请求结束失败后触发一个 action 
          })
      }
    }
    ```
    那么构建到 Redux 中结合[通过请求初始化 store 中的 state 的例子](#AsyncApp)，应当是如下的：
    ```js
    // 构建一个返回函数的 action
    export function getInitialList() {
      return (dispatch, getState) => {
        dispatch(loadingAction());
        axios.get('https://www.fastmock.site/mock/76aa0120ec70a57f3b8244c0db92149f/test/test')
          .then(
              // 这里可以对结果进行操作，包括 json 化处理
              res => res.data, // 将数据部分传递到下一个 then
              // 不要使用 catch，因为会捕获
              // 在 dispatch 和渲染中出现的任何错误，
              // 导致 'Unexpected batch number' 错误。
              error =>{ console.log('An error occurred.', error)}
            )
            .then(data => {
              const { list } = data;
              dispatch(initList(list));
              console.log(getState());
            })
      }
    }
    // 在组件中使用
    componentDidMount() {
      console.log(getInitialList()); // 可以发现这里的 initListAction 为一个函数
      store.dispatch(getInitialList());
    }
    ```
3. `redux-thunk` - **使 `dispatch()` 能够接受一个函数作为参数**  
    上面代码中， `getInitialData` 是一个 Action Creator ，返回的是一个函数。这个函数在执行时，会先发出一个 action (`loadingAction()`)，然后进行异步操作。拿到结果后，先处理结果，然后再发出一个 action (`initList(list)`)。这里需要注意这几个不同点：
    - 这里的 `getInitialList()` 返回了一个函数，而 Action Creator 默认返回的是一个对象
    - 返回函数的参数是 `dispatch` 和 `getState` 这两个 Redux 方法，而普通的 Action Creator 的参数是 Action 的内容
    - 在返回的函数中，先发出一个 Action (`loadingAction()`)，表示异步操作开始
    - 异步操作结束后，再发出一个 Action (`initList(list)`)，表示操作结束  
    经过这样的处理，就解决了自动触发第二个 Action 的问题。但是，新的问题又来了， `store.dispatch()` 方法正常情况下，参数只能是对象，不能是函数。这时，`redux-thunk` 终于登场啦。
    ```js
    import {createStore, applyMiddleware} from 'redux';
    import thunk from 'redux-thunk';
    import reducer from './reducers';

    const store = createStore(
      reducer,
      applyMiddleware(thunk)
    )
    ```
    使用 `redux-thunk` 中间件，改造增强 `store.dispatch()`，使之可以接收函数作为参数。
    因此，异步操作的第一种解决方案就是，构造一个返回函数的 Action Creator，然后使用 `redux-thunk` 中间件来改造增强 `store.dispatch`，使之能接收函数的参数。
## 3. 进阶：`react-redux`
### 1. 安装
```Shell
npm i -S react-redux
```
### 2. 容器组件和展示组件
1. 分离思想  
    `react-redux` 是基于 [容器组件（Smart/Container Components）和展示组件（Dumb/Presentational Components）相分离](https://juejin.im/post/5a52fe32f265da3e317e008b) 的开发思想。总结一下它们的不同点：
    |                   | 展示组件                   | 容器组件                  |
    | -----------------: |:-------------------------| :--------------------------|
    | **作用**          | 描述如何展示（样式、骨架） | 描述如何运行）（数据获取、状态更新） |
    | **直接使用 Redux**| 否                       | 是                        |
    | **数据来源**      | props                    | 监听 Redux state          |
    | **数据修改**      | 从 props 调用回调函数    | 向 Redux 派发 actions     |
    | **调用方式**      | 手动                     | 通常由 `react-redux` 生成 |
1. UI 组件的特征   
    - 只负责 UI 呈现，不带任何业务逻辑
    - 无状态（即不使用 `this.state` 这个变量）
    - 所有数据都由参数（`this.props`）提供
    - 不使用任何 Redux 的 API  

    如下，是一个完整的 List UI组件：
      ```js
      import React from 'react';
      import { List } from 'antd';

      export default function TodoList({ list, removeItem }) {
        return (
          <List
            dataSource={list}
            bordered
            renderItem={(item, index) => (
              <List.Item onClick={() => removeItem(index)}>
                {item}
              </List.Item>
            )}
          />
        )
      };
      ```
    因为UI组件不包含任何状态，又叫无状态组件，纯组件，即同纯函数一样，由参数确定它的值
2. 容器组件的特征  
  容器组件与UI组件的特征恰恰相反
    - 负责管理数据和业务逻辑，不负责 UI 的呈现
    - 带有内部状态，由 Redux 提供
    - 使用 Redux 的 API
3. 总结  
  总之，只要记住一句话就可以了：**UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。**  
  在初期尝试做分离时，注意：
    > 不要把分离 presentational 组件和 container 组件当做一种教条。有时候并没那么重要或很难划清界限，如果你不确定一个组件该是 presentational 组件或 container 组件，也许是决定的太早了。别担心！
### 3. connect()
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。而  `connect()` ，就是 `react-redux` 提供的用于从 UI 组件生成容器组件的方法。
```js {1,4}
import { connect } from 'react-redux'；
import TodoListUI from './components/TodoListUI';

const TodoListContainer = connect()(TodoListUI);
```
上面代码中，TodoListUI 是 UI 组件，TodoListContainer 就是由 React-Redux 通过 connect 方法自动生成的容器组件。  
但是，这种容器组件中没有定义业务逻辑，所以它是无意义的，只是 UI 组件的一个单纯的包装层。为了定义业务逻辑，需要给出两方面的信息：
  - **输入逻辑**：外部的数据（即state对象）如何转换为 UI 组件的参数
  - **输出逻辑**：用户发出的动作如何变为 Action 对象，从 UI 组件传出去。

`connect` 是连接的意思，也就是把这些业务逻辑和UI组件相连起来，才能构成一个有意义的容器组件。所以，完整的容器组件应当是这样的：
```js{5,6}
import { connect } from 'react-redux'；
import TodoListUI from './components/TodoListUI';

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListUI);
```
#### 1. mapStateToProps()
  - **`mapStateToProps()` 是一个函数**。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。  
  - 它的**返回值是一个对象**，里面的每一个键值对就是一个映射。  
  - 它的**第一个参数为 `state tree`** ，即 store 中的 state tree 对象。
  ```js
  const mapStateToPorps = (state) => {
    return {
      list: state.list
    }
  }
  ```
  上面代码就表示将 state tree 中的 list 属性映射为 UI 组件中 props 对象的 list 属性，从而获取到它的值。  

  `mapStateToProps()` 会自动订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
  - 它的**第二个参数为UI组件的`props 对象`**
      ```js
      // 容器组件的代码
      //    <FilterLink filter="SHOW_ALL">
      //      All
      //    </FilterLink>

      const mapStateToProps = (state, ownProps) => {
        return {
          active: ownProps.filter === state.visibilityFilter
        }
      }
      ```
      **注意**：使用 `ownProps` 作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。

  `connect()` 方法可以省略 `mapStateToProps` 参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。
#### 2. mapDispatchToProps()
`mapDispatchToProps()` 是 connect 函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，**它定义了哪些用户的操作应该当作 Action，传给 Store**。它可以是一个函数，也可以是一个对象。
- `mapDispatchToProps()` 函数的参数为 `dispatch()` 方法 
- 返回值为一个对象，键值为期望注入到UI组件的 props 中的回调方法，来派发 Action
```js
import { removeItem } from '../actions';

const mapDispatchToPorps = (dispatch) => {
  return {
    removeItem(index) {
      dispatch(removeItem(index))
    }
  }
}
```
### 4. `<Provider>` 组件
`connect()` 方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。  
React-Redux 提供  `Provider` 组件，可以让容器组件拿到state。通常是在根组件中使用，这样一来，App的所有子组件就默认都可以拿到state了。
```js
// index.js
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
## 4. 其他常用中间件及工具
### 1. 开发调试工具：[`redux-devtools-extension`](https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm)
主要为日常开发提供Redux状态追踪：
<img-show :img-info="{src:'https://i.loli.net/2020/03/06/y6wg2RnHZVokAL1.gif',description:'redux-devtools-extension'}"/>

1. Chrome安装 Redux Devtools 扩展工具，访问扩展商店安装即可
2. 项目中安装 `redux-devtools-extension` 插件  
    ```Shell
    npm i -D redux-devtools-extension
    ```
3. 在代码中添加工具
    ```js
    import { createStore, applyMiddleware } from 'redux';
    import thunk from 'redux-thunk';
    import logger from 'redux-logger';
    // 引入工具插件
    const { composeWithDevTools } = require('redux-devtools-extension');
    // 1. 单独使用
    const store = createStore(reducer, composeWithDevTools());
    // 2. 结合其他中间件使用
    const store = createStore(reducer, composeWithDevTools(
      applyMiddleware(...[thunk, logger])
    ));
    // 3. 只在开发环境使用
    const enhancers = process.env.NODE_ENV === "development" ? composeWithDevTools(
      applyMiddleware(middleware)
      // other store enhancers if any
    ) :
      applyMiddleware(thunk);
    const storeEnv = createStore(counters, enhancers);
    ```
### 2. 日志记录：[`redux-logger`](https://github.com/LogRocket/redux-logger)
安装
```Shell
npm i --save redux-logger
```
使用
```js
import { applyMiddleware, createStore } from 'redux';

// Logger with default options
import logger from 'redux-logger'
const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```
### 3. 其他[工具集](https://www.redux.org.cn/docs/introduction/Ecosystem.html)