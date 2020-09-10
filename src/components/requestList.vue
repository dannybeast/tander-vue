<template lang="pug">
  include ../utils/bem/index.pug
  div
    .page__top
      h3.page__title {{title}}
      t-button(
        red
        size="small"
        label="Добавить"
        icon="plus-circle-outline"
        @onClick="openModalRequest()")
    
    .page__content
      t-loader(v-if="infrastructureStatus === 'loading'")
      article(v-else)
        //
        section
          t-table(
            :tableHeadersList="tableHeadersList" 
            :tableBodyList="tableBodyList"
            @copy="copy($event)"
            @edit="edit($event)"
            @remove="remove($event)")
        
        //
        section(v-if="tableBodyList.length")
          total-counts(
            :ram="sumRam"
            :ramProd="sumProdRam"
            :shd="sumShd" 
            :shdProd="sumProdShd"
            :cpu="sumCpu"
            :cpuProd="sumProdCpu")

    // Modal добавление
    modal(name="requestModal" :width="modalWidth" height="auto" )
      request-form(@successRequest="closeModalRequest()")
    
    // Modal редактирование
    modal(name="editModal" :width="modalWidth" height="auto")
      request-form(@successRequest="closeModalEdit()" edit="true" :editData="editData")
      
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
  name: "RequestList",
  data() {
    return {
      title: title,
      editData: "",
      modalWidth: 1150,
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
    // Общее кол-во RAM
    sumRam() {
      return this.reduceSum(this.tableBodyList, "ram");
    },
    // Общее кол-во RAM - Продуктивная
    sumProdRam() {
      return this.reduceSumProd(this.tableBodyList, "ram");
    },
    // Общее кол-во CPU
    sumCpu() {
      return this.reduceSum(this.tableBodyList, "cpu");
    },
    // Общее кол-во CPU - Продуктивная
    sumProdCpu() {
      return this.reduceSumProd(this.tableBodyList, "cpu");
    },
    // Общее кол-во SHD
    sumShd() {
      return this.reduceSum(this.tableBodyList, "shdVolume");
    },
    // Общее кол-во SHD - Продуктивная
    sumProdShd() {
      return this.reduceSumProd(this.tableBodyList, "shdVolume");
    },
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
    // Подсчет непродуктивной суммы из массива
    reduceSum(arr, value) {
      const values = arr.map((obj) =>
        +obj["environment"] != 1 ? parseInt(obj[value]) : 0
      );
      return values.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
    },
    // Подсчет продуктивной суммы из массива
    reduceSumProd(arr, value) {
      const values = arr.map((obj) =>
        +obj["environment"] === 1 ? parseInt(obj[value]) : 0
      );
      return values.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
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
