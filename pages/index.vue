<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
      </v-card>
      <v-card>
        <v-card-title class="headline">
          Welcome Factorial
        </v-card-title>
        <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
        </v-card-text>
        <v-list flat class="my-9">
                    <v-btn color="primary" @click.prevent="addUser"> addUser </v-btn>

      <v-subheader>Users</v-subheader>
      <v-list-item-group
        v-model="selectedUser"
        color="primary"
      >
        <v-list-item
          v-for="(user, index) in users"
          :key="`user-${index}`"
        >
          <v-list-item-icon>
             <v-avatar>
      <img
        :src="user.avatar"
        :alt="user.firstName"
      >
    </v-avatar>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.firstName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
        <v-card-actions>
          <v-spacer />
          <!-- <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
    import { mapGetters } from "vuex";

export default {
  name: 'IndexPage',
  data() {
    return{
      selectedUser: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }
  },  
computed: {
            ...mapGetters(["users"]),
        },
methods: {
  addUser() {
    const user = {
            firstName: "Pedro",
            secondName: "Rodriguez",
            avatar: "https://source.unsplash.com/random/?men",
            email: "delPino@gmail.com",
            telephoneNumber: "666666666",
            id: "-KpR7vRkiRPpbUd_Pedro",
            createddAt: 1594035908
        };
    this.$store.dispatch('addUser', user)

  }
}

}
</script>
