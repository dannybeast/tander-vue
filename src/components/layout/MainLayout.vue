<template lang="pug">
  include ../../utils/bem/index.pug
  +b.container
    t-header(:user="user")
    slot
</template>

<script>
import { THeader } from "@/libs/tander-ui";
import { mapGetters } from "vuex";

export default {
  components: {
    THeader
  },
  computed: {
    ...mapGetters({
      user: state => state.User.profile
    })
  }
};
</script>