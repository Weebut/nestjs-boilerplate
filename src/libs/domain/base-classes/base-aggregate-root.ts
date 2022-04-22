import { DomainEvents } from '../domain-events/domain-events';
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
    DomainEvents.prepareForPublish(this);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }
}
