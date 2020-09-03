import { Ability, detectSubjectType } from "@casl/ability";

const abilities = new Ability([], {
  detectSubjectType: subject => {
    if (subject && typeof subject === "object" && subject.type) {
      return subject.type;
    }
    return detectSubjectType(subject);
  }
});

export { abilities };
