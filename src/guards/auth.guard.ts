import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Не авторизован');
    }
    try {
      const token = authHeader.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Не авторизован');
      }
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.get<string>('SECRET_KEY'),
      });
      req.user = decoded;
      return true;
    } catch (e) {
      throw new UnauthorizedException('Не авторизован');
    }
  }
}
