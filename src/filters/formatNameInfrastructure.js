import Vue from "vue";
import store from "@/store";

let typeArr = store.state.Infrastructure.typeOptions;
let environmentArr = store.state.Infrastructure.environmentOptions;
let roleArr = store.state.Infrastructure.roleOptions;
let osArr = store.state.Infrastructure.osOptions;
let backupClassArr = store.state.Infrastructure.backupClassOptions;

function filtered(arr, value) {
  let result = "";
  arr.forEach((obj) => {
    if (+value === +obj.value) {
      result = obj.name;
    }
  });
  return result;
}

Vue.filter("formatNameInfrastructure", function(value, key) {
  if (typeof value === "boolean" && !!value) {
    value = "Да";
  } else if (typeof value === "boolean" && !value) {
    value = "Нет";
  }
  switch (key) {
    case "type":
      return filtered(typeArr, value);
    case "role":
      return filtered(roleArr, value);
    case "environment":
      return filtered(environmentArr, value);
    case "os":
      return filtered(osArr, value);
    case "backupClass":
      return filtered(backupClassArr, value);
    default:
      return value;
  }
});
