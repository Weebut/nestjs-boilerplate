import { ContextLogger } from '@infrastructure/logger/context-logger';
import { NotFoundException } from '@libs/exceptions';
import { QueryParams } from '@libs/structure/domain/ports/repository.port';
import {
  BaseTypeormRepository,
  WhereCondition,
} from '@libs/structure/infrastructure/database/base-classes/base-typeorm-repository';
import { removeUndefinedProps } from '@libs/utils/remove-undefined-props.util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserProps } from '../domain/entities/user.entity';
import { FindUsersQuery } from '../queries/find-users/find-users.query';
import { UserOrmEntity } from './user.orm-entity';
import { UserOrmMapper } from './user.orm.mapper';
import { UsersRepositoryPort } from './users.repository.port';

@Injectable()
export class UsersRepository
  extends BaseTypeormRepository<User, UserProps, UserOrmEntity>
  implements UsersRepositoryPort
{
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly usersRepository: Repository<UserOrmEntity>,
  ) {
    super(
      usersRepository,
      new UserOrmMapper(User, UserOrmEntity),
      new ContextLogger('UsersRepository'),
    );
  }

  protected relations: string[] = [];

  private async findOneById(id: string): Promise<UserOrmEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    return user;
  }

  async findOneByIdOrThrow(id: string): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  private async findOneByEmail(
    email: string,
  ): Promise<UserOrmEntity | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async findOneByEmailOrThrow(email: string): Promise<User> {
    const user = await this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email '${email}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(email: string): Promise<boolean> {
    const found = await this.findOneByEmail(email);
    if (found) {
      return true;
    }
    return false;
  }

  async findUsers(query: FindUsersQuery): Promise<User[]> {
    const where: QueryParams<UserOrmEntity> = removeUndefinedProps(query);
    const users = await this.repository.find({ where });
    return users.map((user) => this.mapper.toDomainEntity(user));
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): WhereCondition<UserOrmEntity> {
    const where: QueryParams<UserOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.createdAt) {
      where.createdAt = params.createdAt.value;
    }
    if (params.name?.familyName) {
      where.familyName = params.name.familyName;
    }
    if (params.name?.givenName) {
      where.givenName = params.name.givenName;
    }
    if (params.name?.nickname) {
      where.nickname = params.name.nickname;
    }
    return where;
  }
}
