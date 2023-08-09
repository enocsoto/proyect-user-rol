import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/common/error.manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepository.create(createUserDto);
      if (!user)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: "User don't createdon DB",
        });
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new ErrorManager.createError(error.message);
    }
  }

  async findAll() {
    try {
      const user = await this.userRepository.find();
      if (user.length === 0)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not Found on DB',
        });
      return user;
    } catch (error) {
      throw new ErrorManager.createError(error.message);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
      });
      return user;
    } catch (error) {
      throw new NotFoundException(` User with ID ${id} not found `);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      this.userRepository.merge(user, updateUserDto);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(` Error the user has not updated `);
    }
  }

  async remove(id: string) {
    try {
      await this.userRepository.delete(id);
      return `User with id: ${id} deleted`;
    } catch (error) {
      throw new NotFoundException(` User whit id ${id} not found `);
    }
  }

  // private handleExceptions(error: any) {
  //   if (error.code === 'ER_DUP_ENTRY')
  //     throw new BadRequestException(
  //       `User whit email exists in bd ${JSON.stringify(error.code)}`,
  //     );

  //   throw new InternalServerErrorException(
  //     `Can't create User - Chek server Logs`,
  //   );
  // }
}
