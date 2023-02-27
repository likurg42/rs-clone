import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateContextDto } from './dto/create-context.dto';
import { Context } from './context.model';
import { UpdateContextDto } from './dto/update-context.dto';

@Injectable()
export class ContextService {
  constructor(@InjectModel(Context) private contextRepository: typeof Context) { }

  async find(userId: number) {
    return await this.contextRepository.findAll({ where: { userId }, include: { all: true } });
  }

  async create(createContextDto: CreateContextDto, userId: number) {
    return await this.contextRepository.create(({ ...createContextDto, userId }));
  }

  async update(updateContextDto: UpdateContextDto, contextId: number, userId: number) {
    const belongs = await this.isContextBelongsToUser(contextId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    return await this.contextRepository.update(updateContextDto, {
      where: { id: contextId },
      returning: true,
    });
  }

  async delete(contextId: number, userId: number) {
    const belongs = await this.isContextBelongsToUser(contextId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    return await this.contextRepository.destroy({ where: { id: contextId } });
  }

  private async isContextBelongsToUser(contextId: number, userId: number) {
    const context = await this.contextRepository.findOne({ where: { id: contextId } });

    return context.userId === userId;
  }

}
