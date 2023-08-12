import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  public get userRepository(): Repository<UserAuth> {
    return this._userRepository;
  }

  constructor(
    @InjectRepository(UserAuth)
    private readonly _userRepository: Repository<UserAuth>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 8),
      });
      await this.userRepository.save(user);
      delete user.password;
      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      throw this.handleDBExceptions(error.message)
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true },
      });
      if (!user)
        throw new UnauthorizedException('Credentials are not valid (email)');
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid ');

      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
     this.handleDBExceptions(error)
    }
  }

  private getJwtToken(payload: JwtPayload) {
    //generar el token
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBExceptions(error: any) {
    if (error.code === 'ER_DUP_ENTRY') throw new BadRequestException(error.detail);
    console.log(error.code)
    this.logger.error(error);
    throw new InternalServerErrorException(
      `Unexpected error, check server logs`,
    );
  }
}
