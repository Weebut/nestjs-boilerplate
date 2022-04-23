import { BaseCommand } from './base-command';

export abstract class BaseCommandHandler {
  abstract handle(command: BaseCommand): Promise<any>;

  execute(command: BaseCommand) {
    // TODO : Make this action atomic
    return this.handle(command);
  }
}
