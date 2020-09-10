<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="classes")
    label(v-if="label" :title="label") {{label}}
    input.t-field__input(
      :value="value" 
      @input="handleInput($event.target.value)" 
      :type="type" 
      :min="minValue" 
      :disabled="disabled") 
    slot
</template>

<script>
export default {
  name: "TField",
  props: {
    label: String,
    value: String,
    disabled: Boolean,
    min: {
      type: String,
      default: "0",
    },
    type: {
      type: String,
      default: "text",
    },
    error: Boolean,
  },
  computed: {
    classes() {
      return {
        "t-field--error": this.error,
        "t-field--disabled": this.disabled,
      };
    },
    minValue() {
      return this.type != "number" ? null : this.min;
    },
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss"></style>
