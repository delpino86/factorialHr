<template>
    <v-dialog v-model="alertDialog" max-width="500px">
        <v-card>
            <v-card-title class="text-subtitle-1 text-center">{{
                titleAlert
            }}</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <slot></slot>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        props: {
            titleAlert: {
                type: String,
                default: () => "",
            },
            activatorAlert: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
                alertDialog: this.activatorAlert,
            };
        },
        watch: {
            activatorAlert() {
                this.alertDialog = this.activatorAlert;
            },
        },
        methods: {
            cancelAlert() {
                this.alertDialog = false;
                this.$emit("cancelAlert");
            },
        },
    };
</script>
