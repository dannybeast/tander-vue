<template lang="pug">
  include ../../utils/bem/index.pug
  +b.container
    t-header(:user="user")
    slot
</template>

<script>
import { THeader } from "@/libs/tander-ui";
import { mapState } from "vuex";

export default {
  components: {
    THeader
  },
  computed: {
    ...mapState({
      user: state => state.User.profile
    })
  }
};
</script>