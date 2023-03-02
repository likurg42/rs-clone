import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { AuthService } from './auth.service.js';
import { ApiProperty } from '@nestjs/swagger';

class AuthData {
  @ApiProperty({ example: '1', description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'user@example.ru', description: 'User Email' })
  email: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbWUxMjM0QGdtYWlsLmNvbSIsImlkIjozLCJpYXQiOjE2NzU3MDUwMDksImV4cCI6MTY3NTc5MTQwOX0.12xOFt60bN-bwObzIdBxCrck1FDt_QGpsdFOixUJ38s',
    description: 'User Token'
  })
  token: string;
}

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({
    summary: 'Authenticate user'
  })
  @ApiResponse({
    status: 201,
    type: AuthData,
  })
  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @ApiOperation({
    summary: 'Register user'
  })
  @ApiResponse({
    status: 201,
    type: AuthData,
  })
  @Post('/signup')
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
