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
            firstName: "",
            secondName: "",
            email: "",
            telephoneNumber: "",
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
                    this.firstName = after.firstName;
                    this.secondName = after.secondName;
                    this.email = after.email;
                    this.telephoneNumber = after.telephoneNumber;
                },
                deep: true,
            },
        },
        methods: {
            addUser() {
                const user = {
                    firstName: this.firstName,
                    secondName: this.secondName,
                    email: this.email,
                    telephoneNumber: this.telephoneNumber,
                };
                if (this.createNewUser) {
                    this.$store.dispatch("addUser", user);
                    this.closeDialog();
                } else {
                    user.id = this.userToEdit.id;

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
