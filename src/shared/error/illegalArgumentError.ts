import { BaseError } from '../utils/baseError';

export class IllegalArgumentError extends BaseError {
  constructor({ message, cause }: { message: string; cause?: any }) {
    super({
      message,
      cause,
    });
  }
}
