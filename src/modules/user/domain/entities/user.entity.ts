import { Entity } from 'src/libs/domain/base-classes/base-entity';
import { Foo } from '../value-objects/foo.value-object';
import { UserBoos } from './user.type';

export interface CreateUserProps {
  foo: Foo;
}

export interface UserProps extends CreateUserProps {
  boo: UserBoos;
}

export class User extends Entity<UserProps> {
  static create(props: CreateUserProps) {
    const user = new User({ props: { ...props, boo: UserBoos.boo } });
    return user;
  }

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
