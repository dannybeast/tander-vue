<template lang="pug">
  include ../utils/bem/index.pug
  
  +b.page
    p {{isAuth}}
    +e.H3.title Вход в систему:

    +b.FORM.auth-form
      
      +b.field
        label Логин:
        +e.INPUT.input(type="text" v-model="authForm.username") 
      
      +b.field
        label Пароль:
        +e.INPUT.input(type="password" v-model="authForm.password")
      
      +e.bottom
        t-button(size="large" primary label="Войти" @onClick="login")

</template>

<script>
import httpClient from "@/api/httpClient";
import { TButton } from "@/libs/tander-ui";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      authForm: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({ isAuth: "Auth/isAuthenticated" })
  },

  components: { TButton },
  methods: {
    login: function() {
      this.$store.dispatch("Auth/AUTH_REQUEST", this.authForm).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

<style lang="scss">
.field {
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  &__input {
    border: solid 1px #ddd;
    height: 40px;
    width: 100%;
    font-size: 16px;
    padding-left: 10px;
  }
}
.auth-form {
  padding: 30px;
  border: solid 1px #ddd;
  margin: 0 auto;
  max-width: 500px;
  .field {
    margin-bottom: 10px;
  }
  &__bottom {
    margin-top: 15px;
  }
}
</style>
