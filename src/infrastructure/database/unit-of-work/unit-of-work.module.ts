import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ContextLogger } from '@infrastructure/logger/context-logger';
import { Global, Module } from '@nestjs/common';

const unitOfWorkSingleton = new UnitOfWork(new ContextLogger());

const unitOfWorkSingletonProvider = {
  provide: UnitOfWork,
  useFactory: () => unitOfWorkSingleton,
};

@Global()
@Module({
  imports: [],
  providers: [unitOfWorkSingletonProvider],
  exports: [UnitOfWork],
})
export class UnitOfWorkModule {}
