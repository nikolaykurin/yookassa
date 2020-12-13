import Types from '@/types';
import YooKassa from '..';
import Refund from '@/yooKassa/refund';

// TODO: make it as "data" with own type and getters
class Payment {
  private yooKassa: YooKassa;
  public id: string;
  public amount: Types.PaymentAmount;
  public status: Types.PaymentStatus;
  public confirmation?: Types.PaymentConfirmation;

  public constructor(yooKassa: YooKassa, data: Payment) {
    // CHECKME: may be it'll be better to put "data" into "data" property?
    Object.assign(this, data, { yooKassa: yooKassa });
  }

  public get isPending(): boolean {
    return this.status === Types.PaymentStatus.Pending;
  }

  public get isWaitingForCapture(): boolean {
    return this.status === Types.PaymentStatus.WaitingForCapture;
  }

  public get isSucceeded(): boolean {
    return this.status === Types.PaymentStatus.Succeeded;
  }

  public get isCanceled(): boolean {
    return this.status === Types.PaymentStatus.Canceled;
  }

  public get isResolved(): boolean {
    return this.isSucceeded || this.isCanceled;
  }

  public get confirmationUrl(): string | undefined {
    return this.confirmation?.confirmation_url;
  }

  public get confirmationToken(): string | undefined {
    return this.confirmation?.confirmation_token;
  }

  // TODO: return type
  public get data(): Omit<Payment, 'yooKassa'> {
    const data = Object.assign({}, this);

    delete data.yooKassa;

    return data;
  }

  public async reload(): Promise<boolean> {
    const payment = await this.yooKassa.getPayment(this.id);

    Object.assign(this, payment);

    return true;
  }

  public async capture(amount: Types.PaymentAmount): Promise<boolean> {
    const payment = await this.yooKassa.capturePayment(this.id, amount || this.amount);

    Object.assign(this, payment);

    return true;
  }

  public async cancel(): Promise<boolean> {
    const payment = await this.yooKassa.cancelPayment(this.id);

    Object.assign(this, payment);

    return true;
  }

  public async refund(amount: Types.PaymentAmount): Promise<Refund> {
    const refund = await this.yooKassa.createRefund(this.id, amount || this.amount);

    return refund;
  }
}

export default Payment;
