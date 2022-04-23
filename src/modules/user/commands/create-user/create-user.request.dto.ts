import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUser } from 'src/interface-adapters/interfaces/user/create-user.interface';

export class CreateUserRequest implements CreateUser {
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  readonly foo: string;
}
