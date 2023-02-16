import { forwardRef, Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from "./projects.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Project } from "./projects.model";
import { Task } from "../tasks/tasks.model";
import { User } from "../users/users.model";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService],
  imports: [
    SequelizeModule.forFeature([User, Task, Project]),
    forwardRef(() => AuthModule)
  ],
  exports: [ProjectsService],
})
export class ProjectsModule {}
