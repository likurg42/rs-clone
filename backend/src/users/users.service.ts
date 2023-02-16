import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id }, include: { all: true } });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    });
  }
}
