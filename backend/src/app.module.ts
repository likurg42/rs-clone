import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model.js';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from "./tasks/tasks.model";
import { ProjectsController } from './projects/projects.controller';
import { ProjectsModule } from './projects/projects.module';
import { Project } from "./projects/projects.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Task,
        Project,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    ProjectsModule
  ],
  controllers: [ProjectsController],
  providers: [],
})
export class AppModule {
}
