import { CommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from 'src/libs/domain/base-classes/base-command-handler';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler {
  async handle(command: CreateUserCommand) {
    return command;
  }
}
