<template lang="pug">
  include ../../utils/bem/index.pug
  +b.user-profile
    +e.P.name {{username}} <span> / {{role}}</span>
    +e.A(class="logout" @click="logout" title="Выйти")
      i.mdi.mdi-exit-to-app
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "UserProfile",
  computed: {
    ...mapState({
      username: state => state.User.profile.username,
      role: state => state.User.profile.role
    })
  },
  methods: {
    logout: function() {
      this.$store.dispatch("Auth/authLogout");
    }
  }
};
</script>

<style lang="scss">
.user-profile {
  display: flex;
  align-items: center;
  &__name {
    margin-right: 15px;
    font-weight: 600;
    span {
      font-weight: 400;
    }
  }
  &__logout {
    cursor: pointer;
    i {
      font-size: 24px;
      color: $color-brand-red;
    }
    &:hover {
      i {
        color: $color-black;
      }
    }
  }
}
</style>
