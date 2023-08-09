import { BaseEntity } from '../../config/base.entity';
import { ACCESS_LEVEL } from '../../constants/roles';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { Projects } from '../../projects/entities/project.entity';


@Entity({ name: 'users_projects' })
export class UsersProjects extends BaseEntity {
  @Column({ type: 'enum', enum: ACCESS_LEVEL })
  accessLevel: ACCESS_LEVEL;

  @ManyToOne(()=> UserEntity, (user) => user.projectsIncludes)
  user: UserEntity;

  // @ManyToOne(() => Projects, (project) => project.usersIncludes)
  // project: Projects;
}
