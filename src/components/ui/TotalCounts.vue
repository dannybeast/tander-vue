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
          td {{cpuProd}}
          td {{ramProd}}
          td {{shdProd}}
        tr
          td Непродуктивная
          td {{cpu}}
          td {{ram}}
          td {{shd}}
</template>

<script>
export default {
  name: "TotalCounts",
  data() {
    return {
      title: "Общее кол-во требуемых ресурсов:",
    };
  },
  props: {
    ram: Number,
    ramProd: Number,
    shd: Number,
    shdProd: Number,
    cpu: Number,
    cpuProd: Number,
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
