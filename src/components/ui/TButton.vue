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
      required: true
    },
    icon: String,
    red: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "medium",
      validator: function(value) {
        return ["small", "medium", "large"].indexOf(value) !== -1;
      }
    }
  },

  computed: {
    iconName() {
      return {
        [`mdi-${this.icon}`]: this.icon
      };
    },
    classes() {
      return {
        "t-button": true,
        "t-button--red": this.red,
        "t-button--secondary": !this.red,
        [`t-button--${this.size}`]: true
      };
    }
  },

  methods: {
    onClick() {
      this.$emit("onClick");
    }
  }
};
</script>

<style lang="scss">
$button-border-radius: 12px;
$button-spacing: 8px;
$button-font-size: $mainFontSize;

.t-button {
  font-weight: 700;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: top;
  line-height: 1;
  font-size: $button-font-size;
  padding: 0 $button-spacing * 2;
  font-weight: 600;
  border-radius: $button-border-radius;
  transition: all $animSpeed $anim;
  // icon font
  i {
    font-size: 24px;
    &:first-child {
      margin-right: $button-spacing;
    }
    &:last-child {
      margin-left: $button-spacing;
    }
  }
  // colors
  &--red {
    color: $color-white;
    background-color: $color-brand-red;
    &:hover {
      background-color: $color-brand-red_hover;
    }
  }
  &--secondary {
    color: $color-black;
    background-color: $color-fog;
    &:hover {
      background-color: $color-for_hover;
    }
  }
  // sizes
  &--small {
    font-size: $button-font-size * 0.8;
    height: 45px;
  }
  &--medium {
    font-size: $button-font-size;
    height: 50px;
  }
  &--large {
    font-size: $button-font-size * 1.2;
    padding: 0 $button-spacing * 3;
    height: 60px;
  }
  // states
  &:not([disabled]):active {
    transform: scale(0.95);
  }
  &[disabled] {
    background: $color-gray;
    cursor: not-allowed;
    color: $color-white;
  }
}
</style>
