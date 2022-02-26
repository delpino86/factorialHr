<template>
    <v-container v-if="userFiltered">
        <users-table :users-list="userFiltered" />
        <v-timeline
            v-if="fieldsUpdated.length"
            :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
                v-for="(update, index) in fieldsUpdated"
                :key="`update-${index}`">
                <span slot="opposite">{{
                    userReverseUpdates[index].updatedAt
                }}</span>
                <v-card class="elevation-2">
                    <v-list dense>
                        <v-subheader
                            >Change N_{{
                                userReverseUpdates.length - index
                            }}</v-subheader
                        >
                        <v-list-item-group color="primary">
                            <v-list-item
                                v-for="(value, name) in update"
                                :key="`item-${name}`">
                                <v-list-item-content>
                                    <v-list-item-title
                                        >{{ name }} :
                                        {{ value }}</v-list-item-title
                                    >
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-timeline-item>
        </v-timeline>
        <h3 v-else class="mt-10 text-center" v-text="noUpdatesText"></h3>
    </v-container>
</template>
<script>
    import { mapGetters } from "vuex";
    import UsersTable from "@/components/UsersTable.vue";

    export default {
        components: { UsersTable },
        data: () => ({}),
        computed: {
            ...mapGetters(["users", "userUpdates"]),
            userFiltered() {
                const user = this.users.filter(
                    (usr) => usr.id === parseInt(this.$route.params.id)
                );
                return user;
            },
            noUpdatesText() {
                if (this.userFiltered)
                    return `Any update has been applied to ${this.userFiltered[0]?.firstName} ${this.userFiltered[0]?.lastName}`;
                return "Something whent grong any data to show";
            },
            userReverseUpdates() {
                const updates = [...this.userUpdates];
                return updates.reverse();
            },
            fieldsUpdated() {
                const changedFields = this.userReverseUpdates
                    .filter(
                        (update) =>
                            update.userId === parseInt(this.$route.params.id)
                    )
                    .map((update) => {
                        const newObject = {};
                        Object.keys(update).forEach((field) => {
                            if (
                                field !== "updatedAt" &&
                                field !== "userId" &&
                                field !== "id"
                            ) {
                                if (
                                    update[field] !== null &&
                                    update[field] !== ""
                                )
                                    newObject[field] = update[field];
                            }
                        });
                        return newObject;
                    });
                return changedFields;
            },
        },
        async mounted() {
            await this.$store.dispatch("fetchUser", this.$route.params.id);
            await this.$store.dispatch(
                "fetchUserUpdates",
                this.$route.params.id
            );
        },
    };
</script>
