import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/config/base.entity';
import { ROLES } from 'src/constants/roles';

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

  @Column( {type: 'enum', enum: ROLES, default: ROLES.User })
  roles: ROLES[];
  
  @Column({ default: true})
  IsActive: boolean;

  @BeforeInsert()
  checkFiledsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFiledsBeforeInsert();
  }
}
