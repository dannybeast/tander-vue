<template lang="pug">
  include ../utils/bem/index.pug
  
  +b.login
    +e.content
      +e.H3.title {{title}}
      +b.FORM.auth-form
        
        t-field(
          label="Логин:" 
          v-model="$v.authForm.username.$model" 
          :error="$v.authForm.username.$error")
          
        t-field(
          label="Пароль:" 
          type="password" 
          v-model="$v.authForm.password.$model" 
          :error="$v.authForm.password.$error")

        t-radio(
          label="Пользователь" 
          value="user" 
          v-model="authForm.role" 
          name="role")

        t-radio(
          label="Менеджер" 
          value="manager" 
          v-model="authForm.role" 
          name="role")
        
        +e.bottom
          t-button(
            red
            size="medium"
            label="Войти" 
            @onClick="login")
       
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import TField from "@/components/ui/TField";
import TButton from "@/components/ui/TButton";
import TRadio from "@/components/ui/TRadio";

const title = "Вход в систему:";

export default {
  name: "Login",

  metaInfo: {
    title: title,
  },
  data() {
    return {
      title: title,
      authForm: {
        username: "",
        password: "",
        role: "user",
      },
      submitStatus: null,
    };
  },
  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
        this.$notify({
          group: "foo",
          type: "error",
          title: "Заполните форму корректно",
        });
      } else {
        this.submitStatus = "PENDING";
        this.$store.dispatch("Auth/authRequest", this.authForm).then(() => {
          this.submitStatus = "OK";
        });
      }
    },
  },
  validations: {
    authForm: {
      username: {
        required,
        minLength: minLength(4),
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
  components: { TButton, TField, TRadio },
};
</script>

<style lang="scss">
.auth-form {
  padding: 30px;
  background: #fff;
  border: solid 1px $gray-light;
  margin: 0 auto;
  max-width: 500px;
  .t-field {
    margin-bottom: 20px;
  }
  .t-radio {
    margin-bottom: 15px;
  }
  &__bottom {
    margin-top: 30px;
  }
  .t-button {
    min-width: 150px;
  }
}

.login {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px $offset_one_side;
  background: $fog;
  &__title {
    font-size: 34px;
    font-weight: 300;
    margin-bottom: 30px;
  }
  &__content {
    width: 100%;
    max-width: 500px;
  }
}
</style>
