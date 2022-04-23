import { UsersModule } from '@components/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
})
export class ComponentsModule {}
