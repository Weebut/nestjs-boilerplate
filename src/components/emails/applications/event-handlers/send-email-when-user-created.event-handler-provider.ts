import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { Provider } from '@nestjs/common';
import { SendEmailWhenUserIsCreatedDomainEventHandler } from './send-email-when-user-created.event-handler';

export const sendEmailWhenUserIsCreatedProvider: Provider = {
  provide: SendEmailWhenUserIsCreatedDomainEventHandler,
  inject: [UnitOfWork],
  useFactory: (
    unitOfWork: UnitOfWork,
  ): SendEmailWhenUserIsCreatedDomainEventHandler => {
    const eventHandler = new SendEmailWhenUserIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
};
