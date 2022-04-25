import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';
import {
  BaseOrmMapper,
  EntityProps,
  OrmEntityProps,
} from '@libs/structure/infrastructure/database/base-classes/base-orm-mapper';
import { User, UserProps } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.value-object';
import { Name } from '../domain/value-objects/name.value-object';
import { UserOrmEntity } from './user.orm-entity';

export class UserOrmMapper extends BaseOrmMapper<User, UserOrmEntity> {
  protected toOrmProps(entity: User): OrmEntityProps<UserOrmEntity> {
    const props = entity.getCopy();

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      email: props.email.value,
      familyName: props.name.familyName,
      givenName: props.name.givenName,
      nickname: props.name.nickname,
      role: props.role,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: UserOrmEntity): EntityProps<UserProps> {
    const id = new UUID(ormEntity.id);
    const props: UserProps = {
      email: new Email(ormEntity.email),
      role: ormEntity.role,
      name: new Name({
        familyName: ormEntity.familyName,
        givenName: ormEntity.givenName,
        nickname: ormEntity.nickname,
      }),
    };

    return { id, props };
  }
}
