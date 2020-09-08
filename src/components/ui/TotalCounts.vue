<template lang="pug">
  include ../../utils/bem/index.pug
  +b.total-counts 
    +e.H3.title {{title}}
    table
      thead
        tr
          th Среда 
          th vCPU
          th RAM
          th СХД
      tbody
        tr
          td Продуктивная
          td 60
          td 144
          td 1246
        tr
          td Непродуктивная
          td 16
          td 32
          td 214
</template>

<script>
export default {
  name: "TotalCounts",
  data() {
    return {
      title: "Общее кол-во требуемых ресурсов:",
    };
  },
};
</script>

<style lang="scss">
.total-counts {
  max-width: 550px;
  &__title {
    font-size: 28px;
    font-weight: 300;
    margin-bottom: 15px;
  }
}
</style>
