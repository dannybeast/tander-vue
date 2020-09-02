<template lang="pug">
  include ../../utils/bem/index.pug
  +b.NAV.nav
    +e.UL.list
      li
        router-link(to="/") Главная
      li
        router-link(to="/account") Аккаунт
      li
        a(@click="logout") Выход
</template>

<script>
export default {
  methods: {
    logout: function() {
      this.$store.dispatch("Auth/AUTH_LOGOUT");
    }
  }
};
</script>

<style scoped>
a {
  cursor: pointer;
  color: #000;
  text-decoration: underline;
}
</style>