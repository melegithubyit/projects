import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginAuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} // dependency injection

  @Post('login')
  login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }
  @Post('join')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
