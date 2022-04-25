import {
  BaseCommand,
  BaseCommandProps,
} from '@libs/structure/domain/base-classes/base-command';

export class CreateUserCommand extends BaseCommand {
  constructor(props: BaseCommandProps<CreateUserCommand>) {
    super(props);
    this.foo = props.foo;
  }

  readonly foo: string;
}
