import { BaseDomainEvent } from '@Arch/domain/base-classes/base-domain-event';
import {
  BaseDomainEventClass,
  DomainEventsPubSub,
} from '@Arch/domain/pubsub/domain-events.pubsub';

export abstract class BaseDomainEventHandler {
  constructor(private readonly event: BaseDomainEventClass) {}

  abstract handle(event: BaseDomainEvent): Promise<void>;

  public listen(): void {
    DomainEventsPubSub.subscribe(this.event, this);
  }
}
