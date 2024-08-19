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
  async signIn(nickname: string, password: string) {
    const user = await this.userService.findByNickname(nickname);

    if (user == null) {
      throw new UnauthorizedException(
        'Usuário com este apelido não encontrado.',
      );
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (passwordMatch == false) {
      throw new UnauthorizedException('Verifique sua senha.');
    }

    const token = this.jwtService.sign({
      nickname: user.nickname,
    });

    return {
      id: user.id,
      email: user.email,
      nickname: user.nickname,
      token,
    };
  }

  /**
   * @throws ConflictException - If the nickname or email is already in use.
   */
  async signUp(nickname: string, email: string, password: string) {
    const promises = [
      this.userService.findByEmail(email),
      this.userService.findByNickname(nickname),
    ];

    const [userByEmail, userByName] = await Promise.all(promises);

    if (userByEmail != null) {
      throw new ConflictException('Email já em uso.');
    }

    if (userByName != null) {
      throw new ConflictException('Apelido já em uso.');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const userEntity = UserMapper.toEntity({
      email,
      nickname,
      password: hashedPassword,
    });

    const defaultBio = `Nós não sabemos muito sobre ${nickname} ainda.`;

    const profileEntity = ProfileMapper.toEntity({
      bio: defaultBio,
      socials: [],
      tags: [],
      nickname,
      iconUrl: null,
    });

    await this.userService.create(userEntity);
    await this.profileService.create(profileEntity);

    const token = this.jwtService.sign({
      nickname: userEntity.nickname,
    });

    return {
      id: userEntity.id,
      email: userEntity.email,
      nickname: userEntity.nickname,
      token,
    };
  }
}
