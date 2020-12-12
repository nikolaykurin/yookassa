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
        Redirect = "redirect"
    }
    type PaymentAmount = {
        value: string;
        currency: PaymentAmountCurrency;
    };
    type PaymentConfirmation = {
        type: PaymentConfirmationType;
        confirmation_url: string;
    };
    type PaymentMethod = {
        type: PaymentMethodType;
    };
    type CreatePaymentData = {
        amount: PaymentAmount;
        payment_method_data: PaymentMethod;
        confirmation?: PaymentConfirmation;
        description?: string;
    };
    type CreateRefundData = {
        amount: PaymentAmount;
        payment_id: string;
    };
}
export default Types;
