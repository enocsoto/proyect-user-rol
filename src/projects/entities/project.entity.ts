import { IsEnum, IsNotEmpty } from 'class-validator';
import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserAuth } from 'src/auth/entities';
import { ProjectStatus } from 'src/constants/vaild-statusProjects';
@Entity()
export class Projects extends BaseEntity implements IProject {
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatus,
    default: ProjectStatus.IN_PROGRESS,
  })
  @IsNotEmpty()
  @IsEnum(ProjectStatus)
  status: ProjectStatus[];

  @ManyToOne(() => UserAuth, (user) => user.projects)
  @JoinColumn({ name: 'project_manager_id' })
  projectManager: UserAuth;
}
