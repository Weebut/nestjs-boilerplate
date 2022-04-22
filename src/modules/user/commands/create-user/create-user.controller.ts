import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequest } from './create-user.request.dto';

@Controller('users')
export class CreateUserController {
  @Post()
  async create(@Body() body: CreateUserRequest): Promise<void> {
    console.log(body);
  }
}
