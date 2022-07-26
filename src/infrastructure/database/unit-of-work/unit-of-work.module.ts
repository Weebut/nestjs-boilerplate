import { TypeormUnitOfWork } from '@infrastructure/database/unit-of-work/typeorm.unit-of-work';
import { ContextLogger } from '@infrastructure/logger/context-logger';
import { Global, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

export const UnitOfWorkProviderName = 'UnitOfWork';

const unitOfWorkProvider = {
  provide: UnitOfWorkProviderName,
  inject: [DataSource],
  useFactory: (source: DataSource) =>
    new TypeormUnitOfWork(source, new ContextLogger()),
};

@Global()
@Module({
  imports: [],
  providers: [unitOfWorkProvider],
  exports: [UnitOfWorkProviderName],
})
export class UnitOfWorkModule {}
