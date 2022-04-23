import { DomainEventsPubSub } from '../pubsub/domain-events.pubsub';
import { BaseDomainEvent } from './base-domain-event';
import { Entity } from './base-entity';

export abstract class BaseAggregateRoot<
  EntityProps,
> extends Entity<EntityProps> {
  private _domainEvents: BaseDomainEvent[] = [];

  get domainEvents() {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: BaseDomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEventsPubSub.prepareForPublish(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
