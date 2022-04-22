import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserController } from './commands/create-user/create-user.controller';
import { UserOrmEntity } from './database/user.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [CreateUserController],
})
export class UserModule {}
