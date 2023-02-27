import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from "express";
import { ProjectsService } from "./projects.service";
import { ApiHeader, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Project } from "./projects.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Task } from "../tasks/tasks.model";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from './dto/update-project.dto';
import { Delete } from '@nestjs/common/decorators';

type ValidatedRequest = Request & {
  user: {
    id: number,
    email: string,
  };
};

@Controller('api/projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectsService,
  ) { }

  @ApiOperation({ summary: 'Get User Projects' })
  @ApiHeader({
    name: 'Authorization',
    description: 'UserToken',
  })
  @ApiResponse({
    status: 200,
    type: [Project],
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserProjects(@Req() req: ValidatedRequest) {
    return this.projectService.findUserProjects(req.user.id);
  }

  @ApiOperation({
    summary: 'Create Project'
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
  createPost(@Req() req: ValidatedRequest, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto, req.user.id);
  }

  @ApiOperation({
    summary: 'Update Project'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 200,
    type: Project,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param('id') taskId: string,
    @Req() req: ValidatedRequest,
    @Body() updateContextDto: UpdateProjectDto
  ) {
    return this.projectService.update(updateContextDto, +taskId, req.user.id);
  }

  @ApiOperation({
    summary: 'Delete Project'
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
    @Param('id') contextId: string,
    @Req() req: ValidatedRequest,
  ) {
    console.log(req);
    return this.projectService.delete(+contextId, req.user.id);
  }
}
