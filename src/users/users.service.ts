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
      select: ['id', 'name', 'roles', 'email', 'createdAt', 'updatedAt'],
      relations: { video: true },
    });
  }
  async findOneOrFail(email: string) {
    const user = await this.userRepository.findOneOrFail({ where: { email } });
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOneOrFail({
      select: ['id', 'name', 'email', 'video', 'roles', 'imgProfile'],
      where: { id },
      relations: { video: true },
    });

    /* console.log(user);

    user.video.map((video) => {
      delete video.id;;
    }) */

    return user;
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

      if (!compare) {
        throw new UnauthorizedException();
      }

      if (updatePassword.currentPassword == updatePassword.password) {
        throw new ConflictException();
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
        throw new UnauthorizedException();
      }
      return this.userRepository.findOneOrFail({
        where: { id: id },
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt', 'lastvideo'],
      });
    } catch (error) {
      throw new ConflictException();
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
