import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContextDto } from './dto/create-context.dto';
import { Context } from './context.model';

@Injectable()
export class ContextService {
  constructor(@InjectModel(Context) private contextRepository: typeof Context) { }

  async findUserTags(userId: number) {
    return await this.contextRepository.findAll({ where: { userId }, include: { all: true } });
  }

  async create(createContextDto: CreateContextDto, userId: number) {
    return await this.contextRepository.create(({ ...createContextDto, userId }));
  }

}
