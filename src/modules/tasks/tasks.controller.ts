import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private readonly taskservice:TasksService ){}

    @Post('create')
    async createTask(@Body() createTaskDTO:CreateTaskDto){
        try{
           const task = await this.taskservice.createTask(createTaskDTO)
           return {
            message:'Task Created Successfully',
            data:task
           }
        }catch{
            throw new InternalServerErrorException('Error Createing Task')
        }
    }

    @Get('alltask')
    async findAllTask(){
        try{
          const task = await this.taskservice.findAllTask();
          return {
            message:'Task fetched Successfully',
            data:task
          }
        }catch(error){
          throw new InternalServerErrorException('Error Fetching Successfully')
        }
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.taskservice.findOneTask(id);
    }

  @Put('/update/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskservice.updateTask(id, updateTaskDto);
  }

     @Delete('/delete/:id')
     removeTask(@Param('id') id: string) {
     const task= this.taskservice.removeTask(id);
     return{
      message:'Task deleted succesfull',
      data:task
     }
    }

    @Get('project/:projectId')
    async findTasksByProjectId(@Param('projectId') projectId: string) {
      try {
        const tasks = await this.taskservice.findTasksByProjectId(projectId);
        return {
          message: 'Tasks for the project fetched successfully',
          data: tasks
        };
      } catch (error) {
        throw new InternalServerErrorException('Error Fetching Tasks for the Project');
      }
    }
    
    

}
