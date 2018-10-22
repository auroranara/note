# 工具
chrome浏览器扩展工具 Redux DevTools React Developer Tools

# Component vs PureComponent vs Stateless Functional Component（无状态组件）

* Stateless Functional Component（无状态组件）

  不使用state、refs或生命周期方法创建组件

* PureComponent

  通常，一个组件获取了新的 prop，React 就会重新渲染这个组件。但有时，新传入的 prop 并没有真正改变，React 还是触发重新渲染。

  使用 PureComponent 可以帮助你避免这种重新渲染的浪费。例如，一个 prop 是字符串或布尔值，它改变后，PureComponent 会识别到这个改变，但如果 prop 是一个对象，它的属性改变后，PureComponent 不会触发重新渲染。

  [why-did-you-update](https://github.com/maicki/why-did-you-update)在无必要的重新渲染发生后在控制台提醒

*  