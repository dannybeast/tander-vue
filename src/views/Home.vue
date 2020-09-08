<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    .container
      
      +e.top
        +e.H3.title {{title}}
        t-button(size="small" red label="Добавить" icon="plus-circle-outline" @onClick="openModalRequest()")
      
      +e.content

        //
        section
          t-loader(v-if="infrastructureStatus === 'loading'")
          t-table(v-else :tableHeadersList="tableHeadersList" :tableBodyList="tableBodyList" @copy="copy($event)" @edit="edit($event)" @remove="remove($event)")
        
        //
        section(v-if="tableBodyList.length")
          total-counts

    modal(name="requestModal" :width="1000" height="auto" :scrollable="true")
      request-form(@successRequest="closeModalRequest()")
    
    modal(name="editModal" :width="1000" height="auto" :scrollable="true")
      request-form(@successEdit="closeModalEdit()" edit="true")
      

    //- +b.DIV.typography(v-if="$can('read', 'AdminText')")
    //-   p Информация доступна только админу

    //- +b.DIV.typography(v-else-if="$can('read', 'ManagerText')")
    //-   p Информация доступна только менеджеру


</template>

<script>
import { mapGetters } from "vuex";
import requestForm from "@/components/forms/requestForm";
import TButton from "@/components/ui/TButton";
import TTable from "@/components/ui/TTable";
import TLoader from "@/components/ui/TLoader";
import TotalCounts from "@/components/ui/TotalCounts";
const title = "Запрос на оценку инфраструктуры";

export default {
  name: "Home",
  data() {
    return {
      title: title,
    };
  },
  metaInfo: {
    title: title,
  },
  created() {
    this.$store.dispatch("Infrastructure/GET_INFRASTUCTURE");
  },
  computed: {
    ...mapGetters({
      tableHeadersList: "Infrastructure/getInfrastructureNames",
      tableBodyList: "Infrastructure/getInfrastructureList",
      infrastructureStatus: "Infrastructure/infrastructureStatus",
    }),
  },
  methods: {
    openModalRequest() {
      this.$modal.show("requestModal");
    },
    closeModalRequest() {
      this.$modal.hide("requestModal");
      this.$notify({
        group: "foo",
        type: "success",
        title: "Успешно добавлено",
      });
    },
    copy({ obj, id }) {
      this.$store.dispatch("Infrastructure/COPY_INFRASTUCTURE", id).then(() => {
        // TODO
        this.tableBodyList.push(obj);
        this.$notify({
          group: "foo",
          type: "success",
          title: "Успешно скопировано",
        });
      });
    },
    edit({ id }) {
      this.$modal.show("editModal");
      this.$store
        .dispatch("Infrastructure/GET_BY_ID_INFRASTUCTURE", id)
        .then(() => {});
    },
    remove({ ind, id }) {
      this.$store
        .dispatch("Infrastructure/REMOVE_INFRASTUCTURE", id)
        .then(() => {
          // TODO
          this.tableBodyList.splice(ind, 1);
          this.$notify({
            group: "foo",
            type: "success",
            title: "Успешно удалено",
          });
        });
    },
  },
  components: {
    requestForm,
    TTable,
    TLoader,
    TButton,
    TotalCounts,
  },
};
</script>
<style lang="scss"></style>
