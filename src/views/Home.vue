<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    .container

      request-list(v-if="$can('read', 'requestInfrastructure')")

      +e.content(v-if="$can('read', 'processInfrastructure')")
        

</template>

<script>
import { mapGetters } from "vuex";
import requestList from "@/components/requestList";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    requestList,
  },
};
</script>
