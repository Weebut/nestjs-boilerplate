import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserCommandHandler } from './commands/create-user/create-user.command-handler';
import { UserOrmEntity } from './database/user.orm-entity';
import { UsersController } from './users.controller';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [...commandHandlers],
})
export class UsersModule {}
