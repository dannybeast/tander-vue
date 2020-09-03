import { Role } from "../role";

export const defineRulesByUserRole = {
  [Role.ADMIN]: ADMIN,
  [Role.MANAGER]: MANAGER,
};

//ADMINS
function ADMIN(user, { can }) {
  can("read");
  can("update");
}

//MANAGER
function MANAGER(user, { can, cannot }) {
  can("read", "homeVIEW");
  can("read", "accountVIEW");
  can("read", "Secret");

  // can("read", "ManagerPostType");
  // can("update", "ManagerPostType", { authorID: user.id });
}
