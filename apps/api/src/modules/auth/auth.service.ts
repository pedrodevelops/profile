import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserMapper } from '../user/user.mapper';
import { ProfileMapper } from '../profile/profile.mapper';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly profileService: ProfileService,
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
      username: user.name,
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

    const userEntity = UserMapper.toEntity({
      email,
      name: username,
      password: hashedPassword,
    });

    const profileEntity = ProfileMapper.toEntity({
      bio: `Nós não sabemos muito sobre ${username} ainda.`,
      image: 'default-profile.png',
      socials: [],
      tags: [],
      username,
    });

    await this.userService.create(userEntity);
    await this.profileService.create(profileEntity);

    const token = this.jwtService.sign({
      username: userEntity.name,
    });

    return {
      id: userEntity.id,
      email: userEntity.email,
      name: userEntity.name,
      token,
    };
  }
}
