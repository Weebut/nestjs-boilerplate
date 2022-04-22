export class CreateUserCommand {
  constructor({ foo }) {
    this.foo = foo;
  }

  readonly foo: string;
}
