import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Table, Model, BelongsToMany } from 'sequelize-typescript';
import { Task } from '../tasks/tasks.model';
import { User } from '../users/users.model';

interface TagCreationAttrs {
  title: string,
  userId: number;
  taskId: number;
}

@Table({ tableName: 'context', paranoid: true, })
export class Context extends Model<Context, TagCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Tag ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'New Tag', description: 'Tag Tittle' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'My new super tag', description: 'Tag description' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @HasMany(() => Task)
  tasks: Task[];

  @BelongsTo(() => User)
  user: User;
}
