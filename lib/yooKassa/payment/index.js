"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("../../types"));
class Payment {
    constructor(instance, data) {
        Object.assign(this, data, { yooKassa: instance });
    }
    get isPending() {
        return this.status === types_1.default.PaymentStatus.Pending;
    }
    get isWaitingForCapture() {
        return this.status === types_1.default.PaymentStatus.WaitingForCapture;
    }
    get isSucceeded() {
        return this.status === types_1.default.PaymentStatus.Succeeded;
    }
    get isCanceled() {
        return this.status === types_1.default.PaymentStatus.Canceled;
    }
    get isResolved() {
        return this.isSucceeded || this.isCanceled;
    }
    get confirmationUrl() {
        return this.confirmation?.confirmation_url;
    }
    get confirmationToken() {
        return this.confirmation?.confirmation_token;
    }
    async reload() {
        const payment = await this.yooKassa.getPayment(this.id);
        Object.assign(this, payment);
        return true;
    }
    async capture(amount) {
        const payment = await this.yooKassa.capturePayment(this.id, amount || this.amount);
        Object.assign(this, payment);
        return true;
    }
    async cancel() {
        const payment = await this.yooKassa.cancelPayment(this.id);
        Object.assign(this, payment);
        return true;
    }
    async refund(amount) {
        const refund = await this.yooKassa.createRefund(this.id, amount || this.amount);
        return refund;
    }
}
exports.default = Payment;
