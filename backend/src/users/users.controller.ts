import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model.js';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @ApiOperation({
    summary: 'Create User'
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get user by id'
  })
  @ApiResponse({
    status: 200,
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    if (req.user.id !== +id) {
      throw new UnauthorizedException('User is not authorized');
    }

    return this.usersService.findOne(+id);
  }
}
