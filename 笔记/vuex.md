#安装使用

[文档](https://vuex.vuejs.org/zh-cn/installation.html)

1.npm安装

    npm install vuex --save
2.创建store文件夹，创建store.js

3.store.js导入

    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)
	
4.store.js中写入
	
	//模块A
	const moduleA = {
  	state: {
    maState: 'A'
  	},
  	getters: {
    AGetter: () => 'A Getters'
  	},
  	actions: {
    AAction(context) {
      context.commit('AMutation')
    }
  	},
  	mutations: {
    AMutation(state) {
      state.maState += 'A'
    }
  	}
	}
	//模块B
	const moduleB = {
  	state: {
    mbState: 'B'
  	},
  	getters: {
    BGetter: () => 'B GEtterss'
  	}
	}
	//根模块
	const vuex_store = new Vuex.Store({
  	state: {
    count: 1,
    todos: [
      { id: 1, text: '111', done: true },
      { id: 2, text: '222', done: false }
    ]
  	},
  	modules: {
    a: moduleA,
    b: moduleB
 	},
  	getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  	},
  	mutations: {
    increase(state) {
      state.count++
    }
  	},
  	actions: {
    rootAction(context) {
      context.commit('increase')
    }
  	}
	})
	
	export default vuex_store

5.**main.js中:**

	import {vuex_store} from './store/store'
	Vue.use中加入store:vuex_store


#mutation

相当于方法

>可以根据项目组件的划分来拆分 store，每个模块里管理着当前组件的状态以及行为，最后将这些模块在根 store 进行组合

**访问根模块mutation：**

	this.$store.commit('rootAction')

**访问模块A的mutation：(与访问根模块方法一样)**

	this.$store.commit('AMutation')

#state

在 Vuex 模块化中，state 是唯一会根据组合时模块的别名来添加层级的

**访问根模块的属性：**

	this.$store.state.count

**访问模块A的属性：**

	this.$store.a.maState

#getters

相当于计算属性

	this.$store.getters.BGetter //模块B
	this.$store.getters.doneTodos  //根模块

#actions
在action中可以通过context.commit跨模块调用mutation，同一模块的action'也可以调用其它模块的action

	this.$store.dispatch('AAction')