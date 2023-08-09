import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projects } from './entities/project.entity';
import { UsersProjects } from 'src/user/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Projects, UsersProjects])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [TypeOrmModule, ProjectsService],
})
export class ProjectsModule {}
