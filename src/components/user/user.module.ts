import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { CreateUserCommandHandler } from './commands/create-user/create-user.command-handler';
import { UserOrmEntity } from './database/user.orm-entity';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [CreateUserController],
  providers: [...commandHandlers],
})
export class UserModule {}
