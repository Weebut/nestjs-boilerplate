import { EnvironmentConfigModule } from '@Configs/environment/environment.module';
import { TypeormConfigModule } from '@Configs/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComponentsModule } from './components/components.module';

@Module({
  imports: [EnvironmentConfigModule, TypeormConfigModule, ComponentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
