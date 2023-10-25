import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from 'src/enums/user-type.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../dto/return/return-login-payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const { authorization } = context.switchToHttp().getRequest().headers;

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch((err) => console.log(err));

    if (!loginPayload) {
      return false;
    }

    return requiredRoles.some((role) => role === loginPayload.userType);
  }
}
