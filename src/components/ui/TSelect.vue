<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="{ 't-field--error': error }")
    label {{label}}
    +e.select-wrap
      +e.SELECT.select( 
        :value="value" 
        :error="error" 
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
      default: "Выберите",
    },
    value: [String, Number],
    options: Array,
    error: Boolean,
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event);
    },
  },
};
</script>

<style></style>
