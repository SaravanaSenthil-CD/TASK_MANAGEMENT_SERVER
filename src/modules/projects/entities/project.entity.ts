import { Task } from 'modules/tasks/entities/task.entity';
import { user } from 'modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

// Define the enum for project status
export enum ProjectStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type:"varchar",length:255,nullable:true})
  email?:string;

  @Column({ type: 'varchar', length: 255 })
  projectname: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate?: Date;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE 
  })
  status: ProjectStatus;

  @ManyToOne(() => user, (user) => user.project)
  user: user;

  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
