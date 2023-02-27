import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'New task', description: 'Task title' })
  readonly title: string;

  @ApiProperty({ example: 'false', description: 'Is task completed' })
  readonly completed: boolean;

  @ApiProperty({ example: '1', description: 'Project ID' })
  readonly projectId?: number;

  @ApiProperty({ example: '[1]', description: 'Context id' })
  readonly contextId?: number;

  @ApiProperty({ example: 'My new super urgent task', description: 'Task description' })
  readonly description?: string;
}
