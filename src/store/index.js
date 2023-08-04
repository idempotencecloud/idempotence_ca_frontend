// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    agent: null,
  },
  mutations: {
    setAgent(state, agent) {
      state.agent = agent;
    },
  },
});

export default store;
