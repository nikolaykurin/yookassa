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
        PaymentConfirmationType["External"] = "external";
        PaymentConfirmationType["QR"] = "qr";
        PaymentConfirmationType["Embedded"] = "embedded";
    })(PaymentConfirmationType = Types.PaymentConfirmationType || (Types.PaymentConfirmationType = {}));
    let WebHookEvent;
    (function (WebHookEvent) {
        WebHookEvent["PaymentWaitingForCapture"] = "payment.waiting_for_capture";
        WebHookEvent["PaymentSucceeded"] = "payment.succeeded";
        WebHookEvent["PaymentCanceled"] = "payment.canceled";
        WebHookEvent["RefundSucceeded"] = "refund.succeeded";
    })(WebHookEvent = Types.WebHookEvent || (Types.WebHookEvent = {}));
})(Types || (Types = {}));
exports.default = Types;
