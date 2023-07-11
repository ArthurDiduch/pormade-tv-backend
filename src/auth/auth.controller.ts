import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  async validate(@Req() request) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      await this.authService.validateToken(token);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
