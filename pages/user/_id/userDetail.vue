<template>
    <v-container v-if="userFiltered">
        <users-table :users-list="userFiltered" />
        <v-timeline :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item
                v-for="(update, index) in fieldsUpdated"
                :key="`update-${index}`">
                <span slot="opposite">{{ humanizedTimeStamp(update.updatedAt) }}</span>
                <v-card class="elevation-2">
                    <v-list dense>
                        <v-subheader>Change N_{{ ++index }}</v-subheader>
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
    </v-container>
</template>
<script>
    import { mapGetters } from "vuex"
    import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
    import UsersTable from "@/components/UsersTable.vue";
dayjs.extend(relativeTime);


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
            fieldsUpdated() {
                const changedFields = this.userUpdates.map((update) => {
                    const newObject = {};
                    Object.keys(update).forEach((field) => {
                        if (update[field] !== null && update[field] !== "")
                            newObject[field] = update[field];
                    });
                    return newObject;
                });
                return changedFields.reverse();
            },
        },
        async mounted() {
            await this.$store.dispatch("fetchUser", this.$route.params.id);
            await this.$store.dispatch(
                "fetchUserUpdates",
                this.$route.params.id
            );
        },
        methods: {
humanizedTimeStamp(date) {
              return dayjs.unix(dayjs(date).unix()).fromNow()
            }
        },
    };
</script>
