<template lang="pug">
  include ../../utils/bem/index.pug
  +b.table-component
    table(v-if="body.length")
      thead
        tr
          th(
            v-for="(th, thIndex) in th" 
            :key="thIndex" ) {{th}}
          th(:colspan='actions.length').td-button
      tbody
        tr(
          v-for="(td, tdIndex) in body" 
          :key="tdIndex")
          td(
            v-for="(tdValue, tdValueIndex) in Object.values(td)" 
            :key="tdValueIndex") {{tdValue}}
            
          // Actions buttons
          td.td-button(v-if="canCopy")
            button(
              @click="copy(Object.values(td)[0])" 
              title="Копировать")
              i.mdi.mdi-content-copy
          td.td-button(v-if="canEdit")
            button(
              @click="edit(Object.values(td)[0])" 
              title="Редактировать")
              i.mdi.mdi-pencil
          td.td-button(v-if="canView")
            button(
              @click="view(Object.values(td)[0])" 
              title="Просмотреть детали")
              i.mdi.mdi-eye
          td.td-button(v-if="canRemove")
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
    th: Array,
    body: Array,
    actions: Array,
  },
  computed: {
    canCopy() {
      return this.actions.indexOf("copy") != -1;
    },
    canEdit() {
      return this.actions.indexOf("edit") != -1;
    },
    canView() {
      return this.actions.indexOf("view") != -1;
    },
    canRemove() {
      return this.actions.indexOf("remove") != -1;
    },
  },
  methods: {
    copy(id) {
      this.$emit("copy", id);
    },
    edit(id) {
      this.$emit("edit", id);
    },
    view(id) {
      this.$emit("view", id);
    },
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>

<style lang="scss">
.table-component {
  overflow: auto;
  padding-left: 1px;
  @include sm-block() {
    margin-right: -$offset_one_side * 2;
    margin-left: -$offset_one_side * 2;
    padding-left: $offset_one_side;
  }
  table {
    width: 100%;
  }
  td,
  th {
    display: none;
    &.td-button,
    &:nth-child(-n + 11) {
      display: table-cell;
      @include sm-block() {
        display: none;
      }
    }
    @include sm-block() {
      &.td-button,
      &:nth-child(-n + 5) {
        display: table-cell;
      }
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
    padding-top: 0;
    vertical-align: bottom;
    @include sm-block() {
      min-width: 85px;
    }
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
