import { UserCreatedDomainEvent } from '@components/users/domain/events/user-created.domain-event';
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { BaseDomainEventHandler } from '@libs/structure/domain/base-classes/base-domain-event-handler';

export class SendEmailWhenUserIsCreatedDomainEventHandler extends BaseDomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent);
  }

  async handle(event: UserCreatedDomainEvent) {
    // TODO : Send email
    console.log('welcome', event.nickname);
  }
}
