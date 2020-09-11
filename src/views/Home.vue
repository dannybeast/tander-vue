<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    .container
      request-list

</template>

<script>
import { mapGetters } from "vuex";
import RequestList from "@/components/RequestList";

export default {
  name: "Home",
  components: {
    RequestList,
  },
};
</script>
