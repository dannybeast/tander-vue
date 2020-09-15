<template lang="pug">
  include ../utils/bem/index.pug

  .container
    .page__top
 
    .page__content

      +b.SECTION.form-page
        .row
          .col-6
            .row
              .col
                t-field(
                  label="Field:"
                  type="text"
                  v-model="$v.form.field.$model" 
                  :error="$v.form.field.$error")
            
            .row
              .col
                t-select(
                  label="Select:"
                  :options="form.selectOptions" 
                  v-model="$v.form.select.$model" 
                  :error="$v.form.select.$error")
            
            .row
              .col
                t-textarea(
                  label="Textarea:"
                  v-model="$v.form.textarea.$model" 
                  :error="$v.form.textarea.$error")

            .row
              .col
                .row
                  .col-6
                    t-radio(
                      label="Radio button" 
                      value="1" 
                      v-model="form.radio" 
                      name="role")
                  .col-6
                    t-radio(
                      label="Radio button 2" 
                      disabled
                      value="2" 
                      v-model="form.radio" 
                      name="role")

            .row
              .col
                .row
                  .col-6
                    t-checkbox(
                        label="Checkbox" 
                        v-model="$v.form.checkbox.$model" ,
                        :value="$v.form.checkbox.$model" 
                        :error="$v.form.checkbox.$error")
                  .col-6
                    t-checkbox(
                        label="Checkbox 2" 
                        disabled
                        v-model="$v.form.checkbox2.$model" ,
                        :value="$v.form.checkbox2.$model" 
                        :error="$v.form.checkbox2.$error")
            .row
              .col
                t-button(
                    red
                    size="large" 
                    label="Button")
              .col
                t-button(
                    red
                    size="medium" 
                    label="Button" 
                    icon="plus-circle-outline" 
                    @onClick="buttonMethod()")
              .col
                t-button(
                    red
                    disabled
                    size="small" 
                    label="Button")
            .row
              .col
                t-loader
      section
        +b.typography
          h1 Title H1
          h2 Title H2
          h3 Title H3
          h4 Title H4
          h5 Title H5
          p <strong>Lorem ipsum</strong> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          p Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          ul
            li List item
            li List item
            li List item
            li List item
          p <a href="#">Lorem ipsum</a> dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          p 
            big Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          p 
            small Lorem dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          p 
            i Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          ol
            li List item
            li List item
            li List item
            li List item
          table
            thead
              tr
                th Title
                th Title
                th Title
                th Title
            tbody
              tr
                td Text
                td Text
                td Text
                td Text
        
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import TField from "@/components/ui/TField";
import TLoader from "@/components/ui/TLoader";
import TSelect from "@/components/ui/TSelect";
import TCheckbox from "@/components/ui/TCheckbox";
import TRadio from "@/components/ui/TRadio";
import TTextarea from "@/components/ui/TTextarea";
import TButton from "@/components/ui/TButton";
const title = "Secret page";

export default {
  name: "Secret",
  data() {
    return {
      title: title,
      description: "Secret",
      form: {
        field: "",
        textarea: "",
        radio: "1",
        checkbox: "",
        checkbox2: "",
        select: "",
        selectOptions: [
          {
            value: 1,
            name: "Option 1"
          },
          {
            value: 2,
            name: "Option 2"
          }
        ]
      }
    };
  },
  metaInfo: {
    title: title
  },
  methods: {
    buttonMethod() {
      console.log("Hello");
    }
  },
  validations: {
    form: {
      field: {
        required,
        minLength: minLength(4)
      },
      textarea: {
        required,
        minLength: minLength(4)
      },
      checkbox: {},
      checkbox2: {},
      select: { required }
    }
  },
  components: {
    TField,
    TSelect,
    TCheckbox,
    TTextarea,
    TButton,
    TLoader,
    TRadio
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/grid";
</style>
