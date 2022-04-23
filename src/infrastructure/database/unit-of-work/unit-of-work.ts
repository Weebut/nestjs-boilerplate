import { TypeormUnitOfWork } from '@libs/structure/infrastructure/database/unit-of-work/typeorm.unit-of-work';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork
}
