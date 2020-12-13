import Types from '../types';
import Payment from './payment';
import Refund from './refund';
/**
 * @see https://yookassa.ru/developers/payments/payment-process
 */
declare class YooKassa {
    private request;
    private shopId;
    private secretKey;
    private apiURL;
    private timeout;
    private retryTimeout;
    private isDebugMode;
    constructor({ shopId, secretKey, apiURL, timeout, retryTimeout, isDebugMode, }: {
        shopId: any;
        secretKey: any;
        apiURL?: string;
        timeout?: number;
        retryTimeout?: number;
        isDebugMode?: boolean;
    });
    createWebHook(payload: Types.CreateWebHookData, idempotenceKey?: string): Promise<boolean>;
    createPayment(payload: Types.CreatePaymentData, idempotenceKey?: string): Promise<Payment>;
    getPayment(paymentId: string, idempotenceKey?: string): Promise<Payment>;
    capturePayment(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<Payment>;
    cancelPayment(paymentId: string, idempotenceKey?: string): Promise<Payment>;
    createRefund(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<Refund>;
    getRefund(refundId: string, idempotenceKey?: string): Promise<Refund>;
}
export default YooKassa;
