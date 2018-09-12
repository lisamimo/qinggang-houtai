import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let defaultName = '万利'
if (localStorage.name) {
	defaultName = localStorage.name
}

export default new Vuex.Store({
  state: {
    name: defaultName
  },
  mutations: {
    changeName(state, name) {
    	state.name = name;
    	try {
    	  localStorage.name = name;
      } catch(e) {}
    }
  },
  actions: {

  }
})
