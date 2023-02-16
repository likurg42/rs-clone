import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'New Project', description: 'Task title' })
  readonly title: string;

  @ApiProperty({ example: '1', description: 'User ID' })
  readonly userId: number;

  @ApiProperty({ example: 'My new super project', description: 'Project description' })
  readonly description: string;
}
