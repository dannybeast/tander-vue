<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="{ 't-field--error': error }")
    label(v-if="label") {{label}}
    textarea.t-field__textarea(
      @input="handleInput($event.target.value)" 
      :type="type" ) 
    slot
</template>

<script>
export default {
  name: "TTextarea",
  props: {
    label: String,
    value: String,
    type: {
      type: String,
      default: "text",
    },
    error: Boolean,
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="scss"></style>
