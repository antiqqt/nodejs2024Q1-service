import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'src/common/interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { getUserWithoutPassword } from './users.utils';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((u) => getUserWithoutPassword(u));
  }

  async findOne(id: UUID) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return getUserWithoutPassword(user);
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: new User(dto) });
    return getUserWithoutPassword(user);
  }

  async update(id: UUID, dto: UpdatePasswordDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    const isOldPasswordValid = user.password === dto.oldPassword;
    if (!isOldPasswordValid) throw new ForbiddenException('Wrong password');

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: dto.newPassword, version: user.version + 1, updatedAt: Date.now() },
    });

    return getUserWithoutPassword(updatedUser);
  }

  async delete(id: UUID) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
