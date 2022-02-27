<template>
    <v-container>
        <users-table :users-list="users" :user-profile="true" />
    </v-container>
</template>

<script>
    import { mapGetters } from "vuex";
    import UsersTable from "../components/UsersTable.vue";

    export default {
        name: "IndexPage",
        components: {
            UsersTable,
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
                return "" || `${firstNameInitial} ${secondNameInitial}`;
            },
            deleteUser(user) {
                this.$store.dispatch("deleteUser", user);
            },
        },
    };
</script>
