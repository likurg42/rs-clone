import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/users.model.js';
import { ApiProperty } from '@nestjs/swagger';

interface TaskCreationAttrs {
  title: string;
  content: string;
  userId: number;
  description: string;
  completed: boolean;
  project: string;
  tags: string[];
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {

  @ApiProperty({ example: '1', description: 'User ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'New task', description: 'Task title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'My new super urgent task', description: 'Task description' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: 'inbox', description: 'Tasks\' project' })
  @Column({ type: DataType.STRING, defaultValue: 'inbox' })
  project: string;

  @ApiProperty({ example: '[in-progress, home]', description: 'Task\s tags' })
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  tags: string[];

  @ApiProperty({ example: 'false', description: 'Is task completed' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed: boolean;

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey((() => User))
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
