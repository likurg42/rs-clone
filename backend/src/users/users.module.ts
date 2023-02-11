import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize/dist/sequelize.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { UsersController } from './users.controller';
import { User } from './users.model.js';
import { UsersService } from './users.service';
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService]
})
export class UsersModule { }
