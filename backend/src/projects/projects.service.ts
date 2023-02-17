import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { Project } from "./projects.model";
import { CreateProjectDto } from "./dto/create-project.dto";

@Injectable()
export class ProjectsService {
  constructor(@InjectModel(Project) private projectRepository: typeof Project) {}

  async create(createProjectDto: CreateProjectDto, userId: number) {
    return await this.projectRepository.create(({ ...createProjectDto, userId }))
  }

  async findUserProjects(userId) {
    return await this.projectRepository.findAll({
      where: { userId },
      include: { all: true }
    });
  }
}
