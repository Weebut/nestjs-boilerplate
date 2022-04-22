import { EnvironmentConfigModule } from '@Configs/environment/environment.module';
import { TypeormConfigModule } from '@Configs/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [EnvironmentConfigModule, TypeormConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
