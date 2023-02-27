import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Task } from 'src/tasks/tasks.model';
import { User } from 'src/users/users.model';
import { ContextController } from './context.controller';
import { Context } from './context.model';
import { ContextService } from './context.service';

@Module({
  providers: [ContextService],
  controllers: [ContextController],
  imports: [
    SequelizeModule.forFeature([User, Task, Context]),
    forwardRef(() => AuthModule),
  ],
  exports: [ContextService],
})
export class ContextModule { }
