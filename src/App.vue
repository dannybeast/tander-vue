<template lang="pug">
  include ./utils/bem/index.pug
  #app
    navigation(v-if="isAuth")
    router-view
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/libs/Navigation";

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapGetters({ isAuth: "Auth/isAuthenticated" })
  },
  created: function() {
    if (this.isAuth) {
      this.$store.dispatch("User/USER_REQUEST");
    }
  }
};
</script>
<style lang="scss">
</style>