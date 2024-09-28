import { BaseError } from '../utils/baseError';

export class StoreBlockedError extends BaseError {
  constructor({ message, cause }: { message: string; cause?: any }) {
    super({
      message,
      cause,
    });
  }
}
