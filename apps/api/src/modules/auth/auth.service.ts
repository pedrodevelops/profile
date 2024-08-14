import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../user/user.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * @throws UnauthorizedException - If the user is not found or the password does not match.
   */
  async signIn(username: string, password: string) {
    const user = await this.userService.findByName(username);

    if (user == null) {
      throw new UnauthorizedException(
        'Usuário com este username não encontrado.',
      );
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (passwordMatch == false) {
      throw new UnauthorizedException('Verifique sua senha.');
    }

    const token = this.jwtService.sign({
      name: user.name,
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token,
    };
  }

  /**
   * @throws ConflictException - If the username or email is already in use.
   */
  async signUp(username: string, email: string, password: string) {
    const promises = [
      this.userService.findByEmail(email),
      this.userService.findByName(username),
    ];

    const [userByEmail, userByName] = await Promise.all(promises);

    if (userByEmail != null) {
      throw new ConflictException('Email já em uso.');
    }

    if (userByName != null) {
      throw new ConflictException('Username já em uso.');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userEntity = UserMapper.fromDto({
      email,
      name: username,
      password: hashedPassword,
    });

    await this.userService.create(userEntity);

    const token = this.jwtService.sign({
      name: userEntity.name,
    });

    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      token,
    };
  }
}
