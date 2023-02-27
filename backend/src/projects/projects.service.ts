import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "./projects.model";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Task } from '../tasks/tasks.model';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project) private projectRepository: typeof Project,
    @InjectModel(Task) private taskRepository: typeof Task
  ) { }

  async create(createProjectDto: CreateProjectDto, userId: number) {
    return await this.projectRepository.create(
      { ...createProjectDto, userId },
      { include: { all: true } },
    );
  }

  async findUserProjects(userId: number) {
    return await this.projectRepository.findAll({
      where: { userId },
      include: { all: true }
    });
  }

  async update(updateProjectDto: UpdateProjectDto, projectId: number, userId: number) {
    const belongs = await this.isProjectBelongsToUser(projectId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    return await this.projectRepository.update(updateProjectDto, {
      where: { id: projectId },
      returning: true,
    });
  }

  async delete(projectId: number, userId: number) {
    const belongs = await this.isProjectBelongsToUser(projectId, userId);
    if (!belongs) {
      throw new UnauthorizedException('User is unauthorized');
    }

    await this.taskRepository.destroy({ where: { projectId } });
    return await this.projectRepository.destroy({ where: { id: projectId } });
  }

  private async isProjectBelongsToUser(projectId: number, userId: number) {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });

    return project.userId === userId;
  }
}
