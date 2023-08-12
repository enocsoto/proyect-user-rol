import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ProjectStatus } from 'src/constants/vaild-statusProjects';

export class CreateProjectDto {
  @ApiProperty({
    example: 'Proyecto de Desarrollo Web',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  name: string;

  @ApiProperty({
    example: 'Descripción detallada del proyecto.',
  })
  @IsString()
  description?: string;

  @IsArray()
  @IsEnum(ProjectStatus, { each: true })
  status: ProjectStatus[] = [ProjectStatus.IN_PROGRESS];
}
