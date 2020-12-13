import { DEFAULT_URL, DEFAULT_TIMEOUT, DEFAULT_RETRY_TIMEOUT, DEFAULT_IS_DEBUG_MODE } from '@/constants';
import Types from '@/types';
import YooKassaRequest from './request';
import Payment from './payment';
import Refund from './refund';

/**
 * @see https://yookassa.ru/developers/payments/payment-process
 */
class YooKassa {
  private request: YooKassaRequest;
  private shopId: string;
  private secretKey: string;
  private apiURL: string;
  private timeout: number;
  private retryTimeout: number;
  private isDebugMode: boolean;

  constructor({
    shopId,
    secretKey,
    apiURL = DEFAULT_URL,
    timeout = DEFAULT_TIMEOUT,
    retryTimeout = DEFAULT_RETRY_TIMEOUT,
    isDebugMode = DEFAULT_IS_DEBUG_MODE,
  }) {
    this.shopId = shopId;
    this.secretKey = secretKey;
    this.apiURL = apiURL;
    this.isDebugMode = isDebugMode;
    this.timeout = timeout;
    this.retryTimeout = retryTimeout;
  }

  public async createWebHook(payload: Types.CreateWebHookData, idempotenceKey?: string): Promise<boolean> {
    await this.request.createWebHook(payload, idempotenceKey);

    return true;
  }

  public async createPayment(payload: Types.CreatePaymentData, idempotenceKey?: string): Promise<Payment> {
    const { data: payment } = await this.request.createPayment(payload, idempotenceKey);

    return new Payment(this, payment);
  }

  public async getPayment(paymentId: string, idempotenceKey?: string): Promise<Payment> {
    const { data: payment } = await this.request.getPayment(paymentId, idempotenceKey);

    return new Payment(this, payment);
  }

  public async capturePayment(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<Payment> {
    const { data: payment } = await this.request.capturePayment(paymentId, amount, idempotenceKey);

    return new Payment(this, payment);
  }

  public async cancelPayment(paymentId: string, idempotenceKey?: string): Promise<Payment> {
    const { data: payment } = await this.request.cancelPayment(paymentId, idempotenceKey);

    return new Payment(this, payment);
  }

  public async createRefund(paymentId: string, amount: Types.PaymentAmount, idempotenceKey?: string): Promise<Refund> {
    const { data: payment } = await this.request.createRefund(paymentId, amount, idempotenceKey);

    return new Refund(this, payment);
  }

  public async getRefund(refundId: string, idempotenceKey?: string): Promise<Refund> {
    const { data: payment } = await this.request.getRefund(refundId, idempotenceKey);

    return new Refund(this, payment);
  }
}

export default YooKassa;
