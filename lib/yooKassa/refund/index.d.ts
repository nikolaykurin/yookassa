import Types from '../../types';
import YooKassa from '..';
declare class Refund {
    private yooKassa;
    id: string;
    amount: Types.PaymentAmount;
    constructor(yooKassa: YooKassa, data: Refund);
    get data(): Omit<Refund, 'yooKassa'>;
    reload(): Promise<boolean>;
}
export default Refund;
