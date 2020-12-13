import YooKassa from '..';
import Types from '../../types';
import Refund from '../refund';
declare class Payment {
    private yooKassa;
    private id;
    private amount;
    private status;
    private confirmation?;
    constructor(yooKassa: YooKassa, data: Payment);
    get isPending(): boolean;
    get isWaitingForCapture(): boolean;
    get isSucceeded(): boolean;
    get isCanceled(): boolean;
    get isResolved(): boolean;
    get confirmationUrl(): string | undefined;
    get confirmationToken(): string | undefined;
    get data(): object;
    reload(): Promise<boolean>;
    capture(amount: Types.PaymentAmount): Promise<boolean>;
    cancel(): Promise<boolean>;
    refund(amount: Types.PaymentAmount): Promise<Refund>;
}
export default Payment;
