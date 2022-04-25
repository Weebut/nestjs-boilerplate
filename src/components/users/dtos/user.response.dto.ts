import { User } from '@interface-adapters/interfaces/user/user.interface';
import { BaseResponse } from '@libs/structure/interface-adapters/base-classes/base-response';
import { User as UserEntity } from '../domain/entities/user.entity';

export class UserResponse extends BaseResponse implements User {
  constructor(user: UserEntity) {
    super(user);

    const props = user.getCopy();
    this.email = props.email.value;
    this.name = {
      familyName: props.name.familyName,
      givenName: props.name.givenName,
      nickName: props.name.nickname,
    };
  }

  email: string;
  name: {
    familyName: string;
    givenName: string;
    nickName: string;
  };
}
