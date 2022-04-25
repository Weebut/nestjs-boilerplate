import { CreateUser } from '@interface-adapters/interfaces/user/create-user.interface';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequest implements CreateUser {
  @IsEmail()
  @MaxLength(320)
  email: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(5)
  familyName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(5)
  givenName: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  @MinLength(5)
  nickname: string;
}
