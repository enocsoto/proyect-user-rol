// import ROLES from '../constants/roles';
// import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
// import RequestWithUser from '../authentication/requestWithUser.interface';

// const RoleGuard = (role: ROLES): Type<CanActivate> => {
//   class RoleGuardMixin implements CanActivate {
//     canActivate(context: ExecutionContext) {
//       const request = context.switchToHttp().getRequest<RequestWithUser>();
//       const user = request.user;

//       return user?.roles.includes(role);
//     }
//   }

//   return mixin(RoleGuardMixin);
// };

// export default RoleGuard;
