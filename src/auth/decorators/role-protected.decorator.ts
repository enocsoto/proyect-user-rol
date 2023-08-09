import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/interfaces';

export const META_ROLES = 'roles';
export const RoleProtected = (...args: ValidRoles[]) => {
  console.log(args)
  return SetMetadata('roles', args);
};
