import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AuthDto, LoginAuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { config } from 'process';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(dto: LoginAuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Incorrect email or password.');
    const password = await argon.verify(user.password, dto.password);

    if (!password) throw new ForbiddenException('Incorrect email or password.');

    /* delete user.password; */
    const token = await this.jwtSign(user.id, user.email, user.admin);
    return JSON.stringify(token);
  }
  async signup(dto: AuthDto) {
    try {
      let user = await this.prisma.user.findFirst({
        where: {
          email: dto.email,
        },
      });
      if (user) throw new ForbiddenException('User Already Exists.');
      const hashedPass = await argon.hash(dto.password);
      user = await this.prisma.user.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          password: hashedPass,
        },
      });
      /* delete user.password; */
      const token = await this.jwtSign(user.id, user.email, user.admin);
      return JSON.stringify(token);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Invalid Email or Password');
      } else throw error;
    }
  }

  async jwtSign(userId: number, email: string, admin: boolean) {
    const payload = {
      id: userId,
      email,
      admin,
    };
    const token = this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
    });
    return token;
  }
}
