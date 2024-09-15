import { BaseError } from '../utils/baseError';

export class IllegalStateError extends BaseError {
  constructor({ message, cause }: { message: string; cause?: any }) {
    super({
      message,
      cause,
    });
  }
}
