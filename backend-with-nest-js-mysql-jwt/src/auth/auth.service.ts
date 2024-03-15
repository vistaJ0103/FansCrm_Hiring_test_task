import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { ...result } = user;
      return result;
    } else {
      throw new BadRequestException('Password not matched');
    }
  }

  async login(body: any) {
    const payload = { email: body.email, sub: body.password };
    return {
      user: body,
      token: this.jwtService.sign(payload),
      msg: 'success',
    };
  }
}
