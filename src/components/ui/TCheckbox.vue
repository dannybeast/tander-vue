<template lang="pug">
  include ../../utils/bem/index.pug
  +b.LABEL.t-checkbox
    input(type="radio" :name="name" :value="value" @change="handleInput($event.target.value)")
    span {{label}} {{value}}

</template>

<script>
export default {
  name: "TCheckbox",
  props: {
    label: String,
    value: String,
    name: String,
  },
  methods: {
    handleInput(value) {
      console.log(value, this.value);
      this.$emit("input", this.value);
    },
  },
};
</script>

<style lang="scss">
// Checkbox
$checkbox-size: 24px;
$checkbox-border-radius: 4px;
.t-checkbox {
  cursor: pointer;
  span {
    display: flex;
    align-items: center;
    &:before {
      content: "";
      width: $checkbox-size;
      height: $checkbox-size;
      border-radius: $checkbox-border-radius;
      border: solid 2px $gray-light;
      display: block;
      margin-right: 15px;
      flex-shrink: 0;
    }
    &:hover {
      &:before {
        border-color: $gray;
      }
    }
  }

  input {
    display: none;
    &:checked + span {
      &:before {
        border-color: $red;
        background: $red;
      }
    }
  }
}
//-
</style>
