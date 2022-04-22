import { CommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from 'src/libs/domain/base-classes/base-command-handler';
import { User } from '../../domain/entities/user.entity';
import { Foo } from '../../domain/value-objects/foo.value-object';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler {
  async handle(command: CreateUserCommand) {
    const user = User.create({
      foo: new Foo(command.foo),
    });

    return user;
  }
}
