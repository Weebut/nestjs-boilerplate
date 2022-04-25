import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { CreateUserRequest } from '@components/users/commands/create-user/create-user.request.dto';
import { usersRouteRoot } from '@components/users/constants/route';
import { v1 } from '@infrastructure/configs/versions/v1';
import { ConflictException } from '@libs/exceptions';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { IdResponse } from '@libs/structure/interface-adapters/dtos/id-response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DeleteUserCommand } from './commands/delete-user/delete-user.command';
import { User } from './domain/entities/user.entity';
import { UserResponse } from './dtos/user.response.dto';
import { UserAlreadyExistsError } from './errors/create-user.error';
import { FindOneUserQuery } from './queries/find-one-user/find-one-user.query';
import { FindUsersQuery } from './queries/find-users/find-users.query';
import { FindUsersRequest } from './queries/find-users/find-users.request.dto';

@Controller({ version: v1, path: usersRouteRoot })
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

  @Get()
  async findUsers(@Query() queries: FindUsersRequest) {
    const query = new FindUsersQuery(queries);
    const result = await this.queryBus.execute(query);

    return result.map((user: User) => new UserResponse(user));
  }

  @Get(':userId')
  async findUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const query = new FindOneUserQuery({ userId });
    const result = await this.queryBus.execute(query);

    return new UserResponse(result);
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseUUIDPipe) userId: string) {
    const command = new DeleteUserCommand({ userId });
    await this.commandBus.execute(command);
  }
}
