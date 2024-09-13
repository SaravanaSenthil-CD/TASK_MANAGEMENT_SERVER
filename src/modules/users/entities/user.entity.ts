import { Project } from "modules/projects/entities/project.entity";
import { Task } from "modules/tasks/entities/task.entity";
import { Entity,PrimaryGeneratedColumn,Column,OneToMany} from "typeorm";


@Entity('users')
export class user{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({type:"varchar",length:255})
    username:string;

    @Column({type:"varchar",length:255})
    password:string;

    @Column({type:"varchar",length:255,nullable:true})
    email?:string;

    @OneToMany(()=> Project,(project)=> project.user)
    project:Project[];

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];
}