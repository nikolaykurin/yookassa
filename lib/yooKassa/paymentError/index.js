"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://yookassa.ru/developers/using-api/basics#http-codes
 */
class PaymentError extends Error {
    constructor(error) {
        const { id, code, description, parameter } = error;
        super(description);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PaymentError);
        }
        else {
            this.stack = new Error().stack;
        }
        this.name = 'PaymentError';
        this.message = description;
        this.id = id;
        this.code = code;
        this.parameter = parameter;
    }
}
exports.default = PaymentError;
