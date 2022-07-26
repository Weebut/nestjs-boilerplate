import { BaseAggregateRoot } from '../base-classes/base-aggregate-root';
import { Logger } from './logger.port';

export interface DomainEventsPubSubPort {
  publishEvents(
    aggregate: BaseAggregateRoot<unknown>,
    logger: Logger,
    correlationId?: string,
  ): Promise<void>;
}
