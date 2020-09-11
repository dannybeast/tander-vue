import Vue from "vue";

Vue.filter("formatDate", function(date) {
  let locale = "ru-RU";
  return `${new Date(date).toLocaleDateString(
    locale
  )} в ${new Date(date).toLocaleTimeString(locale)}`;
});
