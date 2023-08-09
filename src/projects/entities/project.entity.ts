import { BaseEntity } from '../../config/base.entity';
import { IProject } from '../../interfaces/project.interface';
import { UsersProjects } from '../../user/entities/usersProjects.entity';
import { Column, OneToMany } from 'typeorm';

export class Projects extends BaseEntity implements IProject {
  @Column()
  name: string;

  @Column()
  description: string;

  // @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.project)
  // usersIncludes: UsersProjects[];
}
