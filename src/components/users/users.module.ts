import { CreateUserCommandHandler } from '@components/users/commands/create-user/create-user.command-handler';
import { DeleteUserCommandHandler } from '@components/users/commands/delete-user/delete-user.command-handler';
import { UserOrmEntity } from '@components/users/database/user.orm-entity';
import { UsersController } from '@components/users/users.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './database/users.repository';
import { FindUsersQueryHandler } from './queries/find-users/find-users.query-handler';

const repositories = [UsersRepository];

const commandHandlers = [CreateUserCommandHandler, DeleteUserCommandHandler];

const queryHandlers = [FindUsersQueryHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [...commandHandlers, ...queryHandlers, ...repositories],
})
export class UsersModule {}
