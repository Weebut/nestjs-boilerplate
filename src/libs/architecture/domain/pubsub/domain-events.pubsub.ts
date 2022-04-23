/* eslint-disable no-param-reassign */
import { Final } from '../../../decorators/final.decorator';
import { BaseAggregateRoot } from '../base-classes/base-aggregate-root';
import { BaseDomainEvent } from '../base-classes/base-domain-event';
import { BaseDomainEventHandler } from '../base-classes/base-domain-event-handler';
import { Logger } from '../ports/logger.port';
import { ID } from '../value-objects/id.value-object';

type EventName = string;

// Since Base domain event is an abstract class
export type BaseDomainEventClass = new (...args: never[]) => BaseDomainEvent;

@Final
export class DomainEventsPubSub {
  private static subscribers: Map<EventName, BaseDomainEventHandler[]> =
    new Map();

  private static aggregates: BaseAggregateRoot<unknown>[] = [];

  public static subscribe<T extends BaseDomainEventHandler>(
    event: BaseDomainEventClass,
    eventHandler: T,
  ): void {
    const eventName: EventName = event.name;
    if (!this.subscribers.has(eventName)) {
      this.subscribers.set(eventName, []);
    }
    this.subscribers.get(eventName)?.push(eventHandler);
  }

  public static prepareForPublish(aggregate: BaseAggregateRoot<unknown>): void {
    const aggregateFound = !!this.findAggregateByID(aggregate.id);
    if (!aggregateFound) {
      this.aggregates.push(aggregate);
    }
  }

  public static async publishEvents(
    id: ID,
    logger: Logger,
    correlationId?: string,
  ): Promise<void> {
    const aggregate = this.findAggregateByID(id);

    if (aggregate) {
      logger.debug(
        `[${aggregate.domainEvents.map(
          (event) => event.constructor.name,
        )}] published ${aggregate.id.value}`,
      );
      await Promise.all(
        aggregate.domainEvents.map((event: BaseDomainEvent) => {
          if (correlationId && !event.correlationId) {
            event.correlationId = correlationId;
          }
          return this.publish(event, logger);
        }),
      );
      aggregate.clearEvents();
      this.removeAggregateFromPublishList(aggregate);
    }
  }

  private static findAggregateByID(
    id: ID,
  ): BaseAggregateRoot<unknown> | undefined {
    for (const aggregate of this.aggregates) {
      if (aggregate.id.equals(id)) {
        return aggregate;
      }
    }
  }

  private static removeAggregateFromPublishList(
    aggregate: BaseAggregateRoot<unknown>,
  ): void {
    const index = this.aggregates.findIndex((a) => a.equals(aggregate));
    this.aggregates.splice(index, 1);
  }

  private static async publish(
    event: BaseDomainEvent,
    logger: Logger,
  ): Promise<void> {
    const eventName: string = event.constructor.name;

    if (this.subscribers.has(eventName)) {
      const handlers: BaseDomainEventHandler[] =
        this.subscribers.get(eventName) || [];
      await Promise.all(
        handlers.map((handler) => {
          logger.debug(
            `[${handler.constructor.name}] handling ${event.constructor.name} ${event.aggregateId}`,
          );
          return handler.handle(event);
        }),
      );
    }
  }
}
