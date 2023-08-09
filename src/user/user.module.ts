import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProjects, UserEntity } from './entities';


@Module({
  imports: [TypeOrmModule.forFeature([UsersProjects, UserEntity])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
