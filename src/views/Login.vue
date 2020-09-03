<template lang="pug">
  include ../utils/bem/index.pug
  
  +b.page
    +e.H3.title Авторизация
    +b.FORM(@submit.prevent="login")
      +b.field
        label Ваш логин:
        input(type="text" v-model="authForm.username") 
      +b.field
        label Пароль:
        input(type="password" v-model="authForm.password")
      +b.field
        label
          input(type="radio" name="role" value="admin" v-model="authForm.role")
          span Админ
      +b.field
        label
          input(type="radio" name="role" value="user" v-model="authForm.role")
          span Пользователь
      button Войти
    p {{authForm}}

</template>

<script>
import httpClient from "@/api/httpClient";

export default {
  name: "Home",
  data() {
    return {
      authForm: {
        username: "",
        password: "",
        role: "admin",
      },
    };
  },
  methods: {
    login: function() {
      this.$store.dispatch("Auth/AUTH_REQUEST", this.authForm).then((res) => {
        this.$router.push("/");
      });
    },
  },
};
</script>
