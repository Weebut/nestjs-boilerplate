import { Module } from '@nestjs/common';
import { NeutralController } from './neutral.controller';

@Module({
  controllers: [NeutralController],
})
export class NeutralControllersModule {}
