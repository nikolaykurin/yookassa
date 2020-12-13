import Types from '@/types';
import YooKassa from '..';

// TODO: make it as "data" with own type and getters
class Refund {
  private yooKassa: YooKassa;
  public id: string;
  public amount: Types.PaymentAmount;

  constructor(yooKassa: YooKassa, data: Refund) {
    // CHECKME: may be it'll be better to put "data" into "data" property?
    Object.assign(this, data, { yooKassa: yooKassa });
  }

  // TODO: return type
  public get data(): Omit<Refund, 'yooKassa'> {
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
