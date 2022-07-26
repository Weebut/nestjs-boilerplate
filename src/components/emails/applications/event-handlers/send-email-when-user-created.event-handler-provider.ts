import { UnitOfWorkProviderName } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { Provider } from '@nestjs/common';
import { SendEmailWhenUserIsCreatedDomainEventHandler } from './send-email-when-user-created.event-handler';

export const sendEmailWhenUserIsCreatedProvider: Provider = {
  provide: SendEmailWhenUserIsCreatedDomainEventHandler,
  inject: [UnitOfWorkProviderName],
  useFactory: (
    unitOfWork: UnitOfWorkPort,
  ): SendEmailWhenUserIsCreatedDomainEventHandler => {
    const eventHandler = new SendEmailWhenUserIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
};
