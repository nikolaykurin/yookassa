import YooKassa from '..';
import Types from '../../types';
import Refund from '../refund';

class Payment {
  private yooKassa: YooKassa;
  private id: string;
  private amount: Types.PaymentAmount;
  private status: Types.PaymentStatus;
  private confirmation?: Types.PaymentConfirmation;

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

  public get data(): object {
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
