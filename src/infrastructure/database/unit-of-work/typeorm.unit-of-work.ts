import { UserOrmEntity } from '@components/users/database/user.orm-entity';
import { UsersRepository } from '@components/users/database/users.repository';
import { DomainEventsPubSubPort } from '@libs/structure/domain/ports/domain-events-pubsub.port';
import { Logger } from '@libs/structure/domain/ports/logger.port';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { BaseTypeormUnitOfWork } from '@libs/structure/infrastructure/database/unit-of-work/base-typeorm.unit-of-work';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeormUnitOfWork
  extends BaseTypeormUnitOfWork
  implements UnitOfWorkPort
{
  // Add new repositories below to use this generic UnitOfWork

  constructor(
    dataSource: DataSource,
    logger: Logger,
    private readonly eventPubSub: DomainEventsPubSubPort,
  ) {
    super(dataSource, logger);
  }

  getUsersRepository(correlationId: string): UsersRepository {
    return new UsersRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
      this.eventPubSub,
    ).setCorrelationId(correlationId);
  }
}
