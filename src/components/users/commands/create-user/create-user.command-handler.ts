import { CreateUserCommand } from '@components/users/commands/create-user/create-user.command';
import { UsersRepositoryPort } from '@components/users/database/users.repository.port';
import { User } from '@components/users/domain/entities/user.entity';
import { Email } from '@components/users/domain/value-objects/email.value-object';
import { Name } from '@components/users/domain/value-objects/name.value-object';
import { UserAlreadyExistsError } from '@components/users/errors/create-user.error';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { BaseCommandHandler } from '@libs/structure/domain/base-classes/base-command-handler';
import { ID } from '@libs/structure/domain/value-objects/id.value-object';
import { CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler extends BaseCommandHandler<ID> {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: CreateUserCommand): Promise<ID> {
    const usersRepository: UsersRepositoryPort =
      this.unitOfWork.getUsersRepository(command.correlationId);

    if (await usersRepository.exists(command.email)) {
      throw new UserAlreadyExistsError();
    }

    const user = User.create({
      email: new Email(command.email),
      name: new Name({
        familyName: command.familyName,
        givenName: command.givenName,
        nickname: command.nickname,
      }),
    });

    user.someBusinessLogic();

    const created = await usersRepository.save(user);

    return created.id;
  }
}
