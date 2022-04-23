import { BaseCommandHandler } from '@Libs/structure/domain/base-classes/base-command-handler';
import { CreateUserCommand } from '@Components/users/commands/create-user/create-user.command';
import { User } from '@Components/users/domain/entities/user.entity';
import { Foo } from '@Components/users/domain/value-objects/foo.value-object';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler {
  async handle(command: CreateUserCommand) {
    const user = User.create({
      foo: new Foo(command.foo),
    });

    // TODO : Persist user entity

    return user.id;
  }
}
