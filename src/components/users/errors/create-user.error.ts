import { BaseException } from '@libs/exceptions/base-classes/base-exception';

export class UserAlreadyExistsError extends BaseException {
  static readonly message: 'User already exists';

  public readonly code = 'USER.ALREADY_EXISTS';

  constructor(metadata?: unknown) {
    super('User already exists', metadata);
  }
}
