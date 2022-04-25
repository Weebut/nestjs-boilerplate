import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export interface FormatExceptionMessageInterface {
  message: string;
  error?: number;
}

@Injectable()
export class ExceptionsService {
  badRequestException(data: FormatExceptionMessageInterface): void {
    throw new BadRequestException(data);
  }
  internalServerErrorException(data?: FormatExceptionMessageInterface): void {
    throw new InternalServerErrorException(data);
  }
  forbiddenException(data?: FormatExceptionMessageInterface): void {
    throw new ForbiddenException(data);
  }
  UnauthorizedException(data?: FormatExceptionMessageInterface): void {
    throw new UnauthorizedException(data);
  }
}
