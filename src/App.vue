<template>
  <v-app id="inspire">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    userLogin: {
      get() {
        return this.$store.state.userLogin;
      },
    },
  },
};
</script>
