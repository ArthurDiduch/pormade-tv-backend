import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import sharp from 'sharp';
import { UpdatePasswordDto } from './dto/update-passwrod.dto';

const saltRounds = Number(process.env.SALT_ROUNDS);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const salt = bcrypt.genSaltSync(saltRounds);
      createUserDto.password = bcrypt.hashSync(
        String(createUserDto.password),
        salt,
      );
      const newUser = await this.userRepository.save(createUserDto);
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new ConflictException();
    }
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }
  async findOneOrFail(email: string) {
    const user = await this.userRepository.findOneOrFail({ where: { email } });
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneOrFail({
      where: { id: id },
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'password'],
    });
    console.log(user);

    return user;
  }
  async findImg(id: number) {
    const imgUser = await this.userRepository.findOneOrFail({
      where: { id: id },
      select: ['imgProfile'],
    });

    return imgUser;
  }

  async updatePassword(id: number, updatePassword: UpdatePasswordDto) {
    try {
      const user = await this.userRepository.findOneOrFail({
        where: { id: id },
        select: ['password'],
      });
      const password = user.password;
      const compare = bcrypt.compareSync(
        updatePassword.currentPassword,
        password,
      );

      console.log(this.update);
      if (!compare) {
        throw new UnauthorizedException();
      }

      const salt = bcrypt.genSaltSync(saltRounds);
      updatePassword.password = bcrypt.hashSync(
        String(updatePassword.password),
        salt,
      );
      delete updatePassword.currentPassword;
      const updatedPassword = await this.userRepository.update(
        { id },
        updatePassword,
      );
      if (!updatedPassword) {
        throw new ConflictException();
      }
    } catch (error) {
      throw new HttpException(error.status, error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userRepository.update(
        { id },
        updateUserDto,
      );

      if (!updatedUser) {
        throw new ConflictException();
      }
      return this.userRepository.findOneOrFail({
        where: { id: id },
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      });
    } catch (error) {
      throw new HttpException(error.status, error.message);
    }
  }

  async remove(id: number) {
    try {
      const deletedUser = await this.userRepository.findOneOrFail({
        where: { id: id },
      });
      if (!deletedUser) {
        throw new ConflictException();
      }
      this.userRepository.delete({ id: id });
    } catch (error) {
      throw new NotFoundException();
    }
  }
  async imageToBytes(imagePath: string): Promise<Buffer> {
    const imageBuffer = await sharp(imagePath).toBuffer();
    return imageBuffer;
  }
}
