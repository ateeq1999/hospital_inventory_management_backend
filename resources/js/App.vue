<template>
  <v-app id="inspire" dark>
    <Sidebar :drawer="drawer" v-if="this.$store.getters['Auth/isLoggedIn']" />
    <Topbar @drawerEvent="drawer = !drawer" v-if="this.$store.getters['Auth/isLoggedIn']" />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
export default {
  name: "App",
  components: { Topbar, Sidebar },
  data: () => ({
    cards: ["Today", "Yesterday"],
    drawer: null,
  }),
  methods: {},
};
</script>