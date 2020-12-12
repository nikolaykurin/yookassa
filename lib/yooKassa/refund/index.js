"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Refund {
    constructor(instance, data) {
        Object.assign(this, data, { yooKassa: instance });
    }
    async reload() {
        const refund = await this.yooKassa.getRefund(this.id);
        Object.assign(this, refund);
        return true;
    }
}
exports.default = Refund;
