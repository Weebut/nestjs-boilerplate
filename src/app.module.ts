import { ComponentsModule } from '@Components/components.module';
import { EnvironmentConfigModule } from '@Configs/environment/environment.module';
import { TypeormConfigModule } from '@Configs/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';

@Module({
  imports: [EnvironmentConfigModule, TypeormConfigModule, ComponentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
