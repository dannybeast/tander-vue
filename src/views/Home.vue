<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    +e.H3.title Главная
    +e.content
      p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    
    +b.DIV.typography(v-if="$can('read', 'AdminText')")
      p Информация доступна только админу

    +b.DIV.typography(v-else-if="$can('read', 'ManagerText')")
      p Информация доступна только менеджеру


</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
};
</script>
