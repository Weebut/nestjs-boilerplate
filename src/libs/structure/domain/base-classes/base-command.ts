import { Guard } from '../guard';

export type BaseCommandProps<T> = Omit<T, 'correlationId' | 'id'> &
  Partial<BaseCommand>;

export class BaseCommand {
  readonly id: string;
  readonly correlationId: string;

  constructor(props: any) {
    if (Guard.isEmpty(props)) {
      throw new Error('Command props should not be empty');
    }

    this.correlationId = props.correlationId;
    this.id = props.id;
  }
}
