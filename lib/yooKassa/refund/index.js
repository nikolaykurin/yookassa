"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Refund {
    constructor(yooKassa, data) {
        // CHECKME: may be it'll be better to put "data" into "data" property?
        Object.assign(this, data, { yooKassa: yooKassa });
    }
    get data() {
        const data = Object.assign({}, this);
        delete data.yooKassa;
        return data;
    }
    async reload() {
        const refund = await this.yooKassa.getRefund(this.id);
        Object.assign(this, refund);
        return true;
    }
}
exports.default = Refund;
