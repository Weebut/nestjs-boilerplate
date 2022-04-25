import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';
import {
  BaseOrmMapper,
  EntityProps,
  OrmEntityProps,
} from '@libs/structure/infrastructure/database/base-classes/base-orm-mapper';
import { Portfolio } from '../domain/entities/portfolio.entity';
import { User, UserProps } from '../domain/entities/user.entity';
import { Email } from '../domain/value-objects/email.value-object';
import { URL } from '../domain/value-objects/url.value-object';
import { Name } from '../domain/value-objects/name.value-object';
import { PortfolioOrmEntity } from './portfolio.orm-entity';
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
      portfolios:
        props.portfolios?.map((portfolio) => {
          const id = portfolio.id.value;
          const { createdAt, updatedAt, link, ...portfolioProps } =
            portfolio.getCopy();
          return new PortfolioOrmEntity({
            ...portfolioProps,
            id,
            link: link.value,
            user: null,
            createdAt: createdAt.value,
            updatedAt: updatedAt.value,
          });
        }) ?? [],
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
      portfolios:
        ormEntity.portfolios?.map((portfolio) => {
          const id = new UUID(portfolio.id);
          const { link, isPublic } = portfolio;

          return new Portfolio({
            id,
            props: { link: new URL(link), isPublic },
          });
        }) ?? [],
    };

    return { id, props };
  }
}
