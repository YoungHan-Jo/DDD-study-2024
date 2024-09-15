import { BaseError } from '../utils/baseError';

export class PasswordNotMatchError extends BaseError {
  constructor({ message, cause }: { message: string; cause?: any }) {
    super({
      message,
      cause,
    });
  }
}
