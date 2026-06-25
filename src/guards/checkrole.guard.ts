import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CheckRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<string[]>('role', context.getHandler());
    if (!role) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!role.includes(user.role)) {
      throw new ForbiddenException('Доступ запрещен');
    }
    return true;
  }
}
