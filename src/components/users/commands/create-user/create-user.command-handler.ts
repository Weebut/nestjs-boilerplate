import { BaseCommandHandler } from '@libs/structure/domain/base-classes/base-command-handler';
import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { User } from '@components/users/domain/entities/user.entity';
import { Foo } from '@components/users/domain/value-objects/foo.value-object';
import { CommandHandler } from '@nestjs/cqrs';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler<ID> {
  async handle(command: CreateUserCommand): Promise<ID> {
    const user = User.create({
      foo: new Foo(command.foo),
    });

    // TODO : Persist user entity

    return user.id;
  }
}
