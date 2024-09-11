import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Task } from '../tasks/entities/task.entity';
import { user } from '../../modules/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project,Task,user])],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
