import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { hashPassword } from './utils/helpers/hash-password';
import { JwtService } from '@nestjs/jwt';
import { plainIntoUserResponse } from './utils/helpers/plain-into-user.response';
import { AuthResponseDto } from './dto/auth-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import { comparePassword } from './utils/helpers/compare-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto> {
    signUpDto.password = await hashPassword(signUpDto.password);
    const createdUser = await this.usersService.create(signUpDto);
    const user = plainIntoUserResponse(createdUser);
    const accessToken = this.jwtService.sign(user);

    return { user, accessToken };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponseDto> {
    const dbUser: User | undefined = await this.usersService.findByEmail(
      signInDto.email,
    );
    if (
      dbUser &&
      (await comparePassword(signInDto.password, dbUser.password))
    ) {
      const user = plainIntoUserResponse(dbUser);
      const accessToken = this.jwtService.sign(user);

      return { user, accessToken };
    }
    throw new UnauthorizedException(`email or password mismatch our records`);
  }
}
