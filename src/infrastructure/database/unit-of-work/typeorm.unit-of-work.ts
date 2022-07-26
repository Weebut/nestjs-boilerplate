import { UserOrmEntity } from '@components/users/database/user.orm-entity';
import { UsersRepository } from '@components/users/database/users.repository';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { BaseTypeormUnitOfWork } from '@libs/structure/infrastructure/database/unit-of-work/base-typeorm.unit-of-work';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormUnitOfWork
  extends BaseTypeormUnitOfWork
  implements UnitOfWorkPort
{
  // Add new repositories below to use this generic UnitOfWork

  getUsersRepository(correlationId: string): UsersRepository {
    return new UsersRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
