<template lang="pug">
  include ../../utils/bem/index.pug
  +b.container
    t-header(:user="profile")
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
    ...mapGetters({profile: 'User/getProfile'})
  }
};
</script>