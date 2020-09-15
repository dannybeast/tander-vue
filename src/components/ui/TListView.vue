<template lang="pug">
  include ../../utils/bem/index.pug
  div(v-if="viewData")
    .window-header
      +b.H3.window-title {{title}}
    .window-content
      +b.UL.view-table-list
        +e.LI(
          v-for="(item, key, i) in viewData" 
          :key="i"
          v-if="item && item != ''")
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
    title: String
  }
};
</script>

<style lang="scss">
.view-table-list {
  li {
    display: flex;
    align-items: center;
    border-bottom: 1px solid $color-gray-light;
    padding: 10px 15px;
    &:nth-child(odd) {
      background: $color-fog;
    }
  }
  &__name {
    width: 250px;
  }
}
</style>
