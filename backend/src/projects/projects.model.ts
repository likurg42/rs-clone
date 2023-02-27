import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { Task } from "../tasks/tasks.model";

interface ProjectCreationAttrs {
  title: string;
  userId: number;
  description?: string;
  tasks?: [];
}

@Table({ tableName: 'projects', paranoid: true })
export class Project extends Model<Project, ProjectCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Project ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  })
  id: number;

  @ApiProperty({ example: 'New Project', description: 'Project Tittle' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: 'My new super project', description: 'Project description' })
  @Column({ type: DataType.STRING })
  description: string;

  @ApiProperty()
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Task)
  tasks: Task[];
}
