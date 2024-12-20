import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from 'modules/projects/entities/project.entity';
import { Task } from './entities/task.entity';
import { user } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,Task,user])],
  providers: [TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
