import { Table, Column, DataType, Model, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/users.model.js';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from "../projects/projects.model";

interface TaskCreationAttrs {
  title: string;
  completed: boolean;
  description?: string;
  projectId: number;
  userId: number;
}

@Table({ tableName: 'tasks' })
export class Task extends Model<Task, TaskCreationAttrs> {

  @ApiProperty({ example: '1', description: 'User ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'New task', description: 'Task title' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'false', description: 'Is task completed' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  completed: boolean;

  @ApiProperty({ example: 'My new super urgent task', description: 'Task description' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty({ example: '1', description: 'Tasks\' project id' })
  @ForeignKey(() => Project)
  @Column({ type: DataType.INTEGER })
  projectId: number;

  @BelongsTo(() => Project)
  project: Project;

  // @ApiProperty({ example: '[in-progress, home]', description: 'Task\s tags' })
  // @Column({ type: DataType.ARRAY(DataType.STRING) })
  // tags: string[];

  @ApiProperty({ example: '1', description: 'User ID' })
  @ForeignKey((() => User))
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
