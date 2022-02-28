<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-if="createUser" #activator="{ on, attrs }">
                <v-btn text v-bind="attrs" rounded depressed v-on="on">
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
            :title-alert="AlertDialogTitle"
            @cancelAlert="alertValidation = false">
            <v-btn color="blue darken-1" text @click="returnToForm">{{
                AlertReturnBtn
            }}</v-btn>
            <v-btn color="blue darken-1" text @click="closeDialog">{{
                AlertCancelBtn
            }}</v-btn>
        </alert-dialog>
    </v-row>
</template>
<script>
    import { mapGetters } from "vuex";

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
            createUser: {
                type: Boolean,
                default: false,
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
                    "Must have 9 numbers",
            ],
        }),
        computed: {
            ...mapGetters(["emailError"]),

            createNewUser() {
                return Object.keys({ ...this.userToEdit }).length === 0;
            },
            cardTitle() {
                return !this.createNewUser
                    ? `Edit ${this.user.firstName} profile`
                    : "Create new user";
            },
            AlertReturnBtn() {
                if (!this.createNewUser) return `Update ${this.user.firstName}`;
                return "create new user";
            },
            AlertCancelBtn() {
                if (!this.createNewUser)
                    return `Cancel Update ${this.user.firstName}`;
                return "Cancel new user";
            },
            AlertDialogTitle() {
                if (this.emailError.length) return this.emailError;
                return "Some of the data has to be reviwed before carry on";
            },
        },
        watch: {
            editToggle() {
                this.dialog = this.editToggle;
            },
            emailError() {
                this.emailError.length
                    ? (this.alertValidation = true)
                    : (this.alertValidation = false);
            },
            userToEdit: {
                handler(after, before) {
                    this.user.firstName = after.firstName;
                    this.user.secondName = after.lastName;
                    this.user.email = after.email;
                    this.user.telephoneNumber = after.telephoneNumber;
                    this.dirtyFirstName = after.firstName;
                    this.dirtySecondName = after.lastName;
                    this.dirtyEmail = after.email;
                    this.dirtyTelephoneNumber = after.telephoneNumber;
                },
                deep: true,
            },
        },
        methods: {
            validate() {
                const validate = this.$refs.form.validate();
                return validate;
            },
            async addUser() {
                if (this.validate()) {
                    const user = { ...this.user };
                    if (this.createNewUser) {
                        await this.$store.dispatch("addUser", user);
                        if (this.alertValidation) return "";
                        else this.closeDialog();
                    } else {
                        user.id = this.userToEdit.id;
                        this.dirtyFirstName === this.user.firstName
                            ? (user.dirtyFirstName = null)
                            : (user.dirtyFirstName = this.dirtyFirstName);
                        this.dirtySecondName === this.user.secondName
                            ? (user.dirtySecondName = null)
                            : (user.dirtySecondName = this.dirtySecondName);
                        this.dirtyEmail === this.user.email
                            ? (user.dirtyEmail = null)
                            : (user.dirtyEmail = this.dirtyEmail);
                        this.dirtyTelephoneNumber === this.user.telephoneNumber
                            ? (user.dirtyTelephoneNumber = null)
                            : (user.dirtyTelephoneNumber =
                                  this.dirtyTelephoneNumber);
                        if (
                            user.dirtyTelephoneNumber ||
                            user.dirtyFirstName ||
                            user.dirtySecondName ||
                            user.dirtyEmail
                        ) {
                            await this.$store.dispatch("editUser", user);
                            if (this.alertValidation) return "";
                            else this.closeDialog();
                        } else {
                            this.alertValidation = true;
                        }
                    }
                } else {
                    this.alertValidation = true;
                }
            },
            closeDialog() {
                this.alertValidation = false;
                this.dialog = false;
                this.$emit("closeDialog");
                this.resetValidation();
                this.$store.dispatch("resetError");
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            },
            returnToForm() {
                this.$store.dispatch("resetError");
                this.alertValidation = false;
            },
        },
    };
</script>
