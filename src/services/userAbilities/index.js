import { AbilityBuilder, Ability } from "@casl/ability";

export const ability = new Ability();

export function defineAbilityFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

  switch (user.role) {
    case "user":
      can("read", "requestInfrastructure");
      break;
    case "manager":
      can("read", "processInfrastructure");
      break;
  }

  cannot("delete", "Post", { published: true });

  return rules;
}
