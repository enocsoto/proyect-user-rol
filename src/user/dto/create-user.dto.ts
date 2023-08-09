import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ROLES } from '../../constants/roles';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
  
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
