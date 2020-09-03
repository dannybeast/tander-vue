export function defineRulesUser(user, { can }) {
  //Rules for all logged in users
  can("read", "RESTRICTED");

  can("read", "UserPostType");
  can("update", "UserPostType", { authorID: user.id });
}
