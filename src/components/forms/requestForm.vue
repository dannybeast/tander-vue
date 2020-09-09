<template lang="pug">
  include ../../utils/bem/index.pug
  div
    .window-header
      +b.H3.window-title {{title}}
    +b.FORM.form-page
      +e.section
        .row
          .col
            t-select(label="Выберите тип:" :options="typeOptions" v-model="$v.requestForm.type.$model" :error="$v.requestForm.type.$error")
          .col
            t-field(label="Наименование:" v-model="$v.requestForm.name.$model" :error="$v.requestForm.name.$error")
          .col
            t-select(label="Среда:" :options="environmentOptions" v-model="$v.requestForm.environment.$model" :error="$v.requestForm.environment.$error")
          .col
            t-select(label="Роль:" @input="setDiskDistribution()" :options="roleOptions" v-model="$v.requestForm.role.$model" :error="$v.requestForm.role.$error")
          .col
            t-select(label="Операционная система:" :options="osOptions" v-model="$v.requestForm.os.$model" :error="$v.requestForm.os.$error")
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
            t-select(label="Нестандартные требования к СХД:" :options="shdRequestOptions" v-model="$v.requestForm.shdRequest.$model" :error="$v.requestForm.shdRequest.$error")
          .col(v-show="selectedShdRequest")
            t-field(label="Производительность СХД, IOPS:" type="number" v-model="$v.requestForm.iops.$model" :error="$v.requestForm.iops.$error")
          .col(v-show="selectedShdRequest")
            t-field(label="Производительность СХД, Blocksize (Kb)" type="number" v-model="$v.requestForm.blocksize.$model" :error="$v.requestForm.blocksize.$error")
          .col(v-show="selectedShdRequest")
            t-field(label="Производительность СХД, Latency (Ms):" type="number" v-model="$v.requestForm.latency.$model" :error="$v.requestForm.latency.$error")
      
      +e.section
        .row
          .col
            t-select(label="Требуется ли резервное копирование?" :options="backupOptions" v-model="$v.requestForm.backup.$model" :error="$v.requestForm.backup.$error")
          .col(v-show="selectedBackup")
            t-select(label="Класс резервного копирования" @input="setBackupFrequency()" :options="backupClassOptions" v-model="$v.requestForm.backupClass.$model" :error="$v.requestForm.backupClass.$error")
          .col(v-show="selectedBackup")
            t-field(label="Частота резервного копирования:" disabled type="text" v-model="$v.requestForm.backupFrequency.$model" )
          .col(v-show="selectedBackup")
            t-field(label="Глубина хранения:" type="number" v-model="$v.requestForm.backupDepth.$model" :error="$v.requestForm.backupDepth.$error")
          .col(v-show="selectedBackup")
            t-field(label="Распределение дискового пространства на серверах БД" v-model="$v.requestForm.diskDistribution.$model" :error="$v.requestForm.diskDistribution.$error")
        .row
          .col-12
            t-textarea(label="Примечание:" v-model="$v.requestForm.note.$model" :error="$v.requestForm.note.$error")
        .row
          .col
            t-button(size="medium" red :label="buttonLabel" icon="plus-circle-outline" @onClick="sendRequest()")
        
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import TField from "@/components/ui/TField";
import TTextarea from "@/components/ui/TTextarea";
import TButton from "@/components/ui/TButton";
import TSelect from "@/components/ui/TSelect";

export default {
  name: "requestForm",
  created() {
    if (this.edit) {
      this.requestForm = Object.assign({}, this.editData);
    }
    this.setBackupFrequency();
    this.setDiskDistribution();
  },
  data() {
    return {
      requestForm: {
        id: new Date().getTime(),
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
      typeOptions: ["Виртуальная машина", "Физический сервер", "Контейнер"],
      environmentOptions: [
        "Продуктивная",
        "Стэндбай",
        "Тестовая",
        "Разработки",
      ],
      roleOptions: [
        "Сервер приложений",
        "Сервер БД",
        "Файловый сервер",
        "GitLab runner",
      ],
      osOptions: [
        "Windows_Server",
        "RHEL",
        "OEL",
        "Debian",
        "CentOS",
        "CentOS_GitLab_runner",
      ],
      shdRequestOptions: ["Да", "Нет"],
      backupOptions: ["Да", "Нет"],
      backupClassOptions: ["IV", "V", "Выше IV"],
    };
  },
  props: {
    edit: false,
    editData: "",
  },
  computed: {
    selectedBackup() {
      return this.requestForm.backup === "Да";
    },
    selectedShdRequest() {
      return this.requestForm.shdRequest === "Да";
    },
    buttonLabel() {
      return this.edit ? "Сохранить" : "Добавить";
    },
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
        if (this.edit) {
          this.$store
            .dispatch("Infrastructure/updateInfrastructure", this.requestForm)
            .then(() => {
              this.submitStatus = "OK";
              this.$emit("successRequest", this.requestForm);
            });
        } else {
          this.$store
            .dispatch("Infrastructure/addInfrastructure", this.requestForm)
            .then(() => {
              this.submitStatus = "OK";
              this.$emit("successRequest", this.requestForm);
            });
        }
      }
    },
    // Устанавливаем значение частоты резерв. копирования (в зависимости от выбора класса)
    setBackupFrequency() {
      switch (this.requestForm.backupClass) {
        case "IV":
          this.requestForm.backupFrequency = "Раз в сутки";
          break;
        case "V":
          this.requestForm.backupFrequency = "Раз в неделю";
          break;
        case "Выше IV":
          this.requestForm.backupFrequency = "Арх. анализ";
          break;
      }
    },
    // Устанавливаем распределение дискового пространства на серверах БД (в зависимости от роли)
    setDiskDistribution() {
      switch (this.requestForm.role) {
        case "Сервер БД":
          this.requestForm.diskDistribution =
            "C: [0 Gb], S: [150 Gb], E: [0 Gb]";
          break;
        case "Файловый сервер":
          this.requestForm.diskDistribution = "0";
          break;
        default:
          this.requestForm.diskDistribution = "";
      }
    },
  },
  validations: {
    requestForm: {
      type: {
        required,
      },
      name: { required, minLength: minLength(4) },
      environment: { required },
      role: { required },
      os: { required },
      subd: {},
      cpu: {},
      cpuGhz: {},
      ram: {},
      shdVolume: { required },
      diskVolume: {},
      diskVolumeFull: {},
      shdRequest: { required },
      iops: {},
      blocksize: {},
      latency: {},
      backup: { required },
      backupClass: {},
      backupFrequency: {},
      backupDepth: {},
      diskDistribution: {},
      note: {},
    },
  },
  components: { TButton, TField, TTextarea, TSelect },
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
