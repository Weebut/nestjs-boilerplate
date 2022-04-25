import { UsersRepositoryPort } from '@components/users/database/users.repository.port';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { BaseCommandHandler } from '@libs/structure/domain/base-classes/base-command-handler';
import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler extends BaseCommandHandler<void> {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    const usersRepository: UsersRepositoryPort =
      this.unitOfWork.getUsersRepository(command.correlationId);

    const found = await usersRepository.findOneByIdOrThrow(command.userId);
    await usersRepository.delete(found);
  }
}
