import { IsString, IsDateString, IsOptional, IsEmail, IsEnum } from 'class-validator';
import { Project } from 'modules/projects/entities/project.entity'; // Adjust the path as needed

export class CreateProjectDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  projectname: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startDate: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsEnum(Project) 
  @IsString()
  status: Project;
}
