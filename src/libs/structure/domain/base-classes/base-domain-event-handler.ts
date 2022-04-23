import { BaseDomainEvent } from '@libs/structure/domain/base-classes/base-domain-event';
import {
  BaseDomainEventClass,
  DomainEventsPubSub,
} from '@libs/structure/domain/pubsub/domain-events.pubsub';

export abstract class BaseDomainEventHandler {
  constructor(private readonly event: BaseDomainEventClass) {}

  abstract handle(event: BaseDomainEvent): Promise<void>;

  public listen(): void {
    DomainEventsPubSub.subscribe(this.event, this);
  }
}
