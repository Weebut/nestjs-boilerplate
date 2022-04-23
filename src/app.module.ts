import { ComponentsModule } from '@components/components.module';
import { EnvironmentConfigModule } from '@infrastructure/configs/environment/environment.module';
import { TypeormConfigModule } from '@infrastructure/configs/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [EnvironmentConfigModule, TypeormConfigModule, ComponentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
