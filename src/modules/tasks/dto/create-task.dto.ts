import { IsString, IsInt, IsDateString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { Task } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  projectId:string;

  @IsString()
  projectname:string;
  
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
  endDate: Date;
  
  @IsEnum(Task) 
  @IsString()
  status: Task;
}
