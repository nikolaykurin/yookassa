"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("../../types"));
// TODO: make it as "data" with own type and getters
class Payment {
    constructor(yooKassa, data) {
        // CHECKME: may be it'll be better to put "data" into "data" property?
        Object.assign(this, data, { yooKassa: yooKassa });
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
    // TODO: return type
    get data() {
        const data = Object.assign({}, this);
        delete data.yooKassa;
        return data;
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
