import { BaseError } from "../utils/baseError";

export class NoCustomerError extends BaseError {
    constructor({ message, cause }: { message: string; cause?: any }) {
        super({
            message,
            cause
        });
    }
}