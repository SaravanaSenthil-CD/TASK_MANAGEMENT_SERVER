import { Body, Controller, Delete, Get, InternalServerErrorException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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

    @Get()
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

  @Put(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskservice.updateTask(id, updateTaskDto);
  }

     @Delete(':id')
     removeTask(@Param('id') id: string) {
     const task= this.taskservice.removeTask(id);
     return{
      message:'Task deleted succesfull',
      data:task
     }
    }

}
