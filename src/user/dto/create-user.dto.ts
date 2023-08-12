import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ValidRoles } from '../../constants/valid-roles';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John_Doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;


  @ApiProperty({
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    example: 34,
  })
  @IsNumber()
  @IsNotEmpty()
  @Max(99)
  @Min(0)
  age: number;

  @ApiProperty({
    example: 'john@example.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'E29sq1.',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ValidRoles)
  role: ValidRoles;
}
