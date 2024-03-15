import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

import { PassportModule} from '@nestjs/passport'
import { AuthController } from './auth.controller';
//need for auth with jwt
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '100000s' },
    })
    ,UserModule],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
