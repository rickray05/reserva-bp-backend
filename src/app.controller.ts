import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth/dto/login.dto';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
@ApiTags('Login')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  //@UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDTO: LoginDto) {
    return await this.authService.login(loginDTO);
  }
}
