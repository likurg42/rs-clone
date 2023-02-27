import { ApiProperty } from '@nestjs/swagger';

export class CreateContextDto {
  @ApiProperty({ example: 'New Tag', description: 'Task Tag' })
  readonly title: string;
}
