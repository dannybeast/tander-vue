<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    +e.H3.title Главная
    +e.content
      p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    //- +b.DIV.typography(v-if="$can('read', 'SecretText')")
    //-   p Информация доступна только админу

    //- Can(I="read" a="Secret")
    //-   p Информация доступна менеджеру и админу

</template>

<script>
import httpClient from "@/api/httpClient";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: { Loading },
  computed: {
    ...mapGetters(["Auth/isAuthenticated", "Auth/authStatus"])
  }
};
</script>
