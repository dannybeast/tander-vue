<template lang="pug">
  include ../../utils/bem/index.pug
  +b.table-component
    table(v-if="tableBodyList.length")
      thead
        tr
          th(
            v-for="(th, thInd) in tableHeadersList" 
            :key="thInd" ) {{th}}
          th(colspan='3').td-button
      tbody
        tr(
          v-for="(td, tdInd) in tableBodyList" 
          :key="tdInd")
          td(
            v-for="(tdValue, tdValueInd) in Object.values(td)" 
            :key="tdValueInd") {{tdValue | formatNameInfrastructure(Object.keys(td)[tdValueInd])}}
          td.td-button
            button(
              @click="copy(Object.values(td)[0])" 
              title="Копировать")
              i.mdi.mdi-content-copy
          td.td-button
            button(
              @click="edit(Object.values(td)[0])" 
              title="Редактировать")
              i.mdi.mdi-pencil
          td.td-button
            button(
              @click="remove(Object.values(td)[0])" 
              title="Удалить")
              i.mdi.mdi-delete

    p(v-else) {{emptyText}}
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TTable",

  data() {
    return {
      emptyText: "Пусто...",
    };
  },

  props: {
    tableHeadersList: Array,
    tableBodyList: Array,
  },
  methods: {
    copy(id) {
      this.$emit("copy", id);
    },
    edit(id) {
      this.$emit("edit", id);
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style lang="scss">
.table-component {
  table {
    width: 100%;
  }
  td,
  th {
    display: none;
    &.td-button,
    &:nth-child(-n + 11) {
      display: table-cell;
    }
    &:first-child {
      display: none;
    }
  }
  th {
    font-weight: 500;
    color: $black-light;
    font-size: 12px;
    line-height: 1.15;
    vertical-align: bottom;
  }
  tr {
    cursor: pointer;
    &:hover {
      td {
        background: #fff;
      }
    }
  }

  .td-button {
    width: 50px;
    button {
      cursor: pointer;
      background: transparent;
      i {
        font-size: 24px;
        color: $black;
      }
      &:hover {
        i {
          color: $red;
        }
      }
    }
  }
}
</style>
