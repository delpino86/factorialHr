<template>
  <v-container v-if="userFiltered">
        <users-table :users-list="userFiltered" />
    <v-timeline
      :dense="$vuetify.breakpoint.smAndDown"
    >
      <v-timeline-item
        v-for="(update, index) in userUpdates"
        :key="`update-${index}`"
      >
        <span slot="opposite">{{ update.updatedAt}}</span>
        <v-card class="elevation-2">
          <v-list dense>
      <v-subheader>Change N_{{++index}}</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(value, name) in update"
          :key="`item-${name}`"
        >
          <v-list-item-content>
            <v-list-item-title>{{name}} : {{value}}</v-list-item-title>
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
    import { mapGetters } from "vuex";

    import UsersTable from "@/components/UsersTable.vue";

  export default {
      components:{UsersTable},
    data: () => ({
    }),
    computed: {
            ...mapGetters(["users", "userUpdates"]),
            userFiltered(){
                const user = this.users.filter(usr => usr.id === parseInt(this.$route.params.id));
                return user

            },

    },
        async mounted() {
            await this.$store.dispatch("fetchUser", this.$route.params.id);
            await this.$store.dispatch("fetchUserUpdates", this.$route.params.id);

        },
  }
</script>