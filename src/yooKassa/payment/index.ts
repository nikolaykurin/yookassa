import YooKassa from '..';
import Types from '../../types';
import Refund from '../refund';

class Payment {
  private yooKassa: YooKassa;
  private id: string;
  private amount: Types.PaymentAmount;
  private status: Types.PaymentStatus;
  private confirmation?: Types.PaymentConfirmation;

  constructor(instance: YooKassa, data: Payment) {
    Object.assign(this, data, { yooKassa: instance });
  }

  get isPending(): boolean {
    return this.status === Types.PaymentStatus.Pending;
  }

  get isWaitingForCapture(): boolean {
    return this.status === Types.PaymentStatus.WaitingForCapture;
  }

  get isSucceeded(): boolean {
    return this.status === Types.PaymentStatus.Succeeded;
  }

  get isCanceled(): boolean {
    return this.status === Types.PaymentStatus.Canceled;
  }

  get isResolved(): boolean {
    return this.isSucceeded || this.isCanceled;
  }

  get confirmationUrl(): string | undefined {
    return this.confirmation?.confirmation_url;
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
