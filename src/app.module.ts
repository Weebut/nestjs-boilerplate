import { EnvironmentConfigModule } from '@Configs/environment/environment.module';
import { TypeormConfigModule } from '@Configs/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [EnvironmentConfigModule, TypeormConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
