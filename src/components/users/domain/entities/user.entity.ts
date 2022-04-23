import { BaseEntity } from '@Libs/structure/domain/base-classes/base-entity';
import { UUID } from '@Libs/structure/domain/value-objects/uuid.value-object';
import { Foo } from '@Components/users/domain/value-objects/foo.value-object';
import { UserBoos } from './user.type';

export interface CreateUserProps {
  foo: Foo;
}

export interface UserProps extends CreateUserProps {
  boo: UserBoos;
}

export class User extends BaseEntity<UserProps> {
  static create(props: CreateUserProps) {
    const id = UUID.generate();

    const user = new User({ id, props: { ...props, boo: UserBoos.boo } });
    return user;
  }

  protected readonly _id: UUID;

  get foo() {
    return this.props.foo;
  }

  get boo() {
    return this.props.boo;
  }

  makeBooBo() {
    this.props.boo = UserBoos.bo;
  }

  makeBooBoo() {
    this.props.boo = UserBoos.boo;
  }

  someBusinessLogic() {
    // TODO : Place business logic here
  }

  public validate(): void {
    // TODO : Entity business rules validation to protect it's invariant
  }
}
