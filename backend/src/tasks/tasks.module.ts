import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { User } from '../users/users.model';
import { Task } from './tasks.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { Project } from "../projects/projects.model";
import { Context } from '../context/context.model';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([User, Task, Project, Context]),
    forwardRef(() => AuthModule)
  ],
  exports: [TasksService]
})
export class TasksModule {
}
