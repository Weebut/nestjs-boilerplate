import { UsersModule } from '@Components/users/users.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [UsersModule],
})
export class ComponentsModule {}
