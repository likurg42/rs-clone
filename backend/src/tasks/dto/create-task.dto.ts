import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'New task', description: 'Task title' })
  readonly title: string;

  @ApiProperty({ example: '1', description: 'User ID' })
  readonly userId: number;

  @ApiProperty({ example: 'false', description: 'Is task completed' })
  readonly completed: boolean;

  @ApiProperty({ example: 'My new super urgent task', description: 'Task description' })
  readonly description?: string;

  @ApiProperty({ example: 'inbox', description: 'Tasks\' project' })
  readonly project?: string;

  @ApiProperty({ example: '[in-progress, home]', description: 'Task\s tags' })
  readonly tags?: string[];
}
