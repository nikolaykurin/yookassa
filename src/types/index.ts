namespace Types {
  export enum PaymentMethodType {
    BankCard = 'bank_card',
  }

  export enum PaymentStatus {
    Pending = 'pending',
    WaitingForCapture = 'waiting_for_capture',
    Succeeded = 'succeeded',
    Canceled = 'canceled',
  }

  export enum PaymentAmountCurrency {
    RUB = 'RUB',
  }

  export enum PaymentConfirmationType {
    Redirect = 'redirect',
  }

  export type PaymentAmount = {
    value: string;
    currency: PaymentAmountCurrency;
  };

  export type PaymentConfirmation = {
    type: PaymentConfirmationType; // embedded, qr, etc.
    confirmation_url: string;
  };

  export type PaymentMethod = {
    type: PaymentMethodType;
  };

  export type CreatePaymentData = {
    amount: PaymentAmount;
    payment_method_data: PaymentMethod;
    confirmation?: PaymentConfirmation;
    description?: string;
  };

  export type CreateRefundData = {
    amount: PaymentAmount;
    payment_id: string;
  };
}

export default Types;
