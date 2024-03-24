import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/validation/zod-validation-pipe';
import { createUserSchema, updatePasswordSchema } from './schema/user.schema';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UUID } from 'crypto';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() dto: CreateUserDto) {
    return await this.usersService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ZodValidationPipe(updatePasswordSchema)) dto: UpdatePasswordDto,
  ) {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return await this.usersService.delete(id);
  }
}
