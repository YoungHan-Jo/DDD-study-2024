import { BaseError } from "../utils/baseError";

export class NoOrderError extends BaseError {
    constructor({ message, cause }: { message: string; cause?: any }) {
        super({
            message,
            cause,
        });
    }
}