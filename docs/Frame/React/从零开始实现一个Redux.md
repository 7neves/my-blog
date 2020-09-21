[【原文】](https://github.com/brickspert/blog/issues/22)

## 1. 状态容器

> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。

redux就是个管理状态的容器，那么先来实现一个最简单的状态管理器。

### 1. 最简单的状态管理器

所谓状态，就是数据，如下面的 `count`：

```js
let state = {
  count: 0
};
```

使用状态，在界面显示出来：

```html
<button onclick="onClick()">按钮</button>
<p>当前状态：<span id="state"></span></p>
```

```js
document.getElementById('state').innerText = state.count;
```

修改状态:

```js
function onClick() {
  state.count = 1;
}
```

这样就是最最最简单的状态管理，这也是 `Redux` 最核心的东西。下面来逐步完善，使之更像我们已知的 `Redux`。

这个最简单的状态管理器存在一个问题：*当修改状态的时候，在使用状态的地方无法更改到最新的状态值*。

### 2. 发布-订阅模式

为了解决上述问题，来引进**发布-订阅模式**，在状态更改的时候，在使用状态的地方能收到通知，进而更新状态。

```js
let listeners = [];

// 订阅
function subScript(listener) {
  listeners.push(listener);
}

// 修改状态
function changeState(count) {
  state.count = count;
	// 当状态改变的时候，通知所有的订阅者  
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }
}
```

再来使用下这个简单的状态管理器：

```js
// 首先需要添加订阅
subScript(() => {
  document.getElementById('state').innerText = state.count;
});

// 触发更新
function onClick() {
  changeState(1);
}
```

这样点击按钮，状态改变，界面显示的状态值也会发生变化。

这样的一个状态管理器比之前好了很多，但是仍然有两个问题：

- 只能管理 `count`这一个状态，不够通用
- 对外暴露了太多变量，方法

### 3. 封装状态管理器

为了实现通用和减少变量的暴露，将代码进行一个封装

```js
const createStore = function(initState) {
  let state = initState;
  
  // 订阅
  let listeners = [];
  
  function subScript(listener) {
    listeners.push(listener);
  }
  
  // 修改状态
  function changeState(newState) {
    state = newState;
    // 当状态改变的时候，通知所有的订阅者  
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  
  function getState() {
    return state;
  }
  
  // 对外提供接口
  return {
    getState,
    subScript,
    changeState,
  }
}
```

使用封装过的状态管理器

```js
let initState = {
  count: 0,
  info: {
    name: 'Seven',
    age: 30
  }
};

const store = createStore(initState);

/*-----添加自定义订阅-----*/
store.subscribe(() => {
  let state = store.getSate();
  document.getElementById('name').innerText = state.info.name;
  document.getElementById('age').innerText = state.info.age;
})

store.subscribe(() => {
  let state = store.getSate();
  document.getElementById('count').innerText = state.count;
})

/*-----改变状态-----*/
function changeInfoState() {
  store.changeState({
    ...store.getSate(),
    info: {
      name: 'Seven',
      age: 30
    }
  })
}

// 来实现一个count的自增和自减
function inCrement() {
  store.changeState({
    ...store.getSate(),
    count: store.getSate().count + 1
  })
}

function deCrement() {
  store.changeState({
    ...store.getSate(),
    count: store.getSate().count - 1
  })
}
```

这样的一个状态管理器用起来就好了很多，很通用，且不用关心其内部的逻辑。再来看一个问题，这里的 `count`是一个数值，如果将其改变为字符串，是否也可以呢

```js
function changeCount() {
  store.changeState({
    ...store.getSate(),
    count: '哈哈哈'
  })
}
```

发现也是可行的，它不具有任何限定性，最初说到 *Redux提供的是可预测化的状态管理* ，那么如何让它可预测呢？那就是我们给它制定一个计划，让其按照“计划”只执行自增或自减。

![](https://s17.aconvert.com/convert/p3r68-cdx67/87b46-fal8a.gif)

### 4. 有计划的状态管理器

分两步解决上述无法限定状态更新的问题

- 制定一个 state 修改计划，然后告诉 store 计划的内容
- 修改 store.changeState 方法，告诉它修改 state 的时候，按照计划进行修改

```js
// 首先制定一个 plan 函数，接收现在的 state，和一个 action，返回经过修改后的 state
// action 必须包含一个 type 属性
function plan(state, action) {
 	let type = action.type;
  switch type:
    case 'INCREMENT':
    	return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
  		return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
}

// 然后修改 store.changeState 方法，告诉它修改 state 的时候，按照计划进行修改
const createStore = function (plan, initState) {
  ...
  function changeState(action) {
    /*请按照计划修改 state*/  
    state = plan(state, action);
 
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }
  }
  ...
}
```

使用有计划的状态管理器

```js
let initState = {
  count: 0
}

// 传入plan函数
let store = createStore(initState, plan);

store.subscribe(() => {
  let state = store.getSate();
  document.getElementById('count').innerText = state.count;
})

// 有效的更改
function inCrement() {
  store.changeState({
    type: 'INCREMENT'
  })
}

function deCrement() {
  store.changeState({
    type: 'DECREMENT'
  })
}

// 是无效的
function changeCount() {
  store.changeState({
    ...store.getSate(),
    count: 'abd'
  })
}
```

![](https://s31.aconvert.com/convert/p3r68-cdx67/z7zl2-3qj69.gif)

这样就实现了一个有“计划”的状态管理器，尝试改变下其中一些方法的名字：

- `plan` 改为 `reducer`
- `changeState` 改为 `dispatch`

这样看起来，是不是就是一个 Redux 了 😁（下面的例子都是后面的命名方式）

## 2. combineReducers函数

这个有计划的状态管理器目前已经够用了，下面来进行一些优化，前面说到`reducer`是计划函数，针对不同的状态，做出不同的更新计划（reducer函数），但是我们的项目都不可能仅仅是一两个状态，当状态过多时，就要写很多的 `reducer` 导致reducer函数越发臃肿，难以维护。这样的情况下，通常会按照某个维度（比如组件）进行拆分，然后通过一个函数将它们组合起来，达到解耦的目的。

下面来管理多个state，一个是 counter，一个是 info：

```js
let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    age: 0
  }
}
```

它们拥有各自的更新计划函数reducer：

```js
// 计划函数
// 注意，这里的state为 state.counter
function countReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      }
      case "DECREMENT":
        return {
          ...state,
          count: state.count - 1
        }
        default:
          return state;
  }
}

// 注意，这里的state为 state.info
function infoReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'SET_AGE':
      return {
        ...state,
        name: action.age
      }
      default:
        return state;
  }
}
```

下面就要用 `combineReducers` 函数将它们合并成一个 reducer 函数。**reducer 函数的作用就是传入旧的 `state` ,返回新的 `state`**。所以，合并 reducer 的思路大概是这样的：

1. 遍历执行所有的 reducer

2. 将前一个 reducer 返回的 state ，作为下一个 reducer 的参数

3. 返回最终的 state

4. 使用的时候大概是这样来使用，每一个 state 对应一个 reducer 函数，这样能保持一致

   ```js
   const reducer = combineReducers({
     counter: countReducer, // 每个 key 对应一个状态，状态值即为其对应的 reducer 函数
     info: infoReducer
   });
   ```

根据上面的思路，来实现一下 `combineReducers` 函数：

```js
function combineReducers(reducers) {
  // 获取到对应的 state 
  const reducers = Object.keys(reducers);
  
  return function combination(state = {}, action) {
    // 生成新的 state
    const nextState = {};
    
    for (let i = 0; i < reducers.length; i++) {
      const key = reducers[i];
      const reducer = reducers[key];
      // 获取旧的 state
      const proviceStateForKey = state[key];
      // 传递旧的 state 并执行其对应的 reducer ，获取新的 state
      const nextStateForKey = reducer(proviceStateForKey, action);
      
      nextState[key] = nextStateForKey;
    }
    return nextState;
  }
}

// 使用 reduce() 方法可以简化上面的代码
function combineReducers(reducers) {
  return function combination(state = {}, action) {
    return Object.keys(reducers).reduce(
    	(nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      // 注意：一定要传入 reduce 函数的 initialValue 参数
      {}
    )
  }
}
```

来使用下这个合并  reducer 的方法：

```js
const reducer = combineReducers({
  counter: countReducer, // 每个 key 对应一个状态，状态值即为其对应的 reducer 函数
  info: infoReducer
});

let initState = {
  counter: {
    count: 0
  },
  info: {
    name: '',
    age: 0
  }
};

let store = createStore(initState, reducer);

// 添加订阅
store.subscribe(() => {
  let state = store.getSate();
  document.getElementById('count').innerText = state.counter.count;
});

store.subscribe(() => {
  let state = store.getSate();
  document.getElementById('name').innerText = state.info.name;
  document.getElementById('age').innerText = state.info.age;
});

// 改变状态
function inCrement() {
  store.dispatch({
    type: 'INCREMENT'
  })
}

function deCrement() {
  store.dispatch({
    type: 'DECREMENT'
  })
}

function changeInfoState() {
  store.dispatch({
    type: 'SET_NAME',
    name: 'Seven'
  });
  store.dispatch({
    type: 'SET_AGE',
    age: 32
  })
}
```

到这里，已经差不多实现了一个简单的 Redux ，仔细研究这里面的每个环节，结合 Redux 教程，就会明白很多设计为什么必须那么做了。比如：

- 在生成 Store 的时候，必须先将 Reducer 传入`createStore`方法
- action 必须有一个 type 属性
- reducer 必须是一个纯函数，因为它只是一个提供“计划方案”的函数，用来接收旧的状态，返回新的状态

## 3. middleware 中间件

> 中间件是对 dispatch 的扩展，或者说重写，增强 dispatch 的功能！

从上面实现的简单的 Redux 来看 `dispatch` 就是 `changeState` 函数，也就是改变状态的函数，对其进行扩展，使之具备更强大的功能。

### 1. 改造dispatch

首先将 `store.dispatch` 函数指针定义为 `next` 变量，接下来在中间件函数中使用，以改变状态。

```js
const next = store.dispatch;
```

1. 日志记录功能  

   日常开发可能都有这样的需求，想要在改变状态的时候添加一些日志记录的功能：记录下修改前的 state ，为什么修改了，以及修改后的 state等等。那么就需要对 `changeState()` 方法（也就是`dispatch()`）进行改造了：

   ```js
   store.dispatch = (action) => {
     let state = JSON.stringify(store.getSate());
     console.log(`当前state:${state}`);
     console.log(`action:${JSON.stringify(action)}`);
     next(action);
     console.log(`更改后的state:${state}`);
   }
   ```

   这个时候改变状态，会看到有日志输出：

   ```js
   当前state:{"counter":{"count":0},"info":{"name":"","age":0}}
   redux.html:490 action:{"type":"INCREMENT"}
   redux.html:492 更改后的state:{"counter":{"count":0},"info":{"name":"","age":0}}
   ```

2. 异常处理功能

   再来一个新的需求，希望能在修改状态异常的时候捕获异常：

   ```js
   store.dispatch = (action) => {
     try {
       next(action);
     } catch (error) {
       console.error(`当前错误信息：${error}`)
     }
   }
   ```

这样改造后的 `dispatch` 具备了一些扩展功能，但是还有个问题：*这些扩展功能之间怎么合作呢？*

### 2. 高扩展性的多中间件合作模式

1. 多个中间件的合作

   如果希望既能记录日志又能捕获异常的话，首先想到的可能是上面两部分代码进行融合了：

   ```js
   store.dispatch = (action) => {
     try {
     	let state = JSON.stringify(store.getSate());
       console.log(`当前state:${state}`);
       console.log(`action:${JSON.stringify(action)}`);
       next(action);
       console.log(`更改后的state:${state}`);
     } catch (error) {
       console.error(`当前错误信息：${error}`)
     }
   }
   ```

   这样的情况，如果再有新的需求怎么办呢？可能就是不断的添加代码，dispatch 又庞大的无法维护了，这是不可取的！  

   我们需要考虑如何实现**扩展性很强的多中间件合作模式**。

2. 抽离日志记录功能—loggerMiddleware

   ```js
   const loggerMiddleware = (action) => {
     let state = JSON.stringify(store.getSate());
     console.log(`当前state:${state}`);
     console.log(`action:${JSON.stringify(action)}`);
     next(action);
     console.log(`更改后的state:${state}`);
   }
   ```

3. 抽离捕获异常功能--exceptionMiddleware

   ```js
   const exceptionMiddleware = (action) => {
     try {
       loggerMiddleware(action);
     } catch (error) {
       console.log(`错误信息: ${error}`);
     }
   }
   ```

4. 改造抽离的功能函数，使之更具扩展性

   1. 解耦 `next`

      上述两个抽离的功能函数，都存在一些问题：

      - `loggerMiddleware`中的 `next` 恒等于 `store.dispatch` ，导致无法扩展别的中间件
      - `exceptionMiddleware` 存在同样的问题，写死了 `loggerMiddleware` ，导致其扩展性很差

      基于这两个问题，对抽离的中间件函数进行改造：

      ```js
      // 将写死的内容，使用参数进行传递
      
      // 日志记录功能--loggerMiddleware
      const loggerMiddleware = (next) => (
        (action) => {
          let state = JSON.stringify(store.getSate());
          console.log(`当前state:${state}`);
          console.log(`action:${JSON.stringify(action)}`);
          next(action);
          console.log(`更改后的state:${state}`);
        }
      )
      
      // 捕获异常功能--exceptionMiddleware
      const exceptionMiddleware = (next) => (
        (action) => {
          try {
            next(action);
          } catch (error) {
            console.log(`错误信息: ${error}`);
          }
        }
      )
      ```

      到这里为止，已经探索出了一个扩展性很高的中间件合作模式！来使用下这些中间件：

      ```js
      const store = createStore(reducer);
      const next = store.dispatch;
      
      // 日志记录功能--loggerMiddleware
      const loggerMiddleware = (next) => (action) => {
        let state = JSON.stringify(store.getSate());
        console.log(`当前state:${state}`);
        console.log(`action:${JSON.stringify(action)}`);
        next(action);
        console.log(`更改后的state:${state}`);
       }
      
      // 捕获异常功能--exceptionMiddleware
      const exceptionMiddleware = (next) => (action) => {
        try {
          next(action);
        } catch (error) {
          console.log(`错误信息: ${error}`);
        }
      }
      
      store.dispatch = exceptionMiddleware(loggerMiddleware(next));
      ```

      这样看起来很不错，它们运行的都很好。再仔细看下，如果想进一步的解耦，将中间件都封装在一个独立的 `.js` 文件中，会出现什么问题呢？`loggerMiddleware` 中的 `store` 还是写死的，是没有办法将中间件函数进行独立抽离的。

   2. 解耦 `store`

      针对上面的问题对 `store` 进行处理：将 `store` 作为一个参数传入中间件函数

      ```js
      // 日志记录功能--loggerMiddleware
      const loggerMiddleware = (store) => (next) => (action) => {
        console.log(`旧的state:${JSON.stringify(store.getState())}`);
        next(action);
        console.log(`新的state:${JSON.stringify(store.getState())}`);
      };
      
      // 捕获异常功能--exceptionMiddleware
      const exceptionMiddleware = (store) => (next) => (action) => {
        try {
          next(action);
        } catch (error) {
          console.log(`错误信息: ${error}`);
        }
      }
      
      // 创建一个新的中间件，在记录日志前能记录下当前的时间
      // 时间记录--timmerMiddleware
      const timeMiddleware = (store) => (next) => (action) => {
        console.log(`time:${new Date().getTime()}`);
        next(action);
      }
      
      // 使用中间件
      const logger = loggerMiddleware(store);
      const exception = exceptionMiddleware(store);
      const time = timeMiddleware(store);
      
      // 这就是想要的结果
      store.dispatch = exception(time(logger(next)));
      ```

      这样就可以将中间件独立成一个 `.js` 文件，在使用的时候导入即可。

### 3. 中间件使用优化--applyMiddleware

针对上面实现的中间件来说是没什么问题了，但是在使用的时候，会稍显麻烦，如何忽略那些使用方法，我们只用知道有三个中间件就行，让 `createStore` 去处理它们，看下我们期望的（也是Redux所实现的）做法：

```js
/*接收旧的 createStore，返回新的 createStore*/
const newCreateStore = applyMiddleware(exceptionMiddleware, timeMiddleware, loggerMiddleware)(createStore);

/*返回了一个 dispatch 被重写过的 store*/
const store = newCreateStore(reducer);
```

1. 实现 `applyMiddleware`  

   ```js
   const applyMiddleware = function (...middlewares) {
     // 返回一个重写 createStore 的方法
     return function rewriteCreateStoreFun(oldCreateStore) {
       // 返回重写后新的 createStore
       return function newCreateStore(reducer, initState) {
         // 1. 生成store
         const store = oldCreateStore(reducer, initState);
         /**
          * 给每个 middleware 传下store，相当于：
          * const logger = loggerMiddleware(store);
          * const time = timeMiddleware(store);
          * const chain = [logger, time];
          * */
         const chain = middlewares.map((middleware) => middleware(store));
         let next = store.dispatch;
         // 相当于 store.dispatch = time(logger(next));
         chain.reverse().map((middleware) => (next = middleware(next)));
         // 2. 重写 store.dispatch
         store.dispatch = next;
         // 返回新的 store
         return store;
       };
     };
   };
   ```

   下面就可以像上述方法一样，来使用 `applyMiddleware`。

2. 优化使用体验  

   现在对于我们来说，有两种 store ：

   ```js
   // 一种是没有中间件的
   import { createStore } from './redux';
   const store = createStore(reducer, initState);
   
   // 一种是有中间件的
   const newCreateStore = applyMiddleware(loggerMiddle, timeMiddleware)(createStore);
   const store = newCreateStore(reducer, initState);
   ```

   为了在使用的时候不考虑这些情况，能用统一的方式去使用最为方便，再进行一下优化，将 applyMiddleware 作为一个参数传入：

   ```js
   const createStore = (reducer, initState, rewriteCreateStoreFun) => {
     // 如果有 rewriteCreateStoreFun ，就采用新的 createStore
     if (rewriteCreateStoreFun) {
       const newCreateStore = rewriteCreateStoreFun(createStore);
       return newCreateStore(reducer, initState);
     }
     // 否则，就是用正常的 createStore
     ...
   }
   ```

   这样使用起来就很方便了：

   ```js
   // 如果有中间件 
   const rewriteCreateStoreFun = applyMiddleware(middleware1, middleware2, middleware3);
   const store = createStore(reducer, initState, rewriteCreateStoreFun);
   // 如果没有中间件，不传递第三个参数即可
   const store = createStore(reducer, initState)
   ```

### 4. 省略 initState

在 Redux 中，`createStore` 可以不用传入 `initState` 参数的，这一步很简单，直接改造 `createStore` 传入参数即可：

```js
const createStore = function (reducer, initState, rewriteCreateStoreFun) {
  // 因为 initState 应当是一个对象，rewriteCreateStoreFun 是一个函数，所以直接判断第二个参数的类型即可
  if (typeof initState === 'function') {
    // 如果没传入 initState 参数，那么 rewriteCreateStoreFun 就是第二个参数，应当为 function 类型
    rewriteCreateStoreFun = initState;
    initState = undefined;
  }
  ...
}
```

这样在不传入 `initState` 的情况下，也能正常使用了

```js
// 创建 store
const store = createStore(
  reducer,
  applyMiddleware(timeMiddleware, loggerMiddleware)
);
```

## 4. 总结Redux

对于上面逐步实现的一个 Redux ，已经是日常所遇到常见的 Redux 了，原文中还有对几个高级API的实现，因为日常所用不多，未进行深入研究，后续再进行补全，膜拜原文大佬。Redux 常见的名词做个总结：

- `createStore`

  用来创建 store 对象，包含 `getState` , ` dispatch` , ` subscribe` , `replaceReducer`

- `reducer`

  `reducer` 是一个计划函数(plan)，接收旧的 `state` 和 `action`，生成新的 `state`

- `action`

  `action` 是一个对象，必须包含` type` 字段

- `dispatch`

  `dispatch( action )` 是用来改变状态的(changeState)，通过触发 `action`，生成新的 `state`

- `subscribe`

  订阅器，用来实现订阅功能，每次触发 `dispatch` 的时候，会执行订阅函数

- `combineReducers`

  合并多个 `reducer` 成一个` reducer`

- `middleware`

  扩展 `dispatch` 函数，使 `dispatch` 更强大

- `applyMiddleware`

  合并多个`middleware`，通过重写 `dispatch` 来简化操作