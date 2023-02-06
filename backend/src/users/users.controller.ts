import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


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
    summary: 'Get All users'
  })
  @ApiResponse({
    status: 200,
    type: [User],
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @ApiOperation({
    summary: 'Get user by id'
  })
  @ApiResponse({
    status: 200,
    type: User,
  })

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
