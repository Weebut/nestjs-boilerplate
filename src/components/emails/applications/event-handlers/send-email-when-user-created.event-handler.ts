import { UserCreatedDomainEvent } from '@components/users/domain/events/user-created.domain-event';
import { UnitOfWorkProviderName } from '@infrastructure/database/unit-of-work/unit-of-work.module';
import { BaseDomainEventHandler } from '@libs/structure/domain/base-classes/base-domain-event-handler';
import { UnitOfWorkPort } from '@libs/structure/domain/ports/unit-of-work.port';
import { Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export class SendEmailWhenUserIsCreatedDomainEventHandler extends BaseDomainEventHandler {
  constructor(
    @Inject(UnitOfWorkProviderName)
    protected readonly unitOfWork: UnitOfWorkPort,
  ) {
    super();
  }

  @OnEvent(UserCreatedDomainEvent.name)
  async handle(event: UserCreatedDomainEvent) {
    console.log(`Email sent to ${event.email}`); // TODO : Send email
  }
}
