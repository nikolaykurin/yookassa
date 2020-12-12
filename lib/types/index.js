"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Types;
(function (Types) {
    let PaymentMethodType;
    (function (PaymentMethodType) {
        PaymentMethodType["BankCard"] = "bank_card";
    })(PaymentMethodType = Types.PaymentMethodType || (Types.PaymentMethodType = {}));
    let PaymentStatus;
    (function (PaymentStatus) {
        PaymentStatus["Pending"] = "pending";
        PaymentStatus["WaitingForCapture"] = "waiting_for_capture";
        PaymentStatus["Succeeded"] = "succeeded";
        PaymentStatus["Canceled"] = "canceled";
    })(PaymentStatus = Types.PaymentStatus || (Types.PaymentStatus = {}));
    let PaymentAmountCurrency;
    (function (PaymentAmountCurrency) {
        PaymentAmountCurrency["RUB"] = "RUB";
    })(PaymentAmountCurrency = Types.PaymentAmountCurrency || (Types.PaymentAmountCurrency = {}));
    let PaymentConfirmationType;
    (function (PaymentConfirmationType) {
        PaymentConfirmationType["Redirect"] = "redirect";
    })(PaymentConfirmationType = Types.PaymentConfirmationType || (Types.PaymentConfirmationType = {}));
})(Types || (Types = {}));
exports.default = Types;
