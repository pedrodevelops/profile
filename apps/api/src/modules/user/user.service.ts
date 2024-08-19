import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: UserEntity): Promise<void> {
    await this.userRepository.create(user);
  }

  async findById(id: string): Promise<UserEntity | null> {
    return await this.userRepository.findById(id);
  }

  async findByNickname(name: string): Promise<UserEntity | null> {
    return await this.userRepository.findByNickname(name);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async update(user: any): Promise<void> {
    await this.userRepository.update(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
