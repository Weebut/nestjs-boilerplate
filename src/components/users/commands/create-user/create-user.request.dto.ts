import { CreateUser } from '@interface-adapters/interfaces/user/create-user.interface';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequest implements CreateUser {
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  readonly foo: string;
}
