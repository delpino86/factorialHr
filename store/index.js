import data from "../data.json";

export const state = () => ({
    users: data.users,
});
export const getters = {
    users: (state) => state.users,
};

export const actions = {
   
    addUser({ commit }, {...user}) {
        
        commit("setUser", user);
    },
};

export const mutations = {
    setUser(state, { ...user }) {
        
        state.users.push(user) ;
    },
};
