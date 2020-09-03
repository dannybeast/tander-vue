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
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapState({
      username: (state) => state.User.profile.name,
      role: (state) => state.User.profile.role,
    }),
  },
};
</script>
