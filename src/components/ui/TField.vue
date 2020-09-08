<template lang="pug">
  include ../../utils/bem/index.pug
  +b.t-field(:class="{ 't-field--error': error }")
    label(v-if="label" :title="label") {{label}}
    input.t-field__input(@input="handleInput($event.target.value)" :type="type" :min="minValue") 
    slot
</template>

<script>
export default {
  name: "TField",
  props: {
    label: String,
    value: String,
    min: {
      type: String,
      default: "0"
    },
    type: {
      type: String,
      default: "text"
    },
    error: Boolean
  },
  computed: {
    minValue() {
      return this.type != "number" ? null : this.min;
    }
  },
  methods: {
    handleInput(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
// Field
$field-height: 45px;
$textarea-height: $field-height * 2;
$field-font-size: 16px;
$field-border-radius: 12px;
.t-field {
  $parent: &;
  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  &__input,
  &__textarea {
    border: solid 1px $gray-light;
    height: $field-height;
    width: 100%;
    font-size: $field-font-size;
    border-radius: $field-border-radius;
    padding-left: 15px;
    color: $black;
    &::placeholder {
      color: $black-light;
    }
    &:hover,
    &:focus {
      border-color: $gray;
    }
  }
  &__textarea {
    height: $textarea-height;
    padding-top: 10px;
  }
  &__error-message {
    margin-top: 5px;
    color: $red;
  }
  &--error {
    #{$parent}__input {
      border-color: $red;
    }
  }
}
//-
</style>
