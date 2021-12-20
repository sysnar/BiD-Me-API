import { Injectable } from '@nestjs/common';

import { UserCreateDTO, UserUpdateDTO } from '@app/api/structure/user/IUser';
import { User } from '@app/models/user/user.entity';
import { UserRepository } from './user.repository';
import { IBaseId } from '@app/api/structure/IBase';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getOne(id: IBaseId): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async createOne(user: UserCreateDTO): Promise<User> {
    const createUser = this.userRepository.create(user);
    return await this.userRepository.save(createUser);
  }

  async updateOne(user: UserUpdateDTO): Promise<User> {
    const { id, ...updateUser } = user;
    await this.userRepository.update(id, updateUser);
    return await this.userRepository.findOne(id);
  }

  async deleteOne(id: IBaseId): Promise<boolean> {
    try {
      await this.userRepository.delete(id);
      return true;
    } catch (error) {
      return false;
    }
  }
}
