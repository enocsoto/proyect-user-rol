import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetUser } from './decorators';
import { UserAuth } from './entities';
import { ValidRoles } from '../constants/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('prueba')
  @Auth(ValidRoles.Admin, ValidRoles.SuperUser)
  testingPrivateRoute(@GetUser() user: UserAuth) {
    return {
      ok: true,
      message: 'Hola Mundo',
      user,
    };
  }
}
