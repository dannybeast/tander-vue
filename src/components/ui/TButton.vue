<template lang="pug">
    button(type="button" :class="classes" @click="onClick") 
      i.mdi(:class="iconName" v-if="icon")
      span {{label}}
</template>

<script>
export default {
  name: "TButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    icon: String,
    red: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      },
    },
    backgroundColor: {
      type: String,
    },
  },

  computed: {
    iconName() {
      return {
        [`mdi-${this.icon}`]: this.icon,
      };
    },
    classes() {
      return {
        "t-button": true,
        "t-button--red": this.red,
        "t-button--secondary": !this.red,
        [`t-button--${this.size}`]: true,
      };
    },
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<style lang="scss">
$button-border-radius: 12px;
$button-icon-spacing: 8px;
.t-button {
  font-weight: 700;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  line-height: 1;
  font-size: 16px;
  padding: 0 16px;
  font-weight: 600;
  border-radius: $button-border-radius;
  i {
    font-size: 24px;
    &:first-child {
      margin-right: $button-icon-spacing;
    }
    &:last-child {
      margin-left: $button-icon-spacing;
    }
  }
  &--red {
    color: #fff;
    background-color: $red;
    &:hover {
      background-color: $red-hover;
    }
  }
  &--secondary {
    color: $black;
    background-color: $fog;
    &:hover {
      background-color: $fog-hover;
    }
  }
  &--small {
    font-size: 14px;
    height: 45px;
  }
  &--medium {
    font-size: 16px;
    height: 55px;
  }
  &[disabled] {
    background: $gray;
    cursor: not-allowed;
    color: #fff;
  }
}
</style>
