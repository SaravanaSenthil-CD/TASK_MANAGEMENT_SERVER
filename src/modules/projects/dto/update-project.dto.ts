import { IsString, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ProjectStatus } from '../entities/project.entity'; // Adjust the path

export class UpdateProjectDto {
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

  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
