import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from 'src/config/base.entity';
import { Projects } from 'src/projects/entities/project.entity';

@Entity({ name: 'auth' })
export class UserAuth extends BaseEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column('text', {
    select: false, // evita que en un find regrese esta columna
  })
  password: string;

  @Column('simple-array')
  roles: string[];

  @Column({ default: true })
  IsActive: boolean;

  @OneToMany(() => Projects, (project) => project.projectManager)
  projects: Projects[];
  
  @BeforeInsert()
  checkFiledsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
    this.username = this.username.toLocaleLowerCase().trim();
    this.roles = this.roles.map((role)=> role.toLocaleLowerCase().trim());
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFiledsBeforeInsert();
  }
}
