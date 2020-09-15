import { AbilityBuilder, Ability } from "@casl/ability";

export const ability = new Ability();

export function defineAbilityFor(profile) {
  const { can, cannot, rules } = new AbilityBuilder();
  if (profile) {
    switch (profile.role) {
      case "user":
        can("manage", "requestInfrastructure");
        can("read", "404");
        break;
      case "manager":
        can("manage", "processInfrastructure");
        can("read", "Secret");
        can("read", "404");
        break;
    }
    can("read", "Home");
    can("read", "Login");
  }
  return rules;
}
