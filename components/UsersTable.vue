<template>
    <v-data-table
        :headers="headers"
        :items="users"
        sort-by="createdAt"
        class="elevation-1"
        :hide-default-footer="!usersLength">
        <template #top>
            <v-toolbar flat>
                <v-toolbar-title>Users Table</v-toolbar-title>
                <v-spacer></v-spacer>
                <user-form
                    :edit-toggle="dialog"
                    :user-to-edit="editedItem"
                    :create-user="userProfile"
                    @closeDialog="dialogClosed"></user-form>
                <alert-dialog
                    :activator-alert="dialogDelete"
                    :title-alert="'Are you sure you want to delete this item?'"
                    @cancelAlert="dialogDelete = false">
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialogDelete = false"
                        >Back</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                        >Ok</v-btn
                    >
                </alert-dialog>
            </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
            <v-tooltip top>
                <template #activator="{ on, attrs }">
                    <v-btn
                        v-if="userProfile"
                        class="mr-2"
                        color="transparent"
                        fab
                        x-small
                        depressed
                        :to="{
                            name: 'user-id-userDetail',
                            params: { id: item.id },
                        }"
                        v-bind="attrs"
                        v-on="on">
                        <v-icon>mdi-face-man-shimmer-outline</v-icon>
                    </v-btn>
                </template>
                <span class="caption">Go to user details</span>
            </v-tooltip>
            <v-tooltip top>
                <template #activator="{ on, attrs }">
                    <v-btn
                        class="mr-2"
                        color="transparent"
                        fab
                        x-small
                        depressed
                        v-bind="attrs"
                        @click="editItem(item)"
                        v-on="on">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
                <span class="caption">Edit user details</span>
            </v-tooltip>
            <v-tooltip top>
                <template #activator="{ on, attrs }">
                    <v-btn
                        class="mr-2"
                        color="transparent"
                        fab
                        x-small
                        depressed
                        v-bind="attrs"
                        @click="deleteItem(item)"
                        v-on="on">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span class="caption">Delete user details</span>
            </v-tooltip>
        </template>
        <template #no-data>
            <h3 class="my-10 text-center font-weight-black text-uppercase">- There are any records to show - </h3>
        </template>
    </v-data-table>
</template>
<script>
    import UserForm from "../components/UserForm.vue";
    import AlertDialog from "../components/AlertDialog.vue";

    export default {
        components: { UserForm, AlertDialog },
        props: {
            usersList: {
                type: Array,
                default: () => [],
            },
            userProfile: {
                type: Boolean,
                default: false,
            },
        },
        data: () => ({
            dialog: false,
            dialogDelete: false,
            headers: [
                {
                    text: "NAME",
                    align: "start",
                    sortable: false,
                    value: "firstName",
                },
                { text: "SURNAME", value: "lastName" },
                { text: "EMAIL", value: "email" },
                { text: "TELEPHONE", value: "telephoneNumber" },
                { text: "CREATED", value: "createdAt" },
                { text: "ACTIONS", value: "actions", sortable: false },
            ],
            users: [],
            editedIndex: -1,
            editedItem: {},
            defaultItem: {
                name: "",
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "New Item" : "Edit Item";
            },
            usersLength() {
                return this.usersList.length > 1;
            },
        },

        watch: {
            dialog(val) {
                val || this.closeDelete();
            },
            usersList: {
                handler(after, before) {
                    this.users = after;
                },
                deep: true,
            },
            dialogDelete(val) {
                val || this.closeDelete();
            },
        },

        created() {
            this.initialize();
        },

        methods: {
            initialize() {
                this.users = this.usersList;
            },

            editItem(item) {
                this.editedIndex = this.users.indexOf(item);
                this.editedItem = item;
                this.dialog = true;
            },
            dialogClosed() {
                this.dialog = false;
                this.editedItem = {};
            },

            deleteItem(item) {
                this.editedIndex = this.users.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
            },

            deleteItemConfirm() {
                this.$store.dispatch("deleteUser", this.editedItem);
                this.closeDelete();
                if (this.$route.name !== "index")
                    this.$router.push({ name: "index" });
            },

            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = {};
                    this.editedIndex = -1;
                });
            },

            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = {};
                    this.editedIndex = -1;
                });
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(
                        this.desserts[this.editedIndex],
                        this.editedItem
                    );
                } else {
                    this.desserts.push(this.editedItem);
                }
                this.close();
            },
        },
    };
</script>
