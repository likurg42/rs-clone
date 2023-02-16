import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {
  }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.taskRepository.create({ ...createTaskDto, userId });
  }

  async findUserTasks(userId) {
    return await this.taskRepository.findAll({ where: { userId } });
  }
}
