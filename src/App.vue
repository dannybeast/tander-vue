<template lang="pug">
  include ./utils/bem/index.pug
  #app
    notifications(group="foo" position="bottom right")
    main-layout
      t-loader(v-if="authStatus === 'loading'")
      transition(v-else name="fade" mode="out-in")
        router-view
       
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import MainLayout from "@/components/layout/MainLayout";
import TLoader from "@/components/ui/TLoader";

export default {
  components: {
    MainLayout,
    TLoader,
  },
  computed: {
    ...mapGetters({
      isAuth: "Auth/isAuthenticated",
      authStatus: "Auth/authStatus",
    }),
  },
  created: function() {
    if (this.isAuth) {
      // TODO
      this.$store.dispatch(
        "User/userRequest",
        JSON.parse(localStorage.getItem("profile"))
      );
    }
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700&display=swap");
// https://materialdesignicons.com/
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css");
@import "vue-select/src/scss/vue-select.scss";
@import "@/assets/scss/reset";
@import "@/assets/scss/tables";
@import "@/assets/scss/fields";
@import "@/assets/scss/modals";
html,
body,
#app {
  min-height: 100vh;
  background: $fog;
}

#app {
  font-family: $mainFont;
}
.container {
  @include wrapper();
}
.container-fluid {
  @include wrapper-full();
}
.page {
  flex-grow: 1;
  padding-left: $offset_one_side;
  padding-right: $offset_one_side;
  padding-bottom: 60px;
  &__top {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__title {
    text-align: center;
    font-size: 28px;
    font-weight: 300;
  }
  &__content {
    section {
      margin-bottom: 40px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
