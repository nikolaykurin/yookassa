import { AxiosInstance, AxiosResponse } from 'axios';
import Types from '../../types';
import Payment from '../payment';
import Refund from '../refund';
export declare const getInstance: (url: any) => AxiosInstance;
declare class YooKassaRequest {
    private axiosInstance;
    private shopId;
    private secretKey;
    private timeout;
    private retryTimeout;
    private isDebugMode;
    private constructor();
    /** Subscribe to WebHook
     * @see https://yookassa.ru/developers/using-api/webhooks#events
     */
    createWebHook(data: Types.CreateWebHookData, idempotenceKey?: string): Promise<AxiosResponse<unknown>>;
    /**
     * Create Payment
     * @see https://yookassa.ru/developers/api#create_payment
     */
    createPayment(data: Types.CreatePaymentData, idempotenceKey?: string): Promise<AxiosResponse<Payment>>;
    /**
     * Get Payment
     * @see https://yookassa.ru/developers/api#get_payment
     */
    getPayment(paymentId: string, idempotenceKey?: string): Promise<AxiosResponse<Payment>>;
    /**
     * Capture Payment
     * @see https://yookassa.ru/developers/api#capture_payment
     */
    capturePayment(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<AxiosResponse<Payment>>;
    /**
     * Cancel Payment
     * @see https://kassa.yandex.ru/docs/checkout-api/#otmena-platezha
     */
    cancelPayment(paymentId: string, idempotenceKey?: string): Promise<AxiosResponse<Payment>>;
    /**
     * Create Refund from Payment
     * @see https://yookassa.ru/developers/api#create_refund
     */
    createRefund(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<AxiosResponse<Refund>>;
    /**
     * Get Refund
     * @see https://yookassa.ru/developers/api#get_refund
     */
    getRefund(refundId: string, idempotenceKey?: string): Promise<AxiosResponse<Refund>>;
}
export default YooKassaRequest;
