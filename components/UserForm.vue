<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    New User
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">User Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="firstName"
                                    label="First name*"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="secondName"
                                    label="Second name"
                                    hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4"> </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="email"
                                    label="Email*"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="telephoneNumber"
                                    label="Telephone*"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1"  text @click="addUser">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        data: () => ({
            dialog: false,
            firstName: "",
            secondName: "",
            email: "",
            telephoneNumber: "",
        }),
        methods: {
            addUser() {
                const user = {
                    firstName: this.firstName,
                    secondName: this.secondName,
                    email: this.email,
                    telephoneNumber: this.telephoneNumber,
                };
                this.$store.dispatch("addUser", user);
                this.dialog = false
            },
        },
    };
</script>
