<template lang="pug">
  include ../utils/bem/index.pug
  
  +b.login
    +e.content
      +e.H3.title Вход в систему:

      +b.FORM.auth-form
        
        t-field(label="Логин:" v-model="$v.authForm.username.$model" :error="$v.authForm.username.$error")
          
        t-field(label="Пароль:" type="password" v-model="$v.authForm.password.$model" :error="$v.authForm.password.$error")
      
        +b.t-field
          +b.LABEL.checkbox
            input(type="radio" name="role" value="admin" v-model="authForm.role")
            span Админ

        +b.t-field
          +b.LABEL.checkbox
            input(type="radio" name="role" value="manager" v-model="authForm.role" :val="authForm.role")
            span Пользователь
        
        +e.bottom
          t-button(size="medium" red label="Войти" @onClick="login")
       
</template>

<script>
import { required, minLength, between } from "vuelidate/lib/validators";
import TField from "@/components/ui/TField";
import TButton from "@/components/ui/TButton";

export default {
  name: "Home",
  metaInfo: {
    title: "Вход в систему",
  },
  data() {
    return {
      authForm: {
        username: "",
        password: "",
        role: "admin",
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
        this.$store.dispatch("Auth/AUTH_REQUEST", this.authForm).then(() => {
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
  components: { TButton, TField },
};
</script>

<style lang="scss">
// Checkbox
$checkbox-size: 24px;
$checkbox-border-radius: 4px;
.checkbox {
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
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      flex-shrink: 0;
      color: #fff;
      font: normal normal normal 16px/1 "Material Design Icons";
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
        content: "\F0E1E";
        border-color: $red;
        background: $red;
      }
    }
  }
}
//-
.auth-form {
  padding: 30px;
  background: #fff;
  border: solid 1px $gray-light;
  margin: 0 auto;
  max-width: 500px;
  .t-field {
    margin-bottom: 20px;
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
