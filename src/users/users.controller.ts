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
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: UUID,
    @Body(new ZodValidationPipe(updatePasswordSchema)) dto: UpdatePasswordDto,
  ) {
    return this.usersService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', new ParseUUIDPipe()) id: UUID) {
    return this.usersService.delete(id);
  }
}
