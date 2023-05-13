import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from './create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/users')
@UsePipes(new ValidationPipe({ transform: true }))
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  async createUser(@Body() { name }: CreateUserDTO): Promise<User> {
    return await this.service.create(name);
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.service.find(id);
  }

  @Get()
  async listUsers(): Promise<User[]> {
    return await this.service.all();
  }
}
