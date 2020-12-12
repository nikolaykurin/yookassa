"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const payment_1 = __importDefault(require("./payment"));
const refund_1 = __importDefault(require("./refund"));
/**
 * @see https://yookassa.ru/developers/payments/payment-process
 */
class YooKassa {
    constructor({ shopId, secretKey, apiURL = constants_1.DEFAULT_URL, timeout = constants_1.DEFAULT_TIMEOUT, retryTimeout = constants_1.DEFAULT_RETRY_TIMEOUT, isDebugMode = constants_1.DEFAULT_IS_DEBUG_MODE, }) {
        this.shopId = shopId;
        this.secretKey = secretKey;
        this.apiURL = apiURL;
        this.isDebugMode = isDebugMode;
        this.timeout = timeout;
        this.retryTimeout = retryTimeout;
    }
    async createPayment(payload, idempotenceKey) {
        const { data: payment } = await this.request.createPayment(payload, idempotenceKey);
        return new payment_1.default(this, payment);
    }
    async getPayment(paymentId, idempotenceKey) {
        const { data: payment } = await this.request.getPayment(paymentId, idempotenceKey);
        return new payment_1.default(this, payment);
    }
    async capturePayment(paymentId, amount, idempotenceKey) {
        const { data: payment } = await this.request.capturePayment(paymentId, amount, idempotenceKey);
        return new payment_1.default(this, payment);
    }
    async cancelPayment(paymentId, idempotenceKey) {
        const { data: payment } = await this.request.cancelPayment(paymentId, idempotenceKey);
        return new payment_1.default(this, payment);
    }
    async createRefund(paymentId, amount, idempotenceKey) {
        const { data: payment } = await this.request.createRefund(paymentId, amount, idempotenceKey);
        return new refund_1.default(this, payment);
    }
    async getRefund(refundId, idempotenceKey) {
        const { data: payment } = await this.request.getRefund(refundId, idempotenceKey);
        return new refund_1.default(this, payment);
    }
}
exports.default = YooKassa;
