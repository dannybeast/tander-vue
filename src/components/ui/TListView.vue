<template lang="pug">
  include ../../utils/bem/index.pug
  div
    .window-header
      +b.H3.window-title {{title}}
    .window-content 
      +b.UL.view-table-list
        +e.LI(
          v-for="(item, key, i) in viewData" 
          :key="item.id" 
          v-if="item != ''")
          +e.P.name {{namesData[i]}}
          +e.P.value
            strong {{item}}

</template>

<script>
export default {
  name: "TListView.",
  props: {
    namesData: Array,
    viewData: Object,
    title: String,
  },
};
</script>

<style lang="scss">
.view-table-list {
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $gray-light;
    padding: 10px 15px;
    &:nth-child(odd) {
      background: $fog;
    }
  }
  &__name {
    width: 250px;
  }
}
</style>
