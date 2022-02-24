<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template #activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    New User
                </v-btn>
            </template>
            <v-card>
                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="addUser">
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
                                        required
                                        :rules="nameRules"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                    <v-text-field
                                        v-model="user.secondName"
                                        label="Second name*"
                                        :rules="nameRules"
                                        hint="example of helper text only on focus"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4"> </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="user.email"
                                        label="Email*"
                                        required
                                        :rules="emailRules"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="user.telephoneNumber"
                                        label="Telephone*"
                                        required
                                        :rules="telephoneRules"></v-text-field>
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
                        <v-btn color="blue darken-1" text type="submit">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
        <alert-dialog
            :activator-alert="alertValidation"
            :title-alert="'Some of the data has to be reviwed before carry on'"
            @cancelAlert="alertValidation = false">
            <v-btn color="blue darken-1" text @click="alertValidation = false"
                >Back to form</v-btn
            >
            <v-btn color="blue darken-1" text @click="closeDialog"
                >Cancel new user</v-btn
            >
        </alert-dialog>
    </v-row>
</template>
<script>
    import AlertDialog from "../components/AlertDialog.vue";

    export default {
        components: {
            AlertDialog,
        },
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
            alertValidation: false,
            valid: true,
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
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
            ],
            nameRules: [
                (v) => !!v || "Name is required",
                (v) =>
                    (v && v.length <= 10) ||
                    "Name must be less than 10 characters",
            ],
            telephoneRules: [
                (v) => !!v || "Telephone number is required",
                (v) =>
                    (v &&
                        v.length <= 15 &&
                        /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{3}$/.test(
                            v
                        )) ||
                    "Must have at least 9 numbers",
            ],
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
            validate() {
                const validate = this.$refs.form.validate();
                return validate;
            },
            addUser() {
                if (this.validate()) {
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
                        this.$store.dispatch("editUser", user);
                        this.closeDialog();
                    }
                } else {
                    this.alertValidation = true;
                }
            },
            closeDialog() {
                this.alertValidation = false;
                this.dialog = false;
                this.$emit("closeDialog");
            },
        },
    };
</script>
