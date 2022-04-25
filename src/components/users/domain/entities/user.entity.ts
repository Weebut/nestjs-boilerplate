import { Email } from '@components/users/domain/value-objects/email.value-object';
import { Name } from '@components/users/domain/value-objects/name.value-object';
import { BaseEntity } from '@libs/structure/domain/base-classes/base-entity';
import { UUID } from '@libs/structure/domain/value-objects/uuid.value-object';
import { UserRoles } from './user.type';

export interface CreateUserProps {
  email: Email;
  name: Name;
}

export interface UserProps extends CreateUserProps {
  role: UserRoles;
}

export class User extends BaseEntity<UserProps> {
  static create(props: CreateUserProps) {
    const id = UUID.generate();

    const user = new User({ id, props: { ...props, role: UserRoles.GUEST } });
    return user;
  }

  protected readonly _id: UUID;

  get email() {
    return this.props.email;
  }

  get name() {
    return this.props.name;
  }

  get role() {
    return this.props.role;
  }

  makeAdmin() {
    this.props.role = UserRoles.ADMIN;
  }

  makeModerator() {
    this.props.role = UserRoles.MODERATOR;
  }

  someBusinessLogic() {
    // TODO : Place business logic here
  }

  validate(): void {
    // TODO : Entity business rules validation to protect it's invariant
  }
}
