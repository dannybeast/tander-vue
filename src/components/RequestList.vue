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
        @onClick="openModalRequest()"
        v-if="$can('read', 'requestInfrastructure')")
    
    .page__content
      t-loader(v-if="infrastructureStatus === 'loading'")
      article(v-else)
        //
        section
          t-table(
            :th="tableHeadersList" 
            :body="tableBodyListFiltered"
            :actions="tableActions"
            @copy="copy($event)"
            @view="view($event)"
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
        //
        section(v-if="tableBodyList.length")
          t-button(
            red
            size="small"
            :label="approveButtonText"
            icon="check-circle-outline"
            @onClick="approveRequest()"
            :disabled="approveStatus"
            v-if="$can('read', 'processInfrastructure')")
        //
        section(v-if="tableBodyList.length")
          +b.status-bar
            p Статус запроса: <strong>{{approveStatusText}} {{approveDate}}</strong>
            p Дата обновления запроса: <strong>{{updateDate}}</strong>

    // Окно добавления
    modal(
      name="requestModal" 
      :width="modalWidth"
      height="auto" 
      :adaptive="true")
      request-form(@successRequest="closeModalRequest()")
    
    // Окно редактирования
    modal(
      name="editModal" 
      :width="modalWidth"
      height="auto" 
      :adaptive="true")
      request-form(
        @successRequest="closeModalEdit()" 
        edit="true" 
        :editData="currentInfrastructure")
    
    // Окно просмотра
    modal(
      name="viewModal" 
      :width="modalWidth" 
      height="auto" 
      :adaptive="true")
      t-list-view(
        :title="currentInfrastructureFiltered.type"
        :namesData="tableHeadersList" 
        :viewData="currentInfrastructureFiltered")

</template>

<script>
import { mapGetters } from "vuex";
import RequestForm from "@/components/forms/RequestForm";
import TListView from "@/components/ui/TListView";
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
      modalWidth: 1150,
      notApproveButtonText: "Утвердить запрос",
      approveTextSuccess: "Утверждено",
      notApproveTextStatus: "В обработке",
    };
  },
  metaInfo: {
    title: title,
  },
  created() {
    this.$store.dispatch("Infrastructure/getInfrastructure");
    this.$store.dispatch("Infrastructure/getInfrastructureInfo");
  },
  computed: {
    ...mapGetters({
      tableHeadersList: "Infrastructure/getNames",
      tableBodyList: "Infrastructure/getList",
      tableBodyListFiltered: "Infrastructure/getListFiltered",
      infrastructureStatus: "Infrastructure/getStatus",
      approveStatus: "Infrastructure/getApproveStatus",
      approveDate: "Infrastructure/getApprovedDate",
      updateDate: "Infrastructure/getUpdateDate",
      currentInfrastructure: "Infrastructure/getCurrent",
      currentInfrastructureFiltered: "Infrastructure/getCurrentFiltered",
    }),
    approveStatusText() {
      return this.approveStatus
        ? this.approveTextSuccess
        : this.notApproveTextStatus;
    },
    approveButtonText() {
      return this.approveStatus
        ? this.approveTextSuccess
        : this.notApproveButtonText;
    },
    tableActions() {
      if (this.$can("read", "requestInfrastructure")) {
        return ["copy", "edit", "remove"];
      } else if (this.$can("read", "processInfrastructure")) {
        return ["view"];
      }
    },
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
    // Утверждение
    approveRequest() {
      this.$store.dispatch("Infrastructure/approveInfrastructure").then(() => {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Успешно утверждено",
        });
      });
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
          this.$modal.show("editModal");
        });
    },
    view(id) {
      this.$store
        .dispatch("Infrastructure/getInfrastructureById", id)
        .then((resp) => {
          this.$modal.show("viewModal");
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
    RequestForm,
    TTable,
    TLoader,
    TButton,
    TotalCounts,
    TListView,
  },
};
</script>
<style lang="scss">
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 13px;
  @include sm-block() {
    flex-wrap: wrap;
    strong {
      display: block;
    }
    & > * {
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
