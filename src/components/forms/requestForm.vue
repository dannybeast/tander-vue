<template lang="pug">
  include ../../utils/bem/index.pug
  div
    .window-header
      +b.H3.window-title {{title}}
    +b.FORM.form-page
      +e.section
        .row
          .col
            t-field(label="Выберите тип:" v-model="$v.requestForm.type.$model" :error="$v.requestForm.type.$error")
          .col
            t-field(label="Наименование:" v-model="$v.requestForm.name.$model" :error="$v.requestForm.name.$error")
          .col
            t-field(label="Среда:" v-model="$v.requestForm.environment.$model" :error="$v.requestForm.environment.$error")
          .col
            t-field(label="Роль:" v-model="$v.requestForm.role.$model" :error="$v.requestForm.role.$error")
          .col
            t-field(label="Операционная система:" v-model="$v.requestForm.os.$model" :error="$v.requestForm.os.$error")
          .col
            t-field(label="СУБД (если будет):" v-model="$v.requestForm.subd.$model" :error="$v.requestForm.subd.$error")
          .col
            t-field(label="Процессорные ядра (vCPU), шт.:" type="number" v-model="$v.requestForm.cpu.$model" :error="$v.requestForm.cpu.$error")
          .col
            t-field(label="Частота проц. ядер, GHz:" type="number" v-model="$v.requestForm.cpuGhz.$model" :error="$v.requestForm.cpuGhz.$error")
          .col
            t-field(label="ОЗУ (RAM), Гб:" type="number" v-model="$v.requestForm.ram.$model" :error="$v.requestForm.ram.$error")

      +e.section(class="--gray-light")
        +e.H3.section-title СХД
        .row
          .col
            t-field(label="Необходимый объем СХД под ОС, Гб:"  type="number" v-model="$v.requestForm.shdVolume.$model" :error="$v.requestForm.shdVolume.$error")
          .col
            t-field(label="Полезный объем дискового пространства без учета ОС, Гб:" type="number" v-model="$v.requestForm.diskVolume.$model" :error="$v.requestForm.diskVolume.$error")
          .col
            t-field(label="Общий размер дискового пространства, Гб:" type="number" v-model="$v.requestForm.diskVolumeFull.$model" :error="$v.requestForm.diskVolumeFull.$error")
          .col
            t-field(label="Нестандартные требования к СХД:" v-model="$v.requestForm.shdRequest.$model" :error="$v.requestForm.shdRequest.$error")
          .col
            t-field(label="Производительность СХД, IOPS:" type="number" v-model="$v.requestForm.iops.$model" :error="$v.requestForm.iops.$error")
          .col
            t-field(label="Производительность СХД, Blocksize (Kb)" type="number" v-model="$v.requestForm.blocksize.$model" :error="$v.requestForm.blocksize.$error")
          .col
            t-field(label="Производительность СХД, Latency (Ms):" type="number" v-model="$v.requestForm.latency.$model" :error="$v.requestForm.latency.$error")
      
      +e.section
        .row
          .col
            t-field(label="Требуется ли резервное копирование?" v-model="$v.requestForm.backup.$model" :error="$v.requestForm.backup.$error")
          .col
            t-field(label="Выберите класс резервного копирования" v-model="$v.requestForm.backupClass.$model" :error="$v.requestForm.backupClass.$error")
          .col
            t-field(label="Частота резервного копирования:" type="number" v-model="$v.requestForm.backupFrequency.$model" :error="$v.requestForm.backupFrequency.$error")
          .col
            t-field(label="Глубина хранения:" type="number" v-model="$v.requestForm.backupDepth.$model" :error="$v.requestForm.backupDepth.$error")
          .col
            t-field(label="Распределение дискового пространства на серверах БД" v-model="$v.requestForm.diskDistribution.$model" :error="$v.requestForm.diskDistribution.$error")
        .row
          .col-12
            t-textarea(label="Примечание:" v-model="$v.requestForm.note.$model" :error="$v.requestForm.note.$error")
        .row
          .col
            t-button(size="medium" red label="Добавить" icon="plus-circle-outline" @onClick="sendRequest()")

</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import TField from "@/components/ui/TField";
import TTextarea from "@/components/ui/TTextarea";
import TButton from "@/components/ui/TButton";

export default {
  name: "requestForm",
  data() {
    return {
      requestForm: {
        id: "",
        type: "",
        name: "",
        environment: "",
        role: "",
        os: "",
        subd: "",
        cpu: "",
        cpuGhz: "",
        ram: "",
        shdVolume: "",
        diskVolume: "",
        diskVolumeFull: "",
        shdRequest: "",
        iops: "",
        blocksize: "",
        latency: "",
        backup: "",
        backupClass: "",
        backupFrequency: "",
        backupDepth: "",
        diskDistribution: "",
        note: "",
      },
      submitStatus: null,
    };
  },
  props: {
    edit: false,
  },
  computed: {
    title() {
      return this.edit
        ? "Редактировать инфраструктуру:"
        : "Добавить инфраструктуру:";
    },
  },
  methods: {
    sendRequest() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        this.submitStatus = "PENDING";
        this.$store
          .dispatch("Infrastructure/ADD_INFRASTUCTURE", this.requestForm)
          .then(() => {
            this.submitStatus = "OK";
            // TODO
            this.$emit("successRequest", this.requestForm);
          });
      }
    },
  },
  validations: {
    requestForm: {
      type: {},
      name: {},
      environment: {},
      role: {},
      os: {},
      subd: {},
      cpu: {},
      cpuGhz: {},
      ram: {},
      shdVolume: {},
      diskVolume: {},
      diskVolumeFull: {},
      shdRequest: {},
      iops: {},
      blocksize: {},
      latency: {},
      backup: {},
      backupClass: {},
      backupFrequency: {},
      backupDepth: {},
      diskDistribution: {},
      note: {},
    },
  },
  components: { TButton, TField, TTextarea },
};
</script>

<style lang="scss">
.form-page {
  .t-field {
    label {
      font-size: 12px;
    }
  }
  &__section {
    padding: 40px 40px;
    &--gray-light {
      background: $fog-hover;
    }
  }
  &__section-title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .row {
    @include row-flex();
    align-items: flex-end;
    &:last-child {
      margin-bottom: -20px;
    }
    & > * {
      margin-bottom: 20px;
    }
  }
  .col {
    @include col();
    @include size(3);
    @include size-sm(12);
    &-12 {
      @include col();
      @include size(12);
    }
  }
}
</style>
