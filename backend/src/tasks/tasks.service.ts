import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from './tasks.model';
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task) private taskRepository: typeof Task) {
  }

  async create(createTaskDto: CreateTaskDto, userId: number) {
    return await this.taskRepository.create({ ...createTaskDto, userId });
  }

  async findUserTasks(userId: number) {
    return await this.taskRepository.findAll({ where: { userId }, include: { all: true } });
  }

  async updateTask(updateTaskDto: UpdateTaskDto, taskId: number, userId: number) {
    const belongs = await this.isTaskBelongsToUser(taskId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    return await this.taskRepository.update(updateTaskDto, {
      where: { id: taskId },
      returning: true,
    });
  }

  async deleteTask(taskId: number, userId: number) {
    const belongs = await this.isTaskBelongsToUser(taskId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    return await this.taskRepository.destroy({ where: { id: taskId } });
  }

  private async isTaskBelongsToUser(taskId: number, userId: number) {
    const task = await this.taskRepository.findOne({ where: { id: taskId } });

    return task.userId === userId;
  }
}
