import { CreateUserCommandHandler } from '@Components/users/commands/create-user/create-user.command-handler';
import { UserOrmEntity } from '@Components/users/database/user.orm-entity';
import { UsersController } from '@Components/users/users.controller';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

const commandHandlers = [CreateUserCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [UsersController],
  providers: [...commandHandlers],
})
export class UsersModule {}
