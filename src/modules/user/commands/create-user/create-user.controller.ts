import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: CreateUserRequest): Promise<void> {
    const command = new CreateUserCommand(body);

    const result = await this.commandBus.execute(command);

    return result;
  }
}
