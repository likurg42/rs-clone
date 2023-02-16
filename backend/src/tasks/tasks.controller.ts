import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Request } from 'express';

type ValidatedRequest = Request & {
  user: {
    id: number,
    email: string,
  }
}

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private taskService: TasksService,
  ) {}

  @ApiOperation({
    summary: 'Get User Tasks'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 200,
    type: [Task],
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserPosts(@Req() req: ValidatedRequest) {
    console.log(req.user);
    return this.taskService.findUserTasks(req.user.id);
  }

  @ApiOperation({
    summary: 'Create Task'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 201,
    type: Task,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Req() req: ValidatedRequest, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, req.user.id);
  }
}
