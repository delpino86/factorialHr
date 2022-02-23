<template>
    <v-row justify="center" align="center">
        <v-col cols="12" sm="8" md="6">
            <v-card class="logo py-4 d-flex justify-center"> </v-card>
            <v-card>
                <v-card-title class="headline"> Users List </v-card-title>
                <v-card-text>
                    <p>
                        Vuetify is a progressive Material Design component
                        framework for Vue.js. It was designed to empower
                        developers to create amazing applications.
                    </p>
                </v-card-text>
                <v-list flat class="my-9">
                    <user-form />

                    <v-subheader>Users</v-subheader>
                    <v-list-item-group
                        v-if="users"
                        v-model="selectedUser"
                        color="primary">
                        <v-list-item
                            v-for="(user, index) in users"
                            :key="`user-${index}`">
                            <v-list-item-icon v-if="user">
                                <v-avatar color="red">
                                    <span
                                        class="white--text text-h5"
                                        v-text="nameInitials(user)"></span>
                                </v-avatar>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="
                                        `${user.firstName} ${user.secondName}`
                                    "></v-list-item-title>
                            </v-list-item-content>
                            <v-btn
                                color="secondary"
                                fab
                                x-small
                                dark
                                @click.prevent="deleteUser(user)">
                                <v-icon>mdi-delete-sweep-outline</v-icon>
                            </v-btn>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-card-actions>
                    <v-spacer />
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
    import { mapGetters } from "vuex";
    import UserForm from "../components/UserForm.vue";

    export default {
        name: "IndexPage",
        components: {
            UserForm,
        },
        data() {
            return {
                selectedUser: 1,
            };
        },
        computed: {
            ...mapGetters(["users"]),
        },
        mounted() {
            this.$store.dispatch("fetchAllUsers");
        },
        methods: {
            nameInitials(user) {
                const firstNameInitial = user?.firstName.charAt(0).toUpperCase();
                const secondNameInitial = user?.secondName
                    .charAt(0)
                    .toUpperCase();
                return "" ||`${firstNameInitial} ${secondNameInitial}`;
            },
            deleteUser(user) {
                this.$store.dispatch("deleteUser", user);
            },
        },

};
</script>
