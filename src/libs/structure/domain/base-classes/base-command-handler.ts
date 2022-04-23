import { BaseCommand } from '@libs/structure/domain/base-classes/base-command';

export abstract class BaseCommandHandler {
  abstract handle(command: BaseCommand): Promise<any>;

  execute(command: BaseCommand) {
    // TODO : Make this action atomic
    return this.handle(command);
  }
}
