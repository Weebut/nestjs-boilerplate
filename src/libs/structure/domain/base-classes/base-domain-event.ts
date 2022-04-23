import { Guard } from '@Libs/structure/domain/guard';
import { UUID } from '@Libs/structure/domain/value-objects/uuid.value-object';

export type DomainEventProps<T> = Omit<
  T,
  'id' | 'correlationId' | 'dateOccurred'
> &
  Omit<BaseDomainEvent, 'id' | 'correlationId' | 'dateOccurred'> & {
    correlationId?: string;
    dateOccurred?: number;
  };

export abstract class BaseDomainEvent {
  public readonly id: string;

  public readonly aggregateId: string;
  public readonly dateOccurred: number;
  public correlationId: string;
  public causationId?: string;

  constructor(props: DomainEventProps<unknown>) {
    if (Guard.isEmpty(props)) {
      throw new Error('DomainEvent props should not be empty');
    }
    this.id = UUID.generate().unpack();
    this.aggregateId = props.aggregateId;
    this.dateOccurred = props.dateOccurred || Date.now();
    if (props.correlationId) this.correlationId = props.correlationId;
  }
}
