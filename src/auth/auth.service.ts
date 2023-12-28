import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'Usuário/Senha inválidos.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (user && validatePassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const validateLogin = await this.validateUser(user.email, user.password);
    if (!validateLogin) {
      throw new HttpException(
        'Usuário/Senha inválida.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload = {
      username: user.email,
      userId: validateLogin.id,
      name: validateLogin.name,
      type: validateLogin.type,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
