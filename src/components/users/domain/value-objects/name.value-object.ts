import { BaseValueObject } from '@libs/structure/domain/base-classes/base-value-object';
import { Guard } from '@libs/structure/domain/guard';

interface NameProps {
  familyName: string;
  givenName: string;
  nickname: string;
}

export class Name extends BaseValueObject<NameProps> {
  static minNameLength = 5;
  static maxNameLength = 32;

  get familyName() {
    return this.props.familyName;
  }

  get givenName() {
    return this.props.givenName;
  }

  get nickname() {
    return this.props.nickname;
  }

  protected validate(props: NameProps): void {
    if (
      !Guard.lengthIsBetween(
        props.familyName,
        Name.minNameLength,
        Name.maxNameLength,
      )
    ) {
      throw new Error('family name is out of range');
    }
    if (
      !Guard.lengthIsBetween(
        props.givenName,
        Name.minNameLength,
        Name.maxNameLength,
      )
    ) {
      throw new Error('given name is out of range');
    }
    if (
      !Guard.lengthIsBetween(
        props.nickname,
        Name.minNameLength,
        Name.maxNameLength,
      )
    ) {
      throw new Error('nickname is out of range');
    }
  }
}
