<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    +e.H3.title Ваш профиль
    ul
      li Пользователь: {{username}}
      li Права: {{role}}

</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Account",
  computed: {
    ...mapState({
      username: state => state.User.profile.username,
      role: state => state.User.profile.rules
    })
  }
};
</script>
