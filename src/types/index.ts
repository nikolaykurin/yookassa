import Payment from '@/yooKassa/payment';
import Refund from '@/yooKassa/refund';

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
    External = 'external',
    QR = 'qr',
    Embedded = 'embedded',
  }

  export enum WebHookEvent {
    PaymentWaitingForCapture = 'payment.waiting_for_capture',
    PaymentSucceeded = 'payment.succeeded',
    PaymentCanceled = 'payment.canceled',
    RefundSucceeded = 'refund.succeeded',
  }

  export type PaymentAmount = {
    value: string;
    currency: PaymentAmountCurrency;
  };

  export type PaymentConfirmation = {
    type: PaymentConfirmationType;
    confirmation_url?: string;
    confirmation_token?: string;
  };

  export type PaymentMethod = {
    type: PaymentMethodType;
  };

  export type WebHook = {
    type: 'notification';
    event: WebHookEvent;
    object: Payment | Refund;
  };

  export type CreateWebHookData = {
    event: WebHookEvent;
    url: string;
  };

  export type CreatePaymentData = {
    amount: PaymentAmount;
    capture: boolean;
    payment_method_data?: PaymentMethod;
    confirmation?: PaymentConfirmation;
    description?: string;
  };

  export type CreateRefundData = {
    amount: PaymentAmount;
    payment_id: string;
  };

  export type PaymentResponseError = {
    type: string;
    id: string;
    code: string;
    description: string;
    parameter: string;
  };
}

export default Types;
