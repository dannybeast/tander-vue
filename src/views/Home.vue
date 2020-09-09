<template lang="pug">
  include ../utils/bem/index.pug

  +b.page
    .container
      
      +e.top
        +e.H3.title {{title}}
        t-button(size="small" red label="Добавить" icon="plus-circle-outline" @onClick="openModalRequest()")
      
      +e.content
        t-loader(v-if="infrastructureStatus === 'loading'")
        article(v-else)
          //
          section
            t-table(:tableHeadersList="tableHeadersList" :tableBodyList="tableBodyList" @copy="copy($event)" @edit="edit($event)" @remove="remove($event)")
          
          //
          section(v-if="tableBodyList.length")
            total-counts

    // Modal добавление
    modal(name="requestModal" :width="modalWidth" height="auto" )
      request-form(@successRequest="closeModalRequest()")
    
    // Modal редактирование
    modal(name="editModal" :width="modalWidth" height="auto")
      request-form(@successRequest="closeModalEdit()" edit="true" :editData="editData")
      

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
      editData: "",
      modalWidth: 1100,
    };
  },
  metaInfo: {
    title: title,
  },
  created() {
    this.$store.dispatch("Infrastructure/getInfrastructure");
  },
  computed: {
    ...mapGetters({
      tableHeadersList: "Infrastructure/getKeys",
      tableBodyList: "Infrastructure/getList",
      infrastructureStatus: "Infrastructure/getStatus",
    }),
  },
  methods: {
    openModalRequest() {
      this.$modal.show("requestModal");
    },
    closeModalRequest() {
      this.$modal.hide("requestModal");
    },
    closeModalEdit() {
      this.$modal.hide("editModal");
    },
    copy(id) {
      this.$store.dispatch("Infrastructure/copyInfrastructure", id).then(() => {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Успешно скопировано",
        });
      });
    },
    edit(id) {
      this.$store
        .dispatch("Infrastructure/getInfrastructureById", id)
        .then((resp) => {
          this.editData = resp;
          this.$modal.show("editModal");
        });
    },
    remove(id) {
      this.$store
        .dispatch("Infrastructure/deleteInfrastructure", id)
        .then(() => {
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
