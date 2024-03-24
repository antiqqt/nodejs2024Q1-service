import { randomUUID } from 'crypto';

import { CreateUserDto } from '../dto/create-user.dto';

export class User {
  readonly id: string;
  login: string;
  password: string;
  version: number; // integer number, increments on update
  readonly createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update

  constructor({ login, password }: CreateUserDto) {
    this.id = randomUUID();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
  }
}
