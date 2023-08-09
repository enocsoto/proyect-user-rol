import { IsArray, IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @MinLength(1)
  username: string;

  @IsArray()
  @IsEnum(ROLES, {each: true})
  roles: ROLES[] = [ROLES.User];

}
