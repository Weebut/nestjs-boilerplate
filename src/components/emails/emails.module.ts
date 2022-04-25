import { Module } from '@nestjs/common';
import EventHandlerProviders from './applications/event-handlers/providers';

@Module({
  providers: [...EventHandlerProviders],
})
export class EmailsModule {}
