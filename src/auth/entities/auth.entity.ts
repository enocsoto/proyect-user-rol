import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/config/base.entity';

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

  @BeforeInsert()
  checkFiledsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFiledsBeforeUpdate() {
    this.checkFiledsBeforeInsert();
  }
}
