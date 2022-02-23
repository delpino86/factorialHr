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
                    <span class="text-h5">{{ cardTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="user.firstName"
                                    label="First name*"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    v-model="user.secondName"
                                    label="Second name"
                                    hint="example of helper text only on focus"></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4"> </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="user.email"
                                    label="Email*"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="user.telephoneNumber"
                                    label="Telephone*"
                                    required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="addUser">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
    export default {
        props: {
            editToggle: {
                type: Boolean,
                default: false,
            },
            userToEdit: {
                type: Object,
                default: () => {},
            },
        },
        data: () => ({
            dialog: false,
            user: {
                firstName: "",
                secondName: "",
                email: "",
                telephoneNumber: "",
            },
            dirtyFirstName: "",
            dirtySecondName: "",
            dirtyEmail: "",
            dirtyTelephoneNumber: "",
        }),
        computed: {
            usersssss() {
                return this.userToEdit;
            },
            createNewUser() {
                return Object.keys({ ...this.userToEdit }).length === 0;
            },
            cardTitle() {
                return !this.createNewUser
                    ? `Edit ${this.firstName} profile`
                    : "Create new user";
            },
        },
        watch: {
            editToggle() {
                this.dialog = this.editToggle;
            },
            userToEdit: {
                handler(after, before) {
                    this.user.firstName = after.firstName;
                    this.user.secondName = after.lastName;
                    this.user.email = after.email;
                    this.user.telephoneNumber = after.telephoneNumber;
                },
                deep: true,
            },
            user: {
                handler(after, before) {
                    this.dirtyFirstName = before.firstName;
                    this.dirtySecondName = before.lastName;
                    this.dirtyEmail = before.email;
                    this.dirtytelephoneNumber = before.telephoneNumber;
                },
                deep: true,
            },
        },
        methods: {
            addUser() {
                const user = { ...this.user };
                if (this.createNewUser) {
                    this.$store.dispatch("addUser", user);
                    this.closeDialog();
                } else {
                    user.id = this.userToEdit.id;
                    user.dirtyFirstName = this.dirtyFirstName;
                    user.dirtySecondName = this.dirtySecondName;
                    user.dirtyEmail = this.dirtyEmail;
                    user.dirtyTelephoneNumber = this.dirtyTelephoneNumber;
                    console.log(user);
                    this.$store.dispatch("editUser", user);
                    this.closeDialog();
                }
            },
            closeDialog() {
                this.dialog = false;
                this.$emit("closeDialog");
            },
        },
    };
</script>
