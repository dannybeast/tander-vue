<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="classes")
    label(v-if="label") {{label}}
    textarea.t-field__textarea(
      @input="handleInput($event.target.value)" 
      :type="type"
      :disabled="disabled")
    slot
</template>

<script>
export default {
  name: "TTextarea",
  props: {
    label: String,
    value: String,
    disabled: Boolean,
    type: {
      type: String,
      default: "text"
    },
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
    handleInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss"></style>
