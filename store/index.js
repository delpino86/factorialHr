import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const state = () => ({
    users: [],
    dialog: false,
    userUpdates: [],
    emailError: "",
});
export const getters = {
    users: (state) => state.users,
    dialog: (state) => state.dialog,
    userUpdates: (state) => state.userUpdates,
    emailError: (state) => state.emailError,
};

export const actions = {
    async fetchAllUsers({ commit }) {
        const Users = await this.$axios.$get("/api/users");
        Users.forEach((user) => {
            commit("setUser", user);
        });
    },
    async fetchUser({ commit }, id) {
        const User = await this.$axios.$get(`/api/user/${id}`);
        commit("setUser", User);
        return User;
    },
    async fetchUserUpdates({ commit }, id) {
        const Updates = await this.$axios.$get(`/api/userUpdates/${id}`);
        const updatesArray = Object.keys(Updates).map(function (key) {
            return Updates[key];
        });
        updatesArray.forEach((update) => commit("setUpdate", update));

        return Updates;
    },
    async addUser({ commit }, user) {
        const User = await this.$axios.$post("/api/user-create", { ...user });
        if (typeof User === "object") {
            commit("setUser", User);
            commit("setEmailError", "");
        } else {
            commit("setEmailError", User);
        }
    },
    async deleteUser({ commit }, user) {
        const User = await this.$axios.$delete(`/api/user-delete/${user.id}`);
        if (User) {
            commit("deleteUser", user);
            commit("deleteUserUpdates", user);
        }
    },
    async editUser({ commit, dispatch }, user) {
        const User = await this.$axios.$put(`/api/user-edit/${user.id}`, {
            ...user,
        });

        if (typeof User === "object") {
            commit("editUser", User);
            dispatch("addUserUpdate", user);
        } else {
            commit("setEmailError", User);
        }
    },
    async addUserUpdate({ commit }, user) {
        const Update = await this.$axios.$post(
            `/api/user-save-edit/${user.id}`,
            {
                ...user,
            }
        );
        if (Update) commit("setUpdate", Update);
    },
    resetError({ commit }) {
        commit("setEmailError", "");
    },
};

export const mutations = {
    setUser(state, { ...user }) {
        user.createdAt = dayjs.unix(dayjs(user.createdAt).unix()).fromNow();

        const userExists = state.users.filter(
            (userState) => userState.id === user.id
        );
        if (!userExists.length) state.users.push(user);
    },
    setEmailError(state, userError) {
        state.emailError = userError;
    },
    setUserUpdates(state, { ...Updates }) {
        const updatesArray = Object.keys(Updates).map(function (key) {
            return Updates[key];
        });
        state.userUpdates = updatesArray;
    },
    setUpdate(state, { ...Update }) {
        Update.updatedAt = dayjs.unix(dayjs(Update.updatedAt).unix()).fromNow();
        const exist = state.userUpdates.find(
            (updated) => updated.id === Update.id
        );
        if (!exist) state.userUpdates.push(Update);
    },
    deleteUser(state, { ...user }) {
        state.users = state.users.filter(
            (stateUser) => stateUser.id !== user.id
        );
    },
    deleteUserUpdates(state, { ...user }) {
        state.userUpdates = state.userUpdates.filter(
            (updates) => updates.userId !== user.id
        );
    },
    editUser(state, { ...user }) {
        user.createdAt = dayjs.unix(dayjs(user.createdAt).unix()).fromNow();
        const newUsersList = state.users.filter(
            (stateUser) => stateUser.id !== user.id
        );
        newUsersList.push(user);
        state.users = newUsersList;
    },
};
