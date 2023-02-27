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
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateContextDto } from './dto/create-context.dto';
import { Context } from './context.model';
import { ContextService } from './context.service';
import { UpdateContextDto } from './dto/update-context.dto';

type ValidatedRequest = Request & {
  user: {
    id: number,
    email: string,
  };
};

@ApiTags('Context')
@Controller('api/contexts')
export class ContextController {
  constructor(
    private contextService: ContextService,
  ) { }

  @ApiOperation({ summary: 'Get user contexts' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User Token',
  })
  @ApiResponse({
    status: 200,
    type: [Context],
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getUserTags(@Req() req: ValidatedRequest) {
    return this.contextService.find(req.user.id);
  }

  @ApiOperation({ summary: 'Create context' })
  @ApiHeader({
    name: 'Authorization',
    description: 'User Token',
  })
  @ApiResponse({
    status: 200,
    type: [Context],
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  createTag(@Body() createContextDto: CreateContextDto, @Req() req: ValidatedRequest) {
    return this.contextService.create(createContextDto, req.user.id);
  }

  @ApiOperation({
    summary: 'Update Context'
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'User token',
  })
  @ApiResponse({
    status: 200,
    type: Context,
  })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  updateTask(
    @Param('id') taskId: string,
    @Req() req: ValidatedRequest,
    @Body() updateContextDto: UpdateContextDto
  ) {
    return this.contextService.update(updateContextDto, +taskId, req.user.id);
  }

  @ApiOperation({
    summary: 'Delete Context'
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
    return this.contextService.delete(+contextId, req.user.id);
  }
}
