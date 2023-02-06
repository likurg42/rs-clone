import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) { }


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
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserPosts(@Param('id') userId: string) {
    return this.taskService.findUserPosts(userId);
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
  createPost(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }
}
