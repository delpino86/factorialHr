export const state = () => ({
    users: [],
});
export const getters = {
    users: (state) => state.users,
};

export const actions = {
    async fetchAllUsers({ commit }) {
        const Users = await this.$axios.$get("/api/users");
        commit("setAllUsers", Users);
    },
    async addUser({ commit }, user) {
        const User = await this.$axios.$post("/api/user-create", { ...user });

        commit("setUser", User);
    },
    async deleteUser({ commit }, user) {
        const User = await this.$axios.$delete(`/api/user-delete/${user.id}`);
        if (User) commit("deleteUser", user);
    },
};

export const mutations = {
    setAllUsers(state, users) {
        state.users = users;
    },
    setUser(state, { ...user }) {
        state.users.push(user);
    },
    deleteUser(state, { ...user }) {
        state.users = state.users.filter(
            (stateUser) => stateUser.id !== user.id
        );
    },
};
