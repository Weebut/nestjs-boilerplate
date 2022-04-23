import { BaseEntityProps } from 'src/libs/domain/base-classes/base-entity';
import { IdResponse } from '../dtos/id-response.dto';

export class BaseResponse extends IdResponse {
  constructor(entity: BaseEntityProps) {
    super(entity.id.value);
    this.createdAt = entity.createdAt.value.toISOString();
    this.updatedAt = entity.updatedAt.value.toISOString();
  }

  readonly createdAt: string;
  readonly updatedAt: string;
}
