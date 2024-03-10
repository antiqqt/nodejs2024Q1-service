import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';

import { UUID } from 'src/common/interfaces';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { getUserWithoutPassword } from './users.constants';

@Injectable()
export class UsersService {
  private users: User[] = [];

  findAll() {
    return this.users.map(getUserWithoutPassword);
  }

  findOne(id: UUID) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    return getUserWithoutPassword(user);
  }

  create(dto: CreateUserDto) {
    const user = new User(dto);

    this.users.push(user);
    return getUserWithoutPassword(user);
  }

  update(id: UUID, dto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');

    const isOldPasswordValid = user.password === dto.oldPassword;
    if (!isOldPasswordValid) throw new ForbiddenException('Wrong password');

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return getUserWithoutPassword(user);
  }

  delete(id: UUID) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex < 0) throw new NotFoundException('User not found');

    this.users.splice(userIndex, 1);
  }
}
