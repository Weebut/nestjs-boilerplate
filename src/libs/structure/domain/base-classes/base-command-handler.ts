import { BaseCommand } from '@libs/structure/domain/base-classes/base-command';
import { UnitOfWorkPort } from '../ports/unit-of-work.port';

export abstract class BaseCommandHandler<ReturnType = never> {
  constructor(protected readonly unitOfWork: UnitOfWorkPort) {}

  abstract handle(command: BaseCommand): Promise<ReturnType>;

  execute(command: BaseCommand): Promise<ReturnType> {
    return this.unitOfWork.execute(command.correlationId, async () =>
      this.handle(command),
    );
  }
}
