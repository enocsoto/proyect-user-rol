import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Projects } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class ProjectsService {
  logger: any;
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project: Projects = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(project);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    try {
      return await this.projectRepository.find();
    } catch (error) {
      throw new Error('Projects Not Found');
    }
  }

  async findOne(id: string) {
    try {
      const project = await this.projectRepository.findOne({ where: { id } });
      if (!project) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return project;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const project = await this.projectRepository.preload({
        id: id,
        ...UpdateProjectDto,
      });

      if (!project)
        throw new NotFoundException(`Project whit id: ${id} not found`);
      return this.projectRepository.save(project);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const product = await this.findOne(id);
      await this.projectRepository.remove(product);
      return `Project with id: ${id} has been deleted`;
    } catch (error) {
      throw new BadRequestException(`Project Not Found`);
    }
  }

  private handleDBExceptions(error: any) {
    if (error.code === '1062') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
