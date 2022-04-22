import { TypeormBaseEntity } from 'src/libs/infrastructure/base-classes/typeorm.base-entity';
import { Entity } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends TypeormBaseEntity {}
