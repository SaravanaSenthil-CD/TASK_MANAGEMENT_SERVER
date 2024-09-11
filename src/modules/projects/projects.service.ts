import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { user } from '../users/entities/user.entity';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(user)
    private readonly userRepository: Repository<user>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const user = await this.userRepository.findOne({
        where: {email : createProjectDto.email },
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
     
      const project = new Project();
      project.user = user;
      project.email=createProjectDto.email;
      project.projectname = createProjectDto.projectname;
      project.description = createProjectDto.description;
      project.startDate = createProjectDto.startDate;
      project.endDate = createProjectDto.endDate;
      
      return await this.projectRepository.save(project);
    } catch (error) {
      console.error('Error in create method:', error);
      throw new InternalServerErrorException('Error creating project');
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching projects');
    }
  }

  async findOne(id: string): Promise<Project> {
    try {
      const project = await this.projectRepository.findOneBy({ id });
      if (!project) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching project');
    }
  }  

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Partial<Project>> {
    try {
      const result = await this.projectRepository.update(id, updateProjectDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      return this.projectRepository.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException('Error updating project');
    }
  }

  async remove(id: string): Promise<void> {
    try {
        const project = await this.projectRepository.findOneBy({ id });
        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
          }
     await this.projectRepository.delete(id);
      
    } catch (error) {
      throw new InternalServerErrorException('Error deleting project');
    }
  }
}
