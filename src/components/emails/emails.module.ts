import { Module } from '@nestjs/common';
import { SendEmailWhenUserIsCreatedDomainEventHandler } from './applications/event-handlers/send-email-when-user-created.event-handler';

const EventHandlerProviders = [SendEmailWhenUserIsCreatedDomainEventHandler];

@Module({
  providers: [...EventHandlerProviders],
})
export class EmailsModule {}
