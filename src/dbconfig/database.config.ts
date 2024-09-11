import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigService } from '@nestjs/config';
import { user } from '../modules/users/entities/user.entity';
import { Project } from "../modules/projects/entities/project.entity";
import { Task } from "modules/tasks/entities/task.entity";

export const DatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type:'postgres',
    host: configService.get<string>('DATABASE_HOST'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    entities:[user,Project,Task],
    synchronize:true
})