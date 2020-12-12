"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @see https://yookassa.ru/developers/using-api/basics#http-codes
 */
class PaymentError extends Error {
    constructor(error) {
        super(error.message);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, PaymentError);
        }
        else {
            this.stack = new Error().stack;
        }
        this.name = 'PaymentError';
        this.message = error.description;
        this.id = error.id;
        this.code = error.code;
        this.parameter = error.parameter;
    }
}
exports.default = PaymentError;
