import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/role-protected/role-protected.decorator';
import { UserAuth } from 'src/auth/entities';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())
    if(!validRoles) return true;
    if(validRoles.length === 0) return true;
    
    const req = context.switchToHttp().getRequest();
     
    const user = req.user as UserAuth;
   
    
    if(!user) throw new BadRequestException('User not Found');
   
    // console.log({userRoles: user.roles})
    for (const role of user.roles) {
      if(validRoles.includes('user') || validRoles.includes("admin"))
        return true;
      
    }
    throw new ForbiddenException(
      `User ${user.firstName} ${user.lastName} need a valid role: [${validRoles}]`)

  }
}
