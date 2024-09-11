import { IsString, IsInt, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../entities/task.entity';

export class UpdateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  storyPoints: number;

  @IsDateString()
  startDate: Date;
  
  @IsOptional()
  @IsDateString()
  endDate?: Date;
  
  @IsEnum(TaskStatus)
  @IsString()
  status: TaskStatus;
}
