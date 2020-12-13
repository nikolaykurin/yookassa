import Payment from '../yooKassa/payment';
import Refund from '../yooKassa/refund';
declare namespace Types {
    enum PaymentMethodType {
        BankCard = "bank_card"
    }
    enum PaymentStatus {
        Pending = "pending",
        WaitingForCapture = "waiting_for_capture",
        Succeeded = "succeeded",
        Canceled = "canceled"
    }
    enum PaymentAmountCurrency {
        RUB = "RUB"
    }
    enum PaymentConfirmationType {
        Redirect = "redirect",
        External = "external",
        QR = "qr",
        Embedded = "embedded"
    }
    enum WebHookEvent {
        PaymentWaitingForCapture = "payment.waiting_for_capture",
        PaymentSucceeded = "payment.succeeded",
        PaymentCanceled = "payment.canceled",
        RefundSucceeded = "refund.succeeded"
    }
    type PaymentAmount = {
        value: string;
        currency: PaymentAmountCurrency;
    };
    type PaymentConfirmation = {
        type: PaymentConfirmationType;
        confirmation_url?: string;
        confirmation_token?: string;
    };
    type PaymentMethod = {
        type: PaymentMethodType;
    };
    type WebHook = {
        type: 'notification';
        event: WebHookEvent;
        object: Payment | Refund;
    };
    type CreateWebHookData = {
        event: WebHookEvent;
        url: string;
    };
    type CreatePaymentData = {
        amount: PaymentAmount;
        capture: boolean;
        payment_method_data?: PaymentMethod;
        confirmation?: PaymentConfirmation;
        description?: string;
    };
    type CreateRefundData = {
        amount: PaymentAmount;
        payment_id: string;
    };
    type PaymentResponseError = {
        type: string;
        id: string;
        code: string;
        description: string;
        parameter: string;
    };
}
export default Types;
