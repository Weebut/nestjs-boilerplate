import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { CreateUserRequest } from '@components/users/commands/create-user/create-user.request.dto';
import { usersRoute } from '@components/users/constants/route';
import { v1 } from '@infrastructure/configs/versions/v1';
import { ConflictException } from '@libs/exceptions';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { IdResponse } from '@libs/structure/interface-adapters/dtos/id-response.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserAlreadyExistsError } from './errors/create-user.error';

@Controller({ version: v1, path: usersRoute.root })
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body);
    try {
      const result: ID = await this.commandBus.execute(command);

      return new IdResponse(result.value);
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }
}
