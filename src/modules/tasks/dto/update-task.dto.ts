import { IsString, IsInt, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  storyPoints: number;

 @IsOptional()
  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @IsEnum(TaskStatus)
  @IsString()
  status: TaskStatus;
}
