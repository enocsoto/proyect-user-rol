import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
      })
      createdat: Date;
    
      @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
      })
      updatedat: Date;
}