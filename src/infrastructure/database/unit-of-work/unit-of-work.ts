import { UserOrmEntity } from '@components/users/database/user.orm-entity';
import { UsersRepository } from '@components/users/database/users.repository';
import { TypeormUnitOfWork } from '@libs/structure/infrastructure/database/unit-of-work/typeorm.unit-of-work';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  getUsersRepository(correlationId: string): UsersRepository {
    return new UsersRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
