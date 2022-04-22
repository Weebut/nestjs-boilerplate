import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserRequest {
  @IsString()
  @MaxLength(200)
  @MinLength(5)
  readonly foo: string;
}
