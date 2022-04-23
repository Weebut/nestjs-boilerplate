import {
  BaseDomainEventClass,
  DomainEventsPubSub,
} from '../pubsub/domain-events.pubsub';
import { BaseDomainEvent } from './base-domain-event';

export abstract class BaseDomainEventHandler {
  constructor(private readonly event: BaseDomainEventClass) {}

  abstract handle(event: BaseDomainEvent): Promise<void>;

  public listen(): void {
    DomainEventsPubSub.subscribe(this.event, this);
  }
}
