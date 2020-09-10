<template lang="pug">
  include ../../utils/bem/index.pug
  +b.LABEL.t-checkbox(:class="classes")
    input(
      v-bind="$attrs" 
      type="checkbox" 
      :value="value" 
      :checked="isSelected" 
      :disabled="disabled" 
      @change="$emit('input', $event.target.checked)" 
      @focus="focused = true" 
      @blur="focused = false")
    span {{label}}
</template>

<script>
export default {
  name: "TCheckbox",
  data: () => ({
    focused: false,
  }),
  inheritAttrs: false,
  model: {
    prop: "model",
  },
  props: {
    model: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
    value: {
      type: [String, Number, Boolean, Object],
      required: true,
    },
    error: Boolean,
    label: String,
    disabled: Boolean,
  },
  computed: {
    classes() {
      return {
        checked: this.isSelected,
        disabled: this.disabled,
        focused: this.focused,
        error: this.error,
      };
    },

    isSelected() {
      return this.value;
    },
  },
};
</script>

<style lang="scss"></style>
