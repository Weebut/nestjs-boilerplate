import { BaseCommandHandler } from '@libs/structure/domain/base-classes/base-command-handler';
import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { User } from '@components/users/domain/entities/user.entity';
import { Name } from '@components/users/domain/value-objects/name.value-object';
import { CommandHandler } from '@nestjs/cqrs';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { Email } from '@components/users/domain/value-objects/email.value-object';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler<ID> {
  constructor(unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: CreateUserCommand): Promise<ID> {
    const user = User.create({
      email: new Email(command.email),
      name: new Name({
        familyName: command.familyName,
        givenName: command.givenName,
        nickname: command.nickname,
      }),
    });

    // TODO : Persist user entity

    return user.id;
  }
}
