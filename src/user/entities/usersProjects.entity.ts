import { BaseEntity } from '../../config/base.entity';

import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Projects } from '../../projects/entities/project.entity';
import { ValidRoles } from 'src/constants/valid-roles';

@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Column({ type: 'enum', enum: ValidRoles })
  accessLevel: ValidRoles;

  @ManyToOne(() => UserEntity, (user) => user.projectsIncludes)
  user: UserEntity;

  // @ManyToOne(() => Projects, (project) => project.usersIncludes)
  // project: Projects;
}
