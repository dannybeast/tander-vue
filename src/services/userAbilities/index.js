import { AbilityBuilder, Ability } from '@casl/ability'

export const ability = new Ability();

export function defineAbilityFor(user) {
  const { can, cannot, rules } = new AbilityBuilder();

    switch(user.rules){
        case 'admin':
            can('read', 'AdminText')
            break;
        case 'manager':
            can('read', 'ManagerText')
            break;
    }


  cannot('delete', 'Post', { published: true });
  
  return rules

}