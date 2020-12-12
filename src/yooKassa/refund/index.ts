import YooKassa from '..';
import Types from '@/types';

class Refund {
  private yooKassa: YooKassa;
  private id: string;
  private amount: Types.PaymentAmount;

  constructor(instance: YooKassa, data: Refund) {
    Object.assign(this, data, { yooKassa: instance });
  }

  public async reload(): Promise<boolean> {
    const refund = await this.yooKassa.getRefund(this.id);

    Object.assign(this, refund);

    return true;
  }
}

export default Refund;
