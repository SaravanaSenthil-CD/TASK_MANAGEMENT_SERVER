import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { user } from '../../modules/users/entities/user.entity';
import { Project } from '../../modules/projects/entities/project.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    constructor(
      @InjectRepository(Task) private readonly taskRepository:Repository<Task>,
      @InjectRepository(user)
    private readonly userRepository: Repository<user>,
    @InjectRepository (Project) private readonly projectRepository:Repository<Project>
  ){}

    async createTask(createTaskDTO:CreateTaskDto):Promise<Task>{
        try{
      
          const project = await this.projectRepository.findOne({ where: { id: createTaskDTO.projectId } });

          if (!project) {
              throw new NotFoundException(`Project with ID ${createTaskDTO.projectId} not found`);
          }

          const user = await this.userRepository.findOne({
            where: { email : project.email },
          });

          const task = new Task()
          task.user = user;
          task.project = project;
          task.projectname = project.projectname;
          task.title = createTaskDTO.title;
          task.description = createTaskDTO.description;
          task.storyPoints = createTaskDTO.storyPoints;
          task.startDate = createTaskDTO.startDate;
          task.endDate = createTaskDTO.endDate;
        
    
          return await this.taskRepository.save(task)
        }catch(error){
            throw new InternalServerErrorException('Error createing the Task')
        }
    }

    async findAllTask():Promise<Task[]>{
        try{
         return await this.taskRepository.find();
        }catch(error){
           throw new InternalServerErrorException('Error Fetching Task')
        }
    }

    async findOneTask(id: string): Promise<Task> {
      try {
        return await this.taskRepository.findOneBy({ id });
      } catch (error) {
        throw new InternalServerErrorException('Error fetching task');
      }
    }

    async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
      await this.taskRepository.update(id, {
        ...updateTaskDto,
        startDate: new Date(updateTaskDto.startDate),
        endDate: updateTaskDto.endDate ? new Date(updateTaskDto.endDate) : null,
      });
      return this.taskRepository.findOneBy({ id });
    }
    
      async removeTask(id:string): Promise<void> {
        await this.taskRepository.delete(id);
      }
}
