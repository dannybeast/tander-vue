<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    +e.H3.title Главная
    
    loading(v-if="loading")
    +e.content(v-else)
      p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    +b.DIV.typography(v-if="$can('read', 'Secret')")
      p Secret content
    //- Can(I="read" a="Post")
    //-   p hello
</template>

<script>
import Loading from "@/components/libs/Loading";
import httpClient from "@/api/httpClient";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { Loading },
  computed: {
    ...mapGetters(["Auth/isAuthenticated", "Auth/authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    },
  },
};
</script>
