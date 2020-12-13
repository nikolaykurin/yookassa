import Types from '../../types';
import YooKassa from '..';
import Refund from '../refund';
declare class Payment {
    private yooKassa;
    id: string;
    amount: Types.PaymentAmount;
    status: Types.PaymentStatus;
    confirmation?: Types.PaymentConfirmation;
    constructor(yooKassa: YooKassa, data: Payment);
    get isPending(): boolean;
    get isWaitingForCapture(): boolean;
    get isSucceeded(): boolean;
    get isCanceled(): boolean;
    get isResolved(): boolean;
    get confirmationUrl(): string | undefined;
    get confirmationToken(): string | undefined;
    get data(): Omit<Payment, 'yooKassa'>;
    reload(): Promise<boolean>;
    capture(amount: Types.PaymentAmount): Promise<boolean>;
    cancel(): Promise<boolean>;
    refund(amount: Types.PaymentAmount): Promise<Refund>;
}
export default Payment;
