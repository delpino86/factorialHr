// import data from "../data.json";

export const state = () => ({
    users: [],
    test: 'Hardcoded',
});
export const getters = {
    users: (state) => state.users,
    test: (state) => state.test,

};

export const actions = {
    async fetchAllUsers({commit}){
        const Users = await this.$axios.$get('/api/users')
        commit('setAllUsers', Users)


    },
    addUser({ commit }, { ...user }) {
        commit("setUser", user);
    },
    async test ({ commit }) {
        const test = await this.$axios.$get('/api/test')
        commit('test', test)
      }
};

export const mutations = {
    setAllUsers(state, users) {
        state.users = users;
    },
    setUser(state, { ...user }) {
        state.users.push(user);
    },
    test(state, test) {
        state.test=test;
    },
};
