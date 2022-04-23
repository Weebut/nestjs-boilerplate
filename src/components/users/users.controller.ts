import { v1 } from '@Configs/versions/v1';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ID } from 'src/libs/architecture/domain/value-objects/id.value-object';
import { IdResponse } from 'src/libs/architecture/interface-adapters/dtos/id-response.dto';
import { CreateUserCommand } from './commands/create-user/create-user.command';
import { CreateUserRequest } from './commands/create-user/create-user.request.dto';
import { usersRoute } from './constants/route';

@Controller({ version: v1, path: usersRoute.root })
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body);

    const result: ID = await this.commandBus.execute(command);

    return new IdResponse(result.value);
  }
}
