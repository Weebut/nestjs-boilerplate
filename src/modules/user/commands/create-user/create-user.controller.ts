import { v1 } from '@Configs/versions/v1';
import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ID } from 'src/libs/architecture/domain/value-objects/id.value-object';
import { IdResponse } from 'src/libs/architecture/interface-adapters/dtos/id-response.dto';
import { usersRoute } from '../../constants/route';
import { CreateUserCommand } from './create-user.command';
import { CreateUserRequest } from './create-user.request.dto';

@Controller({ version: v1, path: usersRoute.createUser })
export class CreateUserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async create(@Body() body: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body);

    const result: ID = await this.commandBus.execute(command);

    return new IdResponse(result.value);
  }
}
