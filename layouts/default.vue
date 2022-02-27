<template>
    <v-app dark>
        <v-app-bar :clipped-left="clipped" fixed app>
            <v-btn
                v-if="landingPage"
                text
                depressed
                rounded
                :to="{ name: 'index' }">
                Users list
            </v-btn>
            <v-spacer />
        </v-app-bar>
        <v-main>
            <v-container>
                <Nuxt />
            </v-container>
        </v-main>
        <v-container>
            <v-footer fixed app>
                <v-row justify="center">
                    <span class="py-5"
                        >&copy; Ivan del Pino
                        {{ new Date().getFullYear() }}</span
                    >
                </v-row>
            </v-footer>
            <scroll-up class="mr-5 mb-5" />
        </v-container>
    </v-app>
</template>

<script>
    import ScrollUp from "@/components/ScrollUp";
    export default {
        name: "DefaultLayout",
        components: {
            ScrollUp,
        },
        data() {
            return {
                clipped: false,
                drawer: false,
                fixed: false,
                items: [
                    {
                        icon: "mdi-apps",
                        title: "Welcome",
                        to: "/",
                    },
                    {
                        icon: "mdi-chart-bubble",
                        title: "Inspire",
                        to: "/inspire",
                    },
                ],
                miniVariant: false,
                right: true,
                rightDrawer: false,
            };
        },
        computed: {
            landingPage() {
                return this.$route.name !== "index";
            },
        },
    };
</script>
