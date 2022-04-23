import { ID } from '@Libs/structure/domain/value-objects/id.value-object';
import { IdResponse } from '@Libs/structure/interface-adapters/dtos/id-response.dto';
import { CreateUserCommand } from '@Components/users/commands/create-user/create-user.command';
import { CreateUserRequest } from '@Components/users/commands/create-user/create-user.request.dto';
import { usersRoute } from '@Components/users/constants/route';
import { v1 } from '@Infrastructure/configs/versions/v1';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

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
