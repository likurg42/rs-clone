import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Request } from 'express';
import { UpdateTaskDto } from "./dto/update-task.dto";

type ValidatedRequest = Request & {
  user: {
    id: number,
    email: string,
  }
}

@ApiTags('Tasks')
@Controller('api/tasks')
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
  getUserTasks(@Req() req: ValidatedRequest) {
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
  createTask(@Req() req: ValidatedRequest, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, req.user.id);
  }

  @ApiOperation({
    summary: 'Update Task'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param('id') taskId: string,
    @Req() req: ValidatedRequest,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.updateTask(updateTaskDto, +taskId, req.user.id);
  }

  @ApiOperation({
    summary: 'Delete Task'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 200,
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteTask(
    @Param('id') taskId: string,
    @Req() req: ValidatedRequest,
  ) {
    return this.taskService.deleteTask(+taskId, req.user.id);
  }
}
