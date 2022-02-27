<template>
    <v-btn
        v-show="fab"
        key="mdi-chevron-up-circle-outline"
        v-scroll="onScroll"
        fab
        fixed
        bottom
        right
        elevation="6"
        @click="$vuetify.goTo(0, { duration: 860, easing: 'easeInOutQuart' })">
        <v-icon>mdi-chevron-up-circle-outline</v-icon>
    </v-btn>
</template>
<script>
    export default {
        data() {
            return {
                fab: false,
            };
        },
        methods: {
            onScroll(e) {
                if (typeof window === "undefined") return;
                const top = window.pageYOffset || e.target.scrollTop || 0;
                this.fab = top > 20;
            },
        },
    };
</script>
