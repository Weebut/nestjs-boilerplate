import {
  DomainPrimitive,
  BaseValueObject,
} from '../base-classes/base-value-object';

export class DateVO extends BaseValueObject<Date> {
  constructor(value: Date | string | number) {
    const date = new Date(value);
    super({ value: date });
  }

  public get value(): Date {
    return this.props.value;
  }

  public static now(): DateVO {
    return new DateVO(Date.now());
  }

  protected validate({ value }: DomainPrimitive<Date>): void {
    if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
      throw new Error('Incorrect date');
    }
  }
}
