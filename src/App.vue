<template lang="pug">
  include ./utils/bem/index.pug
  #app
    main-layout
      // Loader
      loading(v-if="authStatus === 'loading'")
      // Content
      div(v-else)
        navigation(v-if="isAuth")
        router-view
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Navigation from "@/components/ui/Navigation";
import MainLayout from "@/components/layout/MainLayout";
import Loading from "@/components/ui/Loading";

export default {
  components: {
    Navigation,
    MainLayout,
    Loading
  },
  computed: {
    ...mapGetters({ isAuth: "Auth/isAuthenticated" }),
    ...mapGetters({ authStatus: "Auth/authStatus" })
  },
  created: function() {
    if (this.isAuth) {
      // TODO: localstorage удалить после связки с бекендом
      this.$store.dispatch("User/USER_REQUEST", JSON.parse(localStorage.getItem('profile')));
    }
  }
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
