import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return {
      token,
      id: user.id,
    };
  }
  async validateToken(token) {
    const verify = this.jwtService.verify(token, {
      secret: process.env.PRIVATE_KEY,
    });
    if (!verify) {
      return false;
    }
    return true;
  }

  async validateUser(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneOrFail(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    } else {
      return user;
    }
  }
}
