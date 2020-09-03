import { AbilityBuilder } from "@casl/ability";
import { defineRulesUser, defineRulesByUserRole } from "./rules";

export function defineAbilitiesFor(user) {
  const { rules, ...builder } = new AbilityBuilder();

  //no abilities/rules for non-logged-in users
  if (!user) return [];

  if (user.role) {
    //Special Rules by Role defined here
    if (typeof defineRulesByUserRole[user.role] === "function") {
      defineRulesUser(user, builder);
      defineRulesByUserRole[user.role](user, builder);
    } else {
      throw new Error(
        `There are no rules defined for user role: "${user.role}"`
      );
    }
  } else {
    //Rules for LoggedIn Users
    defineRulesUser(user, builder);
  }

  return rules;
}
