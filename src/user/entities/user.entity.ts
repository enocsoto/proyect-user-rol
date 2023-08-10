import { BaseEntity } from '../../config/base.entity';
import { IUser } from '../../interfaces/user.interface';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { UsersProjects } from './usersProjects.entity';
import { ValidRoles } from '../../constants/valid-roles';

@Entity()
export class UserEntity extends BaseEntity implements IUser {
  @Column({
    unique: true,
  })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false, // evita que en un find regrese esta columna
  })
  password: string;

  @Column({ type: 'enum', enum: ValidRoles })
  role: ValidRoles;

  @OneToMany(() => UsersProjects, (usersProjects) => usersProjects.user)
  projectsIncludes: UsersProjects[];

  @BeforeInsert()
  checkFiledsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
    this.firstName = this.firstName.toLocaleLowerCase().trim();
    this.lastName = this.lastName.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFiledsBeforeInsert();
  }
}
