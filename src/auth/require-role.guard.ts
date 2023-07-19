import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
  mixin,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/users/entities/user-role.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

export const RequireRoles = (...requiredRoles: UserRole[]) => {
  @Injectable()
  class AuthRolesGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      if (!token || type !== 'Bearer') {
        throw new UnauthorizedException();
      }

      let user: User;
      try {
        const payloadUser = this.jwtService.verify(token, {
          secret: process.env.PRIVATE_KEY,
        });
        request['user'] = payloadUser;

        user = await this.userRepository.findOneByOrFail({
          email: payloadUser.email,
        });
      } catch (error) {
        throw new NotFoundException();
      }

      if (requiredRoles.length < 1) {
        return true;
      }

      return requiredRoles.some((role) => user.roles.includes(role));
    }
  }
  return UseGuards(mixin(AuthRolesGuard));
};
