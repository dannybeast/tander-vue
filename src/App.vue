<template lang="pug">
  include ./utils/bem/index.pug
  #app
    main-layout
      navigation(v-if="isAuth")
      router-view
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/libs/Navigation";
import MainLayout from "@/components/layout/MainLayout";

export default {
  components: {
    Navigation,
    MainLayout,
  },
  computed: {
    ...mapGetters({ isAuth: "Auth/isAuthenticated" }),
  },
  created: function() {
    if (this.isAuth) {
      this.$store.dispatch("User/USER_REQUEST");
    }
  },
  mounted() {},
};
</script>
<style lang="scss">
@import "./assets/scss/smart-grid";
#app {
  font-family: "Arial", sans-serif;
}
.container {
  @include wrapper();
}
.page {
  &__title {
    text-align: center;
    font-size: 28px;
    font-weight: 100;
  }
}
</style>
