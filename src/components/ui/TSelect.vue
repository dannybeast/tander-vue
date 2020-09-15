<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="classes")
    label {{label}}
    +e.select-wrap
      +e.SELECT.select( 
        :value="value" 
        :error="error" 
        :disabled="disabled"
        @input="handleInput($event.target.value)")
        option(:value="null") {{placeholder}}
        option(
          v-for="option in options" 
          :value="option.value" 
          :key="option.value") {{option.name}}
</template>

<script>
export default {
  name: "TSelect",
  props: {
    label: String,
    placeholder: {
      type: String,
      default: "Выберите"
    },
    disabled: Boolean,
    value: [String, Number],
    options: Array,
    error: Boolean
  },
  computed: {
    classes() {
      return {
        "t-field--error": this.error,
        "t-field--disabled": this.disabled
      };
    }
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event);
    }
  }
};
</script>

<style></style>
