import YooKassa from '..';
import Types from '@/types';

class Refund {
  private yooKassa: YooKassa;
  private id: string;
  private amount: Types.PaymentAmount;

  constructor(yooKassa: YooKassa, data: Refund) {
    // CHECKME: may be it'll be better to put "data" into "data" property?
    Object.assign(this, data, { yooKassa: yooKassa });
  }

  public get data(): object {
    const data = Object.assign({}, this);

    delete data.yooKassa;

    return data;
  }

  public async reload(): Promise<boolean> {
    const refund = await this.yooKassa.getRefund(this.id);

    Object.assign(this, refund);

    return true;
  }
}

export default Refund;
