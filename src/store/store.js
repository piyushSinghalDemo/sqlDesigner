import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const state = {
  schedulerId: 'hello'
}
const mutations = {
   mutateUpdateSchedulerId: function (state, id) {
      state.schedulerId = id
   }
}
export default new Vuex.Store({
  state
})
