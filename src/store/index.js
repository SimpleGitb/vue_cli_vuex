import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// const state = {
//     count: 3
// }
// const mutations = {
//     add(state, n) {
//         state.count += n;
//     },
//     reduce(state) {
//         state.count--;
//     }
// }
// const getters = {
//     count(state) {
//         return state.count += 100;
//     }
// }

// //模块
// // const moduleA = {
// //     state, mutations, getters
// // }
// export default new Vuex.Store({
//     // modules: { a: moduleA }
//     state, mutations, getters
// })


//第二种写法
const store = new Vuex.Store({
  //  全局状态
  state:{
      count:0,
      name:"张一山"
  },
  //对state进行包装，过滤
  getters:{
      
  },
  //计算属性
  mutations:{
      increment(state,n){
          state.count += n;
      },
      decrement(state,n){
          state.count -= n;
      },
      repalce(state,n){
          state.count = n;
      }
  },
  //数据业务逻辑
  actions:{
      //异步函数调用时也必须异步调用
      async myIncrease(context,obj){

          context.commit('increment',obj);

          const products = [1,2,3,4,5];  //这里可以从服务器获取数据 await axio.get() 用异步操作
          
          return products;
      },
      myDecrease(context){
          context.commit('decrement',1);
      }
  }
})

export default store;