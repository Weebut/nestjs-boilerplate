import { BaseTypeormEntity } from 'src/libs/architecture/infrastructure/database/base-classes/base-typeorm-entity';
import { Entity } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends BaseTypeormEntity {}
