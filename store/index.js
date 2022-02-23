export const state = () => ({
    users: [],
    dialog: false,
});
export const getters = {
    users: (state) => state.users,
    dialog: (state) => state.dialog,
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
    async editUser({ commit }, user) {
        const User = await this.$axios.$put(`/api/user-edit/${user.id}`, {
            ...user,
        });
        console.log(User);
        if (User) commit("editUser", User);
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
    editUser(state, { ...user }) {
        const newUsersList = state.users.filter(
            (stateUser) => stateUser.id !== user.id
        );
        newUsersList.push(user);
        state.users = newUsersList;
        console.log(state.users);
    },
};
