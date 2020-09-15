import { ability, defineAbilityFor } from "@/services/userAbilities";
export default function(to, from, next) {
  let profile = JSON.parse(localStorage.getItem("profile"));
  const rules = defineAbilityFor(profile);
  let abilities = ability.update(rules);
  const canNavigate = to.matched.some((route) => {
    return abilities.can("read", route.meta.resource);
  });

  if (!canNavigate) {
    alert("Нет доступа");
    return next("/");
  } else {
    return next();
  }
}
