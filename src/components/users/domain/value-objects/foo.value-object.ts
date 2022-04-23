import {
  DomainPrimitive,
  BaseValueObject,
} from 'src/libs/architecture/domain/base-classes/base-value-object';
import { Guard } from 'src/libs/architecture/domain/guard';

export class Foo extends BaseValueObject<string> {
  static minFooLength = 5;
  static maxFooLength = 200;

  constructor(value: string) {
    super({ value });
    this.props.value = Foo.format(value);
  }

  get value(): string {
    return this.props.value;
  }

  protected validate({ value }: DomainPrimitive<string>): void {
    if (!Guard.lengthIsBetween(value, Foo.minFooLength, Foo.maxFooLength)) {
      throw new Error('Oute of range: Email');
    }
  }

  static format(email: string): string {
    return email.trim().toLowerCase();
  }
}
